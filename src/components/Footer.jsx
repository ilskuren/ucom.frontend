import React from 'react';
// import IconFacebook from './Icons/Socials/Facebook';
// import IconTwitter from './Icons/Socials/Twitter';
// import IconLinkedin from './Icons/Socials/Linkedin';
// import IconTelegram from './Icons/Socials/Telegram';

const Footer = () => (
  <div className="footer">
    <div className="toolbar toolbar_responsive">
      {/* <div className="toolbar__main">
        <div className="inline inline_large">
          <div className="inline__item">
            <a href="#">
              <IconFacebook />
            </a>
          </div>
          <div className="inline__item">
            <a href="#">
              <IconTwitter />
            </a>
          </div>
          <div className="inline__item">
            <a href="#">
              <IconLinkedin />
            </a>
          </div>
          <div className="inline__item">
            <a href="#">
              <IconTelegram />
            </a>
          </div>
        </div>
      </div> */}
      <div className="toolbar__side">
        <nav className="menu menu_footer">
          {/* <div className="menu__item">
            <a href="#" className="menu__link">Assets</a>
          </div>
          <div className="menu__item">
            <a href="#" className="menu__link">FAQ</a>
          </div>
          <div className="menu__item">
            <a href="#" className="menu__link">U Token</a>
          </div> */}
          <div className="menu__item">
            <a href="#" className="menu__link">About</a>
          </div>
        </nav>
      </div>
    </div>
  </div>
);

export default Footer;
