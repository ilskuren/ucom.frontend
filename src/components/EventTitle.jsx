import cn from 'classnames';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import React, { Fragment, PureComponent } from 'react';
import PropTypes from 'prop-types';
import Rate from './Rate';
import IconShare from './Icons/Share';
import EditIcon from './Icons/Edit';
import Avatar from './Avatar';
import Tags from './Tags';
import ModalContent from './ModalContent';
import Popup from './Popup';
import Avatars from './Avatars';
import ProfileList from './ProfilesList';
import { getFileUrl } from '../utils/upload';
import { getUserName, getUserUrl } from '../utils/user';
import { getOfferEditUrl, getDateLeft } from '../utils/offer';
import { join } from '../api';
import { getToken } from '../utils/token';

class EventTitle extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      daysLeft: '',
      timeLeft: '',
      join: this.props.join,
      teamPopupVisible: false,
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

  showTeamPopup() {
    this.setState({ teamPopupVisible: true });
  }

  hideTeamPopup() {
    this.setState({ teamPopupVisible: false });
  }

  render() {
    return (
      <Fragment>
        {this.state.teamPopupVisible && (
          <Popup onClickClose={() => this.hideTeamPopup()}>
            <ModalContent onClickClose={() => this.hideTeamPopup()}>
              <ProfileList
                users={this.props.team.map(item => ({
                  id: item.id,
                  userName: getUserName(item),
                  accountName: item.account_name,
                  avatarUrl: getFileUrl(item.avatar_filename),
                  profileLink: getUserUrl(item.id),
                  rate: 100,
                }))}
              />
            </ModalContent>
          </Popup>
        )}

        <div className={cn('event-title', this.props.className)}>
          <div className="event-title__inner">
            <div className="event-title__cover">
              {this.props.imgSrc ? (
                <img src={this.props.imgSrc} className="event-title__img" alt="" />
              ) : (
                <div className="event-title__img event-title__img_blank" />
              )}
            </div>

            <div className="event-title__main">
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
                  <div className="event-title__text">
                    {this.props.title}
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
              </div>
            </div>

            <div className="event-title__buyers">
              <div className="inline">
                {(this.props.buyers && this.props.buyers.length > 0) && (
                  <div className="inline__item">
                    <div className="avatars-list avatars-list_shifted">
                      {this.props.buyers.map((item, index) => (
                        <div className="avatars-list__item" key={index}>
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

            <div className="event-title__footer">
              <div className="toolbar toolbar_responsive">
                <div className="toolbar__main">
                  <div className="inline inline_large">
                    <div className="inline__item">
                      <div className="event-title__button">
                        {this.props.actionButtonTitle && (
                          <a
                            href={`//${this.props.actionButtonUrl.replace(/^(?:\/\/|[^/]+)*\//, '')}`}
                            className={cn(
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
                          <div className="event-title__time">
                            <div className="event-title__value">{this.state.daysLeft}</div>
                            <div className="event-title__name">DAY</div>
                          </div>
                        </div>

                        <div className="inline__item">
                          <div className="event-title__time">
                            <div className="event-title__value">{this.state.timeLeft}</div>
                            <div className="event-title__name">HOURS</div>
                          </div>
                        </div>
                      </Fragment>
                    ) : null}
                  </div>
                </div>

                {(this.props.team && this.props.team.length > 0) && (
                  <div className="toolbar__side">
                    <div className="event-title__footer-board">
                      <Avatars list={this.props.team} orderStacking="fifo" distance="close" size="msmall" />
                      {/* <div className="avatars-list avatars-list_shifted">
                        {team.map(item => (
                          <div className="avatars-list__item" key={item.id}>
                            <Avatar src={getFileUrl(item.avatar_filename)} size="msmall" />
                          </div>
                        ))}
                      </div>
                      {otherTeamCount > 0 && (
                        <button className="button-clean" onClick={() => this.showTeamPopup()}>
                          <span className="offer-title__board-more">+{otherTeamCount}</span>
                        </button>
                      )} */}
                    </div>
                    <div className="event-title__name">BOARD</div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

EventTitle.propTypes = {
  className: PropTypes.string,
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
}))(EventTitle);
