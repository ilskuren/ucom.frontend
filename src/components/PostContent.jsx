import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import React from 'react';
import Rating from './Rating';
import PostViews from './PostViews';
import EditIcon from './Icons/Edit';
import Tags from './Tags';
import Rate from './Rate';
import Comments from './Comments';
import { getPostEditUrl } from '../utils/posts';
import { selectUser } from '../store/selectors/user';

const PostContent = props => (
  <div className="posts">
    <div className="grid grid_post">
      <div className="grid__item">
        {props.title ? (
          <div className="posts__header">
            <div className="toolbar toolbar_top toolbar_responsive-reverse">
              <div className="toolbar__main">
                <div className="posts__tags">
                  <Tags tags={props.tags} />
                </div>

                <h1 className="title title_medium">
                  <div className="inline">
                    <div className="inline__item">
                      {props.title || <span className="blank">Lorem ipsum dolor sit amet.</span>}
                    </div>
                    <div className="inline__item">
                      {props.user.id && props.userId && props.user.id === props.userId ? (
                        <Link to={getPostEditUrl(props.id)}>
                          <span className="post-item__edit">
                            <EditIcon />
                          </span>
                        </Link>
                      ) : null}
                    </div>
                  </div>
                </h1>
              </div>
              <div className="toolbar__side">
                <Rate
                  className="rate_medium"
                  value={props.rate}
                />
              </div>
            </div>
          </div>
        ) : null}

        <div className="posts__content">
          {props.imgSrc && (
            <div className="posts__poster">
              <img src={props.imgSrc} className="posts__poster-img" alt="" />
            </div>
          )}
          {props.leadingText && (
            <div className="posts__lead-text posts__lead-text_offer">{props.leadingText}</div>
          )}
          {props.description && (
            <div className="posts__text" dangerouslySetInnerHTML={{ __html: props.description }} />
          )}
        </div>

        <div className="posts__comments">
          <Comments
            postId={props.id}
            comments={props.comments}
            organization={props.organization}
            onSubmit={(data, commentId) => {
              if (typeof props.onSubmitComment === 'function') {
                props.onSubmitComment(data, commentId);
              }
            }}
          />
        </div>
      </div>

      <div className="grid__item">
        <div className="posts__sidebar">
          <div className="posts__rating">
            <Rating
              postId={props.id}
              rating={props.rating}
              choice={props.сhoice}
            />
          </div>
          <div className="posts__views">
            <PostViews views={0} />
          </div>
        </div>
      </div>
    </div>
  </div>
);

PostContent.propTypes = {
  id: PropTypes.number,
  userId: PropTypes.number,
  title: PropTypes.string,
  leadingText: PropTypes.string,
  description: PropTypes.string,
  rate: PropTypes.number,
  tags: PropTypes.arrayOf(PropTypes.string),
  rating: PropTypes.number,
  сhoice: PropTypes.string,
  imgSrc: PropTypes.string,
  comments: PropTypes.arrayOf(PropTypes.object),
  onSubmitComment: PropTypes.func,
};

export default connect(state => ({
  user: selectUser(state),
}))(PostContent);
