import classNames from 'classnames';
import Dropzone from 'react-dropzone';
import React from 'react';
import PropTypes from 'prop-types';
import Loading from './Loading';

const DropZone = props => (
  <div className={classNames('drop-zone', props.className)}>
    <Dropzone
      multiple={props.multiple}
      accept={props.accept}
      className="drop-zone__input"
      onDrop={(files) => {
        if (typeof props.onDrop === 'function') {
          props.onDrop(files);
        }
      }}
    >
      <Loading className="loading_small" loading={props.loading} />
      <span className="drop-zone__text">{props.text}</span>
    </Dropzone>
  </div>
);

DropZone.propTypes = {
  text: PropTypes.string.isRequired,
  accept: PropTypes.string,
  onDrop: PropTypes.func,
  loading: PropTypes.bool,
  className: PropTypes.string,
  multiple: PropTypes.bool,
};

export default DropZone;
