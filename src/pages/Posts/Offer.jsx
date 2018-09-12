import { connect } from 'react-redux';
import React, { PureComponent, Fragment } from 'react';
import Rating from '../../components/Rating';
import PostViews from '../../components/PostViews';
import Loading from '../../components/Loading';
import PostHeader from '../../components/PostHeader';
import EventTitle from '../../components/EventTitle';
import CommentsStub from '../../components/CommentsStub';
import burgerImg from '../CreatePost/images/burger.png';
import { getUser } from '../../api';
import { getFileUrl } from '../../utils/upload';
import { getUserName } from '../../utils/user';

class OfferPage extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      post: {
        description: `The development continues Coinbase's 2018 hiring spree. Since the start of the year, the company has hired Tina Bhatnagar to serve as vice president of operations and technology; Emilie Choi as its vice president of corporate and business development; Eric Soto as vice president of finance; Rachael Horwitz as vice president of communications; Alesia Haas as its new chief financial officer; and Jeff Horowitz as its chief compliance officer, among others.</br></br>

        With Wagner, Coinbase is beefing up its engineering team, which the AWS vet will help grow, according to Coinbase.</br></br>

        "Engineering is central to our mission of creating an open financial system for the world. It is core to our strategy to deliver the most trusted and easiest to use cryptocurrency products and services. We have built an amazing engineering team at a Coinbase, one which Tim will now lead and expand," Coinbase CEO Brian Armstrong wrote in a blog post announcing the hire. `,
      },
    };
  }

  componentDidMount() {
    this.getData();
  }

  getData() {
    getUser(1)
      .then((user) => {
        this.setState({
          user,
          loading: false,
        });
      });
  }

  render() {
    return (
      <Fragment>
        <Loading loading={this.state.loading} appear />

        {!this.state.loading && (
          <div className="sheets">
            <div className="sheets__list">
              <div className="sheets__item">
                <PostHeader
                  avatar={getFileUrl(this.state.user.avatar_filename)}
                  name={getUserName(this.state.user)}
                  rating="40 000"
                />
              </div>
            </div>
            <EventTitle imgSrc={burgerImg} buyers="8 923" />

            <div className="sheets__content sheets__content_posts sheets__content_no-radius">
              <div className="posts">
                <div className="posts__content">
                  <div className="posts__lead-text posts__lead-text_offer">
                    Burgers for free!
                  </div>
                  <div className="posts__text" dangerouslySetInnerHTML={{ __html: this.state.post.description }} />
                  <div className="posts__comments posts__comments-offer">
                    <CommentsStub />
                  </div>
                </div>
                <div className="posts__sidebar">
                  <div className="posts__rating">
                    <Rating rating={100} />
                  </div>
                  <div className="posts__views">
                    <PostViews views={0} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </Fragment>
    );
  }
}

export default connect(state => ({
  user: state.user,
}), null)(OfferPage);
