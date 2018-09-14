import React, { PureComponent, Fragment } from 'react';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bind } from 'decko';
import classNames from 'classnames';
import { scroller, Element } from 'react-scroll';
import Button from '../../components/Button';
import TextInput from '../../components/TextInput';
import InfoBlock from '../../components/InfoBlock';
import VerticalMenu from '../../components/VerticalMenu';
import DropZone from '../../components/DropZone';
import Avatar from '../../components/Avatar';
import Textarea from '../../components/Textarea';
import DateInput from '../../components/DateInput';
import Loading from '../../components/Loading';
import { patchMyself, patchMyselfFormData } from '../../api';
import { getToken } from '../../utils/token';
import { getFileUrl } from '../../utils/upload';
import { convertServerUser, convertClientUser } from '../../api/convertors';
import { scrollAnimation } from '../../utils/constants';

import { selectUser } from '../../utils/selectors/user';
import * as actions from '../../actions';

const mapDispatch = dispatch =>
  bindActionCreators({
    changeUserField: actions.changeUserField,
    clearErrors: actions.clearErrors,
    setUser: actions.setUser,
    validateProfileForm: actions.validateProfileForm,
    saveUser: actions.saveUser,
  }, dispatch);

const mapStateToProps = state => ({
  user: selectUser(state),
});

class ProfileGeneralInfoPage extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      avatarLoading: false,
    };
  }

  componentWillUnmount() {
    this.props.clearErrors();
  }

  @bind
  makeChangeUserFieldHandler(field) {
    return value => this.props.changeUserField({ field, value, validationRules: 'generalInfoRules' });
  }

  @bind
  handleSubmit(e) {
    const { saveUser } = this.props;
    e.preventDefault();
    saveUser({ fieldName: 'firstName', value: 'test' });
    // Promise.resolve()
    //   .then(this.props.validateProfileForm('generalInfoRules'))
    //   .then(() => {
    //     const { isValid } = this.props.user;
    //     if (isValid) {
    //       this.save();
    //     }
    //   })
    //   .catch(err => console.error(err));
  }

  @bind
  save() {
    const token = getToken();
    const { user } = this.props;
    const data = convertClientUser(user);

    this.setState({ loading: true });

    patchMyself(data, token)
      .then((data) => {
        this.props.setUser(data);
        this.setState({ loading: false });
      });
  }

  uploadAvatar(file) {
    this.setState({ avatarLoading: true });

    const data = new FormData();

    data.append('avatar_filename', file);

    patchMyselfFormData(data, getToken())
      .then((data) => {
        const convertedData = convertServerUser(data);
        this.props.setUser(convertedData);
        this.setState({ avatarLoading: false });
      });
  }

  render() {
    const { user } = this.props;
    const { errors } = user;
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
              <Loading loading={this.state.loading} className="loading_block" />

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
                          loading={this.state.avatarLoading}
                        />

                        <div className="profile__text-block">
                          You can upload an image in JPG or PNG format.
                          Size is not more than 10 mb.
                        </div>
                      </div>
                    </div>

                    <div className="profile__block">
                      <TextInput
                        label="First name"
                        value={user.firstName}
                        onChange={this.makeChangeUserFieldHandler('firstName')}
                        error={errors.firstName && errors.firstName[0]}
                      />
                    </div>

                    <div className="profile__block">
                      <TextInput
                        label="Second name"
                        value={user.lastName}
                        onChange={this.makeChangeUserFieldHandler('lastName')}
                        error={errors.lastName && errors.lastName[0]}
                      />
                    </div>

                    <div className="profile__block">
                      <TextInput
                        label="Nickname"
                        placeholder="@nickname"
                        value={user.nickName}
                        onChange={this.makeChangeUserFieldHandler('nickName')}
                        error={errors.nickName && errors.nickName[0]}
                      />
                    </div>

                    <div className="profile__block">
                      <TextInput
                        label="Asset to show"
                        placeholder="Example Kickcoin"
                        value={user.currencyToShow}
                        onChange={this.makeChangeUserFieldHandler('currencyToShow')}
                        error={errors.currencyToShow && errors.currencyToShow[0]}
                      />
                    </div>

                    <div className="profile__block">
                      <DateInput
                        label="Birthday"
                        value={user.birthday}
                        onChange={this.makeChangeUserFieldHandler('birthday')}
                      />
                    </div>

                    <div className={classNames('profile__block', 'profile__block_textarea')}>
                      <Textarea
                        rows={6}
                        label="About me"
                        placeholder="Type something..."
                        value={user.about}
                        onChange={this.makeChangeUserFieldHandler('about')}
                      />
                    </div>
                  </InfoBlock>
                </Element>
              </div>

              <div className="profile__info-block">
                <Element name="Location">
                  <InfoBlock title="Location">
                    <div className="profile__block">
                      <TextInput
                        label="Country"
                        value={user.country}
                        onChange={this.makeChangeUserFieldHandler('country')}
                        error={errors.country && errors.country[0]}
                      />
                    </div>

                    <div className="profile__block">
                      <TextInput
                        label="City"
                        value={user.city}
                        onChange={this.makeChangeUserFieldHandler('city')}
                        error={errors.city && errors.city[0]}
                      />
                    </div>

                    <div className="profile__block">
                      <TextInput
                        label="Address"
                        subtext="Actual address. Example: One Apple Park Way, Cupertino"
                        value={user.address}
                        onChange={this.makeChangeUserFieldHandler('address')}
                        error={errors.address && errors.address[0]}
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
  changeUserField: PropTypes.func,
  validateProfileForm: PropTypes.func,
  clearErrors: PropTypes.func,
  saveUser: PropTypes.func,
  user: PropTypes.shape({
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    nickName: PropTypes.string,
    about: PropTypes.string,
    birthday: PropTypes.string,
    country: PropTypes.string,
    city: PropTypes.string,
    address: PropTypes.string,
    currencyToShow: PropTypes.string,
    avatarFilename: PropTypes.string,
  }),
};

export default connect(mapStateToProps, mapDispatch)(ProfileGeneralInfoPage);
