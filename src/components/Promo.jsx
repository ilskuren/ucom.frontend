import { Link } from 'react-router-dom';
import React from 'react';
import kirillRomanov from '../static/img/kirill-romanov.jpeg';
import bradleyNelson from '../static/img/bradley-nelson.jpeg';
import mikaOhara from '../static/img/mika-ohara.jpeg';
import PromoEditor from './PromoEditor';

const Promo = () => (
  <div className="promo">
    <div className="promo__section">
      <div className="promo__inner">
        <div className="promo-about">
          <div className="promo-about__title">
            <h1 className="title">A place for you and your audience on the blockchain with a human face.</h1>
          </div>
          <div className="promo-about__text">
            <p>Unite with other people, communicate, share your ideas and get feedback. Build your own community with u°os-based social rating that distributes a real financial value.</p>
          </div>
          <div className="promo-about__action">
            <Link className="button button_upper button_theme_red button_size_big button_stretched" to="/signup">Get started</Link>
          </div>
        </div>
      </div>
    </div>

    <div className="promo__section">
      <div className="promo-users-icons">
        <div className="promo-users-icons__item promo-users-icons__item_u">
          <div className="promo-icon promo-icon_u" />
        </div>

        <div className="promo-users-icons__item promo-users-icons__item_kirill-romanov">
          <div className="promo-user">
            <div className="toolbar">
              <div className="toolbar__side">
                <div className="promo-user__avatar">
                  <img src={kirillRomanov} alt="" />
                </div>
              </div>
              <div className="toolbar__main">
                <div className="promo-user__name">Kirill Romanov</div>
                <div className="promo-user__rate">10 283°</div>
              </div>
            </div>
          </div>
        </div>

        <div className="promo-users-icons__item promo-users-icons__item_bradley-nelson">
          <div className="promo-user">
            <div className="toolbar">
              <div className="toolbar__side">
                <div className="promo-user__avatar promo-user__avatar_small">
                  <img src={bradleyNelson} alt="" />
                </div>
              </div>
              <div className="toolbar__main">
                <div className="promo-user__name">Bradley Nelson</div>
                <div className="promo-user__rate">6 800°</div>
              </div>
            </div>
          </div>
        </div>

        <div className="promo-users-icons__item promo-users-icons__item_mika-ohara">
          <div className="promo-user">
            <div className="toolbar">
              <div className="toolbar__side">
                <div className="promo-user__avatar promo-user__avatar_medium">
                  <img src={mikaOhara} alt="" />
                </div>
              </div>
              <div className="toolbar__main">
                <div className="promo-user__name">Mika O’Hara</div>
                <div className="promo-user__rate">13 800°</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="promo__inner promo__inner_users">
        <div className="promo-users">
          <div className="promo-users__title">
            <h1 className="title">Become an opinion leader</h1>
          </div>

          <div className="promo-features">
            <div className="promo-features__item">
              <div className="promo-features__icon promo-features__icon_content" />
              <h2 className="promo-features__title">Create Content</h2>
              <ul className="promo-features__list">
                <li className="promo-features__list-item">Media-Posts</li>
                <li className="promo-features__list-item">Offers</li>
                <li className="promo-features__list-item">Fill your feed</li>
              </ul>
            </div>

            <div className="promo-features__item">
              <div className="promo-features__icon promo-features__icon_users" />
              <h2 className="promo-features__title">Engage And Interact</h2>
              <ul className="promo-features__list">
                <li className="promo-features__list-item">Follow other members</li>
                <li className="promo-features__list-item">Upvote or Downvote</li>
                <li className="promo-features__list-item">Share Content</li>
              </ul>
            </div>
          </div>

          <h3 className="promo-users__sub-title">Convert Your Value° Into Currency</h3>

          <div className="promo-users__action">
            <Link className="button button_upper button_theme_red button_size_big button_stretched" to="/signup">Get started</Link>
          </div>
        </div>
      </div>
    </div>

    <div className="promo__section">
      <div className="promo__inner">
        <PromoEditor />
      </div>
    </div>
  </div>
);

export default Promo;
