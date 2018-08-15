import React from 'react';
import Avatar from './Avatar';
import IconArrowUp from './Icons/ArrowUp';
import IconArrowDown from './Icons/ArrowDown';
import IconComment from './Icons/Comment';
import IconShare from './Icons/Share';

const Post = () => (
  <div className="post">
    <div className="post__type">Poll</div>

    <div className="post__header">
      <div className="toolbar">
        <div className="toolbar__main">
          10 min ago
        </div>

        <div className="toolbar__side">
          <div className="rating">
            <div className="inline inline_small">
              <div className="inline__item">
                <div className="rating__icon">
                  <IconArrowUp />
                </div>
              </div>
              <div className="inline__item">
                <div className="rating__value rating__value_up">+100</div>
              </div>
              <div className="inline__item">
                <div className="rating__icon">
                  <IconArrowDown />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div className="post__user">
      <div className="user-card">
        <div className="user-card__avatar">
          <Avatar src="http://1o9ddb39vxx9vbisv3djd3iysr.wpengine.netdna-cdn.com/wp-content/uploads/2017/06/Vinnie-Tortorich.jpg" />
        </div>
        <div className="user-card__info">
          <div className="user-card__name">TUDO</div>
          <div className="user-card__account">@apple_inc</div>
        </div>
      </div>
    </div>

    <div className="post__text">
      <h1>Camon guys, we need ur help!</h1>
      <p>MacBook Pro 2017 or MacBook 2015?</p>
      <p><img src="https://cdn-images-1.medium.com/max/2000/0*garzrb4YWfV8ummS" alt="" /></p>
    </div>

    <div className="post__vote">
      <div className="vote">
        <div className="vote__item">
          <button className="vote__button">
            <div className="vote__name">MacBook Pro 2017</div>
            <div className="vote__value">27%</div>
            <div className="vote__progress" style={{ width: '27%' }} />
          </button>
        </div>
        <div className="vote__item">
          <button className="vote__button">
            <div className="vote__name">MacBook Pro 2015</div>
          </button>
        </div>
      </div>
    </div>

    <div className="post__footer">
      <div className="toolbar">
        <div className="toolbar__main">
          <button className="button-clean">
            <span className="inline inline_small">
              <span className="inline__item">
                <span className="post__icon">
                  <IconComment />
                </span>
              </span>
              <span className="inline__item">300</span>
            </span>
          </button>
        </div>
        <div className="toolbar__side">
          <button className="button-clean">
            <span className="inline inline_small">
              <span className="inline__item">
                <span className="post__icon">
                  <IconShare />
                </span>
              </span>
              <span className="inline__item">Share</span>
            </span>
          </button>
        </div>
      </div>
    </div>
  </div>
);

export default Post;
