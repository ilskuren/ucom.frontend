import React, { Component } from 'react';
import PropTypes from 'prop-types';
import UserCard from './UserCard';
import Popup from './Popup';
import ModalContent from './ModalContent';
import ProfilesList from './ProfilesList';

class VerticalCards extends Component {
  constructor(props) {
    super(props);

    this.state = {
      popupIsVisible: false,
    };
  }

  hidePopup() {
    this.setState({ popupIsVisible: false });
  }

  showPopup() {
    this.setState({ popupIsVisible: true });
  }

  render() {
    const { userCards } = this.props;

    return (
      <div className="vertical-cards">
        {userCards.slice(0, 3).map((userCard, userCardKey) => (
          <div className="vertical-cards__card" key={userCardKey} >
            <UserCard
              sign=""
              userName={userCard.userName}
              avatarUrl={userCard.avatarUrl}
              accountName={userCard.accountName}
              profileLink={userCard.profileLink}
              theme="vertical"
            />
          </div>
        ))}

        {userCards.length > 3 && (
          <div className="vertical-cards__view-all" role="presentation" onClick={() => this.showPopup()}>View All</div>
        )}

        {this.state.popupIsVisible && (
          <Popup onClickClose={() => this.hidePopup()}>
            <ModalContent onClickClose={() => this.hidePopup()}>
              <ProfilesList
                title={this.props.title}
                users={userCards}
                noSign
              />
            </ModalContent>
          </Popup>
        )}
      </div>
    );
  }
}

VerticalCards.propTypes = {
  userCards: PropTypes.arrayOf(PropTypes.object),
  title: PropTypes.string,
};

export default VerticalCards;
