import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import MenuTriggerIcon from '../Icons/MenuTrigger';
import { triggerMenuPopup } from '../../actions/menuPopup';

const UserMenuTrigger = props => (
  <div
    role="presentation"
    className={classNames(
      'user-menu-trigger',
      { 'user-menu-trigger_active': props.menuPopupVisibility },
    )}
    onClick={() => props.triggerMenuPopup()}
  >
    <MenuTriggerIcon />
  </div>
);

UserMenuTrigger.propTypes = {
  triggerMenuPopup: PropTypes.func,
  menuPopupVisibility: PropTypes.bool,
};

export default connect(
  state => ({
    menuPopupVisibility: state.menuPopup.menuPopupVisibility,
  }),
  dispatch => bindActionCreators({
    triggerMenuPopup,
  }, dispatch),
)(UserMenuTrigger);
