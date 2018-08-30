import React from 'react';
import PropTypes from 'prop-types';
import Rate from './Rate';
import IconShare from './Icons/Share';
import Avatars from './Avatars';
import Button from './Button';

const buyersAvatars = [
  {
    size: 'xxsmall',
    src: 'https://cdn-images-1.medium.com/fit/c/300/300/1*28Gx-SixWGfev_WLLuCfhg.jpeg',
  },
  {
    size: 'xxsmall',
    src: 'https://cdn-images-1.medium.com/fit/c/300/300/1*28Gx-SixWGfev_WLLuCfhg.jpeg',
  },
  {
    size: 'xxsmall',
    src: 'https://cdn-images-1.medium.com/fit/c/300/300/1*28Gx-SixWGfev_WLLuCfhg.jpeg',
  },
];

const boardAvatars = [
  {
    size: 'xsmall',
    src: 'https://cdn-images-1.medium.com/fit/c/300/300/1*28Gx-SixWGfev_WLLuCfhg.jpeg',
  },
  {
    size: 'xsmall',
    src: 'https://cdn-images-1.medium.com/fit/c/300/300/1*28Gx-SixWGfev_WLLuCfhg.jpeg',
  },
  {
    size: 'xsmall',
    src: 'https://cdn-images-1.medium.com/fit/c/300/300/1*28Gx-SixWGfev_WLLuCfhg.jpeg',
  },
  {
    size: 'xsmall',
    src: 'https://cdn-images-1.medium.com/fit/c/300/300/1*28Gx-SixWGfev_WLLuCfhg.jpeg',
  },
];

const EventTitle = props => (
  <div className="event-title">
    <div className="event-title__inner">
      <div className="event-title__cover">
        <img src={props.imgSrc} className="event-title__img" alt="" />
      </div>
      <div className="event-title__main">
        <div className="toolbar">
          <div className="toolbar__main">
            <span className="tags">
              <span className="tags tags__item tags_item_icon">
                #
              </span>
              <span className="tags__item">
                sell
              </span>
            </span>
          </div>
          <div className="toolbar__side">
            <Rate className="rate_medium" value="9200" />
          </div>
        </div>
        <div className="toolbar toolbar_responsive">
          <div className="toolbar__main">
            <div className="event-title__text">
              Buy 2 burgers for the price of 3, and get one for free! Or not one, maybe 4, if i want
            </div>
          </div>
          <div className="toolbar__side">
            <div className="event-title__share">
              <div className="event-title__share-button">
                <IconShare className="event-title__share-button-arrow" />
              </div>
            </div>
          </div>
        </div>
        <div className="event-title__buyers">
          <div className="event-title__avatar-list">
            <Avatars list={buyersAvatars} orderStacking="fifo" distance="close" />
          </div>
          <span className="event-title__number-buyers">
            8 923
          </span>
          <span className="event-title__buyers-word">
            BUYERS
          </span>
        </div>
        <div className="event-title__footer">
          <div className="toolbar toolbar_responsive">
            <div className="toolbar__main">
              <div className="inline inline_without-margin event-title_responsive-footer">
                <div className="inline__item inline__item_without-margin ">
                  <div className="event-title__button">
                    <Button theme="red" text="BUY NOW" size="medium" isStretched />
                  </div>
                </div>
                <div className="inline__item inline__item_without-margin ">
                  <div className="event-title__time">
                    <div className="event-title__value">0</div>
                    <div className="event-title__name">DAY</div>
                  </div>
                </div>
                <div className="inline__item inline__item_without-margin ">
                  <div className="event-title__time">
                    <div className="event-title__value">5:12:34</div>
                    <div className="event-title__name">HOURS</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="toolbar__side">
              <div className="event-title__footer-board">
                <Avatars list={boardAvatars} orderStacking="fifo" distance="close" />
                <span className="event-title__board-more">+24</span>
              </div>
              <div className="event-title__name">BOARD</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

EventTitle.propTypes = {
  imgSrc: PropTypes.string,
};

export default EventTitle;
