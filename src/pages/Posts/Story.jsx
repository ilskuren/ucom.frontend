import React, { Fragment, PureComponent } from 'react';
import TextEditor from '../../components/TextEditor';
import CreatePostHeader from '../../components/CreatePostHeader';
import Loading from '../../components/Loading';
import { createPost } from '../../api';
import { getToken } from '../../utils/token';

class StoryPage extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      title: '',
      content: '',
      loading: false,
    };
  }

  save() {
    this.setState({ loading: true });

    const token = getToken();
    const data = {
      title: this.state.title,
      content: this.state.content,
    };

    createPost(data, token)
      .then(() => {
        this.setState({ loading: false });
      });
  }

  render() {
    return (
      <Fragment>
        <Loading loading={this.state.loading} />

        <CreatePostHeader
          location={this.props.location}
          onClickPost={() => { this.save(); }}
        />

        <div className="create-post__editor">
          <TextEditor
            onChangeTitle={title => this.setState({ title })}
            onChangeContent={content => this.setState({ content })}
          />
        </div>
      </Fragment>
    );
  }
}

export default StoryPage;
