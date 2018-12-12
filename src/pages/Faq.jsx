import React from 'react';
import { Element } from 'react-scroll';
import PanelWrapper from '../components/Panel/PanelWrapper';
import VerticalMenu from '../components/VerticalMenu';
import LayoutBase from '../components/Layout/LayoutBase';

const Faq = () => (
  <LayoutBase>
    <div className="content">
      <div className="content__inner content__inner_medium">
        <div className="content__title content__title_between">
          <h1 className="title">FAQ</h1>
        </div>
      </div>

      <div className="content">
        <div className="content__inner">
          <div className="grid grid_settings">
            <div className="grid__item grid__item_side">
              <VerticalMenu
                sections={[
                  { name: 'General', title: 'General' },
                  { name: 'UserAgreement', title: 'User agreement' },
                  { name: 'PrivacyPolice', title: 'Privacy police' },
                  { name: 'Glossary', title: 'Glossary' },
                ]}
              />
            </div>

            <div className="grid__item grid__item_main">
              <div className="fields">
                <Element name="General" className="fields__block">
                  <div className="fields__title">
                    <h1 className="title title_small">General</h1>
                  </div>

                  <div className="content__section content__section_small">
                    <PanelWrapper
                      title="What is U.community?"
                    >
                      <div className="text_faq">
                        <p>U.community is for everyone who wants fast and reliable messaging and calls. Business users and small teams may like the large groups, usernames, desktop apps and powerful file sharing options.
                        </p>
                        <p className="note">Since U.community groups can have up to 100,000 members, we support replies, mentions and hashtags that help maintain order and keep communication in large communities efficient. You can appoint admins with advanced tools to help these communities prosper in peace. Public groups can be joined by anyone and are powerful platforms for discussions and collecting feedback.
                        </p>
                      </div>
                    </PanelWrapper>
                    <PanelWrapper
                      title="Who is U.community for?"
                    >
                      <div className="text_faq">
                        <p>U.community is for everyone who wants fast and reliable messaging and calls. Business users and small teams may like the large groups, usernames, desktop apps and powerful file sharing options.
                        </p>
                        <p>Since U.community groups can have up to 100,000 members, we support replies, mentions and hashtags that help maintain order and keep communication in large communities efficient. You can appoint admins with advanced tools to help these communities prosper in peace. Public groups can be joined by anyone and are powerful platforms for discussions and collecting feedback.
                        </p>
                      </div>
                    </PanelWrapper>
                  </div>
                </Element>
                <Element name="UserAgreement" className="fields__block">
                  <div className="fields__title">
                    <h1 className="title title_small">User agreement</h1>
                  </div>
                  <PanelWrapper
                    title="Who is U.community for?"
                  >
                    <div className="text_faq">
                      <p>U.community is for everyone who wants fast and reliable messaging and calls. Business users and small teams may like the large groups, usernames, desktop apps and powerful file sharing options.
                      </p>
                      <p>Since U.community groups can have up to 100,000 members, we support replies, mentions and hashtags that help maintain order and keep communication in large communities efficient. You can appoint admins with advanced tools to help these communities prosper in peace. Public groups can be joined by anyone and are powerful platforms for discussions and collecting feedback.
                      </p>
                    </div>
                  </PanelWrapper>
                  <PanelWrapper
                    title="Who is U.community for?"
                  >
                    <div className="text_faq">
                      <p>U.community is for everyone who wants fast and reliable messaging and calls. Business users and small teams may like the large groups, usernames, desktop apps and powerful file sharing options.
                      </p>
                      <p>Since U.community groups can have up to 100,000 members, we support replies, mentions and hashtags that help maintain order and keep communication in large communities efficient. You can appoint admins with advanced tools to help these communities prosper in peace. Public groups can be joined by anyone and are powerful platforms for discussions and collecting feedback.
                      </p>
                    </div>
                  </PanelWrapper>
                </Element>
                <Element name="PrivacyPolice" className="fields__block">
                  <div className="fields__title">
                    <h1 className="title title_small">Privacy police</h1>
                  </div>
                  <PanelWrapper
                    title="Who is U.community for?"
                  >
                    <div className="text_faq">
                      <p>U.community is for everyone who wants fast and reliable messaging and calls. Business users and small teams may like the large groups, usernames, desktop apps and powerful file sharing options.
                      </p>
                      <p>Since U.community groups can have up to 100,000 members, we support replies, mentions and hashtags that help maintain order and keep communication in large communities efficient. You can appoint admins with advanced tools to help these communities prosper in peace. Public groups can be joined by anyone and are powerful platforms for discussions and collecting feedback.
                      </p>
                    </div>
                  </PanelWrapper>
                  <PanelWrapper
                    title="Who is U.community for?"
                  >
                    <div className="text_faq">
                      <p>U.community is for everyone who wants fast and reliable messaging and calls. Business users and small teams may like the large groups, usernames, desktop apps and powerful file sharing options.
                      </p>
                      <p>Since U.community groups can have up to 100,000 members, we support replies, mentions and hashtags that help maintain order and keep communication in large communities efficient. You can appoint admins with advanced tools to help these communities prosper in peace. Public groups can be joined by anyone and are powerful platforms for discussions and collecting feedback.
                      </p>
                    </div>
                  </PanelWrapper>
                </Element>
                <Element name="Glossary" className="fields__block">
                  <div className="fields__title">
                    <h1 className="title title_small">Glossary</h1>
                  </div>
                  <PanelWrapper
                    title="Who is U.community for?"
                  >
                    <div className="text_faq">
                      <p>U.community is for everyone who wants fast and reliable messaging and calls. Business users and small teams may like the large groups, usernames, desktop apps and powerful file sharing options.
                      </p>
                      <p>Since U.community groups can have up to 100,000 members, we support replies, mentions and hashtags that help maintain order and keep communication in large communities efficient. You can appoint admins with advanced tools to help these communities prosper in peace. Public groups can be joined by anyone and are powerful platforms for discussions and collecting feedback.
                      </p>
                    </div>
                  </PanelWrapper>
                  <PanelWrapper
                    title="Who is U.community for?"
                  >
                    <div className="text_faq">
                      <p>U.community is for everyone who wants fast and reliable messaging and calls. Business users and small teams may like the large groups, usernames, desktop apps and powerful file sharing options.
                      </p>
                      <p>Since U.community groups can have up to 100,000 members, we support replies, mentions and hashtags that help maintain order and keep communication in large communities efficient. You can appoint admins with advanced tools to help these communities prosper in peace. Public groups can be joined by anyone and are powerful platforms for discussions and collecting feedback.
                      </p>
                    </div>
                  </PanelWrapper>
                </Element>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </LayoutBase>
);

export default Faq;
