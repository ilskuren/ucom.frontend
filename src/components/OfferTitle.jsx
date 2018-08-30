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

const OfferTitle = props => (
  <div className="offer-title">
    <div className="offer-title__inner">
      <div className="offer-title__cover">
        <img src={props.imgSrc} className="offer-title__img" alt="" />
      </div>
      <div className="offer-title__main">
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
            <Rate className="rate_medium" />
          </div>
        </div>
        <div className="toolbar toolbar_responsive">
          <div className="toolbar__main">
            <div className="offer-title__text">
              Buy 2 burgers for the price of 3, and get one for free! Or not one, maybe 4, if i want
            </div>
          </div>
          <div className="toolbar__side">
            <div className="offer-title__share">
              <div className="offer-title__share-button">
                <IconShare className="offer-title__share-button-arrow" />
              </div>
            </div>
          </div>
        </div>
        <div className="offer-title__buyers">
          <div className="offer-title__avatar-list">
            <Avatars list={buyersAvatars} orderStacking="fifo" distance="close" />
          </div>
          <span className="offer-title__number-buyers">
            8 923
          </span>
          <span className="offer-title__buyers-word">
            BUYERS
          </span>
        </div>
        <div className="offer-title__footer">
          <div className="toolbar toolbar_responsive">
            <div className="toolbar__main">
              <div className="inline inline_without-margin offer-title_responsive-footer">
                <div className="inline__item inline__item_without-margin ">
                  <div className="offer-title__button">
                    <Button theme="red" text="BUY NOW" size="medium" isStretched />
                  </div>
                </div>
                <div className="inline__item inline__item_without-margin ">
                  <div className="offer-title__time">
                    <div className="offer-title__value">0</div>
                    <div className="offer-title__name">DAY</div>
                  </div>
                </div>
                <div className="inline__item inline__item_without-margin ">
                  <div className="offer-title__time">
                    <div className="offer-title__value">5:12:34</div>
                    <div className="offer-title__name">HOURS</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="toolbar__side">
              <div className="offer-title__footer-board">
                <Avatars list={boardAvatars} orderStacking="fifo" distance="close" />
                <span className="offer-title__board-more">+24</span>
              </div>
              <div className="offer-title__name">BOARD</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

OfferTitle.propTypes = {
  imgSrc: PropTypes.string,
};

export default OfferTitle;
