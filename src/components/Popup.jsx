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
  }

  componentWillUnmount() {
    unblockPageContent();
  }

  render() {
    return (
      <Provider store={store}>
        <Portal>
          <div
            role="presentation"
            ref={(el) => { this.popup = el; }}
            className={classNames(
              'popup',
              { [`popup_${this.props.mod}`]: Boolean(this.props.mod) },
            )}
            onClick={(e) => {
              if (e.target === this.popup && typeof this.props.onClickClose === 'function') {
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
