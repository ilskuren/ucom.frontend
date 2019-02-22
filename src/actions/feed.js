import * as overviewUtils from '../utils/overview';

import {
  USER_NEWS_FEED_ID,
  USER_WALL_FEED_ID,
  ORGANIZATION_FEED_ID,
  TAG_FEED_ID,
} from '../utils/feed';
import { COMMENTS_INITIAL_COUNT_USER_WALL_FEED, COMMENTS_CONTAINER_ID_FEED_POST } from '../utils/comments';
import api from '../api';
import graphql from '../api/graphql';
import { addPosts } from './posts';
import { commentsAddContainerData } from './comments';

export const feedReset = () => ({ type: 'FEED_RESET' });
export const feedSetLoading = payload => ({ type: 'FEED_SET_LOADING', payload });
export const feedSetMetadata = payload => ({ type: 'FEED_SET_METADATA', payload });
export const feedSetPostIds = payload => ({ type: 'FEED_SET_POST_IDS', payload });
export const feedPrependPostIds = payload => ({ type: 'FEED_PREPEND_POST_IDS', payload });
export const feedAppendPostIds = payload => ({ type: 'FEED_APPEND_POST_IDS', payload });
export const feedSetSideUsers = payload => ({ type: 'FEED_SET_SIDE_USERS', payload });
export const feedSetSidePosts = payload => ({ type: 'FEED_SET_SIDE_POSTS', payload });
export const feedSetSideOrganizations = payload => ({ type: 'FEED_SET_SIDE_ORGANIZATIONS', payload });
export const feedSetSideTags = payload => ({ type: 'FEED_SET_SIDE_TAGS', payload });

export const parseFeedData = ({
  posts,
  metadata,
}) => (dispatch) => {
  posts.forEach((post) => {
    if (post.comments) {
      dispatch(commentsAddContainerData({
        containerId: COMMENTS_CONTAINER_ID_FEED_POST,
        entryId: post.id,
        parentId: 0,
        comments: post.comments.data,
        metadata: post.comments.metadata,
      }));

      delete post.comments;
    }
  });

  dispatch(addPosts(posts));
  dispatch(feedAppendPostIds(posts.map(i => i.id)));
  dispatch(feedSetMetadata(metadata));
};

export const feedGetUserPosts = ({
  page,
  perPage,
  feedTypeId,
  userId,
  organizationId,
  tagIdentity,
}) => async (dispatch) => {
  const getFeedFunctions = {
    [USER_NEWS_FEED_ID]: graphql.getUserNewsFeed,
    [USER_WALL_FEED_ID]: graphql.getUserWallFeed,
    [ORGANIZATION_FEED_ID]: graphql.getOrganizationWallFeed,
    [TAG_FEED_ID]: graphql.getTagWallFeed,
  };

  dispatch(feedSetLoading(true));

  try {
    const data = await getFeedFunctions[feedTypeId]({
      page,
      perPage,
      userId,
      organizationId,
      tagIdentity,
      commentsPerPage: COMMENTS_INITIAL_COUNT_USER_WALL_FEED,
    });
    dispatch(parseFeedData({
      posts: data.data,
      metadata: data.metadata,
    }));
  } catch (e) {
    console.error(e);
  }

  setTimeout(() => {
    dispatch(feedSetLoading(false));
  }, 2000);
};

export const feedCreatePost = (feedTypeId, params) => (dispatch) => {
  const createCommentPostFunctions = {
    [USER_NEWS_FEED_ID]: api.createUserCommentPost.bind(api),
    [USER_WALL_FEED_ID]: api.createUserCommentPost.bind(api),
    [ORGANIZATION_FEED_ID]: api.createOrganizationsCommentPost.bind(api),
    [TAG_FEED_ID]: api.createUserCommentPost.bind(api),
  };

  dispatch(feedSetLoading(true));

  return createCommentPostFunctions[feedTypeId](params)
    .then((data) => {
      dispatch(addPosts([data]));
      dispatch(feedPrependPostIds([data.id]));
      dispatch(feedSetLoading(false));
    })
    .catch(() => {
      dispatch(feedSetLoading(false));
    });
};

export const feedGetPosts = ({
  postTypeId,
  page,
  perPage,
  categoryId,
}) => async (dispatch) => {
  const filter = {
    [overviewUtils.OVERVIEW_CATEGORIES_HOT_ID]: 'Hot',
    [overviewUtils.OVERVIEW_CATEGORIES_TRENDING_ID]: 'Trending',
    [overviewUtils.OVERVIEW_CATEGORIES_FRESH_ID]: 'Fresh',
    [overviewUtils.OVERVIEW_CATEGORIES_TOP_ID]: 'Top',
  };

  const params = {
    tab: 'Posts',
    filter: filter[categoryId],
    postTypeId,
    page,
    perPage,
    commentsPerPage: COMMENTS_INITIAL_COUNT_USER_WALL_FEED,
    commentsPage: 1,
  };
  dispatch(feedSetLoading(true));

  try {
    const data = await graphql.getOverview(params);
    dispatch(parseFeedData({
      posts: data.manyPosts.data,
      metadata: data.manyPosts.metadata,
    }));
    dispatch(feedSetSideUsers(data.manyUsers.data));
    dispatch(feedSetSidePosts(data.manyPosts.data));
    dispatch(feedSetSideOrganizations(data.manyOrganizations.data));
    dispatch(feedSetSideTags(data.manyTags.data));
  } catch (e) {
    console.error(e);
  }

  dispatch(feedSetLoading(false));
};
