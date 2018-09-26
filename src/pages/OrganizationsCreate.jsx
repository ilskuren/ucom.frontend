import { Redirect } from 'react-router';
import { connect } from 'react-redux';
import classNames from 'classnames';
import React, { Fragment, PureComponent } from 'react';
import OrganizationsCreateForm from '../components/OrganizationsCreateForm';
import { setOrganizationActiveTab } from '../actions';

class OrganizationsCreatePage extends PureComponent {
  componentWillReceiveProps(props) {
    const { activeStepId } = this.props.organization;
    const nextActiveStepId = props.organization.activeStepId;

    if (activeStepId && nextActiveStepId !== activeStepId) {
      window.scrollTo(0, 0);
    }
  }

  render() {
    if (this.props.organization.saved) {
      return <Redirect to={`/organizations/${this.props.organization.data.id}`} />;
    }

    return (
      <Fragment>
        <div className="content">
          <div className="content__inner content__inner_medium">
            <div className="content__title">
              <h1 className="title">Create Organization</h1>
            </div>

            <div className="menu menu_simple-tabs">
              {this.props.organization.steps.map(item => (
                <div
                  key={item.id}
                  role="presentation"
                  className={classNames(
                    'menu__item',
                    { 'menu__item_active': item.id === this.props.organization.activeStepId },
                  )}
                >
                  <div className="menu__link">{item.name}</div>
                </div>
              ))}
            </div>
          </div>

          <hr className="content__separator" />

          <div className="content__inner">
            <OrganizationsCreateForm />
          </div>
        </div>
      </Fragment>
    );
  }
}

export default connect(
  state => ({
    organization: state.organization,
  }),
  dispatch => ({
    setOrganizationActiveTab: tabId => dispatch(setOrganizationActiveTab(tabId)),
  }),
)(OrganizationsCreatePage);
