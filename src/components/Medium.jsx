import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import MediumEditor from 'medium-editor';
import React, { PureComponent } from 'react';
import MediumUpload from '../utils/medium/mediumUpload';
import MediumPost from '../utils/medium/mediumPost';
import { addErrorNotification } from '../actions/notifications';

class Medium extends PureComponent {
  componentDidMount() {
    this.mediumEditor = new MediumEditor(this.el, {
      toolbar: {
        buttons: ['h1', 'h2', 'bold', 'italic', 'underline', 'strikethrough', 'anchor', 'quote', 'orderedlist', 'unorderedlist'],
      },
      placeholder: false,
      extensions: {
        mediumPost: new MediumPost(),
        mediumUpload: new MediumUpload({
          onUploadError: (message) => {
            this.props.addErrorNotification(message);
          },
        }),
      },
    });

    if (this.props.value) {
      this.mediumEditor.setContent(this.props.value);
    }

    if (typeof this.props.onChange === 'function') {
      this.mediumEditor.subscribe('editableInput', () => {
        this.props.onChange(this.mediumEditor.getContent());
      });
    }
  }

  componentDidUpdate() {
    if (this.props.value && this.props.value !== this.mediumEditor.getContent()) {
      this.mediumEditor.setContent(this.props.value);
    }
  }

  componentWillUnmount() {
    this.mediumEditor.destroy();
  }

  render() {
    return (
      <div className="post-content" ref={(el) => { this.el = el; }} />
    );
  }
}

Medium.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
};

export default connect(
  null,
  dispatch => bindActionCreators({
    addErrorNotification,
  }, dispatch),
)(Medium);
