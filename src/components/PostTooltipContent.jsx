import React from 'react';
import Link from './Link';

const PostTooltipContent = () => (
  <div className="post-tooltip-content">
    <div className="post-tooltip-content__repost">
      <div className="post-tooltip-content__repost-title">Repost to your profile</div>
    </div>
    <div className="post-tooltip-content__share">
      <div className="post-tooltip-content__share-title">Share to </div>
      <div className="post-tooltip-content__social">
        <div className="post-tooltip-content__social-element" />
        <div className="post-tooltip-content__social-element" />
        <div className="post-tooltip-content__social-element" />
        <div className="post-tooltip-content__social-element" />
      </div>
    </div>
    <div className="post-tooltip-content__link">
      <div className="post-tooltip-content__link-title">Copy link</div>
      <Link href="http://shpargalkablog.ru/2011/06/css-box-shadow.html" />
    </div>
  </div>
);

export default PostTooltipContent;
