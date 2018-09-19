import React from 'react';
import PropTypes from 'prop-types';
import IconLink from '../Link';
import TwitterIcon from './Twitter';
import FacebookIcon from './Facebook';
import RedditIcon from './Reddit';
import MediumIcon from './Medium';
import TelegramIcon from './Telegram';
import LinkedinIcon from './Linkedin';

const socialIcons = [
  { regExp: /(facebook|fb)/, icon: <FacebookIcon /> },
  { regExp: /twitter/, icon: <TwitterIcon /> },
  { regExp: /reddit/, icon: <RedditIcon /> },
  { regExp: /medium/, icon: <MediumIcon /> },
  { regExp: /linkedin/, icon: <LinkedinIcon /> },
  { regExp: /telegram/, icon: <TelegramIcon /> },
];

const SocialIcon = (props) => {
  const foundIcon = socialIcons.find(item => item.regExp.test(props.sourceUrl));
  if (foundIcon) {
    return foundIcon.icon;
  }
  return <IconLink />;
};

SocialIcon.propTypes = {
  sourceUrl: PropTypes.string,
};

export default SocialIcon;
