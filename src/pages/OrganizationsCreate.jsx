import { connect } from 'react-redux';
import classNames from 'classnames';
import React, { Fragment } from 'react';
import OrganizationsCreateForm from '../components/OrganizationsCreateForm';
import { setOrganizationActiveTab } from '../actions';

const OrganizationsCreatePage = props => (
  <Fragment>
    <div className="content content_separated">
      <div className="content__inner">
        <div className="grid grid_settins-head">
          <div className="grid__item grid__item_main">
            <div className="content__title">
              <h1 className="title">Create Organization</h1>
            </div>

            <div className="menu menu_simple-tabs">
              {props.organization.steps.map(item => (
                <div
                  key={item.id}
                  role="presentation"
                  className={classNames('menu__item', { 'menu__item_active': item.active })}
                >
                  <div className="menu__link">{item.name}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>

    <div className="content">
      <div className="content__inner">
        <OrganizationsCreateForm />
      </div>
    </div>
  </Fragment>
);

export default connect(
  state => ({
    organization: state.organization,
  }),
  dispatch => ({
    setOrganizationActiveTab: tabId => dispatch(setOrganizationActiveTab(tabId)),
  }),
)(OrganizationsCreatePage);
