import { connect } from 'react-redux';
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import TextInput from './TextInput';
import IconClose from './Icons/Close';
import Loading from './Loading';
import dict from '../utils/dict';
import { login } from '../api';
import { setUser } from '../actions';
import { saveToken } from '../utils/token';

class Auth extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      brainkey: '',
      accountName: '',
      loading: false,
      showError: false,
      errors: null,
    };
  }

  getError(fieldName) {
    const { errors } = this.state;

    if (!errors) {
      return null;
    }

    const fieldError = errors.find(error => error.field === fieldName);

    if (!fieldError) {
      return null;
    }

    return fieldError.message;
  }

  login() {
    this.setState({
      errors: null,
      loading: true,
    });

    setTimeout(() => {
      login({
        brainkey: this.state.brainkey,
        accountName: this.state.accountName,
      })
        .then((data) => {
          if (data.errors) {
            this.setState({
              errors: data.errors,
              loading: false,
            });
          }

          if (data.user) {
            this.props.setUser(data.user);
          }

          if (data.token) {
            saveToken(data.token);
          }

          if (typeof this.props.onClickClose === 'function') {
            this.props.onClickClose();
          }
        })
        .catch(() => {
          this.setState({
            loading: false,
            showError: true,
          });
        });
    }, 300);
  }

  render() {
    return (
      <div className="layer layer_auth">
        <Loading loading={this.state.loading} />

        <div className="layer__close">
          <button
            className="button-clean button-clean_close"
            onClick={() => {
              if (typeof this.props.onClickClose === 'function') {
                this.props.onClickClose();
              }
            }}
          >
            <IconClose />
          </button>
        </div>
        <div className="auth">
          <div className="auth__title">
            <h1 className="title">Welcome back!</h1>
          </div>

          {this.state.showError && (
            <div className="auth__error">{dict.ajaxError}</div>
          )}

          <form
            className="auth__form"
            onSubmit={(e) => {
              e.preventDefault();
              this.login();
            }}
          >
            <div className="auth__fields">
              <div className="auth__field">
                <TextInput
                  error={this.getError('account_name')}
                  label="Account name"
                  value={this.state.accountName}
                  disabled={this.state.loading}
                  onChange={accountName => this.setState({ accountName })}
                />
              </div>
              <div className="auth__field">
                <TextInput
                  label="Brainkey"
                  value={this.state.brainkey}
                  disabled={this.state.loading}
                  onChange={brainkey => this.setState({ brainkey })}
                />
              </div>
            </div>
            <div className="auth__action">
              <button
                type="submit"
                className="button button_theme_red button_size_big button_stretched"
                disabled={this.state.loading}
              >
                Log in
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

Auth.propTypes = {
  onClickClose: PropTypes.func,
  setUser: PropTypes.func,
};

export default connect(
  state => ({
    user: state.user,
  }),
  dispatch => ({
    setUser: data => dispatch(setUser(data)),
  }),
)(Auth);
