import React from 'react';
import UnAuthTable from './UnAuth/UnAuthTable';
import Footer from '../components/Footer';

const events = Array.from({ length: 8 }, () => (
  {
    profileCardData: {
      profileName: 'No Country for Old Man, aren\'t it?',
      accountName: 'story',
      avatarUrl: 'https://cdn-images-1.medium.com/fit/c/300/300/1*28Gx-SixWGfev_WLLuCfhg.jpeg',
    },
    views: 110231,
    comments: 1322213,
    rate: 12800,
  }));

const EventsPage = () => (
  <div className="content">
    <div className="content__inner">
      <UnAuthTable
        title="Events"
        tableTitles={['views', 'comments', 'rate']}
        onFilterClick={() => true}
        isShowMenu
        textInMiddle="How to create Event?"
        tableData={events}
      />

      <Footer />
    </div>
  </div>
);

export default EventsPage;
