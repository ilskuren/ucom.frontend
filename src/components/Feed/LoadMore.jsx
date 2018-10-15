import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { throttle } from 'lodash';
import React, { PureComponent } from 'react';
import Button from '../Button';
import elementInViewport from '../../utils/elementInViewport';

class LoadMore extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {};

    this.onScroll = throttle(() => {
      if (!elementInViewport(this.el)) {
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
          isDisabled={this.props.feeds.loading}
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
  feeds: PropTypes.objectOf(PropTypes.any),
};

export default connect(state => ({
  feeds: state.feeds,
}))(LoadMore);
