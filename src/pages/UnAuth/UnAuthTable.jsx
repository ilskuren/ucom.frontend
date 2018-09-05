import React from 'react';
import PropTypes from 'prop-types';
// import cn from 'classnames';
import { NavLink } from 'react-router-dom';
import ProfilesTable from '../../components/ProfilesTable';
import FilterIcon from '../../components/Icons/Filter';
import SearchIcon from '../../components/Icons/Search';

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

const UnAuthTable = props => (
  <div className="unauth-table">
    <div className="unauth-table__header">
      <div className="unauth-table__title">
        <h1>{ props.title }</h1>
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
        {props.onSearchClick && (
          <div className="inline">
            <div className="inline__item">
              <SearchIcon />
            </div>
            <div className="inline__item">
              <span>Search</span>
            </div>
          </div>
        )}
        {props.onFilterClick && (
          <div className="inline">
            <div className="inline__item">
              <span>Filter</span>
            </div>
            <div className="inline__item">
              <FilterIcon />
            </div>
          </div>
        )}
      </div>
    </div>
    <ProfilesTable profiles={events} titles={props.tableTitles} promo={{ title: 'How to create Event?', link: '#' }} />
  </div>
);

UnAuthTable.propTypes = {
  title: PropTypes.string,
  onFilterClick: PropTypes.func,
  onSearchClick: PropTypes.func,
  tableTitles: PropTypes.arrayOf(PropTypes.string),
};

export default UnAuthTable;
