import React, { PureComponent, Fragment } from 'react';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bind } from 'decko';
import classNames from 'classnames';
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

import * as actions from '../../actions/profile';
import * as selectors from '../../utils/selectors/profile';

const mapDispatch = dispatch =>
  bindActionCreators({
    changeInputValue: actions.changeInputValue,
    validateGeneralInfo: actions.validateGeneralInfo,
  }, dispatch);


const mapStateToProps = state => ({
  firstName: selectors.selectFirstName(state),
  lastName: selectors.selectLastName(state),
  nickname: selectors.selectNickname(state),
  about: selectors.selectAbout(state),
  birthday: selectors.selectBirthday(state),
  country: selectors.selectCountry(state),
  city: selectors.selectCity(state),
  address: selectors.selectAddress(state),
  currencyToShow: selectors.selectCurrencyToShow(state),
  avatarFilename: selectors.selectAvatarFilename(state),
  isValid: selectors.selectGeneralInfoValidity(state),
  errors: selectors.selectGeneralInfoErrors(state),
});


class ProfileGeneralInfoPage extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      avatarLoading: false,
    };
  }

  @bind
  makeChangeInputValueHandler(field) {
    return value => this.props.changeInputValue({ field, value });
  }

  @bind
  handleSubmit(e) {
    this.props.validateGeneralInfo();
    const { isValid } = this.props;
    e.preventDefault();
    if (isValid) {
      this.save();
    }
  }

  save() {
    const token = getToken();
    const data = {
      firstName: this.props.firstName,
      lastName: this.props.lastName,
      nickname: this.props.nickname,
      about: this.props.about,
      birthday: this.props.birthday,
      country: this.props.country,
      city: this.props.city,
      address: this.props.address,
      currencyToShow: this.props.currencyToShow,
      avatarFilename: this.props.avatarFilename,
    };

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

    data.append('avatarFilename', file);

    patchMyselfFormData(data, getToken())
      .then((data) => {
        this.props.setUser(data);
        this.setState({ avatarLoading: false });
      });
  }

  render() {
    const { errors } = this.props;
    return (
      <Fragment>
        <div className="grid grid_profile">
          <div className="grid__item">
            <VerticalMenu
              sections={[{ type: 'personal info', percents: '25' }, { type: 'location', percents: '0' }]}
            />
          </div>
          <div className="grid__item">
            <form
              className="person-form"
              onSubmit={this.handleSubmit}
            >
              <Loading loading={this.state.loading} className="loading_block" />

              <div className="profile__info-block">
                <InfoBlock title="Personal info">
                  <div className="profile__text-block">
                    Userpic Preview
                  </div>
                  <div className="profile__block profile__block_avatar">
                    <Avatar
                      src={getFileUrl(this.props.avatarFilename)}
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
                      value={this.props.firstName}
                      onChange={this.makeChangeInputValueHandler('firstName')}
                      error={errors.firstName && errors.firstName[0]}
                    />
                  </div>

                  <div className="profile__block">
                    <TextInput
                      label="Second name"
                      value={this.props.lastName}
                      onChange={this.makeChangeInputValueHandler('lastName')}
                      error={errors.lastName && errors.lastName[0]}
                    />
                  </div>

                  <div className="profile__block">
                    <TextInput
                      label="Nickname"
                      placeholder="@nickname"
                      value={this.props.nickname}
                      onChange={this.makeChangeInputValueHandler('nickname')}
                      error={errors.nickname && errors.nickname[0]}
                    />
                  </div>

                  <div className="profile__block">
                    <TextInput
                      label="Asset to show"
                      placeholder="Example Kickcoin"
                      value={this.props.currencyToShow}
                      onChange={this.makeChangeInputValueHandler('currencyToShow')}
                      error={errors.currencyToShow && errors.currencyToShow[0]}
                    />
                  </div>

                  <div className="profile__block">
                    <DateInput
                      label="Birthday"
                      value={this.props.birthday}
                      onChange={this.makeChangeInputValueHandler('birthday')}
                    />
                  </div>

                  <div className={classNames('profile__block', 'profile__block_textarea')}>
                    <Textarea
                      rows={6}
                      label="About me"
                      placeholder="Type something..."
                      value={this.props.about}
                      onChange={this.makeChangeInputValueHandler('about')}
                    />
                  </div>
                </InfoBlock>
              </div>

              <div className="profile__info-block">
                <InfoBlock title="Location">
                  <div className="profile__block">
                    <TextInput
                      label="Country"
                      value={this.props.country}
                      onChange={this.makeChangeInputValueHandler('country')}
                      error={errors.country && errors.country[0]}
                    />
                  </div>

                  <div className="profile__block">
                    <TextInput
                      label="City"
                      value={this.props.city}
                      onChange={this.makeChangeInputValueHandler('city')}
                      error={errors.city && errors.city[0]}
                    />
                  </div>

                  <div className="profile__block">
                    <TextInput
                      label="Address"
                      subtext="Actual address. Example: One Apple Park Way, Cupertino"
                      value={this.props.address}
                      onChange={this.makeChangeInputValueHandler('address')}
                      error={errors.address && errors.address[0]}
                    />
                  </div>
                </InfoBlock>

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
  changeInputValue: PropTypes.func,
  validateGeneralInfo: PropTypes.func,
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
  isValid: PropTypes.bool,
  errors: PropTypes.shape({
    firstName: PropTypes.array,
    lastName: PropTypes.array,
    nickname: PropTypes.array,
    about: PropTypes.array,
    birthday: PropTypes.array,
    country: PropTypes.array,
    city: PropTypes.array,
    address: PropTypes.array,
  }),
};

export default connect(mapStateToProps, mapDispatch)(ProfileGeneralInfoPage);
