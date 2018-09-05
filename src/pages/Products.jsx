import React from 'react';
import UnAuthTable from './UnAuth/UnAuthTable';

const ProductsPage = () => (
  <div className="content">
    <div className="content__inner">
      <UnAuthTable
        title="Products"
        tableTitles={['joined', 'followers', 'trusted by', 'rate']}
        onFilterClick={() => true}
        textInMiddle="How to Create Product?"
      />
    </div>
  </div>
);

export default ProductsPage;
