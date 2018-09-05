import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import ProfilesTable from '../../components/ProfilesTable';
import Tooltip from '../../components/Tooltip';
import FilterIcon from '../../components/Icons/Filter';
import SearchIcon from '../../components/Icons/Search';

const tooltipTags = ['story', 'challenge', 'poll', 'news', 'trading forecast', 'reviews', 'analytics', 'interview'];

const events = Array.from({ length: 8 }, () => (
  {
    profileCardData: {
      profileName: 'No Country for Old Man, aren\'t it?',
      accountName: 'story',
      avatarUrl: 'https://cdn-images-1.medium.com/fit/c/300/300/1*28Gx-SixWGfev_WLLuCfhg.jpeg',
    },
    views: 110231,
    comments: 1322213,
    rate: 12800,
  }));

class UnAuthTable extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      filterIsActive: false,
    };
  }

  toggleFilter() {
    this.setState({ filterIsActive: !this.state.filterIsActive });
  }

  render() {
    return (
      <div className="unauth-table">
        <div className="unauth-table__header">
          <div className="unauth-table__title">
            <h1>{ this.props.title }</h1>
            <div className="toolbar">
              <div className="toolbar__main">
                <div className="menu menu_simple-tabs menu_simple-tabs_black menu_simple-tabs_small menu_not-responsive">
                  <div className="menu__item">
                    <NavLink
                      className="menu__link"
                      activeClassName="menu__link_active"
                      to="/events"
                      isActive={() => true}
                    >
                      Media
                    </NavLink>
                  </div>
                  <div className="menu__item">
                    <NavLink
                      className="menu__link"
                      activeClassName="menu__link_active"
                      to="/events"
                    >
                      Offers
                    </NavLink>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="unauth-table__options">
            {this.props.onSearchClick && (
              <div className="inline">
                <div className="inline__item">
                  <SearchIcon />
                </div>
                <div className="inline__item">
                  <span className="unauth-table__option-label">Search</span>
                </div>
              </div>
            )}
            {this.props.onFilterClick && (
              <div className="inline">
                <div className="inline__item">
                  <span className="unauth-table__option-label">Filter</span>
                </div>
                <div className="inline__item">
                  <div className="unauth-table__icon">
                    <span role="presentation" onClick={() => this.toggleFilter()}><FilterIcon /></span>
                    {this.state.filterIsActive && (
                      <div className="unauth-table__tooltip-wrapper">
                        <Tooltip className="tooltip_arrow_right-to-left">
                          <div className="unauth-table__tooltip">
                            <h4>Show media events</h4>
                            <div className="unauth-table__tooltip-tags">
                              {tooltipTags.map((tag, index) => (
                                <span className="unauth-table__tooltip-tag" key={index}>#{tag} </span>
                              ))}
                            </div>
                          </div>
                        </Tooltip>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        <ProfilesTable profiles={events} titles={this.props.tableTitles} promo={{ title: 'How to create Event?', link: '#' }} />
      </div>
    );
  }
}

UnAuthTable.propTypes = {
  title: PropTypes.string,
  onFilterClick: PropTypes.func,
  onSearchClick: PropTypes.func,
  tableTitles: PropTypes.arrayOf(PropTypes.string),
};

export default UnAuthTable;
