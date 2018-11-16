import classNames from 'classnames';
import React, { PureComponent } from 'react';
import CloseIcon from './Icons/Close';
import { blurPage, unblurPage } from '../utils/page';

class ModalContent extends PureComponent {
  componentDidMount() {
    blurPage();
  }

  componentWillUnmount() {
    unblurPage();
  }

  render() {
    return (
      <div
        className={classNames(
          'modal-content',
          { [`modal-content_${this.props.mod}`]: Boolean(this.props.mod) },
        )}
      >
        {this.props.onClickClose &&
          <div
            onClick={this.props.onClickClose}
            className="modal-content__close"
            role="presentation"
          >
            <CloseIcon />
          </div>
        }

        <div className="modal-content__inner">
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default ModalContent;
