import { Link } from 'react-router-dom';
import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import Rate from './Rate';
import EditIcon from './Icons/Edit';

const PostItem = (props) => {
  const LinkTag = props.url ? Link : 'span';

  return (

    <div className={classNames('post-item', { [`post-item_${props.size}`]: props.size })}>
      {props.coverImg && (
        <div className="post-item__cover">
          <LinkTag to={props.url}>
            <img className="post-item__img" src={props.coverImg} alt="" />
          </LinkTag>
        </div>
      )}
      <div className="post-item__main">
        <div className="post-item__tags">
          <span className="tags">
            <span className="tags__item tags__item_icon">#</span>
            <span className="tags__item">{props.tag}</span>
          </span>
        </div>

        <div className="post-item__text">
          {props.edit && (
            <Link to={props.editUrl}>
              <span className="post-item__edit">
                <EditIcon />
              </span>
            </Link>
          )}
          <LinkTag to={props.url}>{props.title}</LinkTag>
        </div>
      </div>
      <div className="post-item__side">
        <div className="post-item__rate">
          <Rate
            className={props.size === 'big' && 'rate_medium'}
            value={props.rate}
          />
        </div>
      </div>
    </div>
  );
};

PostItem.propTypes = {
  coverImg: PropTypes.string,
  title: PropTypes.string,
  tag: PropTypes.string,
  size: PropTypes.string,
  edit: PropTypes.bool,
  editUrl: PropTypes.string,
  rate: PropTypes.number,
  url: PropTypes.string,
};

PostItem.defaultProps = {
  title: 'This No-Brand Startup Won $240 Million to Fight Amazon on Price and Quality',
  tag: 'story',
};

export default PostItem;
