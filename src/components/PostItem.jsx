import { Link } from 'react-router-dom';
import React from 'react';
import PropTypes from 'prop-types';
import Rate from './Rate';
import EditIcon from './Icons/Edit';
import Tags from './Tags';

const PostItem = (props) => {
  const LinkTag = props.url ? Link : 'span';

  return (
    <div className="post-item">
      {props.coverImg && (
        <div className="post-item__cover">
          <LinkTag to={props.url}>
            <img className="post-item__img" src={props.coverImg} alt="" />
          </LinkTag>
        </div>
      )}

      <div className="post-item__main">
        <div className="post-item__tags">
          <Tags tags={props.tags} />
        </div>

        <div className="post-item__text">
          {props.editUrl && (
            <Link to={props.editUrl}>
              <span className="post-item__edit">
                <EditIcon />
              </span>
            </Link>
          )}

          {props.title ? (
            <LinkTag to={props.url}>{props.title}</LinkTag>
          ) : (
            <span className="blank">Lorem ipsum dolor sit amet consectetur adipisicing.</span>
          )}
        </div>
      </div>

      <div className="post-item__side">
        <div className="post-item__rate">
          <Rate value={props.rate} />
        </div>
      </div>
    </div>
  );
};

PostItem.propTypes = {
  coverImg: PropTypes.string,
  title: PropTypes.string,
  tags: PropTypes.arrayOf(PropTypes.string),
  editUrl: PropTypes.string,
  rate: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  url: PropTypes.string,
};

export default PostItem;
