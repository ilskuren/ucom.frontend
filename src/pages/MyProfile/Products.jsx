import React from 'react';
import cn from 'classnames';
import MyProfileItems from '../../components/MyProfileItems';

const MyProfileProductsPage = () => (
  <div className="my-profile-list">
    <div className="my-profile-list__filters">
      <div className={cn(
        'my-profile-list__filters-element',
        { 'my-profile-list__filters-element_active': true },
        )}
      >All
      </div>
      <div className="my-profile-list__filters-element">My</div>
      <div className="my-profile-list__filters-element">On board</div>
      <div className="my-profile-list__filters-element">Trusted by me</div>
      <div className="my-profile-list__filters-element">Followed</div>
      <div className="my-profile-list__filters-element">Joined</div>
    </div>
    <MyProfileItems bottomLabel="create product" />
  </div>
);

export default MyProfileProductsPage;
