import PropTypes from 'prop-types';
import { Redirect } from 'react-router';
import { connect } from 'react-redux';
import React, { PureComponent } from 'react';
import { getPostUrl } from '../utils/posts';
import { getToken } from '../utils/token';
import { getFromDataFromObject } from '../utils/data';
import { createOffer, getPost, updateOffer } from '../api';
import { setOfferData, validateOffer, resetOffer } from '../actions';
import OfferForm from '../components/OfferForm';

class CreateOffer extends PureComponent {
  componentDidMount() {
    if (this.props.match.params.id) {
      this.getData(this.props.match.params.id);
    }
  }

  componentWillReceiveProps(nextProp) {
    if (nextProp.match.params.id && nextProp.match.params.id !== this.props.match.params.id) {
      this.getData(nextProp.match.params.id);
    }

    if (this.props.match.params.id && !nextProp.match.params.id) {
      this.props.resetOffer();
    }
  }

  componentWillUnmount() {
    this.props.resetOffer();
  }

  getData(id) {
    this.props.resetOffer();

    getPost(id).then((data) => {
      this.props.setOfferData(data);
    });
  }

  save() {
    if (!this.props.offer.isValid) {
      this.props.validateOffer();
      return;
    }

    const saveFn = this.props.match.params.id ? updateOffer : createOffer;
    const data = getFromDataFromObject(this.props.offer.data);

    saveFn(data, getToken(), this.props.match.params.id)
      .then((data) => {
        this.props.history.push(getPostUrl(data.post_id));
      });
  }

  render() {
    if (!this.props.user.id) {
      return <Redirect to="/" />;
    }

    return (
      <OfferForm
        onClickSave={() => this.save()}
      />
    );
  }
}

CreateOffer.propTypes = {
  resetOffer: PropTypes.func,
  setOfferData: PropTypes.func,
  validateOffer: PropTypes.func,
  offer: PropTypes.objectOf(PropTypes.any),
};

export default connect(
  state => ({
    user: state.user,
    offer: state.offer,
  }),
  dispatch => ({
    resetOffer: () => dispatch(resetOffer()),
    setOfferData: data => dispatch(setOfferData(data)),
    validateOffer: () => dispatch(validateOffer()),
  }),
)(CreateOffer);
