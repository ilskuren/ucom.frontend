import classNames from 'classnames';
import React from 'react';

const MinimizedText = props => (
  <div className="text">
    <div
      className={classNames(
        'text__content',
        { 'text__content_minimized': props.enabled && props.minimized },
      )}
    >
      <p>{props.text}</p>
    </div>

    {props.enabled &&
      <div className="text__show-more">
        <button
          className="button-clean button-clean_link"
          onClick={() => {
            if (props.onClickShowMore) {
              props.onClickShowMore();
            }
          }}
        >
          {props.minimized ? 'Show More' : 'Hide More'}
        </button>
      </div>
    }
  </div>
);

export default MinimizedText;
