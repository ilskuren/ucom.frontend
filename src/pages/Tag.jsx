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
import { addUsers } from '../actions/users';
import { addOrganizations } from '../actions/organizations';
import { addTags } from '../actions/tags';

const Tag = (props) => {
  const tagTitle = props.match.params.title;
  const userId = 187;
  const [tag, setTag] = useState([]);
  const [tagOrgs, setTagOrgs] = useState([]);
  const [tagUsers, setTagUsers] = useState([]);

  const getTag = async () => {
    try {
      const tag = await api.getTag(props.match.params.title);
      setTag(tag);
      props.addTags([tag]);
      setTagOrgs(tag.orgs.data);
      setTagUsers(tag.users.data);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    if (tagTitle) {
      getTag(tagTitle);
    }
  }, [tagTitle]);

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
              <TagUsers users={tagUsers} />
              <TagOrganizations
                orgs={tagOrgs}
                orgsAmount={tag.orgs && tag.orgs.metadata && tag.orgs.metadata.totalAmount}
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
    addUsers,
    addOrganizations,
    addTags,
  }, dispatch),
)(Tag);
