import { Redirect } from 'react-router';
import { connect } from 'react-redux';
import React, { Fragment, PureComponent } from 'react';
import TextEditor from '../../components/TextEditor';
import CreatePostHeader from '../../components/CreatePostHeader';
import Loading from '../../components/Loading';
import CreatePostFooter from '../../components/CreatePostFooter';
import { editPost, getPost } from '../../api';
import { getToken } from '../../utils/token';
import { validatePost } from '../../utils/posts';

class StoryPage extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      title: '',
      description: '',
      leading_text: '',
      main_image_filename: null,
      user_id: null,
      dataLoading: true,
      saveLoading: false,
      saved: false,
      newDescription: '',
      errors: [],
    };
  }

  componentDidMount() {
    this.getData();
  }

  getData() {
    this.setState({ dataLoading: true });

    getPost(this.props.match.params.id)
      .then((post) => {
        this.setState({
          title: post.title,
          description: post.description,
          newDescription: post.description,
          leading_text: post.leading_text,
          main_image_filename: post.main_image_filename,
          user_id: post.user_id,
          dataLoading: false,
        });
      });
  }

  validate() {
    return new Promise((resolve) => {
      const errors = validatePost(this.state);

      this.setState({ errors }, () => {
        resolve();
      });
    });
  }

  save() {
    this.validate()
      .then(() => {
        if (this.state.errors.length) {
          return;
        }

        this.setState({ saveLoading: true });

        const token = getToken();
        const data = new FormData();

        data.append('title', this.state.title);
        data.append('description', this.state.newDescription);
        data.append('leading_text', this.state.leading_text);
        data.append('main_image_filename', this.state.main_image_filename);

        editPost(this.props.match.params.id, data, token)
          .then(() => {
            this.setState({
              saveLoading: false,
              saved: true,
            });
          });
      });
  }

  render() {
    if (!this.props.user.id) {
      return <Redirect to="/" />;
    }

    if (this.state.user_id && this.state.user_id !== this.props.user.id) {
      return <Redirect to="/" />;
    }

    return this.state.saved ? (
      <Redirect to={`/posts/${this.props.match.params.id}`} />
    ) : (
      <Fragment>
        <Loading appear loading={this.state.dataLoading || this.state.saveLoading} />

        {!this.state.dataLoading && (
          <Fragment>
            <CreatePostHeader
              title="Edit Media Post"
              location={this.props.location}
              onClickPost={() => { this.save(); }}
            />

            <div className="create-post__editor">
              <TextEditor
                errors={this.state.errors}
                title={this.state.title}
                description={this.state.description}
                leadingText={this.state.leading_text}
                cover={this.state.main_image_filename}
                onChangeTitle={title => this.setState({ title })}
                onChangeDescription={newDescription => this.setState({ newDescription })}
                onChangeLeadingText={leading_text => this.setState({ leading_text })}
                onChangeCover={main_image_filename => this.setState({ main_image_filename })}
              />
            </div>

            <CreatePostFooter onClickPost={() => this.save()} />
          </Fragment>
        )}
      </Fragment>
    );
  }
}

export default connect(state => ({
  user: state.user,
}), null)(StoryPage);
