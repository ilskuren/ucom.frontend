import React, { PureComponent } from 'react';
import Direct from './Direct';
import Repost from './Repost';
import Media from './Media';
import { POST_TYPE_REPOST_ID, POST_TYPE_MEDIA_ID } from '../../../utils/posts';
import { scrollTo } from '../../../utils/scroll';

const POST_TOP_OFFSET = 20;

class Post extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      commentsIsVisible: false,
      sharePopup: false,
      timestamp: (new Date()).getTime(),
    };
  }

  componentDidMount() {
    if (this.props.pinned) {
      this.showOnFeed();
    }
  }

  componentWillReceiveProps(nextProps) {
    if (!this.props.pinned && nextProps.pinned) {
      this.showOnFeed();
    }
  }

  showOnFeed() {
    scrollTo(this.props.el, POST_TOP_OFFSET);
    this.toggleComments();
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
    switch (this.props.postTypeId) {
      case POST_TYPE_REPOST_ID:
        return (
          <Repost
            id={this.props.id}
            pinned={+this.props.pinnedPostId === +this.props.id}
            commentsIsVisible={this.state.commentsIsVisible}
            toggleComments={this.toggleComments}
            sharePopup={this.state.sharePopup}
            toggleShare={this.toggleShare}
            timestamp={this.state.timestamp}
            imageFilename={this.props.main_image_filename}
          />
        );
      case POST_TYPE_MEDIA_ID:
        return (
          <Media
            id={this.props.id}
            pinned={+this.props.pinnedPostId === +this.props.id}
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
            pinned={+this.props.pinnedPostId === +this.props.id}
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

export default Post;
