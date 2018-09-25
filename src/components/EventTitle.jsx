import cn from 'classnames';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Rate from './Rate';
import EditIcon from './Icons/Edit';
import Tags from './Tags';
import Avatars from './Avatars';
import TimeCounter from './TimeCounter';
import Share from './Share';
import AddImage from './AddImage';
import { getOfferEditUrl } from '../utils/offer';
import api from '../api';
import { getBase64FromFile } from '../utils/upload';
import { selectUser } from '../store/selectors';

class EventTitle extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      join: this.props.join,
      base64Cover: null,
    };
  }

  changeCover(file) {
    getBase64FromFile(file)
      .then((base64Cover) => {
        this.setState({ base64Cover });
      });
  }

  join() {
    if (this.props.user.id) {
      api.join(this.props.id)
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
      <div
        className={cn(
          'event-title',
          { 'event-title_big': this.props.big },
          { 'event-title_black': this.props.black },
        )}
      >
        <div className="event-title__cover">
          {this.state.base64Cover || this.props.imgSrc ? (
            <img src={this.state.base64Cover || this.props.imgSrc} className="event-title__img" alt="" />
          ) : (
            <div className="event-title__img event-title__img_blank" />
          )}
        </div>
        <div className="event-title__inner">
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
                  {!this.props.editableTitle ? this.props.title : (
                    <input
                      type="text"
                      className="event-title__input"
                      placeholder="Name Your Offer"
                    />
                  )}
                </div>
                {this.props.editableCover && (
                  <div className="event-title__upload">
                    <AddImage onChange={file => this.changeCover(file)} />
                  </div>
                )}
              </div>

              <div className="toolbar__side">
                <div className="inline inline_without-margin">
                  {this.props.id && (
                    <div className="inline__item">
                      <Share isRounded />
                    </div>
                  )}
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
                            'button button_theme_red button_size_medium button_stretched button_upper',
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
                      <TimeCounter
                        hideLabel={!!this.props.timerTitle}
                        startTime={this.props.createdAt}
                        durationInDays={this.props.actionDurationInDays}
                      />
                      {this.props.timerTitle && (
                        <div className="event-title__avatar-name">{this.props.timerTitle}</div>
                      )}
                    </div>
                  )}

                  {this.props.buyers && (
                    <div className="inline__item">
                      <div className="inline">
                        <div className="inline__item">
                          <Avatars
                            list={this.props.buyers}
                            orderStacking="fifo"
                            distance="close"
                            size="xxsmall"
                          />
                        </div>
                        {this.props.buyersCount && (
                          <div className="inline__item">
                            <span className="event-title__users-count">{this.props.buyersCount}</span>
                          </div>
                        )}
                      </div>
                      <div className="event-title__avatar-name">{this.props.buyersTitle}</div>
                    </div>
                  )}
                </div>
              </div>

              {(this.props.team && this.props.team.length > 0) && (
                <div className="toolbar__side">
                  <Avatars
                    list={this.props.team}
                    orderStacking="fifo"
                    distance="close"
                    size={this.props.big ? 'initial' : 'msmall'}
                  />
                  <div className="event-title__avatar-name">{this.props.teamTitle}</div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

EventTitle.propTypes = {
  id: PropTypes.number,
  userId: PropTypes.number,
  imgSrc: PropTypes.string,
  tags: PropTypes.arrayOf(PropTypes.string),
  rate: PropTypes.number,
  title: PropTypes.string,
  team: PropTypes.arrayOf(PropTypes.object),
  buyers: PropTypes.arrayOf(PropTypes.object),
  actionButtonTitle: PropTypes.string,
  actionDurationInDays: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  actionButtonUrl: PropTypes.string,
  createdAt: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  join: PropTypes.bool,
  big: PropTypes.bool,
  black: PropTypes.bool,
  editableTitle: PropTypes.bool,
  editableCover: PropTypes.bool,
  teamTitle: PropTypes.string,
  buyersTitle: PropTypes.string,
  timerTitle: PropTypes.string,
  buyersCount: PropTypes.number,
};

EventTitle.defaultProps = {
  teamTitle: 'Board',
  buyersTitle: 'Buyers',
};

export default connect(state => ({
  user: selectUser(state),
}))(EventTitle);
