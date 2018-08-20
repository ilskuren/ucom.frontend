import React from 'react';
import cn from 'classnames';
import Link from './Link';

const PostTooltipContent = () => (
  <div className="post-tooltip-content">
    <div className="post-tooltip-content__repost">
      <div className="post-tooltip-content__repost-title">Repost to your profile</div>
    </div>
    <div className="post-tooltip-content__share">
      <div className="post-tooltip-content__share-title">Share to </div>
      <div className="post-tooltip-content__social">
        <div className={cn(
          'post-tooltip-content__social-element',
          {
            'post-tooltip-content__social-element_fb': true,
          },
          )}
        />
        <div className={cn(
          'post-tooltip-content__social-element',
          {
            'post-tooltip-content__social-element_twitter': true,
          },
          )}
        />
        <div className={cn(
          'post-tooltip-content__social-element',
          {
            'post-tooltip-content__social-element_telegram': true,
          },
          )}
        />
        <div className={cn(
          'post-tooltip-content__social-element',
          {
            'post-tooltip-content__social-element_vk': true,
          },
          )}
        />
      </div>
    </div>
    <div className="post-tooltip-content__share-link">
      <div className="post-tooltip-content__share-link-title">Copy link</div>
      <div className="post-tooltip-content__share-link-link">
        <div className="post-tooltip-content__link">
          <Link href="http://shpargalkablog.ru/2011/06/css-box-shadow.html" />
        </div>
        <div className="post-tooltip-content__copy" />
      </div>
    </div>
  </div>
);

export default PostTooltipContent;
