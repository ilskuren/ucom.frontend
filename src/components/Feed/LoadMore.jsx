import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { throttle } from 'lodash';
import React, { PureComponent } from 'react';
import Button from '../Button';

class LoadMore extends PureComponent {
  constructor(props) {
    super(props);

    this.onScroll = throttle(() => {
      if (!this.el) {
        return;
      }

      const rect = this.el.getBoundingClientRect();

      if (rect.top - window.innerHeight > 400) {
        return;
      }

      if (typeof this.props.onClick === 'function') {
        this.props.onClick();
      }
    }, 100);
  }

  componentWillMount() {
    window.removeEventListener('scroll', this.onScroll);
  }

  componentDidMount() {
    window.addEventListener('scroll', this.onScroll);
  }

  render() {
    return (
      <div ref={(el) => { this.el = el; }}>
        <Button
          isStretched
          theme="thin"
          size="medium"
          text="Load more"
          isDisabled={this.props.disabled}
          onClick={() => {
            if (typeof this.props.onClick === 'function') {
              this.props.onClick();
            }
          }}
        />
      </div>
    );
  }
}

LoadMore.propTypes = {
  onClick: PropTypes.func,
};

export default connect(state => ({
  feeds: state.feeds,
}))(LoadMore);
