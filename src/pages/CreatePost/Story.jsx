import { Redirect } from 'react-router';
import { connect } from 'react-redux';
import React, { Fragment, PureComponent } from 'react';
import TextEditor from '../../components/TextEditor';
import CreatePostHeader from '../../components/CreatePostHeader';
import Loading from '../../components/Loading';
import CreatePostFooter from '../../components/CreatePostFooter';
import { createPost } from '../../api';
import { getToken } from '../../utils/token';

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
      <Redirect to={`/posts/story/${this.state.newPostId}`} />
    ) : (
      <Fragment>
        <Loading loading={this.state.loading} />

        <CreatePostHeader
          location={this.props.location}
          onClickPost={() => { this.save(); }}
        />

        <div className="create-post__editor">
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
