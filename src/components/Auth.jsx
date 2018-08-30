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
import { getError } from '../utils/errors';
import { validateAuth } from '../utils/user';

class Auth extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      brainkey: '',
      account_name: '',
      loading: false,
      showError: false,
      errors: null,
    };
  }

  login() {
    const errors = validateAuth(this.state);

    if (errors.length) {
      this.setState({ errors });
      return;
    }

    this.setState({
      errors: null,
      loading: true,
    });

    setTimeout(() => {
      login({
        brainkey: this.state.brainkey,
        account_name: this.state.account_name,
      })
        .then((data) => {
          if (data.errors) {
            this.setState({
              errors: data.errors,
              loading: false,
            });
            return;
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
        <Loading loading={this.state.loading} className="loading_layer" />

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
            noValidate
            className="auth__form"
            onSubmit={(e) => {
              e.preventDefault();
              this.login();
            }}
          >
            <div className="auth__fields">
              <div className="auth__field">
                <TextInput
                  maxLength="12"
                  error={getError(this.state.errors, 'account_name')}
                  label="Account name"
                  value={this.state.account_name}
                  disabled={this.state.loading}
                  onChange={account_name => this.setState({ account_name })}
                />
              </div>
              <div className="auth__field">
                <TextInput
                  label="Brainkey"
                  value={this.state.brainkey}
                  disabled={this.state.loading}
                  error={getError(this.state.errors, 'brainkey')}
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
