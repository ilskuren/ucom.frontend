import React, { PureComponent } from 'react';
import { tributeConfig } from '../utils/tribute';

class TributeWrapper extends PureComponent {
  constructor(props) {
    super(props);
    this.element = React.createRef();
  }

  componentDidMount() {
    const Tribute = require('tributejs'); //eslint-disable-line

    this.tribute = new Tribute(tributeConfig);
    this.tribute.attach(this.element);
  }

  componentWillUnmount() {
    this.tribute.detach(this.element);
  }

  render() {
    return (
      React.cloneElement(this.props.children, {
        ref: (element) => {
          this.element = element;
          if (typeof this.props.children.ref === 'function') {
            this.props.children.ref(element);
          }
        },
      })
    );
  }
}

export default TributeWrapper;
