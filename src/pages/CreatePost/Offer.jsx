import { Redirect } from 'react-router';
import { connect } from 'react-redux';
import React, { Fragment, PureComponent } from 'react';
import CreatePostHeader from '../../components/CreatePostHeader';
import Loading from '../../components/Loading';
import CreatePostFooter from '../../components/CreatePostFooter';
import TextInput from '../../components/TextInput';
import Switcher from '../../components/Switcher';
import DropZone from '../../components/DropZone';
import OfferTitle from '../../components/OfferTitle';
import TextEditor from '../../components/TextEditor';
import { getToken } from '../../utils/token';
import { createPost } from '../../api';
import burgerImg from './images/burger.png';

class StoryPage extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      title: '',
      description: '',
      leading_text: '',
      newPostId: null,
      main_image_filename: null,
      loading: false,
      saved: false,
    };
  }

  save() {
    this.setState({ loading: true });

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
          title="Create Offer"
          location={this.props.location}
          onClickPost={() => { this.save(); }}
          tabs={['Sale', 'Token Sale', 'Event', 'Service', 'White List', 'Charity', 'Give Away']}
          isPreview
        />
        <div className="create-post__content create-post__content_form">
          <div className="form">
            <div className="form__block form__block_shifted_down">
              <div className="form__label form__label_color_gray">Offer Title</div>
              <div className="form__input">
                <TextInput placeholder="Type something..." />
              </div>
            </div>
            <div className="form__block form__block_shifted_down">
              <div className="form__label form__label_color_gray">Action Button</div>
              <div className="form__input">
                <TextInput placeholder="Name of Acton Button" />
              </div>
            </div>
            <div className="form__block  form__block_shifted_up">
              <div className="form__label form__label_no-label" />
              <div className="form__input">
                <TextInput placeholder="Link" />
              </div>
            </div>
            <div className="form__block form__block_shifted_down">
              <div className="form__label form__label_color_gray">Time Sale</div>
              <div className="form__input">
                <TextInput placeholder="Days" inputWidth={150} />
              </div>
            </div>
            <div className="form__block form__block_no-label">
              <div className="form__label form__label_no-label" />
              <div className="form__input">
                <Switcher textColor="gray" labels={['Unlimited', '']} />
              </div>
            </div>
            <div className="form__block form__block_shifted_down">
              <div className="form__label form__label_color_gray">Add Team</div>
              <div className="form__input">
                <TextInput placeholder="Find People" />
              </div>
            </div>
            <div className="form__block form__block_shifted_down">
              <div className="form__label form__label_color_gray">Offer&apos;s cover</div>
              <div className="form__input">
                <DropZone text="add or drag img" />
                <div className="form__subtext">
                  You can upload an image in JPG or PNG format.
                  Size is not more than 10mb.
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="create-post__offer-preview-title">
          <OfferTitle imgSrc={burgerImg} />
        </div>
        <div className="create-post__preview create-post__preview_editor">
          <TextEditor
            title={this.state.title}
            description={this.state.description}
            leadingText={this.state.leading_text}
            onChangeTitle={title => this.setState({ title })}
            onChangeDescription={description => this.setState({ description })}
            onChangeLeadingText={leading_text => this.setState({ leading_text })}
            onChangeCover={main_image_filename => this.setState({ main_image_filename })}
          />
        </div>

        <CreatePostFooter onClickPost={() => this.save()} />
      </Fragment>
    );
  }
}

export default connect(state => ({
  user: state.user,
}), null)(StoryPage);
