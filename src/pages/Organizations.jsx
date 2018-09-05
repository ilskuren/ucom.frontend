import React from 'react';
import UnAuthTable from './UnAuth/UnAuthTable';

const OrganizationsPage = () => (
  <div className="content">
    <div className="content__inner">
      <UnAuthTable
        title="Organizations"
        tableTitles={['joined', 'followers', 'trusted by', 'rate']}
        onFilterClick={() => true}
        textInMiddle="How to Create Organization?"
      />
    </div>
  </div>
);

export default OrganizationsPage;
