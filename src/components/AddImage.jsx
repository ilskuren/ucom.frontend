import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import IconAddImage from './Icons/AddImage';

class AddImage extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {

    };
  }

  onChange(files) {
    if (this.props.onChange) {
      this.props.onChange(files[0]);
    }
  }

  render() {
    return (
      <label className="add-image">
        <div className="inline">
          <div className="inline__item">
            <IconAddImage />
          </div>
          <div className="inline__item">
            Add image
          </div>
        </div>
        <input
          type="file"
          accept="image/*"
          onChange={e => this.onChange(e.target.files)}
        />
      </label>
    );
  }
}

AddImage.propTypes = {
  onChange: PropTypes.func,
};

export default AddImage;
