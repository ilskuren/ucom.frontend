import { connect } from 'react-redux';
import React, { PureComponent } from 'react';
import CommentForm from './CommentForm';
import Avatar from './Avatar';
import { getFileUrl } from '../utils/upload';

class Comments extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      active: false,
    };
  }

  showForm() {
    this.setState({ active: true });
  }

  hideForm() {
    this.setState({ active: false });
  }

  render() {
    return (
      <div className="comment">
        <div className="toolbar toolbar_top">
          <div className="toolbar__main">
            <Avatar size="xsmall" src={getFileUrl(this.props.user.avatar_filename)} />
          </div>
          <div className="toolbar__side">
            <div className="comment__username">Ben Broud</div>
            <div className="comment__account">@deckbuilder</div>
            <div className="comment__text">Robinhood is in a great position to eat into Coinbase and other exchange's market share for a more mainstream.</div>
            <div className="comment__actions">
              <div className="inline">
                <div className="inline__item">
                  <button
                    className="button-clean button-clean_link"
                    onClick={() => this.showForm()}
                  >
                    <div className="comment__reply">Reply</div>
                  </button>
                </div>
                <div className="inline__item">
                  <span className="comment__time">10 min ago</span>
                </div>
              </div>
            </div>
            {this.state.active && (
              <div className="comment__form">
                <CommentForm
                  active
                  onReset={() => this.hideForm()}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default connect(state => ({
  user: state.user,
}))(Comments);
