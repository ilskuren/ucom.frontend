import React, { PureComponent } from 'react';
import Avatar from './Avatar';
import { getBase64FromFile } from '../utils/upload';

class AvatarFromFile extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      src: null,
    };
  }

  componentDidMount() {
    this.setSrcFromFile(this.props.file);
  }

  componentWillReceiveProps(props) {
    this.setSrcFromFile(props.file);
  }

  setSrcFromFile(file) {
    if (!file) {
      return;
    }

    getBase64FromFile(file)
      .then(src => this.setState({ src }));
  }

  render() {
    return (
      <Avatar
        {...this.props}
        src={this.state.src}
      />
    );
  }
}

export default AvatarFromFile;
