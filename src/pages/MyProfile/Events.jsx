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
          className="event-title_no-footer"
          title="See how Christopher Nolan filmed those incredible Dunkirk aerial sequences"
          tags={['story']}
          rate={9200}
          daysLeft={12}
        />
      </div>
      <div className="my-profile-list__sheet my-profile-list__sheet_shift">
        <EventTitle
          imgSrc={burgerImg}
          className="event-title_high"
          title="Buy 2 burgers for the price of three, and get one for free! Or not one, maybe four, if i want"
          tags={['sale']}
          rate={9200}
          buyersCount={8923}
          buyers={[
            { avatar_filename: 'main_image_filename-1535642542960.png' },
            { avatar_filename: 'main_image_filename-1535642542960.png' },
          ]}
          team={[
            { avatar_filename: 'main_image_filename-1535642542960.png' },
            { avatar_filename: 'main_image_filename-1535642542960.png' },
            { avatar_filename: 'main_image_filename-1535642542960.png' },
            { avatar_filename: 'main_image_filename-1535642542960.png' },
            { avatar_filename: 'main_image_filename-1535642542960.png' },
            { avatar_filename: 'main_image_filename-1535642542960.png' },
          ]}
          userId={1}
          actionButtonUrl="/main_image_filename-1535642542960.png"
          actionButtonTitle="Buy now"
        />
      </div>
      <div className="my-profile-list__sheet my-profile-list__sheet_shift_large">
        <EventTitle
          imgSrc={bladeRunner}
          title="Why You're All Wrong And Blade Runner 2049 was Brilliant, Dammit"
          className="event-title_no-footer"
          tags={['story']}
          rate={9200}
        />
      </div>
      <div className="my-profile-list__sheet my-profile-list__sheet_link">
        <span>create mediapost</span>
      </div>
    </div>
  </div>
);

export default MyProfileEventsPage;
