import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import Button, { ButtonType } from './Button';

class SignUpSection extends React.PureComponent {
  constructor(props) {
    super(props);

    this.renderText = this.renderText.bind(this);
    this.renderSubmitSection = this.renderSubmitSection.bind(this);
  }

  renderText() {
    const { title, mainText, handleTitleClick } = this.props.text;
    return (
      <Fragment>
        <h3 className="sign-up__title" onClick={handleTitleClick} role="presentation">{title}</h3>
        <div className="sign-up__text" dangerouslySetInnerHTML={{ __html: mainText }} />
      </Fragment>
    );
  }

  renderSubmitSection() {
    const {
      button: {
        isDisabled, isStretched, text, size, theme,
      },
      description,
    } = this.props.submitData;

    return (
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
    );
  }

  render() {
    const {
      name,
      modifier,
      children,
      activeSection,
    } = this.props;

    return (
      <div className={cn('sign-up__section', { 'sign-up__section_active': activeSection === name })} >
        {
          [
            this.renderText(),
            <div className={cn('sign-up__content', { [`sign-up__content_${modifier}`]: Boolean(modifier) })}>
              {children}
            </div>,
            this.renderSubmitSection(),
          ]
        }
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
    button: ButtonType,
    description: PropTypes.string,
  }),
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default SignUpSection;
