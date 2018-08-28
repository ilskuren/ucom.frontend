import { Redirect } from 'react-router';
import { connect } from 'react-redux';
import React, { Fragment, PureComponent } from 'react';
import CreatePostHeader from '../../components/CreatePostHeader';
import Loading from '../../components/Loading';
import CreatePostFooter from '../../components/CreatePostFooter';
import TextInput from '../../components/TextInput';
import Switcher from '../../components/Switcher';
import DropZone from '../../components/DropZone';

class StoryPage extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      newPostId: null,
      loading: false,
      saved: false,
    };
  }

  save() {
    this.setState({
      loading: false,
      saved: true,
      newPostId: 1,
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
        <div className="create-post__content">
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
              <div className="form__label form__label_color_gray" />
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
              <div className="form__label form__label_color_gray" />
              <div className="form__input">
                <span className="form__input-label form__input-label_color_gray">Unlimited</span>
                <Switcher withoutLabels />
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

        <CreatePostFooter onClickPost={() => this.save()} />
      </Fragment>
    );
  }
}

export default connect(state => ({
  user: state.user,
}), null)(StoryPage);
