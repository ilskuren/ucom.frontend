import React from 'react';
import LoadMore from './../Feed/LoadMore';
import CommunityCard from './CommunityCard';

const CommunitiesList = props => (
  <div className="feed">
    {props.organizationsIds.length > 0 &&
      <div className="feed__list">
        {props.organizationsIds.map((id, i) => (
          <div className="feed__item" key={i}>
            <CommunityCard id={id} />
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

export default CommunitiesList;
