import cn from 'classnames';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Rate from './Rate';
import EditIcon from './Icons/Edit';
import Avatar from './Avatar';
import Tags from './Tags';
import Avatars from './Avatars';
import TimeCounter from './TimeCounter';
import Share from './Share';
import { getFileUrl } from '../utils/upload';
import { getOfferEditUrl } from '../utils/offer';
import { join } from '../api';
import { getToken } from '../utils/token';

class EventTitle extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      join: this.props.join,
    };
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
                <div className="toolbar__side">
                  <div className="inline">
                    <div className="inline__item">
                      <Share isRounded />
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
                <div className="inline">
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

                  {this.props.createdAt && this.props.actionDurationInDays && (
                    <div className="inline__item">
                      <TimeCounter startTime={this.props.createdAt} durationInDays={this.props.actionDurationInDays} />
                    </div>
                  )}
                </div>
              </div>
            </div>

            {(this.props.team && this.props.team.length > 0) && (
              <div className="toolbar">
                <div className="toolbar__side">
                  <div className="event-title__footer-board">
                    <Avatars list={this.props.team} orderStacking="fifo" distance="close" size="msmall" />
                  </div>
                  <div className="event-title__name">BOARD</div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
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
  actionDurationInDays: PropTypes.string,
  actionButtonUrl: PropTypes.string,
  buyers: PropTypes.arrayOf(PropTypes.object),
  buyersCount: PropTypes.number,
  createdAt: PropTypes.string,
  join: PropTypes.bool,
};

export default connect(state => ({
  user: state.user,
}))(EventTitle);
