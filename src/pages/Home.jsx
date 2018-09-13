import humps from 'lodash-humps';
import { connect } from 'react-redux';
import React, { Fragment, PureComponent } from 'react';
import Footer from '../components/Footer';
import PostsGroup from '../components/PostsGroup';
import Feed from '../components/Feed';
import UsersGroup from '../components/UsersGroup';
import Promo from '../components/Promo';
import { getPosts } from '../api';

class HomePage extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      posts: [],
    };
  }

  componentDidMount() {
    this.getData();
  }

  getData() {
    getPosts()
      .then((data) => {
        this.setState({ posts: data.data });
      });
  }

  render() {
    const user = humps(this.props.user);

    return (
      <Fragment>
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

            <PostsGroup posts={humps(this.state.posts)} />
          </div>
        </div>

        <div className="content content_shadows">
          {this.props.user.id ? (
            <div className="content__inner">
              <div className="grid grid_content">
                <div className="grid__item">
                  <Feed userId={this.props.user.id} />
                </div>

                <div className="grid__item">
                  <div className="sidebar">
                    {user.iFollow && user.iFollow.length > 0 && (
                      <div className="sidebar__section">
                        <UsersGroup users={user.iFollow} />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <Promo />
          )}

          <div className="content__inner">
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
