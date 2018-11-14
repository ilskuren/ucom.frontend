import React, { PureComponent } from 'react';
import { bind } from 'decko';
import TextInput from './TextInput';
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
    return () => fields.splice(index);
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
        {fields.map((value, index) => (
          <div className="social-networks__block" key={index}>
            <div className="social-networks__block">
              <TextInput
                label="Your website"
                value={this.formatValue(value)}
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

export default SocialNetworks;
