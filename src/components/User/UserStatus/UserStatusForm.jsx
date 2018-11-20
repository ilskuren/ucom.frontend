import { KEY_ESCAPE, KEY_RETURN } from 'keycode-js';
import React, { PureComponent } from 'react';
import Button from '../../Button';

import { PLACEHOLDER, STATUS_MAX_LENGTH } from './UserStatus';

class UserStatusForm extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      moodMessage: props.moodMessage || '',
    };

    this.hideFormOnClick = (e) => {
      if (!this.el) {
        return;
      }

      if (!this.el.contains(e.target)) {
        this.props.onClickHide();
      }
    };
  }

  componentDidMount() {
    document.addEventListener('click', this.hideFormOnClick);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.hideFormOnClick);
  }

  save() {
    this.props.onClickSave(this.state.moodMessage);
    this.props.onClickHide();
  }

  render() {
    return (
      <div className="status__form" ref={(el) => { this.el = el; }}>
        <textarea
          autoFocus
          rows="2"
          className="status__textarea"
          placeholder={PLACEHOLDER}
          maxLength={STATUS_MAX_LENGTH}
          value={this.state.moodMessage}
          onChange={e => this.setState({ moodMessage: e.target.value })}
          onKeyUp={(e) => {
            if (e.keyCode === KEY_ESCAPE) {
              this.props.onClickHide();
            }

            if (e.keyCode === KEY_RETURN && (e.ctrlKey || e.metaKey)) {
              this.save();
            }
          }}
        />

        <div className="status__actions">
          <Button
            text="Save"
            size="small"
            theme="transparent"
            onClick={() => this.save()}
          />

          <div className="status__counter">
            {this.state.moodMessage.length}/{STATUS_MAX_LENGTH}
          </div>
        </div>
      </div>
    );
  }
}

export default UserStatusForm;
