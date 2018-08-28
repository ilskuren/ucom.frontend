import classNames from 'classnames';
import Dropzone from 'react-dropzone';
import React from 'react';
import PropTypes from 'prop-types';
import Loading from './Loading';

const DropZone = props => (
  <Dropzone
    accept={props.accept}
    className={classNames('drop-zone', props.className)}
    onDrop={(files) => {
      if (typeof props.onDrop === 'function') {
        props.onDrop(files);
      }
    }}
  >
    <Loading className="loading_small" loading={props.loading} />
    <span className="drop-zone__text">{props.text}</span>
  </Dropzone>
);

DropZone.propTypes = {
  text: PropTypes.string.isRequired,
  accept: PropTypes.string,
  onDrop: PropTypes.func,
  loading: PropTypes.bool,
  className: PropTypes.string,
};

export default DropZone;
