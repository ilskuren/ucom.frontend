import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { bind } from 'decko';
import TextInputField from './Field/TextInputField';
import Button from './Button';

class SocialNetworks extends PureComponent {
  formatValue(value) {
    if (typeof value === 'object') {
      return value.sourceUrl;
    }
    return value;
  }

  @bind
  removeField(index) {
    const { fields } = this.props;
    return () => fields.remove(index);
  }

  @bind
  addField() {
    const { fields } = this.props;
    fields.push('');
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
                  onClick={this.removeField(index)}
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
            onClick={this.addField}
          />
        </div>
      </div>
    );
  }
}

SocialNetworks.propTypes = {
  fields: PropTypes.shape({
    length: PropTypes.number,
  }),
};

export default SocialNetworks;
