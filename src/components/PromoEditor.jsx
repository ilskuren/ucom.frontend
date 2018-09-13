import React from 'react';

const PromoEditor = () => (
  <div className="promo-editor">
    <div className="promo-editor__title">
      <h1 className="title">Ur ideas and offers valued</h1>
    </div>
    <div className="promo-editor__text">
      Value — your relevance, relations, measured by the community and registered on the blockchain. Your value equals coin emission that you recieve.
    </div>
    <div className="promo-editor__tabs">
      <div className="promo-tabs">
        <div className="promo-tabs__item promo-tabs__item_active">
          Media-posts
        </div>
        <div className="promo-tabs__item">
          Offers
        </div>
      </div>
    </div>
    <div className="promo-editor__sub-text">
      Ideas, Knowledge sharing and opinions fuel the world. Share your stories, polls, forecasts,  and get immediate response.
    </div>
  </div>
);

export default PromoEditor;
