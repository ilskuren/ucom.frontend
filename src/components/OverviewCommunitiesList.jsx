import React from 'react';
import LoadMore from './LoadMore';

const OverviewCommunitiesList = props => (
  <div className="feed">
    {props.postIds.length > 0 &&
      <div className="feed__list">
        {props.organizationsIds.map(id => (
          <div className="feed__item" key={id}>
            <Post id={id} />
          </div>
        ))}
      </div>
    }

    {props.hasMore &&
      <div className="feed__loadmore">
        <LoadMore
          url={props.loadMoreUrl}
          disabled={props.loading}
          onClick={() => {
            if (props.loading) return;
            props.onClickLoadMore();
          }}
        />
      </div>
    }
  </div>
);

export default OverviewCommunitiesList;
