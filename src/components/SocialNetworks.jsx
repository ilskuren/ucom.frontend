import React, { PureComponent } from 'react';
import TextInput from './TextInput';
import Button from './Button';

class SocialNetworks extends PureComponent {
  removeField = (index) => {
    const { fields, onChange } = this.props;
    onChange([...fields.filter((_, i) => index !== i)]);
  }

  addField = () => {
    const { fields, onChange } = this.props;
    onChange([...fields, { sourceUrl: '' }]);
  }

  render() {
    const { fields, onChange } = this.props;
    if (!fields) return null;
    return (
      <div className="social-networks">
        {fields.map((value, index) => (
          <div className="social-networks__block" key={index}>
            <div className="social-networks__block">
              <TextInput
                label="Your website"
                value={value.sourceUrl}
                onChange={sourceUrl => onChange(Object.assign([], fields, { [index]: { ...fields[index], sourceUrl } }))}
              />
            </div>
            {fields.length > 1 && (
              <div className="social-networks__block">
                <Button
                  size="small"
                  theme="transparent"
                  text="Remove"
                  onClick={() => this.removeField(index)}
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
