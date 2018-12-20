import React, { useState, useEffect } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import LayoutBase from '../components/Layout/LayoutBase';
import TagHead from '../components/Tag/TagHead';
import Feed from '../components/Feed/Feed';
import { USER_WALL_FEED_ID } from '../utils/feed';
import api from '../api';
import TagOrganizations from '../components/Tag/TagOrganizations';
import TagUsers from '../components/Tag/TagUsers';
import TagCreatedAt from '../components/Tag/TagCreatedAt';

const Tag = (props) => {
  const tagId = Number(props.match.params.id);
  const userId = 187;
  const [tag, setTag] = useState({});
  const [tagOrgs, setTagOrgs] = useState([]);

  const getTag = async () => {
    try {
      const tag = await api.getTag(props.match.params.id);
      setTag(tag);
      setTagOrgs(tag.orgs.data);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    if (tagId) {
      getTag(tagId);
    }
  }, [tagId]);

  return (
    <LayoutBase>
      <div className="content content_sheet">
        <div className="content__inner content__inner_straight">
          <TagHead
            title={tag.title}
            currentRate={tag.currentRate}
            postsAmount={tag.posts && tag.posts.metadata && tag.posts.metadata.totalAmount}
          />

          <div className="grid grid_user">
            <div className="grid__item">
              <Feed userId={userId} feedTypeId={USER_WALL_FEED_ID} />
            </div>

            <div className="grid__item">
              <TagOrganizations
                orgs={tagOrgs}
                orgsAmount={tag.orgs && tag.orgs.metadata && tag.orgs.metadata.totalAmount}
              />
              <TagUsers
                users={tag.users}
              />
              <TagCreatedAt createdAt={tag.createdAt} />
            </div>
          </div>
        </div>
      </div>
    </LayoutBase>
  );
};

export default connect(
  state => ({
    posts: state.posts,
  }),
  dispatch => bindActionCreators({
  }, dispatch),
)(Tag);
