import moment from 'moment';
import { Link } from 'react-router-dom';
import React, { PureComponent } from 'react';
import IconComment from './Icons/Comment';
import IconShare from './Icons/Share';
import Rating from './Rating';
import Loading from './Loading';
import UserCard from './UserCard';
import { getFileUrl } from '../utils/upload';
import { getUser } from '../api';
import { getUserName, getUserLink } from '../utils/user';

class Post extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      user: props.user,
    };
  }

  componentDidMount() {
    if (!this.state.user) {
      this.getUser();
    }
  }

  getUser() {
    this.setState({ loading: true });

    getUser(this.props.post.user_id)
      .then((user) => {
        this.setState({
          user,
          loading: false,
        });
      });
  }

  render() {
    return (
      <div className="post">
        <Loading loading={this.state.loading} />

        <div className="post__type">Story</div>

        <div className="post__header">
          <div className="toolbar">
            <div className="toolbar__main">
              {moment(this.props.post.updated_at).fromNow()}
            </div>

            <div className="toolbar__side">
              <Rating rating={0} />
            </div>
          </div>
        </div>

        {this.state.user && (
          <div className="post__user">
            <UserCard
              userName={getUserName(this.state.user)}
              accountName={this.state.user.account_name}
              profileLink={getUserLink(this.state.user.id)}
              avatarUrl={getFileUrl(this.state.user.avatar_filename)}
            />
          </div>
        )}

        <div className="post__content">
          {this.props.post.title && (
            <h1 className="post__title">
              <Link to={`/posts/${this.props.post.id}`}>{this.props.post.title}</Link>
            </h1>
          )}

          {this.props.post.leading_text && (
            <h2 className="post__title post__title_leading">{this.props.post.leading_text}</h2>
          )}

          {this.props.post.main_image_filename && (
            <div className="post__cover">
              <img src={getFileUrl(this.props.post.main_image_filename)} alt="" />
            </div>
          )}

          {/* {this.props.post.description && (
            <div className="post__text" dangerouslySetInnerHTML={{ __html: this.props.post.description }} />
          )} */}
        </div>

        {/* <div className="post__vote">
          <div className="vote">
            <div className="vote__item">
              <button className="vote__button">
                <div className="vote__name">MacBook Pro 2017</div>
                <div className="vote__value">27%</div>
                <div className="vote__progress" style={{ width: '27%' }} />
              </button>
            </div>
            <div className="vote__item">
              <button className="vote__button">
                <div className="vote__name">MacBook Pro 2015</div>
              </button>
            </div>
          </div>
        </div> */}

        <div className="post__footer">
          <div className="toolbar">
            <div className="toolbar__main">
              <button className="button-clean">
                <span className="inline inline_small">
                  <span className="inline__item">
                    <span className="post__icon">
                      <IconComment />
                    </span>
                  </span>
                  <span className="inline__item">0</span>
                </span>
              </button>
            </div>
            <div className="toolbar__side">
              <button className="button-clean">
                <span className="inline inline_small">
                  <span className="inline__item">
                    <span className="post__icon">
                      <IconShare />
                    </span>
                  </span>
                  <span className="inline__item">Share</span>
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Post;
