import React, { Fragment } from 'react';
import { range } from 'lodash';
import TextInput from '../TextInput';

const RegistrationBrainkeyVerification = () => (
  <div className="registration-brainkey-verification">
    <div className="registration-brainkey">
      {range(12).map(i => (
        <Fragment key={i}>
          {i === 1 || i === 3 ? (
            <div className="registration-brainkey__item registration-brainkey__item_input">
              <TextInput
                ymDisableKeys
                placeholder={`word ${i + 1}`}
              />
            </div>
          ) : (
            <div className="registration-brainkey__item" data-index={i + 1}>monkey&nbsp;</div>
          )}
        </Fragment>
      ))}
    </div>
  </div>
);

export default RegistrationBrainkeyVerification;
