export const setUser = data => ({ data, type: 'SET_USER' });
export const removeUser = () => ({ type: 'REMOVE_USER' });
export const setOfferData = data => ({ type: 'SET_OFFER_DATA', data });
export const resetOffer = () => ({ type: 'RESET_OFFER' });
export const validateOffer = () => ({ type: 'VALIDATE_OFFER' });
export const validateOfferField = data => ({ type: 'VALIDATE_OFFER_FIELD', data });
