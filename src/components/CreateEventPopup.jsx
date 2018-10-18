import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import React from 'react';

const CreateEventPopup = ({ onClickClose }) => (
  <div className="create-event-popup">
    <div className="create-event-popup__caption">
      <h2 className="create-event-popup__caption_text">What event do you <br /> want to create? </h2>
    </div>
    <div className="create-event-popup__container">
      <Link onClick={onClickClose} to="/posts/new/1" className="create-event-popup__block">
        <strong className="create-event-popup__block_link"> Create Media Post</strong>
      </Link>
      <Link onClick={onClickClose} to="/posts/new/2" className="create-event-popup__block">
        <strong className="create-event-popup__block_link"> Create Offer</strong>
      </Link>
    </div>
  </div>
);
export default withRouter(CreateEventPopup);
