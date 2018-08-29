import { Redirect } from 'react-router';
import { connect } from 'react-redux';
import React, { Fragment, PureComponent } from 'react';
import CreatePostHeader from '../../components/CreatePostHeader';
import Rating from '../../components/Rating';
import PostViews from '../../components/PostViews';
import Loading from '../../components/Loading';
import CreatePostFooter from '../../components/CreatePostFooter';
import OfferTitle from '../../components/OfferTitle';
import burgerImg from './images/burger.png';
import { getToken } from '../../utils/token';
import { createPost } from '../../api';

class OfferPreview extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      title: '',
      description: 'Content',
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

        <OfferTitle imgSrc={burgerImg} />
        <div className="create-post__preview">
          <div className="posts">
            <div className="posts__content">
              {this.state.description}
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

export default connect(state => ({
  user: state.user,
}), null)(OfferPreview);
