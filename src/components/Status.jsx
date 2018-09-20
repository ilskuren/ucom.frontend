import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { bind } from 'decko';
import cn from 'classnames';
import Textarea from './Textarea';
import Button from './Button';
import { patchMyself } from '../api';
import { getToken } from '../utils/token';

class Status extends PureComponent {
  constructor() {
    super();
    this.state = {
      isActive: false,
      text: '',
    };
  }

  componentDidMount() {
    this.setInitialText();
  }

  @bind
  onChangeStatus(value) {
    this.setState({ text: value });
  }

  setInitialText() {
    this.setState({ text: this.props.text || '' });
  }

  @bind
  toggleForm() {
    this.setState({ isActive: !this.state.isActive });
  }

  @bind
  cancelSubmit() {
    this.setInitialText();
    this.toggleForm();
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
      <div className={cn('status', { status_open: Boolean(this.state.isActive) })}>
        {this.props.isEditable && this.state.isActive ? (
          <form className="status__form" onSubmit={this.handleSubmit} autoComplete="off">
            <Textarea
              className="textarea_border_none"
              placeholder="Change status"
              name="status"
              onChange={this.onChangeStatus}
              value={this.state.text}
              autoFocus
              rows={6}
            />
            <div className="status__control">
              <div className="status__button">
                <Button text="Cancel" size="small" onClick={this.cancelSubmit} />
              </div>
              <div className="status__button">
                <Button
                  text="Save"
                  type="submit"
                  size="small"
                  theme="red"
                  isDisabled={this.state.text === (this.props.text || '')}
                />
              </div>
            </div>
          </form>
        ) : (
          <div className="status__text inline">
            <div className="inline__item">
              {this.props.text || 'My status or message'}
            </div>
            <div className="edit edit_xsmall inline__item" role="presentation" onClick={this.toggleForm} />
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
