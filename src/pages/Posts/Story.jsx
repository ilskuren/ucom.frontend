import { connect } from 'react-redux';
import React, { PureComponent, Fragment } from 'react';
// import CommentsStub from '../../components/CommentsStub';
// import poster from './images/poster.png';
import Share from '../../components/Share';
import Rating from '../../components/Rating';
import PostViews from '../../components/PostViews';
import PostHeader from '../../components/PostHeader';
import Tags from '../../components/Tags';
import Rate from '../../components/Rate';
import { getPost, getUser } from '../../api';
import { getFileUrl } from '../../utils/upload';
import { getUserName, getUserUrl } from '../../utils/user';

class StoryPage extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      post: {},
      user: {},
    };
  }

  componentDidMount() {
    this.getData();
  }

  getData() {
    getPost(this.props.match.params.id)
      .then((post) => {
        getUser(post.user_id)
          .then((user) => {
            this.setState({
              user,
              post,
            });
          });
      });
  }

  render() {
    return (
      <div className="sheets">
        <div className="sheets__list">
          <div className="sheets__item">
            <PostHeader
              avatar={getFileUrl(this.state.user.avatar_filename)}
              name={getUserName(this.state.user)}
              rating={this.state.user.current_rate}
              userId={this.state.user.id}
              userUrl={getUserUrl(this.state.user.id)}
            />
          </div>
        </div>

        <div className="sheets__content sheets__content_posts">
          <div className="posts">
            <div className="grid grid_post">
              <div className="grid__item">
                <div className="posts__header">
                  <div className="toolbar toolbar_top toolbar_responsive-reverse">
                    <div className="toolbar__main">
                      <div className="posts__tags">
                        <Tags tags={this.state.post.id ? ['story'] : null} />
                      </div>

                      <h1 className="title title_medium">
                        {this.state.post.title || (
                          <span className="blank">Lorem ipsum dolor sit amet.</span>
                        )}
                      </h1>
                    </div>
                    <div className="toolbar__side">
                      <Rate
                        className="rate_medium"
                        value={this.state.post.current_rate}
                      />
                    </div>
                  </div>
                </div>

                {!this.state.post.id ? (
                  <div className="posts__lead-text">
                    <span className="blank">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Excepturi, laboriosam!</span>
                  </div>
                ) : (
                  <Fragment>
                    {this.state.post.leading_text && (
                      <div className="posts__lead-text">
                        {this.state.post.leading_text || (
                          <span className="blank">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Excepturi, laboriosam!</span>
                        )}
                      </div>
                    )}
                  </Fragment>
                )}

                {!this.state.post.id ? (
                  <div className="posts__poster">
                    <div className="posts__poster-img posts__poster-img_blank" />
                  </div>
                ) : (
                  <Fragment>
                    {this.state.post.main_image_filename && (
                      <div className="posts__poster">
                        <img src={getFileUrl(this.state.post.main_image_filename)} alt="poster" className="posts__poster-img" />
                      </div>
                    )}
                  </Fragment>
                )}

                {this.state.post.id && (
                  <div className="posts__text" dangerouslySetInnerHTML={{ __html: this.state.post.description }} />
                )}

                {/* <div className="posts__comments">
                  <CommentsStub />
                </div> */}
              </div>

              <div className="grid__item">
                {this.state.post.id && (
                  <div className="posts__sidebar">
                    <div className="posts__rating">
                      <Rating
                        rating={this.state.post.current_vote}
                        postId={this.state.post.id}
                        choice={this.state.post.myselfData && this.state.post.myselfData.myselfVote}
                      />
                    </div>

                    <div className="posts__views">
                      <PostViews views={352} />
                    </div>

                    <div className="posts__share">
                      <Share amount="8 923" />
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* <div className="posts__content">
            </div>

            <div className="posts__sidebar">
            </div> */}
          </div>
        </div>
      </div>
    );
  }
}

export default connect(state => ({
  user: state.user,
}), null)(StoryPage);
