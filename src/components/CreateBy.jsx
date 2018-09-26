import { connect } from 'react-redux';
import React from 'react';
import Avatar from './Avatar';
import OrganizationsDropdown from './OrganizationsDropdown';
import { getFileUrl } from '../utils/upload';
import { getUserName } from '../utils/user';
import { selectUser } from '../store/selectors';
import { setPostData } from '../actions';

const CreateBy = (props) => {
  const organization = props.user.organizations
    .find(i => i.id === props.post.data.organization_id);

  return (
    <div className="inline inline_small">
      <div className="inline__item">
        <span className="post-form__light">By</span>
      </div>
      <div className="inline__item">
        <Avatar size="xsmall" src={getFileUrl(organization ? organization.avatarFilename : props.user.avatarFilename)} />
      </div>
      <div className="inline__item">
        <div className="title title_xsmall title_light">{organization ? organization.title : getUserName(props.user)}</div>
      </div>
      <div className="inline__item">
        <OrganizationsDropdown
          onSelect={(organization_id) => {
            props.setPostData({ organization_id });
          }}
        />
      </div>
    </div>
  );
};

export default connect(
  state => ({
    user: selectUser(state),
    post: state.post,
  }),
  dispatch => ({
    setPostData: data => dispatch(setPostData(data)),
  }),
)(CreateBy);
