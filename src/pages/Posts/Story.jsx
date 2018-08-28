import { connect } from 'react-redux';
import React, { PureComponent, Fragment } from 'react';
import PostItem from '../../components/PostItem';
// import CommentsStub from '../../components/CommentsStub';
// import poster from './images/poster.png';
import Share from '../../components/Share';
import Rating from '../../components/Rating';
import PostViews from '../../components/PostViews';
import PostHeader from '../../components/PostHeader';
import { getPost, getUser } from '../../api';
import { getFileUrl } from '../../utils/upload';
import { getUserName } from '../../utils/user';

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
        getUser(post.user_id)
          .then((user) => {
            this.setState({
              user,
              post,
              loading: false,
            });
          });
      });
  }

  render() {
    return (
      <Fragment>
        {!this.state.loading && (
          <div className="sheets">
            <div className="sheets__list">
              <div className="sheets__item">
                <PostHeader
                  avatar={getFileUrl(this.state.user.avatar_filename)}
                  name={getUserName(this.state.user)}
                  rating="40 000"
                />
              </div>
            </div>

            <div className="sheets__content sheets__content_posts">
              <div className="posts">
                <div className="posts__content">
                  <div className="posts__title">
                    <PostItem
                      title={this.state.post.title}
                      tag="story"
                      rate={this.state.post.current_rate}
                      size="big"
                      edit={this.props.user.id && this.props.user.id === this.state.post.user_id}
                      editUrl={`/posts/edit/${this.state.post.id}/`}
                    />
                  </div>

                  {this.state.post.leading_text && (
                    <div className="posts__lead-text">{this.state.post.leading_text}</div>
                  )}

                  {this.state.post.main_image_filename && (
                    <div className="posts__poster">
                      <img src={getFileUrl(this.state.post.main_image_filename)} alt="poster" className="posts__poster-img" />
                    </div>
                  )}

                  <div className="posts__text" dangerouslySetInnerHTML={{ __html: this.state.post.description }} />

                  {/* <div className="posts__comments">
                    <CommentsStub />
                  </div> */}
                </div>
                <div className="posts__sidebar">
                  <div className="posts__rating">
                    <Rating rating={this.state.post.current_vote} />
                  </div>
                  <div className="posts__views">
                    <PostViews views={352} />
                  </div>
                  <div className="posts__share">
                    <Share amount="8 923" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </Fragment>
    );
  }
}

export default connect(state => ({
  user: state.user,
}), null)(StoryPage);
