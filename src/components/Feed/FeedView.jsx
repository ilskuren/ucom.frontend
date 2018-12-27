import PropTypes from 'prop-types';
import React from 'react';
import FeedInput from './FeedInput';
import Post from './Post/Post';
import LoadMore from './LoadMore';

const Feed = props => (
  <div className="feed">
    {props.onSubmitPostForm &&
      <FeedInput onSubmit={props.onSubmitPostForm} />
    }

    {props.postIds.length > 0 &&
      <div className="feed__list">
        {props.postIds.map(id => (
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

Feed.propTypes = {
  hasMore: PropTypes.bool.isRequired,
  postIds: PropTypes.arrayOf(PropTypes.number).isRequired,
  loading: PropTypes.bool.isRequired,
  onSubmitPostForm: PropTypes.func,
  onClickLoadMore: PropTypes.func.isRequired,
};

export default Feed;
