import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import IconRepost from '../Icons/Repost';
import IconCopyLink from '../Icons/CopyLink';

class ShareBlock extends PureComponent {
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
      <div className="share-btn">
        <div className="repost__block">
          <IconRepost className="repost__icon" />
          <span>Repost to my profile</span>
        </div>
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
};

export default ShareBlock;
