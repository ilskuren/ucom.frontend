import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import TextInputField from './Field/TextInputField';
import Button from './Button';

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
            onClick={() => fields.push()}
          />
        </div>
      </div>
    );
  }
}

SocialNetworks.propTypes = {
  userSources: PropTypes.arrayOf(PropTypes.object),
};

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
