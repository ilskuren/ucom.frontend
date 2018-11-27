import { connect } from 'react-redux';
import React from 'react';
import Avatar from './Avatar';
import Button from './Button';
import { getFileUrl } from '../utils/upload';
import { getUserName } from '../utils/user';
import { selectUser } from '../store/selectors';

const PostFromFooter = (props) => {
  const organization = (props.user.organizations || []).find(i =>
    i.id === props.post.data.organization_id);

  return (
    <div className="post-form__footer">
      <div className="post-form__content">
        <div className="toolbar">
          <div className="toolbar__main">
            {/* <a href="#top" className="create-post__back-link">Back to settings ↑</a> */}
          </div>
          <div className="toolbar__side">
            <div className="inline">
              <div className="inline__item">
                <Avatar size="xsmall" src={getFileUrl(organization ? organization.avatarFilename : props.user.avatarFilename)} />
              </div>
              {props.user.id && (
                <span className="inline__item">
                  <span className="create-post__author-name">{organization ? organization.title : getUserName(props.user)}</span>
                </span>
              )}
              <span className="inline__item">
                <Button
                  isStretched
                  isUpper
                  theme="red"
                  size="small"
                  text="Post"
                  isDisabled={props.loading}
                  onClick={() => {
                    if (typeof props.onClickSave === 'function') {
                      props.onClickSave();
                    }
                  }}
                />
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default connect(state => ({
  user: selectUser(state),
  post: state.post,
}))(PostFromFooter);
