import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import IconRepost from '../Icons/Repost';
import IconCopyLink from '../Icons/CopyLink';
import { addRepost } from '../../actions/posts';
import { selectUser } from '../../store/selectors/user';

class ShareBlock extends PureComponent {
  constructor(props) {
    super(props);

    this.onClick = (e) => {
      if (!this.el.contains(e.target)) {
        this.props.onClickClose();
      }
    };
  }

  componentDidMount() {
    document.addEventListener('click', this.onClick);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.onClick);
  }

  copyToClipboard = () => {
    const link = document.createElement('textarea');
    link.innerText = window.location.origin + this.props.link;
    document.body.appendChild(link);
    link.select();
    document.execCommand('copy');
    link.remove();
  };

  render() {
    return (
      <div className="share-btn" ref={(el) => { this.el = el; }}>
        {this.props.postTypeId !== 11 &&
          <div
            className="repost__block"
            role="presentation"
            onClick={() => {
              this.props.addRepost(this.props.postId);
              this.props.onClickClose();
            }}
          >
            <IconRepost className="repost__icon" />
            <span>Repost to my profile</span>
          </div>
        }
        <div className="copylink__block">
          <span>Copy link</span>
          <div className="copylink">
            <a target="_blank" rel="noopener noreferrer" href={this.props.link} className="copylink__link">{window.location.origin + this.props.link}</a>
            <IconCopyLink onClick={this.copyToClipboard()} />
          </div>
        </div>
      </div>
    );
  }
}

ShareBlock.propTypes = {
  link: PropTypes.string,
  addRepost: PropTypes.func,
  onClickClose: PropTypes.func,
  postTypeId: PropTypes.number,
  postId: PropTypes.number,
};

export default connect(
  state => ({
    user: selectUser(state),
  }),
  dispatch => bindActionCreators({
    selectUser,
    addRepost,
  }, dispatch),
)(ShareBlock);
