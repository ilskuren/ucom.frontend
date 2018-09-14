import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import TextInputField from './Field/TextInputField';
import Button from './Button';


function formatValue(value, name) {
  if (typeof value === 'object') {
    return value.sourceUrl;
  }
  return value;
}

class SocialNetworks extends PureComponent {
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
                formatter={formatValue}
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

// SocialNetworks.propTypes = {
//   fields: PropTypes.arrayOf(PropTypes.object),
// };

export default SocialNetworks;


// {Array.isArray(userSources) && userSources.map((item, index) => (
//   <div className="social-networks__block" key={index}>
//     <div className="social-networks__block">
//       <TextInputField
//         label="Your website"
//         name={`sourceUrl ${index}`}
//       />
//     </div>
//     {Array.isArray(userSources) && userSources.length > 1 && (
//       <div className="social-networks__block">
//         <Button
//           size="small"
//           theme="transparent"
//           text="Remove"
//           onClick={this.makeRemoveSiteClickHandler(index)}
//         />
//       </div>
//     )}
//   </div>
// ))}
