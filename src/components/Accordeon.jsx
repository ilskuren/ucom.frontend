import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import UserOption from './UserOption';
import IconPlus from './Icons/Plus';
import IconMinus from './Icons/Minus';

const Accordeon = ({
  label, isOpened,
}) => (
  <div className="accordeon">
    <div className="accordeon__input">
      <div className="accordeon__label">{label}</div>
      <div className="accordeon__friends-number">235 friends</div>
      { !isOpened &&
        <div className="accordeon__add">
          <IconPlus />
        </div>
      }
      { isOpened &&
        <div className="accordeon__delete">
          <IconMinus />
        </div>
      }
    </div>
    { isOpened &&
      <div className={classNames('accordeon__friends-list', { 'accordeon__friends-list_open': isOpened })}>
        <UserOption name="Bruce Wayne" linkColor="red" linkText="Invite" />
        <UserOption name="Bruce Wayne" linkColor="red" linkText="Invite" />
        <UserOption name="Bruce Wayne" linkColor="red" linkText="Invite" />
        <UserOption name="Bruce Wayne" linkColor="red" linkText="Invite" />
        <UserOption name="Bruce Wayne" linkText="Invite sent" />
      </div>
    }
  </div>
);


Accordeon.propTypes = {
  label: PropTypes.string,
  isOpened: PropTypes.bool,
};

export default Accordeon;
