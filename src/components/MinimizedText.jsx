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
        <span
          role="presentation"
          onClick={() => {
            if (props.onClickShowMore) {
              props.onClickShowMore();
            }
          }}
        >
          {props.minimized ? 'Show More' : 'Hide More'}
        </span>

      </div>
    }
  </div>
);

export default MinimizedText;
