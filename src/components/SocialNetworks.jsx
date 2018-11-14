import React, { PureComponent } from 'react';
import _ from 'lodash';
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
    const { fields, onChange, errors } = this.props;
    if (!fields) return null;
    const myErrors = _.isEmpty(errors) ? [] :
      Object.entries(errors)
        .filter(e => e[0].indexOf('usersSources') + 1)
        .map(e => ({ [e[0].replace('usersSources.', '').replace('.sourceUrl', '')]: e[1] }));
    return (
      <div className="social-networks">
        {fields.map((value, index) => (
          <div className="social-networks__block" key={index}>
            <div className="social-networks__block">
              <TextInput
                touched
                label="Your website"
                value={value.sourceUrl}
                error={myErrors.find(e => e[index]) && myErrors.find(e => e[index])[index]}
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
