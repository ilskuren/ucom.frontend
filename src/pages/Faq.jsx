import React from 'react';
import { Link } from 'react-router-dom';
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
                sticky
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
                        <p>U°Community is a dapp on the U°OS blockchain. U°Community allows you to create content, interact with people, use dapps, run your business, govern Decentralized Autonomous Organizations (DAO) and Decentralized Autonomous Communities (DAC) and many other things.
                          Your contributions to the network through U°Community are decentrally weighed by the community. The resulting weight of your contributions is your influence score called Importance. Your Importance is your digital asset.
                        </p>
                      </div>
                    </PanelWrapper>
                    <PanelWrapper
                      title="How can people interact on the platform?"
                    >
                      <div className="text_faq">
                        <p>People on the U°Community platform can interact with each other using:</p>
                      </div>
                    </PanelWrapper>
                    <PanelWrapper
                      title="What can I do as an unregistered user?"
                    >
                      <div className="text_faq">
                        <p>You can see all the content produced by other users on the entirety of U°Community.</p>
                      </div>
                    </PanelWrapper>
                    <PanelWrapper
                      title="What can I do as a registered user?
                      "
                    >
                      <div className="text_faq">
                        <p>You can see all the content produced by other users and interact with other users and content.</p>
                        <p>You can create your own content.</p>
                        <p>Other users will be able to interact with your profile and with your content.</p>
                        <p>You can shape your own interests by following the people and communities you like.</p>
                        <p>You can interact with all the content on the platform: like, comment and share posts, sell and purchase goods and services via offers, run and join [Decentralized Autonomous Communities](LINKtoGlossaryDAC) and [Decentralized Autonomous Organizations](LINKtoGlossaryDAO).</p>
                        <p>You can transfer funds to other registered users. </p>
                        <p>You can (and should) vote for Block Producers and Calculator Nodes on the  <Link className="auth__link" target="_blank" to="/governance"> governance page. </Link></p>
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
