
import React from 'react';
import PostItem from '../../components/PostItem';
import CommentsStub from '../../components/CommentsStub';
import poster from './images/poster.png';

const StoryPage = () => (
  <div className="posts">
    <div className="posts__content">
      <div className="posts__title">
        <PostItem
          title="No Country for Old Men, aren't it"
          tag="story"
          rate={9200}
          size="big"
          edit
        />
      </div>
      <div className="posts__lead-text">
        The development continues Coinbases 2018 hiring spree. Since the start of the year, the company has hired Tina Bhatnagar to serve as vice president of operations and technology;
      </div>
      <div className="posts__text">
        <div className="posts__poster">
          <img src={poster} alt="poster" className="posts__poster-img"/>
        </div>
        Emilie Choi as its vice president of corporate and business development; Eric Soto as vice president of finance; Rachael Horwitz as vice president of communications; Alesia Haas as its new chief financial officer; and Jeff Horowitz as its chief compliance officer, among others.
        <br />
        <br />
        With Wagner, Coinbase is beefing up its engineering team, which the AWS vet will help grow, according to Coinbase.
        <br />
        <br />
        Engineering is central to our mission of creating an open financial system for the world. It is core to our strategy to deliver the most trusted and easiest to use cryptocurrency products and services. We have built an amazing engineering team at a Coinbase, one which Tim will now lead and expand, Coinbase CEO Brian Armstrong wrote in a blog post announcing the hire.
      </div>
      <div className="posts__comments">
        <CommentsStub />
      </div>
    </div>
    <div className="posts__sidebar">
      Sidebar
    </div>
  </div>
);

export default StoryPage;
