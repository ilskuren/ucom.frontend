import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

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
    return (
      <div>
        {this.props.desc.length >= 100 ? (
          <div>
            {this.state.isHidden ? (
              <span>{this.resctrictText(this.props.desc)} </span>
            ) : (
              <span>{this.props.desc} </span>
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
          <span>{this.props.desc}</span>
        )}
      </div>
    );
  }
}

DescDirectPost.propTypes = {
  desc: PropTypes.string,
};

export default DescDirectPost;
