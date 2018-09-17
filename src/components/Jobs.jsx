import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { bind } from 'decko';
import Button from './Button';
import TextInputField from './Field/TextInputField';
import DateInputField from './Field/DateInputField';

class Jobs extends PureComponent {
  @bind
  removeField(index) {
    const { fields } = this.props;
    return () => fields.remove(index);
  }

  @bind
  addField() {
    const { fields } = this.props;
    fields.push({});
  }

  render() {
    const { fields } = this.props;
    return (
      <div className="work-and-education">
        {fields.map((name, index) => (
          <div className="work-and-education__item" key={index}>
            <div className="work-and-education__block">
              <TextInputField
                label="Work place"
                name={`${name}.title`}
              />
            </div>
            <div className="work-and-education__block">
              <TextInputField
                label="Position"
                name={`${name}.position`}
              />
            </div>
            <div className="work-and-education__block">
              <DateInputField
                label="Started date"
                name={`${name}.startDate`}
              />
            </div>
            <div className="work-and-education__block">
              <DateInputField
                label="Ended date"
                name={`${name}.endDate`}
              />
            </div>
            {fields.length > 1 && (
              <div className="work-and-education__block">
                <Button
                  theme="transparent"
                  size="small"
                  text="Remove"
                  onClick={this.removeField(index)}
                />
              </div>
            )}
          </div>
          ))}
        <div className="work-and-education__block">
          <Button
            theme="transparent"
            size="small"
            text="Add another"
            onClick={this.addField}
          />
        </div>
      </div>
    );
  }
}

Jobs.propTypes = {
  fields: PropTypes.shape({
    length: PropTypes.number,
  }),
};

export default Jobs;
