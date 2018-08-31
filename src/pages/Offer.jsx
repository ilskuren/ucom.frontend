import React, { PureComponent } from 'react';
import { getPost } from '../api';
import { getFileUrl } from '../utils/upload';
import { getUserName, getUserUrl } from '../utils/user';
import PostHeader from '../components/PostHeader';
import OfferTitle from '../components/OfferTitle';
import Rating from '../components/Rating';
import PostViews from '../components/PostViews';
import Footer from '../components/Footer';

class Offer extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      offer: {},
    };
  }

  componentDidMount() {
    this.getData();
  }

  getData() {
    getPost(this.props.match.params.id)
      .then((offer) => {
        this.setState({ offer });
      });
  }

  render() {
    return (
      <div className="content">
        <div className="content__inner">
          <div className="sheets">
            <div className="sheets__list">
              <div className="sheets__item">
                <PostHeader
                  userId={this.state.offer.User && this.state.offer.User.id}
                  userUrl={getUserUrl(this.state.offer.User && this.state.offer.User.id)}
                  avatar={getFileUrl(this.state.offer.User && this.state.offer.User.avatar_filename)}
                  name={getUserName(this.state.offer.User)}
                  rating={this.state.offer.User && this.state.offer.User.current_rate}
                />
              </div>
            </div>

            <OfferTitle
              id={this.state.offer.id}
              userId={this.state.offer.User && this.state.offer.User.id}
              imgSrc={getFileUrl(this.state.offer.main_image_filename)}
              tags={['sell']}
              rate={+this.state.offer.current_rate}
              title={this.state.offer.title}
              actionButtonTitle={this.state.offer.action_button_title}
              actionDurationInDays={this.state.offer.action_duration_in_days}
              actionButtonUrl={this.state.offer.action_button_url}
              createdAt={this.state.offer.created_at}
            />

            <div className="sheets__content sheets__content_posts">
              <div className="posts">
                <div className="grid grid_post">
                  <div className="grid__item">
                    <div className="posts__content">
                      <div className="posts__lead-text posts__lead-text_offer">{this.state.offer.leading_text}</div>
                      <div className="posts__text" dangerouslySetInnerHTML={{ __html: this.state.offer.description }} />
                    </div>
                  </div>
                  <div className="grid__item">
                    <div className="posts__sidebar">
                      <div className="posts__rating">
                        <Rating
                          postId={this.state.offer.id}
                          rating={this.state.offer.current_vote}
                          choice={this.state.offer.myselfData && this.state.offer.myselfData.myselfVote}
                        />
                      </div>
                      <div className="posts__views">
                        <PostViews views={0} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <Footer />
        </div>
      </div>
    );
  }
}

export default Offer;
