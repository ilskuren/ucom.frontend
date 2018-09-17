import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { bind } from 'decko';
import cn from 'classnames';
import Input from './TextInput';
import Button from './Button';
import Tooltip from './Tooltip';

class Status extends PureComponent {
  constructor() {
    super();
    this.state = {
      isOpened: false,
    };
  }

  @bind
  toggleForm() {
    this.setState({
      isOpened: !this.state.isOpened,
    });
  }

  render() {
    return (
      <div className={cn('status', { status_open: Boolean(this.state.isOpened) })}>
        <div className="status__text" role="presentation" onClick={this.toggleForm}>
          {this.props.text}
        </div>
        {this.props.isEditable && (
          <div className="status__tooltip-wrapper">
            {this.state.isOpened && (
              <Tooltip className="tooltip_arrow_none">
                <form className="status__form">
                  <Input
                    className="text-input_transparent"
                    placeholder="change status"
                    value={this.props.text}
                    onChange={this.props.onChange}
                  />
                  <div className="status__control">
                    <div className="status__button">
                      <Button text="Cancel" size="small" onClick={this.toggleForm} />
                    </div>
                    <div className="status__button">
                      <Button text="Post" size="small" />
                    </div>
                  </div>
                </form>
              </Tooltip>
            )}
          </div>
        )}
      </div>
    );
  }
}

Status.propTypes = {
  text: PropTypes.string,
  isEditable: PropTypes.bool,
  onChange: PropTypes.func,
};

export default Status;
