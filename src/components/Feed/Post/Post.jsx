import { connect } from 'react-redux';
import React, { PureComponent } from 'react';
import Direct from './Direct';
import Repost from './Repost';
import Media from './Media';
import { POST_TYPE_REPOST_ID, POST_TYPE_MEDIA_ID } from '../../../utils/posts';
import { getPostById } from '../../../store/posts';

class Post extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      commentsIsVisible: false,
      sharePopup: false,
      timestamp: (new Date()).getTime(),
    };
  }

  toggleComments = () => {
    this.setState({
      timestamp: (new Date()).getTime(),
      commentsIsVisible: !this.state.commentsIsVisible,
    });
  };

  toggleShare = () => {
    this.setState({ sharePopup: !this.state.sharePopup });
  };

  render() {
    const post = getPostById(this.props.posts, this.props.id);


    if (!post) {
      return null;
    }

    switch (post.postTypeId) {
      case POST_TYPE_REPOST_ID:
        return (
          <Repost
            id={this.props.id}
            commentsIsVisible={this.state.commentsIsVisible}
            toggleComments={this.toggleComments}
            sharePopup={this.state.sharePopup}
            toggleShare={this.toggleShare}
            timestamp={this.state.timestamp}
          />
        );
      case POST_TYPE_MEDIA_ID:
        return (
          <Media
            id={this.props.id}
            commentsIsVisible={this.state.commentsIsVisible}
            toggleComments={this.toggleComments}
            sharePopup={this.state.sharePopup}
            toggleShare={this.toggleShare}
            timestamp={this.state.timestamp}
          />
        );
      default:
        return (
          <Direct
            id={this.props.id}
            commentsIsVisible={this.state.commentsIsVisible}
            toggleComments={this.toggleComments}
            sharePopup={this.state.sharePopup}
            toggleShare={this.toggleShare}
            timestamp={this.state.timestamp}
          />
        );
    }
  }
}

export default connect(state => ({
  posts: state.posts,
}))(Post);
