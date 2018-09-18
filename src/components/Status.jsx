import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { bind } from 'decko';
import cn from 'classnames';
import Input from './TextInput';
import Button from './Button';
import Tooltip from './Tooltip';
import { patchMyself } from '../api';
import { getToken } from '../utils/token';

class Status extends PureComponent {
  constructor() {
    super();
    this.state = {
      isOpened: false,
      text: '',
    };
  }

  componentDidMount() {
    this.setState({ text: this.props.text || '' });  //eslint-disable-line
  }

  @bind
  onChangeStatus(value) {
    this.setState({ text: value });
  }

  @bind
  toggleForm() {
    this.setState({ isOpened: !this.state.isOpened });
  }


  @bind
  handleSubmit(e) {
    e.preventDefault();
    const { target: { status: { value } } } = e;
    Promise.resolve()
      .then(() => {
        const token = getToken();
        return patchMyself({ mood_message: value }, token);
      })
      .then((data) => {
        this.props.setUser(data);
        this.toggleForm();
      })
      .catch(err => console.error(err.message));
  }

  render() {
    return (
      <div className={cn('status', { status_open: Boolean(this.state.isOpened) })}>
        <div className="status__text" role="presentation" onClick={this.toggleForm}>
          {this.props.text || 'My status or message'}
        </div>
        {this.props.isEditable && (
          <div className="status__tooltip-wrapper">
            {this.state.isOpened && (
              <Tooltip className="tooltip_arrow_none">
                <form className="status__form" onSubmit={this.handleSubmit} autoComplete="off">
                  <Input
                    className="text-input_transparent"
                    placeholder="change status"
                    name="status"
                    onChange={this.onChangeStatus}
                    value={this.state.text}
                    autoFocus
                  />
                  <div className="status__control">
                    <div className="status__button">
                      <Button text="Cancel" size="small" onClick={this.toggleForm} />
                    </div>
                    <div className="status__button">
                      <Button
                        text="Post"
                        type="submit"
                        size="small"
                        theme="red"
                        isDisabled={this.state.text === (this.props.text || '')}
                      />
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
  setUser: PropTypes.func,
};

export default Status;
