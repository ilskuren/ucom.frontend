import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import React, { PureComponent } from 'react';
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

export default withRouter(connect(state => ({
  user: selectUser(state),
}))(Header));
