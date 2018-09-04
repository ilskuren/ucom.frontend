import { Provider } from 'react-redux';
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';

import store from '../store';

class Popup extends PureComponent {
  componentDidMount() {
    this.popup = document.createElement('div');
    this.popup.className = 'popup';
    document.body.appendChild(this.popup);
    document.body.classList.add('no-scroll');
    this.renderPopup();

    setTimeout(() => this.popup.classList.add('popup_active'), 0);
  }

  componentDidUpdate() {
    this.renderPopup();
  }

  componentWillUnmount() {
    this.popup.classList.remove('popup_active');

    setTimeout(() => {
      ReactDOM.unmountComponentAtNode(this.popup);
      document.body.removeChild(this.popup);
      document.body.classList.remove('no-scroll');
    }, 300);
  }

  renderPopup() {
    const popup = (
      <Provider store={store}>
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
      </Provider>
    );

    ReactDOM.render(popup, this.popup);
  }

  render() {
    return null;
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
