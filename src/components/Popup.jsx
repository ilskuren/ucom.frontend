import { Provider } from 'react-redux';
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Portal from './Portal';
import store from '../store';
import { disableScroll, enableScroll } from '../utils/scroll';

class Popup extends PureComponent {
  componentDidMount() {
    disableScroll();
  }

  componentWillUnmount() {
    enableScroll();
  }

  render() {
    return (
      <Provider store={store}>
        <Portal>
          <div className="popup popup_active" ref={(el) => { this.popup = el; }}>
            <div
              role="presentation"
              ref={(el) => { this.popupInner = el; }}
              className="popup__inner"
              onClick={(e) => {
                if (
                  (e.target === this.container || e.target === this.popupInner) &&
                  typeof this.props.onClickClose === 'function'
                ) {
                  this.props.onClickClose();
                }
              }}
            >
              <div
                className="popup__container"
                ref={(el) => { this.container = el; }}
              >
                {this.props.children}
              </div>
            </div>
          </div>
        </Portal>
      </Provider>
    );
  }
}

Popup.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  onClickClose: PropTypes.func,
};

export default Popup;
