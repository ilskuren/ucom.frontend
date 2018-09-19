import React, { PureComponent, Fragment } from 'react';
import { bindActionCreators } from 'redux';
import { reduxForm } from 'redux-form';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bind } from 'decko';
import classNames from 'classnames';
import { scroller, Element } from 'react-scroll';

import { selectUser, selectUserGeneralInfo, selectUserLoading, selectUserAvatarLoading } from 'utils/selectors/user';
import { validate } from 'utils/validators/pages/profile/generalInfo';

import { scrollAnimation } from 'utils/constants';

import Button from '../../components/Button';
import InfoBlock from '../../components/InfoBlock';
import VerticalMenu from '../../components/VerticalMenu';
import DropZone from '../../components/DropZone';
import Avatar from '../../components/Avatar';
import Loading from '../../components/Loading';
import { getFileUrl } from '../../utils/upload';
import TextInputField from '../../components/Field/TextInputField';
import TextAreaField from '../../components/Field/TextAreaField';
import DateInputField from '../../components/Field/DateInputField';

import * as actions from '../../actions';

const mapDispatch = dispatch =>
  bindActionCreators({
    uploadUserAvatar: actions.uploadUserAvatar,
    editUserGeneralInfo: actions.editUserGeneralInfo,
    // setLoading: actions.setLoading,
  }, dispatch);

const mapStateToProps = state => ({
  user: selectUser(state),
  userGeneralInfo: selectUserGeneralInfo(state),
  loading: selectUserLoading(state),
  avatarLoading: selectUserAvatarLoading(state),
});

class ProfileGeneralInfoPage extends PureComponent {
  componentDidMount() {
    // this.props.setLoading(false);
    const { initialize, userGeneralInfo } = this.props;
    initialize(userGeneralInfo);
  }

  componentDidUpdate() {
    const { submitSucceeded, history } = this.props;
    if (submitSucceeded) {
      history.push('/profile/work-and-education');
    }
  }

  @bind
  handleSubmit(event) {
    event.preventDefault();
    const { handleSubmit, editUserGeneralInfo } = this.props;
    handleSubmit((profile) => {
      editUserGeneralInfo(profile);
    })(event);
  }

  uploadAvatar(file) {
    const { uploadUserAvatar } = this.props;
    uploadUserAvatar(file);
  }

  render() {
    const { user } = this.props;
    return (
      <Fragment>
        <div className="grid grid_profile">
          <div className="grid__item">
            <VerticalMenu
              sections={[
                { type: 'personal info', percents: '25', onClick: () => scroller.scrollTo('PersonalInfo', scrollAnimation) },
                { type: 'location', percents: '0', onClick: () => scroller.scrollTo('Location', scrollAnimation) },
              ]}
            />
          </div>
          <div className="grid__item">
            <form
              className="person-form"
              onSubmit={this.handleSubmit}
            >
              <Loading loading={this.props.loading} className="loading_block" />

              <div className="profile__info-block">
                <Element name="PersonalInfo">
                  <InfoBlock title="Personal info">
                    <div className="profile__text-block">
                      Userpic Preview
                    </div>
                    <div className="profile__block profile__block_avatar">
                      <Avatar
                        src={getFileUrl(user.avatarFilename)}
                        size="big"
                        alt="Avatar"
                      />

                      <div className="profile__drop-zone">
                        <DropZone
                          text="add or drag img"
                          accept="image/jpeg, image/png"
                          onDrop={files => this.uploadAvatar(files[0])}
                          loading={this.props.avatarLoading}
                        />

                        <div className="profile__text-block">
                          You can upload an image in JPG or PNG format.
                          Size is not more than 10 mb.
                        </div>
                      </div>
                    </div>

                    <div className="profile__block">
                      <TextInputField
                        label="First name"
                        name="firstName"
                      />
                    </div>

                    <div className="profile__block">
                      <TextInputField
                        label="Second name"
                        name="lastName"
                      />
                    </div>

                    <div className="profile__block">
                      <TextInputField
                        label="Nickname"
                        name="nickname"
                        placeholder="@nickname"
                      />
                    </div>

                    <div className="profile__block">
                      <TextInputField
                        label="Asset to show"
                        name="currencyToShow"
                        placeholder="Example Kickcoin"
                      />
                    </div>

                    <div className="profile__block">
                      <DateInputField
                        name="birthday"
                        label="Birthday"
                      />
                    </div>

                    <div className={classNames('profile__block', 'profile__block_textarea')}>
                      <TextAreaField
                        name="about"
                        rows={6}
                        label="About me"
                        placeholder="Type something..."
                      />
                    </div>
                  </InfoBlock>
                </Element>
              </div>

              <div className="profile__info-block">
                <Element name="Location">
                  <InfoBlock title="Location">
                    <div className="profile__block">
                      <TextInputField
                        label="Country"
                        name="country"
                      />
                    </div>

                    <div className="profile__block">
                      <TextInputField
                        label="City"
                        name="city"
                      />
                    </div>

                    <div className="profile__block">
                      <TextInputField
                        label="Address"
                        subtext="Actual address. Example: One Apple Park Way, Cupertino"
                        name="address"
                      />
                    </div>
                  </InfoBlock>
                </Element>
                <div className="profile__block">
                  <Button type="submit" text="PROCEED" theme="red" size="big" isStretched />
                </div>
              </div>
            </form>
          </div>
        </div>
      </Fragment>
    );
  }
}

ProfileGeneralInfoPage.propTypes = {
  initialize: PropTypes.func,
  handleSubmit: PropTypes.func,
  submitSucceeded: PropTypes.bool,
  loading: PropTypes.bool,
  avatarLoading: PropTypes.bool,
  // setLoading: PropTypes.func,
  editUserGeneralInfo: PropTypes.func,
  uploadUserAvatar: PropTypes.func,
  userGeneralInfo: PropTypes.shape({
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    nickname: PropTypes.string,
    about: PropTypes.string,
    birthday: PropTypes.string,
    country: PropTypes.string,
    city: PropTypes.string,
    address: PropTypes.string,
    currencyToShow: PropTypes.string,
    avatarFilename: PropTypes.string,
  }),
};

export default connect(
  mapStateToProps,
  mapDispatch,
)(reduxForm({ form: 'generalInfo', validate, touchOnChange: true })(ProfileGeneralInfoPage));
