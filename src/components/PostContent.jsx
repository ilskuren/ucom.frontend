import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import React from 'react';
import Rating from './Rating';
import PostViews from './PostViews';
import EditIcon from './Icons/Edit';
import Tags from './Tags';
import Rate from './Rate';
import { getPostEditUrl } from '../utils/posts';

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
          {props.leadingText && (
            <div className="posts__lead-text posts__lead-text_offer">{props.leadingText}</div>
          )}
          {props.description && (
            <div className="posts__text" dangerouslySetInnerHTML={{ __html: props.description }} />
          )}
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
};

export default connect(state => ({
  user: state.user,
}))(PostContent);
