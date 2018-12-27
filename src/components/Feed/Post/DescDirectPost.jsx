import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { sanitizeCommentText, checkHashTag, escapeQuotes } from '../../../utils/text';

class DescDirectPost extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isHidden: true,
      textBtn: ' more',
    };
  }

  toggleHidden = () => {
    this.setState({
      isHidden: !this.state.isHidden,
      textBtn: this.state.isHidden ? ' less' : ' more',
    });
  }

  resctrictText = (text) => {
    const count = text.substring(0, 100).lastIndexOf(' ');
    return text.substring(0, count);
  }


  render() {
    let text = escapeQuotes(this.props.desc);
    text = checkHashTag(this.props.desc);
    return (
      <div>
        {text.length >= 100 ? (
          <div>
            {this.state.isHidden ? (
              <span>{this.resctrictText(text)}</span>
            ) : (
              <span>{text}</span>
            )}
            <span
              role="presentation"
              onClick={this.toggleHidden}
              className="post__btn_more"
            >
              {this.state.textBtn}
            </span>
          </div>
        ) : (
          <span dangerouslySetInnerHTML={{ __html: sanitizeCommentText(text) }} />
        )}
      </div>
    );
  }
}

DescDirectPost.propTypes = {
  desc: PropTypes.string,
};

export default DescDirectPost;
