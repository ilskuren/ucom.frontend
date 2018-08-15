import React from 'react';
import PropTypes from 'prop-types';
import TextInput from './TextInput';
import IconClose from './Icons/Close';

const Auth = props => (
  <div className="layer layer_auth">
    <div className="layer__close">
      <button
        className="button-clean button-clean_close"
        onClick={() => {
          if (typeof props.onClickClose === 'function') {
            props.onClickClose();
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
      <div className="auth__form">
        <div className="auth__fields">
          <div className="auth__field">
            <TextInput label="Account name" />
          </div>
          <div className="auth__field">
            <TextInput label="Brainkey" />
          </div>
        </div>
        <div className="auth__action">
          <button className="button button_size_small button_theme_red">Log in</button>
        </div>
      </div>
    </div>
  </div>
);

Auth.propTypes = {
  onClickClose: PropTypes.func,
};

export default Auth;
