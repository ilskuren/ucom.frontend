import { connect } from 'react-redux';
import React, { PureComponent, Fragment } from 'react';
import Share from '../../components/Share';
import Rating from '../../components/Rating';
import PostViews from '../../components/PostViews';
import Loading from '../../components/Loading';
import PostHeader from '../../components/PostHeader';
import { getUser } from '../../api';
import { getFileUrl } from '../../utils/upload';
import { getUserName } from '../../utils/user';

class OfferPage extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      post: {
        description: 'Content',
      },
    };
  }

  componentDidMount() {
    this.getData();
  }

  getData() {
    getUser(1)
      .then((user) => {
        this.setState({
          user,
          loading: false,
        });
      });
  }

  render() {
    return (
      <Fragment>
        <Loading loading={this.state.loading} appear />

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
                  {this.state.post.description}
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
            </div>
          </div>
        )}
      </Fragment>
    );
  }
}

export default connect(state => ({
  user: state.user,
}), null)(OfferPage);
