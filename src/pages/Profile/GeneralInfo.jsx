import React, { PureComponent, Fragment } from 'react';
import { bindActionCreators } from 'redux';
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
import { setUser } from '../../actions';
import { patchMyself, patchMyselfFormData } from '../../api';
import { getToken } from '../../utils/token';
import { getFileUrl } from '../../utils/upload';

import * as actions from '../../actions/profile';
import * as selectors from '../../utils/selectors/profile';
import generalInfo from '../../store/profile/generalInfo';

const mapDispatch = dispatch =>
  bindActionCreators({
    changeTextInputValue: actions.changeTextInputValue,
  }, dispatch);


const mapStateToProps = state => ({
  firstName: selectors.selectSettingsGeneralInfo(state).data.firstName,
  lastName: selectors.selectSettingsGeneralInfo(state).data.lastName,
  nickname: selectors.selectSettingsGeneralInfo(state).data.nickname,
  about: selectors.selectSettingsGeneralInfo(state).data.about,
  birthday: selectors.selectSettingsGeneralInfo(state).data.birthday,
  country: selectors.selectSettingsGeneralInfo(state).data.country,
  city: selectors.selectSettingsGeneralInfo(state).data.city,
  address: selectors.selectSettingsGeneralInfo(state).data.address,
  currencyToShow: selectors.selectSettingsGeneralInfo(state).data.currencyToShow,
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
  makeChangeTextInputValueHandler(field, value) {
    return
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
              onSubmit={(e) => {
                e.preventDefault();
                this.save();
              }}
            >
              <Loading loading={this.state.loading} className="loading_block" />

              <div className="profile__info-block">
                <InfoBlock title="Personal info">
                  <div className="profile__text-block">
                    Userpic Preview
                  </div>
                  <div className="profile__block profile__block_avatar">
                    <Avatar
                      src={getFileUrl(this.props.user.avatarFilename)}
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
                      onChange={value => this.makeChangeTextInputValueHandler('firstName', value)}
                    />
                  </div>

                  <div className="profile__block">
                    <TextInput
                      label="Second name"
                      value={this.props.lastName}
                      onChange={value => this.makeChangeTextInputValueHandler('lastName', value)}
                    />
                  </div>

                  <div className="profile__block">
                    <TextInput
                      label="Nickname"
                      placeholder="@nickname"
                      value={this.props.nickname}
                      onChange={value => this.makeChangeTextInputValueHandler('nickname', value)}
                    />
                  </div>

                  <div className="profile__block">
                    <TextInput
                      label="Asset to show"
                      placeholder="Example Kickcoin"
                      value={this.props.currencyToShow}
                      onChange={value => this.makeChangeTextInputValueHandler('currencyToShow', value)}
                    />
                  </div>

                  <div className="profile__block">
                    <DateInput
                      label="Birthday"
                      value={this.props.birthday}
                      onChange={birthday => this.setState({ birthday })}
                    />
                  </div>

                  <div className={classNames('profile__block', 'profile__block_textarea')}>
                    <Textarea
                      rows={6}
                      label="About me"
                      placeholder="Type something..."
                      value={this.props.about}
                      onChange={about => this.setState({ about })}
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
                      onChange={value => this.makeChangeTextInputValueHandler('country', value)}
                    />
                  </div>

                  <div className="profile__block">
                    <TextInput
                      label="City"
                      value={this.props.city}
                      onChange={value => this.makeChangeTextInputValueHandler('city', value)}
                    />
                  </div>

                  <div className="profile__block">
                    <TextInput
                      label="Address"
                      subtext="Actual address. Example: One Apple Park Way, Cupertino"
                      value={this.props.address}
                      onChange={value => this.makeChangeTextInputValueHandler('address', value)}
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

// export default connect(
//   state => ({
//     user: state.user,
//   }),
//   dispatch => ({
//     setUser: data => dispatch(setUser(data)),
//   }),
// )(ProfileGeneralInfoPage);

export default connect(mapStateToProps, mapDispatch)(ProfileGeneralInfoPage);
