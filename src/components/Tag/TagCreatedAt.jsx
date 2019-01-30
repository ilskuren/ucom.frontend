import moment from 'moment';
import React from 'react';

const TagCreatedAt = (props) => {
  if (!props.createdAt) {
    return null;
  }

  return (
    <div className="user-section">
      <div className="user-section__title">
        <h3 className="title title_xxsmall title_medium">Created</h3>
      </div>
      <div className="user-section__content">
        {moment(props.createdAt).format('D MMM YYYY')}
      </div>
    </div>
  );
};

export default TagCreatedAt;
