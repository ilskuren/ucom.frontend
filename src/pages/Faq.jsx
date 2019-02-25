import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Element } from 'react-scroll';
import { throttle } from 'lodash';
import Panel from '../components/Panel/Panel';
import VerticalMenu from '../components/VerticalMenu';
import LayoutBase from '../components/Layout/LayoutBase';
import { calculateClosestTo0, getKeyByValue } from '../utils/text';

const Faq = () => {
  const [openedQuestions, setOpenedQuestions] = useState([]);
  const [activeSectionName, setActiveFaqSectionName] = useState('');

  const PanelWrapper = (props) => {
    const index = openedQuestions.indexOf(props.title);
    const active = index > -1;
    return (
      <Panel
        title={props.title}
        active={active}
        id={props.title.replace(/ /g, '_')}
        onClickToggler={() => {
          if (active) {
            setOpenedQuestions([...openedQuestions].filter((_, i) => index !== i));
          } else {
            setOpenedQuestions([...openedQuestions, props.title]);
          }
        }}
      >
        {props.children}
      </Panel>
    );
  };

  const FAQLink = props => <a className="auth__link" href={`#${props.name.replace(/ /g, '_')}`} onClick={() => setOpenedQuestions([...openedQuestions, props.name])}>{props.children}</a>;

  const onScroll = () => {
    const UCommunity = (document.querySelector('[name="U°Community"]').offsetTop - window.scrollY) + 150;
    const UOS = document.querySelector('[name="U°OS"]').offsetTop - window.scrollY - 115;
    const Glossary = document.querySelector('[name="Glossary"]').offsetTop - window.scrollY - 115;
    const tabs = { 'U°Community': UCommunity, 'U°OS': UOS, Glossary };
    const sectionName = getKeyByValue(tabs, 0) ? getKeyByValue(tabs, 0) : getKeyByValue(tabs, calculateClosestTo0([UCommunity, UOS, Glossary]));

    if (sectionName !== activeSectionName) {
      setActiveFaqSectionName(sectionName);
    }
  };

  const throttledOnScroll = throttle(onScroll, 250);

  useEffect(() => {
    window.addEventListener('scroll', throttledOnScroll);
    return () => window.removeEventListener('scroll', throttledOnScroll);
  });

  return (
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
                    { name: 'U°Community', title: 'U°Community' },
                    { name: 'U°OS', title: 'U°OS' },
                    { name: 'Glossary', title: 'Glossary' },
                  ]}
                  sticky
                  activeSectionName={activeSectionName}
                />
              </div>

              <div className="grid__item grid__item_main">
                <div className="fields">
                  <Element name="U°Community" className="fields__block">
                    <div className="fields__title">
                      <h1 className="title title_small">U°Community</h1>
                    </div>

                    <div className="content__section content__section_small" id="question-1">
                      <PanelWrapper
                        title="What is U°community?"
                      >
                        <div className="text_faq">
                          <p>U°Community is an interface for social interaction integrated to U°OS blockchain. It is a platform for decentralized autonomous communities (DAC) and organizations (DAO) powered by U°OS governance model, reputation system and dynamic emission algorithm. 
                          </p>
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
                        title="What can I do as a registered user?"
                      >
                        <div className="text_faq">
                           <li>Consume content</li>
                           <li>Create content</li>
                           <li>Spread content</li>
                           <li>Interact with others</li>
                           <li>Shape your own interests by following the people and communities you like</li>
                           <li>Join communities and organizations</li>
                           <li>Create new communities and organizations</li>
                           <li>Vote for any initiatives</li>
                           <li>Vote for <FAQLink name="Block Producer">Block Producers</FAQLink> and <FAQLink name="Calculator Node">Calculator Nodes</FAQLink></li>
                           <li>Become a delegate</li>
                           <li>Get UOS token emission in accordance with your <FAQLink name="Importance">Importance</FAQLink></li>
                           <li>Use UOS token for transferring, trading computing resources (Network Bandwidth, CPU, RAM), trading goods and services, voting, increasing importance, etc.</li>                          
                        </div>
                      </PanelWrapper>
                      <PanelWrapper
                        title="How can I interact on the platform?"
                      >
                        <div className="text_faq">
                            <li>Follow – To subscribe to other users’ feed</li>
                            <li>Join — To join <FAQLink name="Community">Community</FAQLink></li>
                            <li>Trust — To express trust to other accounts: People and <FAQLink name="Organization">Organizations</FAQLink></li>
                            <li>Share – To share other users’ content with your followers by adding it in your personal feed with a short preview and a link</li>
                            <li>Comment - To express an opinion on other users’ content</li>
                            <li>Reply - To reply to comments</li>
                            <li>Upvote — To like other users’ content by sharing value to their posts with your Importance</li>
                            <li>Downvote — To dislike other users’ content</li>
                          </ul>
                        </div>
                      </PanelWrapper>
                      <PanelWrapper
                        title="What does the degree sign mean?"
                      >
                        <div className="text_faq">
                          <p>If you see the degree sign above a publication, profile, community, organization or any other entity, it means that this entity has a measurable rate of <FAQLink name="Importance">Importance</FAQLink></p>
                        </div>
                      </PanelWrapper>
                     <PanelWrapper
                        title="How does the U°community rating work?"
                      >
                        <div className="text_faq">
                          <p>U°community rating is a practical implementation of U°OS reputation system powered by DPoI consensus algorithm. The rating reflects importance of each account which is algorithmically calculated based on its stake, social activity and transfer activity. The rate of importance determines your (or your community/organization) weight on the platform, which is reflected in the power of vote, the share of UOS token emission, etc. The rating is dynamic so it can increase and decrease in accordance with the activity of an account and the network as a whole. 
                             Here is the practical example of how does the rating work: https://u.community/posts/3994</p>
                        </div>
                      </PanelWrapper>
                     <PanelWrapper
                        title="Is this raing a sort of that Black Mirror episode depicted?"
                      >
                        <div className="text_faq">
                          <p>It is opposite. That Black Mirror episode (“Nosedive”) illustrates a dystopian example of a total surveillance system. It shows what would happen if a centralized authority used social rating for control. However, within a peer-to-peer environment social rating is useful primarily for people.</p>
                          <p>U°Community is based on the fundamental belief that an individual is sovereign over ownself. It means that you voluntarily decide what to do within a community, what data to share and nobody has any control over you besides yourself and your community. U°OS and U°Community are decentralized and not belong to any authority.</p>
                        </div>
                      </PanelWrapper>
                      <PanelWrapper
                        title="How to sign up for U°community? What information do you need?"
                      >
                        <div className="text_faq">
                          <p>You can register by clicking SIGN IN —&gt; Create one in the header.</p>
                          <p>You need to generate a <FAQLink name="Account">unique account name</FAQLink> and save the <FAQLink name="Brainkey">Brainkey</FAQLink> in any convenient way. If you lose your Brainkey, your account will be lost. Please take your time to properly save and secure the Brainkey.</p>
                        </div>
                      </PanelWrapper>
                      <PanelWrapper
                        title="Can I change or recover my password?"
                      >
                        <div className="text_faq">
                          <p>No. Your U°Community account is an account on U°OS blockchain that you can only access with your <FAQLink name="Brainkey">brainkey</FAQLink>. Nobody but you has access to it.</p>
                        </div>
                      </PanelWrapper>
                      <PanelWrapper
                        title="What entities can I create?"
                      >
                        <div className="text_faq">
                          <p>Once you sign up for the platform, your personal user profile will be created. After that you can create:</p>
                          <ul>
                            <li>
                            Community profile – you can invite other users of the platform to the Community Board. See also <FAQLink name="Community">DAC</FAQLink>.
                            </li>
                            <li>
                            Organization profile — you can invite other users of the platform to the Community Board. See also <FAQLink name="Organization">DAO</FAQLink>.
                            </li>
                          </ul>
                          <p>All the profiles (user, community, organization) have their own separate profile feed that they can use to distribute content to the users following them.</p>
                        </div>
                      </PanelWrapper>
                      <PanelWrapper
                        title="What can I post in my feed?"
                      >
                        <div className="text_faq">
                          <p>You can create short posts (like on Twitter or Facebook), you can create publications (longer posts like Medium) and you can create offers.</p>
                        </div>
                      </PanelWrapper>
                      <PanelWrapper
                        title="Can I use Tags?
                        "
                      >
                        <div className="text_faq">
                          <p>You can add #tags to your posts to gain visibility. Tags get their own <FAQLink name="Importance">Importance</FAQLink> based on how the tagged posts perform with the community.</p>
                        </div>
                      </PanelWrapper>
                      <PanelWrapper
                        title="Can I mention other users?"
                      >
                        <div className="text_faq">
                          <p>Yes, you can mention other registered users with ‘@’ button. For example, @accountName. The mentioned user will receive a notification.</p>
                        </div>
                      </PanelWrapper>
                      <PanelWrapper
                        title="Can I fake my activity on U°Community to increase my Importance?"
                      >
                        <div className="text_faq">
                          <p>The algorithm of U°Community and U°OS is completely transparent with zero obfuscation and designed to run a network where real human contribution is valued the most. If you fake your activity and this be disclosed, your community will likely take some steps against it.</p>
                        </div>
                      </PanelWrapper>
                      <PanelWrapper
                        title="Who is building U°Community?"
                      >
                        <div className="text_faq">
                          <p>Check the <Link className="auth__link" target="_blank" to="/communities/4">board of U°OS Network</Link> and the <a className="auth__link" target="_blank" rel="noopener noreferrer" href="https://github.com/orgs/UOSnetwork/people">U°OS Network on GitHub.</a></p>
                        </div>
                      </PanelWrapper>
                      <PanelWrapper
                        title="Where can I check the code of U°Community?"
                      >
                        <div className="text_faq">
                          <p>Check <a className="auth__link" target="_blank" rel="noopener noreferrer" href="https://github.com/UOSnetwork/">U°OS Network on GitHub.</a>  </p>
                        </div>
                      </PanelWrapper>
                      <PanelWrapper
                        title="Can I contribute to the code of U°Community?"
                      >
                        <div className="text_faq">
                          <p>Please do! U°Community is open source and the development community is growing.</p>
                          <p>Start with <a className="auth__link" target="_blank" rel="noopener noreferrer" href="https://github.com/UOSnetwork/uos.docs/blob/master/CONTRIBUTING.md">CONTRIBUTING.md of U°OS Network on GitHub.</a> We keep it up to date.</p>
                        </div>
                      </PanelWrapper>
                      <PanelWrapper
                        title="Is U°Community on a testnet right now?"
                      >
                        <div className="text_faq">
                          <p>Yes. That’s why not all the features are working yet. Please, follow-up our updates <Link className="auth__link" target="_blank" to="/communities/4">here.</Link></p>
                        </div>
                      </PanelWrapper>
                      <PanelWrapper
                        title="When will U°Community migrate to mainnent?"
                      >
                        <div className="text_faq">
                          <p>There’s no specific date yet. It will happen no earlier than Q2 2019.</p>
                        </div>
                      </PanelWrapper>
                      <PanelWrapper
                        title="Why should I become a part of the U°Community testnet?"
                      >
                        <div className="text_faq">
                          <p>A pool of the mainnet UOS tokens will be distributed to the testnet accounts in accordance with each account’s <FAQLink name="Importance">Importance</FAQLink>. Apart from being a testnet participation incentive, this is a good way to kickstart the mainnet.</p>
                        </div>
                      </PanelWrapper>
                      <PanelWrapper
                        title="Are there any airdrops of UOS planned?"
                      >
                        <div className="text_faq">
                          <p>To jumpstart the network, there will be airdrops to holders of tokens and coins of other networks. The details will be announced later.</p>
                        </div>
                      </PanelWrapper>
                      <PanelWrapper
                        title="Will UOS be tradable on exchanges?"
                      >
                        <div className="text_faq">
                          <p>Exchange listings are being negotiated, but only for the mainnet tokens. The testnet tokens are just this — testnet tokens.</p>
                        </div>
                      </PanelWrapper>
                     <PanelWrapper
                        title="How is U°Community different from other publishing/networking platforms (Steemit, Medium, Reddit, etc.)?"
                      >
                        <div className="text_faq">
                           <li>A unique model of value and influence redistribution, powered by U°OS blockchain and DPoI algorithm. </li>
                           <li>U°Community is an integral part of U°OS blockchain. Any content created on U°Community is a part of your interaction with U°OS network, not a sole objective of the dApp. Your social interaction is recorded on the blockchain as ‘social transactions’.</li>
                           <li>A unique rating system. Your content is evaluated by network participants, and as a result you get <FAQLink name="Importance">Importance</FAQLink> that you can effortlessly scale.</li>
                           <li>On U°Community, you can join or create <FAQLink name="Community">communities</FAQLink></li> and run your business as an <FAQLink name="Organization">DAO</FAQLink>with U°OS-based governance toolset.</li>
                           <li>Smart contracts’ support</li>
                           <li>Non-core tokens’ support</li>
                           <li>Lower entry threshold (compared to Steemit). As for now, U°Community is totally free to use for any new user. In the future, the entry threshold will be raised to just a few cents.</li>
                        </div>
                      </PanelWrapper>
                   <PanelWrapper
                        title="I found a bug! Where can I report it?"
                      >
                        <div className="text_faq">
                          <p>You can do it here: <a className="auth__link" target="_blank" rel="noopener noreferrer" href="https://u.community/communities/7"></p>
                        </div>
                      </PanelWrapper>
                    
                    </div>
                  </Element>
                  <Element name="U°OS" className="fields__block">
                    <div className="fields__title">
                      <h1 className="title title_small">U°OS</h1>
                    </div>
                    <PanelWrapper
                      title="What is U°OS?"
                    >
                      <div className="text_faq">
                        <p>U°OS is a framework for practical implementation of distributed networks with adaptable economic, governance and reputation models. The framework is designed to build decentralized applications and govern organizations / communities within the network economy. U°OS can be applied to any networked socio-economic process to increase its velocity, sustainability and cost efficiency. U°OS blockchain protocol is based on EOSIO open source code.</p>
                      </div>
                    </PanelWrapper>
                    <PanelWrapper
                      title="How is U°OS different from other blockchains?"
                    >
                      <div className="text_faq">
                         <li>DPoI consensus algorithm</li>
                         <li>DPoI-based governance model</li>
                         <li>DPoI-based reputation system</li>
                         <li>Dynamic emission algorithm </li>
                         <p>You can read more here: https://uos.network/ </p>
                      </div>
                    </PanelWrapper>
                    <PanelWrapper
                      title="What features does U°OS have?"
                    >
                      <div className="text_faq">
                        <ul>
                          <li>Zero-fee transactions</li>
                          <li>Account system</li>
                          <li>Importance index calculation</li>
                          <li>Social transactions</li>
                          <li>Smart contracts execution</li>
                          <li>Dynamic emission algorithm</li>
                          <li>Currencies and tokens support</li>
                          <li>WebAssembly support</li>
                          <li>DAC and DAO support</li>
                          <li>Asset Transfer</li>
                          <li>Free for applications’ users</li>
                          <li>More on <a className="auth__link" target="_blank" rel="noopener noreferrer" href="https://github.com/UOSnetwork">GitHub.</a> </li> 
                        </ul>
                      </div>
                    </PanelWrapper>
                    <PanelWrapper
                      title="Can U°OS be used by other applications?"
                    >
                      <div className="text_faq">
                        <p>Yes, it can be used by other applications – U°Community is just one of the use-cases for the U°OS network.</p>
                      </div>
                    </PanelWrapper>
                    <PanelWrapper
                      title="How are social interactions reflected on the blockchain?"
                    >
                      <div className="text_faq">
                        <p>Every social interaction that users perform using the U°Community dapp is registered in the U°OS blockchain as a transaction. So every action is immutably recorded.</p>
                      </div>
                    </PanelWrapper>
                    <PanelWrapper
                      title="Can the Importance algorithm be used by other applications on the U°OS blockchain?"
                    >
                      <div className="text_faq">
                        <p>Yes, the library is open-source and can be used by any developers that want to launch their own dApps.</p>
                      </div>
                    </PanelWrapper>
                    <PanelWrapper
                      title="Who is building U°OS?"
                    >
                      <div className="text_faq">
                        <p>Check the <Link className="auth__link" target="_blank" to="/communities/4">board of U°OS Network </Link>
                          and the <a className="auth__link" target="_blank" rel="noopener noreferrer" href="https://github.com/orgs/UOSnetwork/people">U°OS Network GitHub.</a> We are a group of people that believe in the sovereignty of the <FAQLink name="Digital individual">Digital individual</FAQLink> and in the <FAQLink name="Network economy">Network economy</FAQLink>.
                        </p>
                        <p>You are more than welcome to join us.</p>
                      </div>
                    </PanelWrapper>
                    <PanelWrapper
                      title="Where can I check the code of U°OS?"
                    >
                      <div className="text_faq">
                        <p>Check <a className="auth__link" target="_blank" rel="noopener noreferrer" href="https://github.com/UOSnetwork/">U°OS Network on GitHub.</a></p>
                      </div>
                    </PanelWrapper>
                    <PanelWrapper
                      title="Can I contribute to the code of U°OS?"
                    >
                      <div className="text_faq">
                        <p>Please do! U°OS is open source and the development community is growing.</p>
                        <p>Start with <a className="auth__link" target="_blank" rel="noopener noreferrer" href="https://github.com/UOSnetwork/uos.docs/blob/master/CONTRIBUTING.md">CONTRIBUTING.md of U°OS Network on GitHub.</a> We keep it up to date.</p>
                      </div>
                    </PanelWrapper>
                    <PanelWrapper
                      title="Technical details of DPOI?"
                    >
                      <div className="text_faq">
                        <p>Check the <a className="auth__link" target="_blank" rel="noopener noreferrer" href="https://github.com/UOSnetwork/uos.docs/tree/master/yellow_paper">DPOI Yellow Paper on U°OS Network GitHub.</a></p>
                      </div>
                    </PanelWrapper>
                    <PanelWrapper
                      title="Is U°OS on a testnet right now?"
                    >
                      <div className="text_faq">
                        <p>Yes.</p>
                      </div>
                    </PanelWrapper>
                    <PanelWrapper
                      title="When will U°OS migrate to mainnent?"
                    >
                      <div className="text_faq">
                        <p>There’s no specific date. Your best bet is around mid 2019.</p>
                      </div>
                    </PanelWrapper>
                    <PanelWrapper
                      title="Are there any airdrops of UOS planned?"
                    >
                      <div className="text_faq">
                        <p>To jumpstart the network, there will be airdrops to holders of tokens and coins of other networks. The details will be announced later.</p>
                      </div>
                    </PanelWrapper>
                  </Element>
                  <Element name="Glossary" className="fields__block">
                    <div className="fields__title">
                      <h1 className="title title_small">Glossary</h1>
                    </div>
                    <PanelWrapper
                      title="Account"
                    >
                      <div className="text_faq">
                        <p>An account is your collection of authorizations registered on the U°OS blockchain.</p>
                        <p>Your account has a human-readable name, a brainkey, public-private key pairs, and owner and active permissions.</p>
                      </div>
                    </PanelWrapper>
                    <PanelWrapper
                      title="Account creation"
                    >
                      <div className="text_faq">
                        <p>To create an account:</p>
                        <ol>
                          <li>Click SIGN IN —&gt; Create one</li>
                          <li>Type in your preferred account name.</li>
                          <li>Click PROCEED.</li>
                          <li>Copy your brainkey and store it in a secure place.</li>
                          <li>Verify your brainkey by crossing out the words 2, 4, 8 and 12 of your brainkey in the randomized key order.</li>
                          <li>If you accept the terms and conditions, put a tick in the box.</li>
                          <li>Click FINISH.</li>
                        </ol>
                        <p>The U°OS blockchain will register the account name.</p>
                      </div>
                    </PanelWrapper>
                    <PanelWrapper
                      title="Account name"
                    >
                      <div className="text_faq">
                        <p>An account name is a name that you pick and register on the U°OS blockchain.</p>
                        <p>The account name is linked to your brainkey and the public-private key pairs.</p>
                        <p>The account name has the following conventions:</p>
                        <ul>
                          <li>Must be 12 characters</li>
                          <li>Can only contain the characters abcdefghijklmnopqrstuvwxyz12345, a-z (lowercase), 1-5</li>
                        </ul>
                      </div>
                    </PanelWrapper>
                    <PanelWrapper
                      title="Active permission"
                    >
                      <div className="text_faq">
                        <p>The active permission has an associated key that you use to sign your fund transfer transactions.</p>
                      </div>
                    </PanelWrapper>
                    <PanelWrapper
                      title="Block Producer"
                    >
                      <div className="text_faq">
                        <p>A block producer is a role on the U°OS blockchain that produces blocks. Every transaction on the U°OS blockchain is registered in a block by a block producer. A block producer is voted into the role by the community.</p>
                      </div>
                    </PanelWrapper>
                    <PanelWrapper
                      title="Brainkey"
                    >
                      <div className="text_faq">
                        <p>A brainkey is the seed phrase used to generate public-private key pairs. The brainkey is linked to your account name.</p>
                        <p>Use the brainkey to access your account and register transactions on the U°OS blockchain.</p>
                      </div>
                    </PanelWrapper>
                    <PanelWrapper
                      title="Calculator Node"
                    >
                      <div className="text_faq">
                        <p>A Calculator Node is a node on the U°OS blockchain dedicated to calculating the activity of your account: social, transactional, stake.</p>
                        <p>Calculator Nodes are community-owned and receive a regular emission of UOS tokens.</p>
                      </div>
                    </PanelWrapper>
                    <PanelWrapper
                      title="Community"
                    >
                      <div className="text_faq">
                        <p>A community is a Decentralized Autonomous Community (DAC) that you can create or join.</p>
                        <p>Create or become a part of a community to work with other members to increase or diversify your influence.</p>
                        <p>You can add your publications on your behalf or on behalf of a community that you joined. Adding a publication on behalf of a community increases your audience reach.</p>
                        <p>Governance is a key feature to running your community decentrally.</p>
                      </div>
                    </PanelWrapper>
                    <PanelWrapper
                      title="Delay on social/transactional activity"
                    >
                      <div className="text_faq">
                        <p>There might be a delay on your social activity, including upvoting, because your actions are registered on the U°OS blockchain.</p>
                      </div>
                    </PanelWrapper>
                    <PanelWrapper
                      title="Delegated Proof of Importance"
                    >
                      <div className="text_faq">
                        <p>DPOI is the consensus algorithm of U°OS. For anything on the network, including the network changes, you vote with your <FAQLink name="Importance">Importance</FAQLink>. DPOI is what keeps the network live.</p>
                        <p>For details, check the <a className="auth__link" target="_blank" rel="noopener noreferrer" href="https://github.com/UOSnetwork/uos.docs/tree/master/yellow_paper">Yellow Paper on U°OS Network GitHub.</a></p>
                      </div>
                    </PanelWrapper>
                    <PanelWrapper
                      title="Importance"
                    >
                      <div className="text_faq">
                        <p>Importance is both a reputation and an asset on the network.</p>
                        <p>You get assigned an Importance based on the following factors:</p>
                        <ul>
                          <li>UOS Stake — The amount of UOS you stake for network resources</li>
                          <li>Social transactions — Upvotes, Downvotes, Comments, Replies you receive as a result of you operating in the network</li>
                          <li>Economic transactions — Transfer of funds in the form of UOS to you</li>
                        </ul>
                        <p>For details, check the <a className="auth__link" target="_blank" rel="noopener noreferrer" href="https://github.com/UOSnetwork/uos.docs/tree/master/yellow_paper">Yellow Paper on U°OS Network GitHub.</a></p>
                      </div>
                    </PanelWrapper>
                    <PanelWrapper
                      title="Importance decay"
                    >
                      <div className="text_faq">
                        <p>Your Importance fades over time based on your social and transactional activity parameter. If your account stays socially or transactionally inert for a period of time, your Importance decays.</p>
                      </div>
                    </PanelWrapper>
                    <PanelWrapper
                      title="Mentions"
                    >
                      <div className="text_faq">
                        <p>Mention other users with @AccountName. The users that you mention will receive a notification.</p>
                      </div>
                    </PanelWrapper>
                    <PanelWrapper
                      title="Network economy"
                    >
                      <div className="text_faq">
                        <p>A network economy — a term that in 2019 still has no clear definition — is pretty much the way anyone with access to a connected device operates today. Kevin Kelly formulated the 12 principles of the network economy — and these are the principles that U°OS is based on — in 1997 in a Wired article and expanded on them in a book in 1998. In 2018 Kevin Kelly also said that it&#39;d been 20 years and he wouldn&#39;t change much in the principles he had formulated. They stood the test of time. Check out the original article: <a className="auth__link" target="_blank" rel="noopener noreferrer" href="https://www.wired.com/1997/09/newrules/">Wired: New Rules for New Economy</a> and there&#39;s also a good summary: <a className="auth__link" target="_blank" rel="noopener noreferrer" href="https://u.community/posts/3525">The Network Economy: 20 Years and 12 Principles</a>.</p>
                      </div>
                    </PanelWrapper>
                    <PanelWrapper
                      title="Organization"
                    >
                      <div className="text_faq">
                        <p>An organization is a Decentralized Autonomous Organization (DAO) that you can create or join through an invitation.</p>
                        <p>DAOs are the best way to run your business in a decentralized and transparent way.</p>
                        <p>Governance is a key feature to running your organization decentrally.</p>
                      </div>
                    </PanelWrapper>
                    <PanelWrapper
                      title="Owner permission"
                    >
                      <div className="text_faq">
                        <p>The owner permission has an associated key that you use to change the active permission. The owner key represents the ownership of your account.</p>
                        <p>This is your owner key to change the active permission.</p>
                      </div>
                    </PanelWrapper>
                    <PanelWrapper
                      title="Profile"
                    >
                      <div className="text_faq">
                        <p>A profile is your publicly visible information.</p>
                        <p>Filling out the profile is an excellent way to let the community learn about you and engage.</p>
                      </div>
                    </PanelWrapper>
                    <PanelWrapper
                      title="Social activity"
                    >
                      <div className="text_faq">
                        <p>Your social activity represents your social interactions on the U°OS blockchain: your publications, comments, upvotes, evaluation of your actions by the community, including your actions and posts as part of your registered communities.</p>
                      </div>
                    </PanelWrapper>
                    <PanelWrapper
                      title="Tags"
                    >
                      <div className="text_faq">
                        <p>You can add #tags to your posts to gain visibility. Tags get their own Importance based on how the tagged posts perform with the community.</p>
                      </div>
                    </PanelWrapper>
                    <PanelWrapper
                      title="Transactional activity"
                    >
                      <div className="text_faq">
                        <p>Your transactional activity represents transfer of funds to your account from various accounts on the U°OS blockchain.</p>
                      </div>
                    </PanelWrapper>
                    <PanelWrapper
                      title="Trust"
                    >
                      <div className="text_faq">
                        <p>Trust is a social transaction on the network from one account to another. When you click “Trust” on an organization or an individual, you extend your web of trust to them.</p>
                      </div>
                    </PanelWrapper>
                    <PanelWrapper
                      title="UOS token"
                    >
                      <div className="text_faq">
                        <p>UOS is the native token of U°OS network. You can use it currency and for staking to buy and rent network resources</p>
                        <p>On the network, you get UOS by:</p>
                        <ul>
                          <li>Running a <FAQLink name="Block Producer">Block Production Node</FAQLink></li>
                          <li>Running a <FAQLink name="Calculator Node">Calculator Node</FAQLink></li>
                          <li>For your <FAQLink name="Importance">Importance</FAQLink></li>
                          <li>Account to account transfer — for example, by running an <FAQLink name="Organization">Organization</FAQLink></li>
                          <li>Dapp monetization</li>
                        </ul>
                        <p>Outside of the network, you can get UOS by purchasing it on an exchange when it’s listed.</p>
                      </div>
                    </PanelWrapper>
                    <PanelWrapper
                      title="UOS token emission"
                    >
                      <div className="text_faq">
                        <p>The emission is a regular emission of UOS tokens to the accounts registered on the U°OS blockchain.</p>
                        <p>The emission has two broad types:</p>
                        <ul>
                          <li>Regular emission to Block Producers and Calculator Nodes</li>
                          <li>Dynamic emission to user accounts based on their Importance</li>
                        </ul>
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
};
export default Faq;
