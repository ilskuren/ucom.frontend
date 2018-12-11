import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import React, { useState, useEffect, Fragment } from 'react';
import IconClose from './Icons/Close';
import urls from '../utils/urls';
import { getBase64FromFile, UPLOAD_SIZE_LIMIT, UPLOAD_SIZE_LIMIT_ERROR } from '../utils/upload';
import { addErrorNotification } from '../actions/notifications';

const PostFormEditorCover = (props) => {
  const [imgSrc, setImgSrc] = useState(null);

  const onClickRemove = () => {
    props.onClickRemove();
    setImgSrc(null);
  };

  const onChangeInput = async (e) => {
    const file = e.target.files[0];

    if (!file.type.indexOf('image/') === 0) {
      return;
    }

    if (file.size > UPLOAD_SIZE_LIMIT) {
      props.addErrorNotification(UPLOAD_SIZE_LIMIT_ERROR);
      return;
    }

    try {
      const base64 = await getBase64FromFile(file);
      setImgSrc(base64);
    } catch (e) {
      console.error(e);
      return;
    }

    props.onChangeFile(file);
  };

  const onChangeFile = async () => {
    if (typeof props.file === 'string') {
      setImgSrc(urls.getFileUrl(props.file));
    } else if (typeof props.file === 'object') {
      try {
        const base64 = await getBase64FromFile(props.file);
        setImgSrc(base64);
      } catch (e) {
        console.error(e);
      }
    }
  };

  useEffect(onChangeFile, [props.file]);

  return (
    <div className="post-form-editor-cover">
      <div className="post-form-editor-cover__container">
        {!imgSrc &&
          <Fragment>
            <label className="post-form-editor-cover__input">
              <input type="file" onChange={onChangeInput} />
            </label>

            <div className="post-form-editor-cover-placeholder">
              <div className="post-form-editor-cover-placeholder__icon">
                <svg width="162" height="162" viewBox="0 0 162 162" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" clipRule="evenodd" d="M36.1367 147.815C49.0664 156.756 64.7149 162 81.5821 162C125.992 162 161.996 125.735 161.996 80.9995C161.996 36.2646 125.992 0 81.5821 0C37.1719 0 1.1719 36.2627 1.1719 80.9995C1.1719 93.6499 4.05471 105.62 9.18752 116.289L0.417993 144.014C-1.10154 148.759 1.65237 152.105 6.56252 151.479L36.1367 147.815ZM48.5938 91.7979C54.5586 91.7979 59.3906 86.9624 59.3906 80.9976C59.3906 75.0332 54.5586 70.1978 48.5938 70.1978C42.6289 70.1978 37.793 75.0332 37.793 80.9976C37.793 86.9624 42.6289 91.7979 48.5938 91.7979ZM91.7891 80.9971C91.7891 86.9619 86.9571 91.7974 80.9922 91.7974C75.0274 91.7974 70.1914 86.9619 70.1914 80.9971C70.1914 75.0327 75.0274 70.1973 80.9922 70.1973C86.9571 70.1973 91.7891 75.0327 91.7891 80.9971ZM113.395 91.7974C119.359 91.7974 124.191 86.9619 124.191 80.9971C124.191 75.0327 119.359 70.1973 113.395 70.1973C107.43 70.1973 102.594 75.0327 102.594 80.9971C102.594 86.9619 107.43 91.7974 113.395 91.7974Z" fill="#BADDDD" />
                </svg>
              </div>
              <div className="post-form-editor-cover-placeholder__text">
                Images of your post is very important thing, try to type more succincty
              </div>
            </div>
          </Fragment>
        }

        {imgSrc &&
          <div className="post-form-editor-cover-preview">
            <img className="post-form-editor-cover-preview__img" src={imgSrc} alt="" />
            <div
              title="Remove"
              role="presentation"
              className="post-form-editor-cover-preview__remove"
              onClick={onClickRemove}
            >
              <IconClose />
            </div>
          </div>
        }
      </div>
    </div>
  );
};

PostFormEditorCover.propTypes = {
  file: PropTypes.string || PropTypes.objectOf(PropTypes.any),
  onClickRemove: PropTypes.func.isRequired,
  onChangeFile: PropTypes.func.isRequired,
  addErrorNotification: PropTypes.func.isRequired,
};

export default connect(
  null,
  dispatch => bindActionCreators({
    addErrorNotification,
  }, dispatch),
)(PostFormEditorCover);
