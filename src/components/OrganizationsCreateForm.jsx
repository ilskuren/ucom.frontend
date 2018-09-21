import { connect } from 'react-redux';
import React from 'react';
import VerticalMenu from './VerticalMenu';
import TextInput from './TextInput';
// import UserSearchInput from './UserSearchInput';
// import UserCard from './UserCard';
import Textarea from './Textarea';
import Button from './Button';
import DropZone from './DropZone';
import Avatar from './Avatar';
import AvatarFromFile from './AvatarFromFile';
import {
  setOrganizationActiveTab,
  setOrganizationData,
  setOrganizationActiveSection,
  createOrganization,
} from '../actions';
// import { getUserName, getUserUrl } from '../utils/user';
import { getFileUrl } from '../utils/upload';

const OrganizationsCreatePage = (props) => {
  switch (props.organization.activeStepId) {
    case 2: {
      return (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            props.createOrganization(props.organization.data);
          }}
        >
          <div className="grid grid_settings">
            <div className="grid__item grid__item_side">
              <VerticalMenu
                sections={[
                  { name: 'PersonalNeworks', title: 'Personal Neworks' },
                  // { name: 'SocialNetworks', title: 'Social Networks' },
                ]}
              />
            </div>
            <div className="grid__item grid__item_main">
              <div className="fields">
                <div className="fields__title">
                  <h1 className="title title_small">Personal networks</h1>
                </div>

                <div className="fields__item">
                  <div className="field">
                    <div className="field__label">Email</div>
                    <div className="field__input">
                      <TextInput
                        value={props.organization.data.email}
                        onChange={email => props.setOrganizationData({ email })}
                        error={props.organization.errors.email && props.organization.errors.email[0]}
                      />
                    </div>
                  </div>
                </div>

                <div className="fields__item">
                  <div className="field">
                    <div className="field__label">Phone number</div>
                    <div className="field__input">
                      <TextInput
                        value={props.organization.data.phone_number}
                        onChange={phone_number => props.setOrganizationData({ phone_number })}
                        error={props.organization.errors.phone_number && props.organization.errors.phone_number[0]}
                      />
                    </div>
                  </div>
                </div>

                <div className="fields__item">
                  <div className="field">
                    <div className="field__label">Your web-site</div>
                    <div className="field__input">
                      <TextInput
                        value={props.organization.data.personal_website_url}
                        onChange={personal_website_url => props.setOrganizationData({ personal_website_url })}
                        error={props.organization.errors.personal_website_url && props.organization.errors.personal_website_url[0]}
                      />
                    </div>
                  </div>
                </div>

                <div className="fields__item">
                  <div className="field">
                    <div className="field__label" />
                    <div className="field__input">
                      <Button type="submit" text="FINISH" theme="red" size="big" isDisabled={!props.organization.isValid} isStretched />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      );
    }

    default: {
      return (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            props.setOrganizationActiveTab(2);
          }}
        >
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
                  <div className="field field_avatar">
                    <div className="field__label">
                      <div className="field__section">Logotype</div>
                      <div className="field__section">
                        {props.organization.data.avatar_filename && typeof props.organization.data.avatar_filename === 'object' ? (
                          <AvatarFromFile square rounded size="big" file={props.organization.data.avatar_filename} />
                        ) : (
                          <Avatar square rounded size="big" src={getFileUrl(props.organization.data.avatar_filename)} />
                        )}
                      </div>
                    </div>
                    <div className="field__input">
                      <div className="field__section">
                        <DropZone
                          onDrop={files => props.setOrganizationData({ avatar_filename: files[0] })}
                          text="Add or drag img"
                        />
                      </div>
                      <div className="field__section">
                        <div className="field__hint">
                          You can upload an image in JPG or PNG format. Size is not more than 10 mb.
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="fields__item">
                  <div className="field">
                    <div className="field__label">Organization name</div>
                    <div className="field__input">
                      <TextInput
                        placeholder="Type something..."
                        value={props.organization.data.title}
                        onChange={title => props.setOrganizationData({ title })}
                        error={props.organization.errors.title && props.organization.errors.title[0]}
                      />
                    </div>
                  </div>
                </div>

                <div className="fields__item">
                  <div className="field">
                    <div className="field__label">@organization slug</div>
                    <div className="field__input">
                      <TextInput
                        placeholder="@kickbnb"
                        value={props.organization.data.nickname}
                        onChange={nickname => props.setOrganizationData({ nickname })}
                        error={props.organization.errors.nickname && props.organization.errors.nickname[0]}
                      />
                    </div>
                  </div>
                </div>

                <div className="fields__item">
                  <div className="field">
                    <div className="field__label">Asset to show</div>
                    <div className="field__input">
                      <TextInput
                        placeholder="Example Kickcoin"
                        value={props.organization.data.currency_to_show}
                        onChange={currency_to_show => props.setOrganizationData({ currency_to_show })}
                        error={props.organization.errors.currency_to_show && props.organization.errors.currency_to_show[0]}
                      />
                    </div>
                  </div>
                </div>

                {/* <div className="fields__item">
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
                </div> */}

                <div className="fields__item">
                  <div className="field">
                    <div className="field__label">Powered by</div>
                    <div className="field__input">
                      <TextInput
                        placeholder="EOS"
                        value={props.organization.data.powered_by}
                        onChange={powered_by => props.setOrganizationData({ powered_by })}
                        error={props.organization.errors.powered_by && props.organization.errors.powered_by[0]}
                      />
                    </div>
                  </div>
                </div>

                <div className="fields__item">
                  <div className="field">
                    <div className="field__label">Your idea</div>
                    <div className="field__input">
                      <Textarea
                        placeholder="Type something..."
                        rows={4}
                        value={props.organization.data.about}
                        onChange={about => props.setOrganizationData({ about })}
                        error={props.organization.errors.about && props.organization.errors.about[0]}
                      />
                    </div>
                  </div>
                </div>

                <div className="fields__title">
                  <h1 className="title title_small">Location</h1>
                </div>

                <div className="fields__item">
                  <div className="field">
                    <div className="field__label">Country</div>
                    <div className="field__input">
                      <TextInput
                        value={props.organization.data.country}
                        onChange={country => props.setOrganizationData({ country })}
                        error={props.organization.errors.country && props.organization.errors.country[0]}
                      />
                    </div>
                  </div>
                </div>

                <div className="fields__item">
                  <div className="field">
                    <div className="field__label">City</div>
                    <div className="field__input">
                      <TextInput
                        value={props.organization.data.city}
                        onChange={city => props.setOrganizationData({ city })}
                        error={props.organization.errors.city && props.organization.errors.city[0]}
                      />
                    </div>
                  </div>
                </div>

                <div className="fields__item">
                  <div className="field">
                    <div className="field__label">Address</div>
                    <div className="field__input">
                      <TextInput
                        subtext="Actual address. Example: One Apple Park Way, Cupertino, CA 95014, USA"
                        value={props.organization.data.address}
                        onChange={address => props.setOrganizationData({ address })}
                        error={props.organization.errors.address && props.organization.errors.address[0]}
                      />
                    </div>
                  </div>
                </div>

                <div className="fields__item">
                  <div className="field">
                    <div className="field__label" />
                    <div className="field__input">
                      <Button type="submit" text="PROCEED" theme="red" size="big" isDisabled={!props.organization.isValid} isStretched />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
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
    setOrganizationData: data => dispatch(setOrganizationData(data)),
    setOrganizationActiveSection: sectionId => dispatch(setOrganizationActiveSection(sectionId)),
    createOrganization: data => dispatch(createOrganization(data)),
  }),
)(OrganizationsCreatePage);
