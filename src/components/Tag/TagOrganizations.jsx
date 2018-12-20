import React from 'react';
import OrganizationList from '../Organization/OrganizationList';

const ORGANIZATION_LIMIT = 5;

const TagOrganizations = (props) => {
  if (!props.orgs) {
    return null;
  }

  return (
    <div className="user-section">
      <div className="user-section__title">
        <h2 className="title title_xxsmall title_medium">
          Organizations&nbsp;
          {props.orgsAmount > ORGANIZATION_LIMIT && <em>{props.orgsAmount}</em>}
        </h2>
      </div>

      <OrganizationList
        limit={ORGANIZATION_LIMIT}
        organizationsIds={props.orgs.map(item => item.id)}
      />
    </div>
  );
};

export default TagOrganizations;
