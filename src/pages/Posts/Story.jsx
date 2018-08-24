import React, { PureComponent, Fragment } from 'react';
import PostItem from '../../components/PostItem';
// import CommentsStub from '../../components/CommentsStub';
// import poster from './images/poster.png';
import Share from '../../components/Share';
import Rating from '../../components/Rating';
import PostViews from '../../components/PostViews';
import Loading from '../../components/Loading';
import { getPost } from '../../api';
import { getFileUrl } from '../../utils/upload';

class StoryPage extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      post: {},
    };
  }

  componentDidMount() {
    this.getData();
  }

  getData() {
    this.setState({ loading: true });

    getPost(this.props.match.params.id)
      .then((post) => {
        console.log(post);

        this.setState({
          post,
          loading: false,
        });
      });
  }

  render() {
    return (
      <Fragment>
        <Loading loading={this.state.loading} appear />

        {!this.state.loading && (
          <div className="posts">
            <div className="posts__content">
              <div className="posts__title">
                <PostItem
                  title={this.state.post.title}
                  tag="story"
                  rate={9200}
                  size="big"
                  // edit
                />
              </div>
              <div className="posts__lead-text">{this.state.post.leading_text}</div>
              <div className="posts__poster">
                <img src={getFileUrl(this.state.post.main_image_filename)} alt="poster" className="posts__poster-img" />
              </div>

              <div className="posts__text" dangerouslySetInnerHTML={{ __html: this.state.post.description }} />

              {/* <div className="posts__comments">
                <CommentsStub />
              </div> */}
            </div>
            <div className="posts__sidebar">
              <div className="posts__rating">
                <Rating rating={100} />
              </div>
              <div className="posts__views">
                <PostViews views={352} />
              </div>
              <div className="posts__share">
                <Share amount="8 923" />
              </div>
            </div>
          </div>
        )}
      </Fragment>
    );
  }
}

export default StoryPage;
