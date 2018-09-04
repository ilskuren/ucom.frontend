import React from 'react';
import PropTypes from 'prop-types';
// import cn from 'classnames';
import { NavLink } from 'react-router-dom';
// import FollowersTable from '../../components/FollowersTable';
import FilterIcon from '../../components/Icons/Filter';
import SearchIcon from '../../components/Icons/Search';

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
                  to="/events/media"
                  isActive={() => true}
                >
                  Media
                </NavLink>
              </div>
              <div className="menu__item">
                <NavLink
                  className="menu__link"
                  activeClassName="menu__link_active"
                  to="/events/offers"
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
    {/* <FollowersTable /> */}
  </div>
);

UnAuthTable.propTypes = {
  title: PropTypes.string,
  onFilterClick: PropTypes.func,
  onSearchClick: PropTypes.func,
};

export default UnAuthTable;
