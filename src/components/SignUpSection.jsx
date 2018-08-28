import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import Button from './Button';

class SignUpSection extends React.PureComponent {
  render() {
    const {
      name,
      modifier,
      children,
      activeSection,
    } = this.props;

    const {
      button: {
        isDisabled, isStretched, text, size, theme,
      },
      description,
    } = this.props.submitData;

    const { title, mainText, handleTitleClick } = this.props.text;

    return (
      <div className={cn('sign-up__section', { 'sign-up__section_active': activeSection === name })} >
        <h3 className="sign-up__title" onClick={handleTitleClick} role="presentation">{title}</h3>
        <div className="sign-up__text" dangerouslySetInnerHTML={{ __html: mainText }} />
        <div className={cn('sign-up__content', { [`sign-up__content_${modifier}`]: Boolean(modifier) })}>
          {children}
        </div>
        <div className="sign-up__submit-section">
          <div className="sign-up__submit-section-button">
            <Button
              isStretched={isStretched || false}
              isDisabled={isDisabled}
              text={text || 'default'}
              size={size || 'big'}
              theme={theme}
            />
          </div>
          { description && <div className="sign-up__submit-section-description">{description}</div> }
        </div>
      </div>
    );
  }
}

SignUpSection.propTypes = {
  name: PropTypes.string,
  activeSection: PropTypes.string,
  text: PropTypes.shape({
    mainText: PropTypes.string,
    title: PropTypes.string,
    handleTitleClick: PropTypes.func,
  }),
  modifier: PropTypes.string,
  submitData: PropTypes.shape({
    button: PropTypes.shape({
      theme: PropTypes.string,
      size: PropTypes.string,
      isDisabled: PropTypes.bool,
      isStretched: PropTypes.bool,
      isRounded: PropTypes.bool,
      text: PropTypes.string,
    }),
    description: PropTypes.string,
  }),
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

export default SignUpSection;
