import { connect } from 'react-redux';
import React from 'react';
import VerticalMenu from './VerticalMenu';
import TextInput from './TextInput';
import { setOrganizationActiveTab } from '../actions';

const OrganizationsCreatePage = (props) => {
  const activeStepId = props.organization.steps.find(i => i.active).id;

  switch (activeStepId) {
    default: {
      return (
        <div className="grid grid_settings">
          <div className="grid__item grid__item_side">
            <VerticalMenu
              sections={[
                { name: 'MainInfo', title: 'Main Info' },
                { name: 'Location', title: 'Location' },
              ]}
            />
          </div>
          <div className="grid__item grid__item_main">
            <div className="fields">
              <div className="fields__title">
                <h1 className="title title_small">Main Info</h1>
              </div>

              <div className="fields__item">
                <div className="field">
                  <div className="field__label">Organization name</div>
                  <div className="field__input">
                    <TextInput placeholder="Type something..." />
                  </div>
                </div>
              </div>

              <div className="fields__item">
                <div className="field">
                  <div className="field__label">Organization name</div>
                  <div className="field__input">
                    <TextInput placeholder="Type something..." />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
  }
};

export default connect(
  state => ({
    organization: state.organization,
  }),
  dispatch => ({
    setOrganizationActiveTab: tabId => dispatch(setOrganizationActiveTab(tabId)),
  }),
)(OrganizationsCreatePage);
