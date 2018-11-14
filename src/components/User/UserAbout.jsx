import { connect } from 'react-redux';
import React, { PureComponent } from 'react';
import { getUserById } from '../../store/users';
import MinimizedText from '../MinimizedText';

const ABOUT_TEXT_SHOW_LIMIT = 280;

class UserAbout extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      minimized: true,
    };
  }

  render() {
    const user = getUserById(this.props.users, this.props.userId);

    if (!user || !user.about) {
      return null;
    }

    return (
      <div className="user-section">
        <div className="user-section__title">
          <h2 className="title title_xxsmall title_light">About</h2>
        </div>

        <div className="user-section__text">
          <MinimizedText
            text={user.about}
            enabled={user.about.length > ABOUT_TEXT_SHOW_LIMIT}
            minimized={this.state.minimized}
            onClickShowMore={() => {
              this.setState({ minimized: !this.state.minimized });
            }}
          />
        </div>
      </div>
    );
  }
}

export default connect(state => ({
  users: state.users,
}))(UserAbout);
