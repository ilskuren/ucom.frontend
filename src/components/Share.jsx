import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import ShareIcon from './Icons/Share';

const Share = ({ isRounded }) => (
  <div className="share">
    <button
      className={cn({
        'button-clean': !isRounded,
        'button-icon': isRounded,
        'button-icon_edit': isRounded,
        'button-icon_edit_transparent': isRounded,
      })}
    >
      <span className="inline inline_small">
        <span className="inline__item">
          <span className="share__icon">
            <ShareIcon />
          </span>
        </span>
        {!isRounded && <span className="inline__item">Share</span>}
      </span>
    </button>
  </div>
);

Share.propTypes = {
  isRounded: PropTypes.bool,
};

export default Share;
