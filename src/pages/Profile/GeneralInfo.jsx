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
import { scrollAnimation } from '../../utils/constants';

import { selectUser } from '../../utils/selectors/user';
import * as actions from '../../actions/profile';

const mapDispatch = dispatch =>
  bindActionCreators({
    changeInputValue: actions.changeInputValue,
    validateGeneralInfo: actions.validateGeneralInfo,
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
    const { user } = this.props;
    const data = {
      firstName: user.firstName,
      lastName: user.lastName,
      nickname: user.nickname,
      about: user.about,
      birthday: user.birthday,
      country: user.country,
      city: user.city,
      address: user.address,
      currencyToShow: user.currencyToShow,
      avatarFilename: user.avatarFileName,
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
    const { errors, user } = this.props;
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
                        src={getFileUrl(user.avatarFileName)}
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
                        onChange={this.makeChangeInputValueHandler('firstName')}
                        error={errors.firstName && errors.firstName[0]}
                      />
                    </div>

                    <div className="profile__block">
                      <TextInput
                        label="Second name"
                        value={user.lastName}
                        onChange={this.makeChangeInputValueHandler('lastName')}
                        error={errors.lastName && errors.lastName[0]}
                      />
                    </div>

                    <div className="profile__block">
                      <TextInput
                        label="Nickname"
                        placeholder="@nickname"
                        value={user.nickName}
                        onChange={this.makeChangeInputValueHandler('nickname')}
                        error={errors.nickname && errors.nickname[0]}
                      />
                    </div>

                    <div className="profile__block">
                      <TextInput
                        label="Asset to show"
                        placeholder="Example Kickcoin"
                        value={user.currencyToShow}
                        onChange={this.makeChangeInputValueHandler('currencyToShow')}
                        error={errors.currencyToShow && errors.currencyToShow[0]}
                      />
                    </div>

                    <div className="profile__block">
                      <DateInput
                        label="Birthday"
                        value={user.birthday}
                        onChange={this.makeChangeInputValueHandler('birthday')}
                      />
                    </div>

                    <div className={classNames('profile__block', 'profile__block_textarea')}>
                      <Textarea
                        rows={6}
                        label="About me"
                        placeholder="Type something..."
                        value={user.about}
                        onChange={this.makeChangeInputValueHandler('about')}
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
                        onChange={this.makeChangeInputValueHandler('country')}
                        error={errors.country && errors.country[0]}
                      />
                    </div>

                    <div className="profile__block">
                      <TextInput
                        label="City"
                        value={user.city}
                        onChange={this.makeChangeInputValueHandler('city')}
                        error={errors.city && errors.city[0]}
                      />
                    </div>

                    <div className="profile__block">
                      <TextInput
                        label="Address"
                        subtext="Actual address. Example: One Apple Park Way, Cupertino"
                        value={user.address}
                        onChange={this.makeChangeInputValueHandler('address')}
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
  changeInputValue: PropTypes.func,
  validateGeneralInfo: PropTypes.func,
  user: PropTypes.shape({
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    nickname: PropTypes.string,
    about: PropTypes.string,
    birthday: PropTypes.string,
    country: PropTypes.string,
    city: PropTypes.string,
    address: PropTypes.string,
    currencyToShow: PropTypes.string,
    avatarFileName: PropTypes.string,
  }),
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
