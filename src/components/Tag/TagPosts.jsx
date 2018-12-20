import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import classNames from 'classnames';
import { connect } from 'react-redux';
import React, { PureComponent, Fragment } from 'react';
import Avatar from '../Avatar';
import Popup from '../Popup';
import ModalContent from '../ModalContent';
import UserListPopup from '../User/UserListPopup';
import { getFileUrl } from '../../utils/upload';
import { getUsersByIds } from '../../store/users';
import { selectUser } from '../../store/selectors/user';

class TagPosts extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      popupVisible: false,
    };
  }

  componentWillReceiveProps(prevProps) {
    if (this.props.location !== prevProps.location) {
      this.hidePopup();
    }
  }

  hidePopup() {
    this.setState({ popupVisible: false });
  }

  showPopup() {
    if (this.props.usersIds.length > 0) {
      this.setState({ popupVisible: true });
    }
  }

  render() {
    if (!this.props.usersIds) {
      return null;
    }

    const users = getUsersByIds(this.props.users, this.props.usersIds);

    return (
      <Fragment>
        {this.state.popupVisible && (
          <Popup onClickClose={() => this.hidePopup()}>
            <ModalContent onClickClose={() => this.hidePopup()}>
              <UserListPopup title={this.props.title} usersIds={this.props.usersIds} />
            </ModalContent>
          </Popup>
        )}

        <div className="follwers">
          <div className="follwers__main">
            <div className="follwers__count">
              <button
                onClick={() => this.showPopup()}
                className={classNames(
                  'button-clean',
                  { 'button-clean_link': users.length },
                )}
              >
                {/* users.length */}
                1234
              </button>
            </div>

            <div className="follwers__title">
              <button
                onClick={() => this.showPopup()}
                className={classNames(
                  'button-clean',
                  { 'button-clean_link': users.length },
                )}
              >
                {this.props.title}
              </button>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

TagPosts.propTypes = {
  title: PropTypes.string,
  usersIds: PropTypes.arrayOf(PropTypes.number),
  users: PropTypes.objectOf(PropTypes.object),
};

TagPosts.defaultProps = {
  title: 'Followers',
};

export default withRouter(connect(state => ({
  users: state.users,
  user: selectUser(state),
}))(TagPosts));
