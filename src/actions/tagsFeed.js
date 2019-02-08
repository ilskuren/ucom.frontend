
import * as overviewUtils from '../utils/overview';

import graphql from '../api/graphql';

export const tagsFeedReset = () => ({ type: 'TAGS_FEED_RESET' });
export const tagsFeedSetLoading = payload => ({ type: 'TAGS_FEED_SET_LOADING', payload });
export const tagsFeedSetMetadata = payload => ({ type: 'TAGS_FEED_SET_METADATA', payload });
export const tagsFeedSetIds = payload => ({ type: 'TAGS_FEED_SET_IDS', payload });
export const tagsFeedPrependIds = payload => ({ type: 'TAGS_FEED_PREPEND_IDS', payload });
export const tagsFeedAppendIds = payload => ({ type: 'TAGS_FEED_APPEND_IDS', payload });

export const parseFeedData = ({
  tags,
  metadata,
}) => (dispatch) => {
  dispatch(tagsFeedAppendIds(tags));
  dispatch(tagsFeedSetMetadata(metadata));
};


export const tagsFeedGet = ({
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

  dispatch(tagsFeedSetLoading(true));

  try {
    const data = await graphql.getTags(params);
    dispatch(parseFeedData({
      tags: data.data,
      metadata: data.metadata,
    }));
  } catch (e) {
    console.error(e);
  }

  dispatch(tagsFeedSetLoading(false));
};
