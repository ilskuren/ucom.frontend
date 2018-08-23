import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import Rate from './Rate';
import EditIcon from './Icons/Edit';

const PostItem = props => (
  <div className={classNames('post-item', { [`post-item_${props.size}`]: props.size })}>
    {props.coverImg && (
      <div className="post-item__cover">
        <img className="post-item__img" src={props.coverImg} alt="" />
      </div>
    )}
    <div className="post-item__main">
      <div className="post-item__tags">
        <span className="tags">
          <span className="tags__item tags__item_icon">#</span>
          <span className="tags__item">{props.tag || 'poll'}</span>
        </span>
      </div>

      <div className="post-item__text">
        {props.edit && <span className="post-item__edit"><EditIcon /></span>}
        {props.title || 'This No-Brand Startup Won $240 Million to Fight Amazon on Price and Quality'}
      </div>
    </div>
    <div className="post-item__side">
      <div className="post-item__rate">
        <Rate className={props.size === 'big' && 'rate_medium'} />
      </div>
    </div>
  </div>
);

PostItem.propTypes = {
  coverImg: PropTypes.string,
  title: PropTypes.string,
  tag: PropTypes.string,
  size: PropTypes.string,
  edit: PropTypes.bool,
};

export default PostItem;
