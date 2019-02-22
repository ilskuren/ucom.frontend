
import * as overviewUtils from '../utils/overview';

import graphql from '../api/graphql';

export const communityFeedReset = () => ({ type: 'COMMUNITY_FEED_RESET' });
export const communityFeedSetLoading = payload => ({ type: 'COMMUNITY_FEED_SET_LOADING', payload });
export const communityFeedSetMetadata = payload => ({ type: 'COMMUNITY_FEED_SET_METADATA', payload });
export const communityFeedSetIds = payload => ({ type: 'COMMUNITY_FEED_SET_IDS', payload });
export const communityFeedPrependIds = payload => ({ type: 'COMMUNITY_FEED_PREPEND_IDS', payload });
export const communityFeedAppendIds = payload => ({ type: 'COMMUNITY_FEED_APPEND_IDS', payload });
export const communityFeedAppendUsers = payload => ({ type: 'COMMUNITY_FEED_APPEND_USERS', payload });

export const parseFeedData = ({
  communities,
  metadata,
}) => (dispatch) => {
  dispatch(communityFeedAppendIds(communities));
  dispatch(communityFeedSetMetadata(metadata));
};


// export const communityFeedGet = ({
//   page,
//   perPage,
//   categoryId,
// }) => async (dispatch) => {
//   const orderingForCategories = {
//     [overviewUtils.OVERVIEW_CATEGORIES_FRESH_ID]: '-id',
//     [overviewUtils.OVERVIEW_CATEGORIES_TOP_ID]: '-current_rate',
//   };

//   const params = categoryId === overviewUtils.OVERVIEW_CATEGORIES_TRENDING_ID || categoryId === overviewUtils.OVERVIEW_CATEGORIES_HOT_ID ? {
//     page,
//     perPage,
//   } : {
//     page,
//     perPage,
//     ordering: orderingForCategories[categoryId],
//   };

//   let functionGet;

//   if (categoryId === overviewUtils.OVERVIEW_CATEGORIES_TRENDING_ID) {
//     functionGet = graphql.getTrendingCommunities;
//   } else if (categoryId === overviewUtils.OVERVIEW_CATEGORIES_HOT_ID) {
//     functionGet = graphql.getHotCommunities;
//   } else {
//     functionGet = graphql.getCommunities;
//   }

//   dispatch(communityFeedSetLoading(true));

//   try {
//     const data = await functionGet(params);
//     dispatch(parseFeedData({
//       communities: data.data,
//       metadata: data.metadata,
//     }));
//   } catch (e) {
//     console.error(e);
//   }
export const communityFeedGet = ({
  page,
  perPage,
  categoryId,
}) => async (dispatch) => {
  const params = {
    page,
    perPage,
  };
  let functionGet;
  let functionGetUsers;

  if (categoryId === overviewUtils.OVERVIEW_CATEGORIES_TRENDING_ID) {
    functionGet = graphql.getManyTrendingOrganizationsQuery;
    functionGetUsers = graphql.getManyUsersForTrendingOrganizationsQuery;
  } else if (categoryId === overviewUtils.OVERVIEW_CATEGORIES_HOT_ID) {
    functionGet = graphql.getManyHotOrganizationsQuery;
    functionGetUsers = graphql.getManyUsersForHotOrganizationsQuery;
  } else if (categoryId === overviewUtils.OVERVIEW_CATEGORIES_FRESH_ID) {
    functionGet = graphql.getManyFreshOrganizationsQuery;
    functionGetUsers = graphql.getManyUsersForFreshOrganizationsQuery;
  } else if (categoryId === overviewUtils.OVERVIEW_CATEGORIES_TOP_ID) {
    functionGet = graphql.getManyTopOrganizationsQuery;
    functionGetUsers = graphql.getManyUsersForTopOrganizationsQuery;
  }

  dispatch(communityFeedSetLoading(true));

  try {
    const data = await functionGet(params);
    dispatch(communityFeedAppendIds(data.data));
    dispatch(communityFeedSetMetadata(data.metadata));
    const usersData = await functionGetUsers(params);
    dispatch(communityFeedAppendUsers(usersData.data));
  } catch (e) {
    console.error(e);
  }
  dispatch(communityFeedSetLoading(false));
};
