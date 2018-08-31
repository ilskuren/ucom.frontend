import React from 'react';
import cn from 'classnames';
import EventTitle from '../../components/EventTitle';
import burgerImg from './images/burger.png';
import dunkirkImg from './images/dunkirk.png';
import bladeRunner from './images/blade-runner.png';

const MyProfileEventsPage = () => (
  <div className="my-profile-list">
    <div className="my-profile-list__filters">
      <div className={cn(
        'my-profile-list__filters-element',
        { 'my-profile-list__filters-element_active': true },
        )}
      >All
      </div>
      <div className="my-profile-list__filters-element">All</div>
      <div className="my-profile-list__filters-element">My</div>
      <div className="my-profile-list__filters-element">On board</div>
      <div className="my-profile-list__filters-element">Trusted by me</div>
      <div className="my-profile-list__filters-element">Followed</div>
      <div className="my-profile-list__filters-element">Joined</div>
    </div>
    <div className="my-profile-list__sheets">
      <div className="my-profile-list__sheet my-profile-list__sheet_shift_large">
        <EventTitle
          imgSrc={dunkirkImg}
          className="event-title_high event-title_no-footer"
          text="See how Christopher Nolan filmed those incredible Dunkirk aerial sequences"
        />
      </div>
      <div className="my-profile-list__sheet my-profile-list__sheet_shift_small">
        <EventTitle
          imgSrc={burgerImg}
          className="event-title_high"
          text="Buy 2 burgers for the price of three, and get one for free! Or not one, maybe four, if i want"
          buyers="8 923"
        />
      </div>
      <div className="my-profile-list__sheet my-profile-list__sheet_shift_medium">
        <EventTitle
          imgSrc={bladeRunner}
          text="Why You're All Wrong And Blade Runner 2049 was Brilliant, Dammit"
          className="event-title_no-footer"
        />
      </div>
      <div className="my-profile-list__sheet my-profile-list__sheet_link">
        <span>create mediapost</span>
      </div>
    </div>
  </div>
);

export default MyProfileEventsPage;
