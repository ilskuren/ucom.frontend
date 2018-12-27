import React, { useEffect } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import LayoutBase from '../components/Layout/LayoutBase';
import TagHead from '../components/Tag/TagHead';
import Feed from '../components/Feed/Feed';
import { TAG_FEED_ID } from '../utils/feed';
import api from '../api';
import TagOrganizations from '../components/Tag/TagOrganizations';
import TagUsers from '../components/Tag/TagUsers';
import TagCreatedAt from '../components/Tag/TagCreatedAt';
import { addUsers } from '../actions/users';
import { addOrganizations } from '../actions/organizations';
import { addTags } from '../actions/tags';

const Tag = (props) => {
  const tagTitle = props.match.params.title;

  const getTag = async () => {
    try {
      const tag = await api.getTag(props.match.params.title);
      props.addTags([tag]);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    if (tagTitle) {
      getTag(tagTitle);
    }
  }, [tagTitle]);

  const tag = props.tags.data[props.match.params.title];

  return (
    <LayoutBase>
      <div className="content content_sheet">
        <div className="content__inner content__inner_straight">
          {tag &&
            <TagHead
              title={tag.title}
              currentRate={tag.currentRate}
              postsAmount={tag.posts.metadata.totalAmount}
              usersAmount={tag.users.metadata.totalAmount}
            />
          }

          <div className="grid grid_user">
            <div className="grid__item">
              {tag &&
                <Feed
                  userId={props.user.data.id}
                  feedTypeId={TAG_FEED_ID}
                  tagTitle={tag.title}
                  lastTagId={tag.posts.data[tag.posts.data.length - 1]}
                />
              }
            </div>

            {tag &&
              <div className="grid__item">
                <TagUsers
                  users={tag.users.data}
                  tagTitle={tagTitle}
                />
                <TagOrganizations
                  orgs={tag.orgs.data}
                  orgsAmount={tag.orgs.metadata.totalAmount}
                  tagTitle={tagTitle}
                />
                <TagCreatedAt createdAt={tag.createdAt} />
              </div>
            }
          </div>
        </div>
      </div>
    </LayoutBase>
  );
};

export default connect(
  state => ({
    posts: state.posts,
    tags: state.tags,
    user: state.user,
  }),
  dispatch => bindActionCreators({
    addUsers,
    addOrganizations,
    addTags,
  }, dispatch),
)(Tag);
