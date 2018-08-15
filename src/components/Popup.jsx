import React, { PureComponent } from 'react';
import ReactDOM from 'react-dom';

class Popup extends PureComponent {
  componentDidMount() {
    this.popup = document.createElement('div');
    this.popup.className = 'popup';
    document.body.appendChild(this.popup);
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
    }, 300);
  }

  renderPopup() {
    const popup = (
      <div
        role="presentation"
        className="popup__inner"
        onClick={(e) => {
          if (e.target === this.container && typeof this.props.onClickClose === 'function') {
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
    );

    ReactDOM.render(popup, this.popup);
  }

  render() {
    return null;
  }
}

export default Popup;
