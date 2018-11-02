import React, { PureComponent } from 'react';
import { bind } from 'decko';
import classNames from 'classnames';
import Dropzone from 'react-dropzone';
import PropTypes from 'prop-types';
import Loading from './Loading';

class DropZone extends PureComponent {
  constructor() {
    super();
    this.state = {
      error: '',
    };
  }

  @bind
  onDropHandler(files) {
    const {
      minWidth,
      minHeight,
      onDrop,
      maxSize,
    } = this.props;
    const overSize = (!maxSize) ? 1000000 : maxSize;

    if (files[0] && files[0].size < overSize) {
      this.fr = new FileReader();
      this.fr.onload = () => {
        const img = new Image();
        img.onload = () => {
          if (typeof onDrop === 'function') {
            if (minWidth && img.width < minWidth) {
              this.changeErrorText(`Width of image should be at least ${minWidth} pixels`);
            } else if (minHeight && img.height < minHeight) {
              this.changeErrorText(`Height of image should be at least ${minHeight} pixels`);
            } else {
              this.changeErrorText('');
              onDrop(files);
            }
          }
        };
        img.src = this.fr.result;
      };
      if (files[0] !== []) {
        this.fr.readAsDataURL(files[0]);
      }
    } else if (overSize === 1000000) {
      this.changeErrorText('File exceed the 1 Mb limit.');
    } else {
      this.changeErrorText('File exceed the limit.');
    }
  }

  changeErrorText(error) {
    this.setState({ error });
  }

  render() {
    return (
      <div className={classNames('drop-zone', this.props.className)}>
        <Dropzone
          multiple={this.props.multiple}
          accept={this.props.accept}
          className="drop-zone__input"
          maxSize={this.props.maxSize}
          onDrop={this.onDropHandler}
        >
          <Loading className="loading_small" loading={this.props.loading} />
          <span className="drop-zone__text">{this.props.text}</span>
        </Dropzone>
        {this.state.error && (
          <div className="drop-zone__error">
            {this.state.error}
          </div>
        )}
      </div>
    );
  }
}

DropZone.propTypes = {
  text: PropTypes.string.isRequired,
  accept: PropTypes.string,
  onDrop: PropTypes.func,
  loading: PropTypes.bool,
  className: PropTypes.string,
  multiple: PropTypes.bool,
  minWidth: PropTypes.number,
  minHeight: PropTypes.number,
  maxSize: PropTypes.number,
};

export default DropZone;
