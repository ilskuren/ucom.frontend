import classNames from 'classnames';
import React, { PureComponent } from 'react';
import CloseIcon from './Icons/Close';
import { blurPage, unblurPage } from '../utils/page';

class ModalContent extends PureComponent {
  componentDidMount() {
    blurPage();
    this.blurAnotherModals();
  }

  componentWillUnmount() {
    unblurPage();
    this.unblurAnotherModals();
  }

  getAnotherModals() {
    return Array.from(document.querySelectorAll('.modal-content'))
      .filter(item => item !== this.el);
  }

  blurAnotherModals() {
    this.getAnotherModals()
      .forEach(item => item.classList.add('modal-content_blur'));
  }

  unblurAnotherModals() {
    this.getAnotherModals()
      .forEach(item => item.classList.remove('modal-content_blur'));
  }

  render() {
    return (
      <div
        ref={(el) => { this.el = el; }}
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
