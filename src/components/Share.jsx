import React from 'react';
import ShareIcon from './Icons/Share';

const Share = () => (
  <button className="button-clean">
    <span className="inline inline_small">
      <span className="inline__item">
        <span>
          <ShareIcon />
        </span>
      </span>
      <span className="inline__item">Share</span>
    </span>
  </button>
);

export default Share;
