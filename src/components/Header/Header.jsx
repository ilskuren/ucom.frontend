import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { showAuthPopup } from '../../actions';
import { selectUser } from '../../store/selectors';
import Popup from '../Popup';
import ModalContent from '../ModalContent';
import HeaderSide from './HeaderSide';
import HeaderMain from './HeaderMain';
import CreateEventPopup from '../CreateEventPopup';

class Header extends PureComponent {
  state = {
    createPopupIsVisible: false,
  }

  hideCreatePopup = () => {
    this.setState({ createPopupIsVisible: false });
  }

  showCreatePopup = () => {
    this.setState({ createPopupIsVisible: true });
  }

  render() {
    return (
      <div className="header" id="top">
        <div className="header__inner">
          <HeaderSide />
          <HeaderMain />
        </div>
        {this.state.createPopupIsVisible && (
          <Popup onClickClose={() => this.hideCreatePopup()}>
            <ModalContent onClickClose={() => this.hideCreatePopup()}>
              <CreateEventPopup onClickClose={() => this.hideCreatePopup()} />
            </ModalContent>
          </Popup>
        )}
      </div>
    );
  }
}

Header.propTypes = {
  menuPopupVisibility: PropTypes.bool,
};

export default connect(
  state => ({
    user: selectUser(state),
    menuPopupVisibility: state.menuPopup.menuPopupVisibility,
  }),
  dispatch => bindActionCreators({
    showAuthPopup,
  }, dispatch),
)(Header);
