import { connect } from 'react-redux';
import React, { Fragment, PureComponent } from 'react';
import PostInput from '../components/PostInput';
import Post from '../components/Post';
import UserCard from '../components/UserCard';
import Footer from '../components/Footer';
import PostsGroup from '../components/PostsGroup';
import Loading from '../components/Loading';
import { getUsers, getPosts, getUserPosts } from '../api';
import { getUserUrl, getAvatarUrl } from '../utils/user';

class HomePage extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      users: [],
      posts: [],
      userPosts: [],
      loading: false,
    };
  }

  componentDidMount() {
    this.getData();
  }

  getData() {
    const promises = [
      getUsers(),
      getPosts(),
    ];

    if (this.props.user.id) {
      promises.push(getUserPosts(this.props.user.id));
    }

    this.setState({ loading: true });

    Promise.all(promises)
      .then((result) => {
        this.setState({
          posts: result[1],
          users: result[0],
          userPosts: result[2] || [],
          loading: false,
        });
      });
  }

  render() {
    return (
      <Fragment>
        <Loading loading={this.state.loading} />

        <div className="content">
          <div className="content__inner">
            <div className="page-nav">
              <div className="menu menu_media menu_responsive">
                <div className="menu__item menu__item_active">
                  <a href="#" className="menu__link">Editorial Media</a>
                </div>
                <div className="menu__item">
                  <a href="#" className="menu__link">Community Media</a>
                </div>
                <div className="menu__item">
                  <a href="#" className="menu__link">Organizations Offers</a>
                </div>
                <div className="menu__item">
                  <a href="#" className="menu__link">People Offers</a>
                </div>
              </div>
            </div>

            {this.state.posts.length && (
              <PostsGroup posts={this.state.posts} />
            )}
          </div>
        </div>

        <div className="content content_shadows">
          <div className="content__inner">

            <div className="grid grid_content">
              <div className="grid__item">
                {this.props.user.id && (
                  <div className="feed">
                    <div className="feed__title">
                      <h1 className="title title_small">Ur News Feed</h1>
                    </div>

                    <div className="feed__post-form">
                      <PostInput />
                    </div>

                    <div className="feed__toolbar">
                      <div className="toolbar">
                        <div className="toolbar__main">
                          <div className="menu menu_nav menu_responsive">
                            <div className="menu__item menu__item_active">
                              <button className="menu__link">All</button>
                            </div>
                            <div className="menu__item">
                              <button className="menu__link">Call</button>
                            </div>
                            <div className="menu__item">
                              <button className="menu__link">Poll</button>
                            </div>
                            <div className="menu__item">
                              <button className="menu__link">Appeal</button>
                            </div>
                            <div className="menu__item">
                              <button className="menu__link">Promote</button>
                            </div>
                          </div>
                        </div>

                        <div className="toolbar__side">
                          Sort by
                        </div>
                      </div>
                    </div>

                    <div className="feed__list">
                      {this.state.userPosts.map(post => (
                        <div className="feed__item" key={post.id}>
                          <Post post={post} />
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="grid__item">
                <div className="sidebar">
                  <div className="sidebar__section">
                    <div className="users-group">
                      <h4 className="users-group__title">Organizations</h4>

                      <div className="users-group__list">
                        {[0, 0, 0, 0, 0].map((i, index) => (
                          <div className="users-group__item" key={index}>
                            <UserCard squareAvatar />
                          </div>
                        ))}
                      </div>

                      <div className="users-group__show-more">
                        <a href="#">View All</a>
                      </div>
                    </div>
                  </div>

                  {this.state.users.length > 0 && (
                    <div className="sidebar__section">
                      <div className="users-group">
                        <h4 className="users-group__title">People</h4>

                        <div className="users-group__list">
                          {this.state.users.map(user => (
                            <div className="users-group__item" key={user.id}>
                              <UserCard
                                userName={`${user.first_name} ${user.last_name}`}
                                accountName={user.nickname}
                                profileLink={getUserUrl(user.id)}
                                avatarUrl={getAvatarUrl(user.avatar_filename)}
                              />
                            </div>
                          ))}
                        </div>

                        <div className="users-group__show-more">
                          <a href="#">View All</a>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <Footer />
          </div>
        </div>
      </Fragment>
    );
  }
}

export default connect(state => ({
  user: state.user,
}))(HomePage);
