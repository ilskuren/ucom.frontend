import React from 'react';
import UnAuthTable from './UnAuth/UnAuthTable';
import Footer from '../components/Footer';

const EventsPage = () => (
  <div className="content">
    <div className="content__inner">
      <UnAuthTable
        title="Events"
        tableTitles={['views', 'comments', 'rate']}
        onFilterClick={() => true}
        isShowMenu
        textInMiddle="How to create Event?"
      />

      <Footer />
    </div>
  </div>
);

export default EventsPage;
