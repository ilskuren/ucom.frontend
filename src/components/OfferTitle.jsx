import classNames from 'classnames';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import React, { Fragment, PureComponent } from 'react';
import PropTypes from 'prop-types';
import Rate from './Rate';
import IconShare from './Icons/Share';
import EditIcon from './Icons/Edit';
import Avatar from './Avatar';
import Tags from './Tags';
import { getFileUrl } from '../utils/upload';
import { getOfferEditUrl, getDateLeft } from '../utils/offer';
import { join } from '../api';
import { getToken } from '../utils/token';

class OfferTitle extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      daysLeft: '',
      timeLeft: '',
      join: this.props.join,
    };
  }

  componentDidMount() {
    this.getDateLeft();

    this.dateLeftInterval = setInterval(() => {
      this.getDateLeft();
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.dateLeftInterval);
  }

  getDateLeft() {
    const dateLeft = getDateLeft(this.props.createdAt, this.props.actionDurationInDays);

    if (dateLeft) {
      this.setState({
        daysLeft: dateLeft.days,
        timeLeft: dateLeft.time,
      });
    }
  }

  join() {
    if (this.props.user.id) {
      join(this.props.id, getToken())
        .then((data) => {
          if (data.errors) {
            return;
          }

          this.setState({ join: true });
        });
    }
  }

  render() {
    return (
      <div className="offer-title">
        <div className="offer-title__inner">
          <div className="offer-title__cover">
            {this.props.imgSrc ? (
              <img src={this.props.imgSrc} className="offer-title__img" alt="" />
            ) : (
              <div className="offer-title__img offer-title__img_blank" />
            )}
          </div>

          <div className="offer-title__main">
            <div className="toolbar">
              <div className="toolbar__main">
                <Tags tags={this.props.tags} />
              </div>
              <div className="toolbar__side">
                {(typeof this.props.rate !== 'undefined') && (
                  <Rate className="rate_medium" value={this.props.rate} />
                )}
              </div>
            </div>

            <div className="toolbar toolbar_responsive">
              <div className="toolbar__main">
                <div className="offer-title__text">
                  {this.props.title}
                </div>
              </div>
              <div className="toolbar__side">
                <div className="inline">
                  <div className="inline__item">
                    <button className="button-icon button-icon_share">
                      <IconShare />
                    </button>
                  </div>
                  {(this.props.user.id && this.props.user.id === this.props.userId) && (
                    <div className="inline__item">
                      <Link to={getOfferEditUrl(this.props.id)} className="button-icon button-icon_edit button-icon_edit_transparent">
                        <EditIcon />
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="offer-title__buyers">
              <div className="inline">
                {(this.props.buyers && this.props.buyers.length > 0) && (
                  <div className="inline__item">
                    <div className="avatars-list avatars-list_shifted">
                      {this.props.buyers.map(item => (
                        <div className="avatars-list__item">
                          <Avatar src={getFileUrl(item.avatar_filename)} size="xxsmall" />
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {this.props.buyersCount && (
                  <div className="inline__item">
                    <strong>{this.props.buyersCount}</strong>
                  </div>
                )}

                {this.props.buyersCount && (
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
                        {this.props.actionButtonTitle && (
                          <a
                            href={this.props.actionButtonUrl}
                            className={classNames(
                              'button button_theme_red button_size_medium button_stretched',
                              { 'button_disabled': this.state.join },
                            )}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={() => this.join()}
                          >
                            {this.state.join ? 'Joined' : this.props.actionButtonTitle}
                          </a>
                        )}
                      </div>
                    </div>
                    {this.state.daysLeft && this.state.timeLeft ? (
                      <Fragment>
                        <div className="inline__item">
                          <div className="offer-title__time">
                            <div className="offer-title__value">{this.state.daysLeft}</div>
                            <div className="offer-title__name">DAY</div>
                          </div>
                        </div>

                        <div className="inline__item">
                          <div className="offer-title__time">
                            <div className="offer-title__value">{this.state.timeLeft}</div>
                            <div className="offer-title__name">HOURS</div>
                          </div>
                        </div>
                      </Fragment>
                    ) : null}
                  </div>
                </div>

                {(this.props.team && this.props.team.length > 0) && (
                  <div className="toolbar__side">
                    <div className="offer-title__footer-board">
                      <div className="avatars-list avatars-list_shifted">
                        {this.props.team.map(item => (
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
  }
}

OfferTitle.propTypes = {
  id: PropTypes.number,
  userId: PropTypes.number,
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
  createdAt: PropTypes.string,
  join: PropTypes.bool,
};

export default connect(state => ({
  user: state.user,
}))(OfferTitle);
