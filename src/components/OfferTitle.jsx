import React from 'react';
import PropTypes from 'prop-types';
import Rate from './Rate';
// import IconShare from './Icons/Share';
import Avatar from './Avatar';
import Tags from './Tags';
import { getFileUrl } from '../utils/upload';

const OfferTitle = props => (
  <div className="offer-title">
    <div className="offer-title__inner">
      <div className="offer-title__cover">
        {props.imgSrc ? (
          <img src={props.imgSrc} className="offer-title__img" alt="" />
        ) : (
          <div className="offer-title__img offer-title__img_blank" />
        )}
      </div>

      <div className="offer-title__main">
        <div className="toolbar">
          <div className="toolbar__main">
            <Tags tags={props.tags} />
          </div>
          <div className="toolbar__side">
            {(typeof props.rate !== 'undefined') && (
              <Rate className="rate_medium" value={props.rate} />
            )}
          </div>
        </div>

        <div className="toolbar toolbar_responsive">
          <div className="toolbar__main">
            <div className="offer-title__text">
              {props.title}
            </div>
          </div>
          {/* <div className="toolbar__side">
            <div className="offer-title__share">
              <div className="offer-title__share-button">
                <IconShare className="offer-title__share-button-arrow" />
              </div>
            </div>
          </div> */}
        </div>

        <div className="offer-title__buyers">
          <div className="inline">
            {(props.buyers && props.buyers.length > 0) && (
              <div className="inline__item">
                <div className="avatars-list avatars-list_shifted">
                  {props.buyers.map(item => (
                    <div className="avatars-list__item">
                      <Avatar src={getFileUrl(item.avatar_filename)} size="xxsmall" />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {props.buyersCount && (
              <div className="inline__item">
                <strong>{props.buyersCount}</strong>
              </div>
            )}

            {props.buyersCount && (
              <div className="inline__item">
                <em>BUYERS</em>
              </div>
            )}
          </div>
        </div>

        <div className="offer-title__footer">
          <div className="toolbar toolbar_responsive">
            <div className="toolbar__main">
              <div className="inline inline_large">
                <div className="inline__item">
                  <div className="offer-title__button">
                    {props.actionButtonTitle && (
                      <a className="button button_theme_red button_size_medium button_stretched" href={props.actionButtonUrl} target="_blank" rel="noopener noreferrer">
                        {props.actionButtonTitle}
                      </a>
                    )}
                  </div>
                </div>
                {(props.actionDurationInDays && props.actionDurationInDays > 0) && (
                  <div className="inline__item">
                    <div className="offer-title__time">
                      <div className="offer-title__value">{props.actionDurationInDays}</div>
                      <div className="offer-title__name">DAY</div>
                    </div>
                  </div>
                )}

                {/* <div className="inline__item">
                  <div className="offer-title__time">
                    <div className="offer-title__value">5:12:34</div>
                    <div className="offer-title__name">HOURS</div>
                  </div>
                </div> */}
              </div>
            </div>

            {(props.team && props.team.length > 0) && (
              <div className="toolbar__side">
                <div className="offer-title__footer-board">
                  <div className="avatars-list avatars-list_shifted">
                    {props.team.map(item => (
                      <div className="avatars-list__item">
                        <Avatar src={getFileUrl(item.avatar_filename)} size="xxsmall" />
                      </div>
                    ))}
                  </div>
                  {/* <span className="offer-title__board-more">+24</span> */}
                </div>
                <div className="offer-title__name">BOARD</div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  </div>
);

OfferTitle.propTypes = {
  imgSrc: PropTypes.string,
  tags: PropTypes.arrayOf(PropTypes.string),
  rate: PropTypes.number,
  title: PropTypes.string,
  team: PropTypes.arrayOf(PropTypes.object),
  actionButtonTitle: PropTypes.string,
  actionDurationInDays: PropTypes.number,
  actionButtonUrl: PropTypes.string,
  buyers: PropTypes.arrayOf(PropTypes.object),
  buyersCount: PropTypes.number,
};

export default OfferTitle;
