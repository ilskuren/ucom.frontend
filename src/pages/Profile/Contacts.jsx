import { connect } from 'react-redux';
import React, { PureComponent } from 'react';
import classNames from 'classnames';
import Button from '../../components/Button';
import TextInput from '../../components/TextInput';
import InfoBlock from '../../components/InfoBlock';
import VerticalMenu from '../../components/VerticalMenu';
import Loading from '../../components/Loading';
import { setUser } from '../../actions';
import { getToken } from '../../utils/token';
import { patchMyself } from '../../api';

class ProfileContactsPage extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      email: this.props.user.email || '',
      phone_number: this.props.user.phone_number || '',
      personal_website_url: this.props.user.personal_website_url || '',
      loading: false,
    };
  }

  save() {
    const token = getToken();

    const data = {
      email: this.state.email,
      phone_number: this.state.phone_number,
      personal_website_url: this.state.personal_website_url,
    };

    this.setState({ loading: true });

    patchMyself(data, token)
      .then((data) => {
        this.props.setUser(data);
        this.setState({ loading: false });
      });
  }

  render() {
    return (
      <div className="grid grid_profile">
        <div className="grid__item">
          <VerticalMenu
            sections={[{ type: 'personal contacts', percents: '0' }, { type: 'social networks', percents: '0' }]}
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
              <InfoBlock title="Contacts">
                <div className="profile__block">
                  <TextInput
                    label="Email"
                    value={this.state.email}
                    onChange={email => this.setState({ email })}
                  />
                </div>
                <div className={classNames('profile__block', 'profile__block_email')}>
                  <TextInput
                    label="Phone number"
                    value={this.state.phone_number}
                    onChange={phone_number => this.setState({ phone_number })}
                  />
                </div>
                <div className="profile__block">
                  <TextInput
                    label="Your website"
                    value={this.state.personal_website_url}
                    onChange={personal_website_url => this.setState({ personal_website_url })}
                  />
                </div>
              </InfoBlock>
            </div>
            <div className="profile__info-block">
              <InfoBlock title="Social networks">
                <div className="profile__block">
                  <TextInput label="Your facebook" />
                </div>
                <div className="profile__block">
                  <TextInput label="Your Reddit" />
                </div>
                <div className="profile__block">
                  <TextInput label="Your Medium" />
                </div>
                <div className="profile__block">
                  <TextInput label="Your Twitter" />
                </div>
                {/* <div className="profile__block">
                  <Button text="add another" size="small" theme="transparent" />
                </div> */}
              </InfoBlock>
              <div className="profile__block">
                <Button text="FINISH" size="big" theme="red" isStretched />
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default connect(
  state => ({
    user: state.user,
  }),
  dispatch => ({
    setUser: data => dispatch(setUser(data)),
  }),
)(ProfileContactsPage);
