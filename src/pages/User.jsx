import React, { PureComponent } from 'react';
import Header from '../components/Header';

class UserPage extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <div className="page">
        <Header />
      </div>
    );
  }
}

export default UserPage;
