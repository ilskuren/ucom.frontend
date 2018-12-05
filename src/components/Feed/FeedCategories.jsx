import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import React, { useEffect, useState } from 'react';
import api from '../../api';
import loader from '../../utils/loader';
import { addPosts } from '../../actions/posts';
import LoadMore from './LoadMore';
import Post from './Post/Post';

const FeedCategories = (props) => {
  const [postIds, setPostIds] = useState([]);
  const [metadata, setMetadata] = useState({ page: 1, perPage: 20 });
  const [loading, setLoading] = useState(true);

  const fetchPosts = async (params) => {
    loader.start();
    setLoading(true);

    try {
      const data = await api.getPosts(params);
      props.addPosts(data.data);
      setMetadata(data.metadata);
      setPostIds(postIds.concat(data.data.map(i => i.id)));
    } catch (e) {
      console.error(e);
    }

    loader.done();
    setLoading(false);
  };

  useEffect(() => {
    fetchPosts({
      page: metadata.page,
      perPage: metadata.perPage,
    });
  }, []);

  if (!postIds.length) {
    return null;
  }

  return (
    <div className="feed">
      <div className="feed__list">
        {postIds.map(id => (
          <div className="feed__item" key={id}>
            <Post id={id} />
          </div>
        ))}
      </div>
      {metadata.hasMore &&
        <div className="feed__loadmore">
          <LoadMore
            disabled={loading}
            onClick={() => {
              if (loading) return;

              fetchPosts({
                page: metadata.page + 1,
                perPage: metadata.perPage,
              });
            }}
          />
        </div>
      }
    </div>
  );
};

export default connect(
  null,
  dispatch => bindActionCreators({
    addPosts,
  }, dispatch),
)(FeedCategories);
