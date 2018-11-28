import { Provider } from 'react-redux';
import classNames from 'classnames';
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Portal from './Portal';
import store from '../store';
import { blockPageContent, unblockPageContent } from '../utils/page';

class Popup extends PureComponent {
  componentDidMount() {
    blockPageContent();
    this.blockAnotherPopups();
  }

  componentWillUnmount() {
    unblockPageContent();
    this.unblockAnotherPopups();
  }

  getAnotherPopups() {
    return Array.from(document.querySelectorAll('.popup'))
      .filter(item => item !== this.el);
  }

  blockAnotherPopups() {
    this.getAnotherPopups()
      .forEach((item) => {
        item.style.top = `-${window.pageYOffset}px`;
        item.classList.add('popup_blocked');
      });
  }

  unblockAnotherPopups() {
    this.getAnotherPopups()
      .forEach((item) => {
        const topOffset = parseInt(item.style.top, 10);

        item.classList.remove('popup_blocked');
        item.style.top = '';
        window.scrollTo(0, Math.abs(topOffset));
      });
  }

  render() {
    return (
      <Provider store={store}>
        <Portal>
          <div
            role="presentation"
            ref={(el) => { this.el = el; }}
            className={classNames(
              'popup',
              { [`popup_${this.props.mod}`]: Boolean(this.props.mod) },
            )}
            onClick={(e) => {
              if (e.target === this.el && typeof this.props.onClickClose === 'function') {
                this.props.onClickClose();
              }
            }}
          >
            {this.props.children}
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
  mod: PropTypes.string,
};

export default Popup;
