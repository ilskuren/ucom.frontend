import { isObject } from 'lodash';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { defaultTributeConfig } from '../utils/tribute';

class TributeWrapper extends PureComponent {
  constructor(props) {
    super(props);
    this.element = React.createRef();
  }

  componentDidMount() {
    const Tribute = require('tributejs'); //eslint-disable-line

    this.tribute = new Tribute({ ...defaultTributeConfig, ...this.props.config });
    this.tribute.attach(this.element);

    if (this.props.onChange) {
      this.element.addEventListener('tribute-replaced', this.onChangeValue);
    }
  }

  componentWillUnmount() {
    this.tribute.detach(this.element);
    if (this.props.onChange) {
      this.element.removeEventListener('tribute-replaced', this.onChangeValue);
    }
  }

  onChangeValue = () => {
    this.props.onChange(this.element.value || this.element.innerHTML);
  }

  render() {
    return (
      React.cloneElement(this.props.children, {
        ref: (element) => {
          this.element = element;

          if (typeof this.props.children.ref === 'function') {
            this.props.children.ref(element);
          } else if (isObject(this.props.children.ref)) {
            this.props.children.ref.current = element;
          }
        },
      })
    );
  }
}

TributeWrapper.propTypes = {
  children: PropTypes.shape({
    ref: PropTypes.any,
  }).isRequired,
  config: PropTypes.objectOf(PropTypes.any),
  onChange: PropTypes.func,
};

TributeWrapper.defaultProps = {
  config: {},
  onChange: null,
};

export default TributeWrapper;
