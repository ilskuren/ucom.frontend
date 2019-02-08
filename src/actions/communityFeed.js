
import * as overviewUtils from '../utils/overview';

import graphql from '../api/graphql';

export const communityFeedReset = () => ({ type: 'COMMUNITY_FEED_RESET' });
export const communityFeedSetLoading = payload => ({ type: 'COMMUNITY_FEED_SET_LOADING', payload });
export const communityFeedSetMetadata = payload => ({ type: 'COMMUNITY_FEED_SET_METADATA', payload });
export const communityFeedSetIds = payload => ({ type: 'COMMUNITY_FEED_SET_IDS', payload });
export const communityFeedPrependIds = payload => ({ type: 'COMMUNITY_FEED_PREPEND_IDS', payload });
export const communityFeedAppendIds = payload => ({ type: 'COMMUNITY_FEED_APPEND_IDS', payload });

export const parseFeedData = ({
  communities,
  metadata,
}) => (dispatch) => {
  dispatch(communityFeedAppendIds(communities));
  dispatch(communityFeedSetMetadata(metadata));
};


export const communityFeedGet = ({
  page,
  perPage,
  categoryId,
}) => async (dispatch) => {
  const orderingForCategories = {
    [overviewUtils.OVERVIEW_CATEGORIES_FRESH_ID]: '-id',
    [overviewUtils.OVERVIEW_CATEGORIES_TOP_ID]: '-current_rate',
  };

  const params = {
    page,
    perPage,
    ordering: orderingForCategories[categoryId],
  };

  dispatch(communityFeedSetLoading(true));

  try {
    const data = await graphql.getCommunities(params);
    dispatch(parseFeedData({
      communities: data.data,
      metadata: data.metadata,
    }));
  } catch (e) {
    console.error(e);
  }

  dispatch(communityFeedSetLoading(false));
};
