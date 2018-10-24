import { connect } from 'react-redux';
import React, { PureComponent } from 'react';
import { Tooltip } from 'react-tippy';
import UserCard from '../components/UserCard';
import { selectUser } from '../store/selectors';
import { getFileUrl } from '../utils/upload';
import { getUserName } from '../utils/user';

class OrganizationsDropdown extends PureComponent {
  state = {
    tooltipIsVisible: false,
  }

  hideTooltip = () => {
    this.setState({ tooltipIsVisible: false });
  }

  showTooltip = () => {
    this.setState({ tooltipIsVisible: true });
  }

  triggerTooltip = () => (
    this.state.tooltipIsVisible ? this.hideTooltip() : this.showTooltip()
  );

  select(organizationId) {
    if (typeof this.props.onSelect === 'function') {
      this.props.onSelect(organizationId);
    }

    this.hideTooltip();
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
          {(this.props.user.organizations || []).map(item => (
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
        <Tooltip
          arrow
          useContext
          open={this.state.tooltipIsVisible}
          onRequestClose={this.hideTooltip}
          interactive
          position="bottom"
          trigger="click"
          theme="dropdown"
          html={organizationsContent}
        >
          <div onClick={this.triggerTooltip} className="organizations-dropdown__toggler" role="presentation" />
        </Tooltip>
      </div>
    );
  }
}

export default connect(state => ({
  user: selectUser(state),
}))(OrganizationsDropdown);
