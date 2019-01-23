import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import styles from './styles.css';
import Comment from './Comment';
import Form from './Form';
import ShowNext from './ShowNext';
import ShowReplies from './ShowReplies';

const Comments = props => (
  <div className={styles.comments}>
    <div className={styles.list}>
      {props.comments.map((comment, index) => {
        const nextComment = props.comments[index + 1];
        const showReplies = comment.nextDepthTotalAmount > 0 && (nextComment ? nextComment.parentId !== comment.id : true);
        const showNextReplies = (nextComment ? comment.depth > nextComment.depth : comment.depth > 0) &&
          props.metadata[comment.parentId].hasMore;

        return (
          <Fragment key={comment.id}>
            <Comment
              postId={props.postId}
              id={comment.id}
              depth={comment.depth}
              text={comment.text}
              date={comment.date}
              userId={comment.userId}
              ownerImageUrl={props.ownerImageUrl}
              ownerPageUrl={props.ownerPageUrl}
              ownerName={props.ownerName}
              onSubmit={props.onSubmit}
            />

            {showReplies &&
              <ShowReplies
                postId={props.postId}
                parentId={comment.id}
                parentDepth={comment.depth}
                depth={comment.depth}
                onClick={props.onClickShowReplies}
              />
            }

            {showNextReplies &&
              <ShowReplies
                showNext
                postId={props.postId}
                parentId={comment.parentId}
                parentDepth={comment.depth - 1}
                depth={comment.depth - 1}
                onClick={props.onClickShowReplies}
                page={props.metadata[comment.parentId].page + 1}
              />
            }
          </Fragment>
        );
      })}

      {props.metadata[0] && props.metadata[0].hasMore &&
        <ShowNext
          postId={props.postId}
          perPage={props.metadata[0].perPage}
          page={props.metadata[0].page}
          onClick={props.onClickShowNext}
        />
      }

      <Form
        postId={props.postId}
        userImageUrl={props.ownerImageUrl}
        userPageUrl={props.ownerPageUrl}
        userName={props.ownerName}
        onSubmit={props.onSubmit}
      />
    </div>
  </div>
);

Comments.propTypes = {
  postId: PropTypes.number.isRequired,
  comments: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    depth: PropTypes.number.isRequired,
    text: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    userId: PropTypes.number.isRequired,
    parentId: PropTypes.number.isRequired,
  })),
  metadata: PropTypes.objectOf(PropTypes.shape({
    hasMore: PropTypes.bool,
    page: PropTypes.number,
    perPage: PropTypes.number,
  })),
  ownerImageUrl: PropTypes.string,
  ownerPageUrl: PropTypes.string,
  ownerName: PropTypes.string,
  onSubmit: PropTypes.func.isRequired,
  onClickShowNext: PropTypes.func.isRequired,
  onClickShowReplies: PropTypes.func.isRequired,
};

Comments.defaultProps = {
  comments: [],
  metadata: {},
  ownerImageUrl: null,
  ownerPageUrl: null,
  ownerName: null,
};

export default Comments;
