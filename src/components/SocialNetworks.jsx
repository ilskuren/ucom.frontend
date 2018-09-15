import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import TextInputField from './Field/TextInputField';
import Button from './Button';

class SocialNetworks extends PureComponent {
  formatValue(value) {
    if (typeof value === 'object') {
      return value.sourceUrl;
    }
    return value;
  }

  render() {
    const { fields } = this.props;
    return (
      <div className="social-networks">
        {fields.map((name, index) => (
          <div className="social-networks__block" key={index}>
            <div className="social-networks__block">
              <TextInputField
                label="Your website"
                name={name}
                formatter={this.formatValue}
              />
            </div>
            {fields.length > 1 && (
              <div className="social-networks__block">
                <Button
                  size="small"
                  theme="transparent"
                  text="Remove"
                  onClick={() => fields.remove(index)}
                />
              </div>
            )}
          </div>
        ))}
        <div className="social-networks__block">
          <Button
            size="small"
            theme="transparent"
            text="Add another"
            onClick={() => fields.push({ sourceUrl: '' })}
          />
        </div>
      </div>
    );
  }
}

SocialNetworks.propTypes = {
  fields: PropTypes.shape(PropTypes.any),
};

export default SocialNetworks;
