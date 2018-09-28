import { Redirect } from 'react-router';
import { connect } from 'react-redux';
import classNames from 'classnames';
import React, { Fragment, PureComponent } from 'react';
import OrganizationsCreateForm from '../components/OrganizationsCreateForm';
import { setOrganizationActiveTab, fetchOrganization, resetOrganizationData } from '../actions/organization';
import { selectUser } from '../store/selectors/user';

class OrganizationsCreatePage extends PureComponent {
  componentDidMount() {
    this.props.resetOrganizationData();

    if (this.props.match.params.id) {
      this.props.fetchOrganization(this.props.match.params.id);
    }
  }

  componentWillReceiveProps(props) {
    if (props.organization.activeStepId !== this.props.organization.activeStepId) {
      window.scrollTo(0, 0);
    }

    if (props.match.params.id && props.match.params.id !== this.props.match.params.id) {
      this.props.fetchOrganization(props.match.params.id);
    }

    if (this.props.match.params.id && !props.match.params.id) {
      this.props.resetOrganizationData();
    }
  }

  componentWillUnmount() {
    this.props.resetOrganizationData();
  }

  render() {
    if (this.props.organization.saved) {
      return <Redirect to={`/organizations/${this.props.organization.data.id}`} />;
    }

    if (this.props.organization.data.user_id && this.props.organization.data.user_id !== this.props.user.id) {
      return <Redirect to="/" />;
    }

    return (
      <Fragment>
        <div className="content">
          <div className="content__inner content__inner_medium">
            <div className="content__title">
              <h1 className="title">{this.props.match.params.id ? 'Edit' : 'Create'} Organization</h1>
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
    user: selectUser(state),
  }),
  dispatch => ({
    setOrganizationActiveTab: id => dispatch(setOrganizationActiveTab(id)),
    fetchOrganization: id => dispatch(fetchOrganization(id)),
    resetOrganizationData: () => dispatch(resetOrganizationData()),
  }),
)(OrganizationsCreatePage);
