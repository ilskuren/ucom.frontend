import React from 'react';
import UserCard from './UserCard';
import Avatar from './Avatar';
import IconClip from './Icons/Clip';
import IconArrowUp from './Icons/ArrowUp';
import IconArrowDown from './Icons/ArrowDown';
import IconTriangle from './Icons/Triangle';

const CommentsStub = () => (
  <div className="comments">
    <div className="comments__user-comment">
      <div className="toolbar toolbar_responsive">
        <div className="toolbar__main">
          <div className="inline">
            <div className="inline__item">
              <Avatar
                src="https://cdn-images-1.medium.com/fit/c/300/300/1*28Gx-SixWGfev_WLLuCfhg.jpeg"
                size="xsmall"
              />
            </div>
            <div className="inline__item">
              <div className="comments__input">
                <input type="text" placeholder="Leave a comment" />
              </div>
            </div>
          </div>
        </div>
        <div className="toolbar__side">
          <div className="inline">
            <div className="inline__item">
              <IconClip />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className="comments__comment">
      <div className="comments__main-comment">
        <div className="toolbar">
          <div className="toolbar__main">
            <UserCard accountName="deckbuilder" userName="Ben Broud" avatarSize="xsmall" />
          </div>
          <div className="toolbar__side">
            <div className="comments__rating">
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
        <div className="comments__comment-text">
          Robinhood is in a great position to eat into Coinbase and other exchange's market share for a more mainstream.
        </div>
        <div className="comments__menu">
          <span className="comments__reply">Reply</span>
          <span className="comments__time">10 min ago</span>
        </div>
      </div>
      <div className="comments__replies">
        <div className="comments__main-comment comments__main-comment_reply comments__main-comment_user-comment">
          <div className="toolbar">
            <div className="toolbar__main">
              <UserCard accountName="apple_inc" userName="Jason Born" avatarSize="xsmall" />
            </div>
            <div className="toolbar__side">
              <div className="comments__rating">
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
          <div className="comments__comment-text">
            <a href="#" className="comments__user-link">@deckbuilder</a> The platform said it subsequently
          </div>
          <div className="comments__menu">
            <div className="toolbar">
              <div className="toolbar__main">
                <span className="comments__reply">Edit</span>
                <span className="comments__time">Few seconds ago</span>
              </div>
              <div className="toolbar__side">
                <span className="comments__delete">Delete</span>
              </div>
            </div>
          </div>
        </div>
        <div className="comments__main-comment comments__main-comment_reply">
          <div className="toolbar">
            <div className="toolbar__main">
              <UserCard accountName="apple_inc" userName="Jason Born" avatarSize="xsmall" />
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
          <div className="comments__comment-text">
            <a href="#" className="comments__user-link">@apple_inc</a> An OKEx spokesperson told CoinDesk that, even with the force
          </div>
          <div className="comments__menu">
            <span className="comments__reply">Reply</span>
            <span className="comments__time">10 min ago</span>
          </div>
        </div>
      </div>
      <div className="comments__hide-replies">
        <IconTriangle />
        Hide replies
      </div>
    </div>
    <div className="comments__comment">
      <div className="comments__main-comment">
        <div className="toolbar">
          <div className="toolbar__main">
            <UserCard accountName="deckbuilder" userName="Ben Broud" avatarSize="xsmall" />
          </div>
          <div className="toolbar__side">
            <div className="comments__rating">
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
        <div className="comments__comment-text">
          Robinhood is in a great position to eat into Coinbase and other exchange's market share for a more mainstream.
        </div>
        <div className="comments__menu">
          <span className="comments__reply">Reply</span>
          <span className="comments__time">10 min ago</span>
        </div>
      </div>
      <div className="comments__replies">
        <div className="comments__main-comment comments__main-comment_reply">
          <div className="toolbar">
            <div className="toolbar__main">
              <UserCard accountName="apple_inc" userName="Jason Born" avatarSize="xsmall" />
            </div>
            <div className="toolbar__side">
              <div className="comments__rating">
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
          <div className="comments__comment-text">
            <a href="#" className="comments__user-link">@apple_inc</a> An OKEx spokesperson told CoinDesk that, even with the force
          </div>
          <div className="comments__menu">
            <span className="comments__reply">Reply</span>
            <span className="comments__time">10 min ago</span>
          </div>
        </div>
        <div className="comments__main-comment comments__main-comment_reply">
          <div className="toolbar">
            <div className="toolbar__main">
              <UserCard accountName="apple_inc" userName="Jason Born" avatarSize="xsmall" />
            </div>
            <div className="toolbar__side">
              <div className="comments__rating">
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
          <div className="comments__comment-text">
            <a href="#" className="comments__user-link">@apple_inc</a> An OKEx spokesperson told CoinDesk that, even with the force
          </div>
          <div className="comments__menu">
            <span className="comments__reply">Reply</span>
            <span className="comments__time">10 min ago</span>
          </div>
        </div>
      </div>
      <div className="comments__hide-replies">
        <IconTriangle />
        Hide replies
      </div>
    </div>
  </div>
);

export default CommentsStub;
