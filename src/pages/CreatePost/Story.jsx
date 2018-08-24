import { Redirect } from 'react-router';
import { connect } from 'react-redux';
import React, { Fragment, PureComponent } from 'react';
import TextEditor from '../../components/TextEditor';
import CreatePostHeader from '../../components/CreatePostHeader';
import Loading from '../../components/Loading';
import Avatar from '../../components/Avatar';
import { createPost } from '../../api';
import { getToken } from '../../utils/token';
import { getAvatarUrl, getUserName } from '../../utils/user';

class StoryPage extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      postId: null,
      title: '',
      description: '',
      leading_text: '',
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
        console.log(post);

        this.setState({
          loading: false,
          saved: true,
          postId: post.id,
        });
      });
  }

  render() {
    return this.state.saved ? (
      <Redirect to={`/posts/story/${this.state.postId}`} />
    ) : (
      <Fragment>
        <Loading loading={this.state.loading} />

        <CreatePostHeader
          location={this.props.location}
          onClickPost={() => { this.save(); }}
        />

        <div className="create-post__editor">
          <TextEditor
            onChangeTitle={title => this.setState({ title })}
            onChangeDescription={description => this.setState({ description })}
            onChangeLeadingText={leading_text => this.setState({ leading_text })}
            onChangeCover={main_image_filename => this.setState({ main_image_filename })}
          />
        </div>
        <div className="create-post__content create-post__content_footer">
          <div className="toolbar">
            <div className="toolbar__main">
              <a href="#post" className="create-post__back-link">Back to settings ↑</a>
            </div>
            <div className="toolbar__side">
              <div className="inline">
                <div className="inline__item">
                  <Avatar size="xsmall" src={getAvatarUrl(this.props.user.avatar_filename)} />
                </div>
                <span className="inline__item">
                  <span className="create-post__author-name">{getUserName(this.props.user)}</span>
                </span>
                <span className="inline__item">
                  <button
                    className="button button_theme_red button_size_small button_stretched"
                    onClick={() => this.save()}
                  >
                    Post
                  </button>
                </span>
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default connect(state => ({
  user: state.user,
}), null)(StoryPage);
