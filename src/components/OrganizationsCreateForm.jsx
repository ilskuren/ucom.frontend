import { connect } from 'react-redux';
import React from 'react';
import VerticalMenu from './VerticalMenu';
import TextInput from './TextInput';
import UserSearchInput from './UserSearchInput';
import UserCard from './UserCard';
import Textarea from './Textarea';
import { setOrganizationActiveTab } from '../actions';
import { getUserName, getUserUrl } from '../utils/user';
import { getFileUrl } from '../utils/upload';

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
                  <div className="field__label">@organization slug</div>
                  <div className="field__input">
                    <TextInput placeholder="@kickbnb" />
                  </div>
                </div>
              </div>

              <div className="fields__item">
                <div className="field">
                  <div className="field__label">Asset to show</div>
                  <div className="field__input">
                    <TextInput placeholder="Example Kickcoin" />
                  </div>
                </div>
              </div>

              <div className="fields__item">
                <div className="field">
                  <div className="field__label">On board</div>
                  <div className="field__input">
                    <div className="field__section">
                      <UserSearchInput
                        isMulti
                        isSearchable
                        isClearable
                        isUserOptions
                      />
                    </div>
                    <div className="field__section">
                      <UserCard
                        userName={getUserName(props.user)}
                        userPosition="Author"
                        accountName={props.user.accountName}
                        avatarUrl={getFileUrl(props.user.avatarFilename)}
                        profileLink={getUserUrl(props.user.id)}

                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="fields__item">
                <div className="field">
                  <div className="field__label">Powered by</div>
                  <div className="field__input">
                    <TextInput placeholder="EOS" />
                  </div>
                </div>
              </div>

              <div className="fields__item">
                <div className="field">
                  <div className="field__label">Your idea</div>
                  <div className="field__input">
                    <Textarea placeholder="Type something..." />
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
    user: state.user,
  }),
  dispatch => ({
    setOrganizationActiveTab: tabId => dispatch(setOrganizationActiveTab(tabId)),
  }),
)(OrganizationsCreatePage);
