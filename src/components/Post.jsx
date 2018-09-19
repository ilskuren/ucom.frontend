import PropTypes from 'prop-types';
import moment from 'moment';
import { Link } from 'react-router-dom';
import React, { Fragment } from 'react';
import IconComment from './Icons/Comment';
import Share from './Share';
import Rating from './Rating';
import UserCard from './UserCard';

const Post = props => (
  <div className="post">
    <div className="post__type">{props.postType}</div>

    <div className="post__header">
      <div className="toolbar">
        <div className="toolbar__main">
          {props.updatedAt ? (
            <Fragment>{moment(props.updatedAt).fromNow()}</Fragment>
          ) : (
            <span className="blank">Lorem, ipsum.</span>
          )}
        </div>

        {!Number.isNaN(+props.rating) && (
          <div className="toolbar__side">
            <Rating
              rating={props.rating}
              postId={props.postId}
            />
          </div>
        )}
      </div>
    </div>

    <div className="post__user">
      <UserCard
        userName={props.userName}
        accountName={props.accountName}
        profileLink={props.profileLink}
        avatarUrl={props.avatarUrl}
        sign="@"
      />
    </div>

    <div className="post__content">
      <h1 className="post__title">
        {props.title ? (
          <Link to={props.url}>{props.title}</Link>
        ) : (
          <span className="blank">Lorem ipsum dolor sit.</span>
        )}
      </h1>

      {!props.postId ? (
        <h2 className="post__title post__title_leading">
          <span className="blank">Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae, laborum.</span>
        </h2>
      ) : (
        <Fragment>
          {props.leadingText && (
            <h2 className="post__title post__title_leading">{props.leadingText}</h2>
          )}
        </Fragment>
      )}

      {props.coverUrl && (
        <div className="post__cover">
          <Link to={props.url}>
            <img src={props.coverUrl} alt="cover" />
          </Link>
        </div>
      )}
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

    {true && (
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
            <Share />
          </div>
        </div>
      </div>
    )}
  </div>
);

Post.propTypes = {
  rating: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  postId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  postType: PropTypes.string,
  updatedAt: PropTypes.string,
  userName: PropTypes.string,
  accountName: PropTypes.string,
  profileLink: PropTypes.string,
  avatarUrl: PropTypes.string,
  title: PropTypes.string,
  leadingText: PropTypes.string,
  coverUrl: PropTypes.string,
  url: PropTypes.string,
};

export default Post;
