import { Redirect } from 'react-router';
import React, { Fragment, PureComponent } from 'react';
import CreatePostHeader from '../../components/CreatePostHeader';
import Rating from '../../components/Rating';
import PostViews from '../../components/PostViews';
import Loading from '../../components/Loading';
import CreatePostFooter from '../../components/CreatePostFooter';
import CommentsStub from '../../components/CommentsStub';
import EventTitle from '../../components/EventTitle';
import burgerImg from './images/burger.png';
import { getToken } from '../../utils/token';
import { createPost } from '../../api';

class OfferPreview extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      title: '',
      description: `The development continues Coinbase's 2018 hiring spree. Since the start of the year, the company has hired Tina Bhatnagar to serve as vice president of operations and technology; Emilie Choi as its vice president of corporate and business development; Eric Soto as vice president of finance; Rachael Horwitz as vice president of communications; Alesia Haas as its new chief financial officer; and Jeff Horowitz as its chief compliance officer, among others.</br></br>
      With Wagner, Coinbase is beefing up its engineering team, which the AWS vet will help grow, according to Coinbase.</br></br>
      "Engineering is central to our mission of creating an open financial system for the world. It is core to our strategy to deliver the most trusted and easiest to use cryptocurrency products and services. We have built an amazing engineering team at a Coinbase, one which Tim will now lead and expand," Coinbase CEO Brian Armstrong wrote in a blog post announcing the hire. `,
      leading_text: '',
      newPostId: null,
      main_image_filename: null,
      loading: false,
      saved: false,
    };
  }

  save() {
    this.setState({ loading: true, description: '' });

    const token = getToken();
    const data = new FormData();

    data.append('title', this.state.title);
    data.append('description', this.state.description);
    data.append('leading_text', this.state.leading_text);
    data.append('main_image_filename', this.state.main_image_filename);
    data.append('post_type_id', 1);

    createPost(data, token)
      .then((post) => {
        this.setState({
          loading: false,
          saved: true,
          newPostId: post.id,
        });
      });
  }

  render() {
    return this.state.saved ? (
      <Redirect to={`/posts/offer/${this.state.newPostId}`} />
    ) : (
      <Fragment>
        <Loading loading={this.state.loading} />

        <CreatePostHeader
          location={this.props.location}
          onClickPost={() => { this.save(); }}
          withoutTabs
        />

        <div className="create-post__offer-preview-title">
          <EventTitle imgSrc={burgerImg} buyers="8 923" />
        </div>

        <div className="create-post__preview">
          <div className="posts">
            <div className="posts__content">
              <div className="posts__lead-text posts__lead-text_offer">
                Burgers for free!
              </div>
              <div className="posts__text" dangerouslySetInnerHTML={{ __html: this.state.description }} />
              <div className="posts__comments posts__comments-offer">
                <CommentsStub isEmpty />
              </div>
            </div>
            <div className="posts__sidebar">
              <div className="posts__rating">
                <Rating rating={100} />
              </div>
              <div className="posts__views">
                <PostViews views={352} />
              </div>
            </div>
          </div>
        </div>

        <CreatePostFooter onClickPost={() => this.save()} />
      </Fragment>
    );
  }
}

export default OfferPreview;
