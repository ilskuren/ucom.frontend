// TODO: Unification

import { connect } from 'react-redux';
import React, { PureComponent } from 'react';
import Tippy from '@tippy.js/react';
import UserCard from '../components/UserCard';
import { selectUser } from '../store/selectors';
import { getFileUrl } from '../utils/upload';
import { getUserName } from '../utils/user';

class OrganizationsDropdown extends PureComponent {
  select(organizationId) {
    if (typeof this.props.onSelect === 'function') {
      this.props.onSelect(organizationId);
    }

    this.tippy.hide();
  }

  render() {
    const organizationsContent = (
      <div className="organizations-dropdown__content">
        <div className="organizations-dropdown__list">
          <div
            role="presentation"
            onClick={() => this.select(null)}
            className="organizations-dropdown__item"
          >
            <UserCard
              avatarUrl={getFileUrl(this.props.user.avatarFilename)}
              userName={getUserName(this.props.user)}
              accountName={this.props.user.accountName}
            />
          </div>
          {this.props.user.organizations.map(item => (
            <div
              key={item.id}
              role="presentation"
              onClick={() => this.select(item.id)}
              className="organizations-dropdown__item"
            >
              <UserCard
                squareAvatar
                roundedAvatar
                avatarUrl={getFileUrl(item.avatarFilename)}
                userName={item.title}
                accountName={item.nickname}
              />
            </div>
          ))}
        </div>
      </div>
    );

    return (
      <div className="organizations-dropdown">
        <Tippy
          arrow
          interactive
          placement="bottom"
          trigger="click"
          theme="dropdown"
          content={organizationsContent}
          onCreate={(tippy) => { this.tippy = tippy; }}
        >
          <div className="organizations-dropdown__toggler" />
        </Tippy>
      </div>
    );
  }
}

export default connect(state => ({
  user: selectUser(state),
}))(OrganizationsDropdown);
