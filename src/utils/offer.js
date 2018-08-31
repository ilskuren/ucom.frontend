import dict from './dict';

export const OFFER_TYPES = [{
  id: 1,
  description: 'Sale',
}, {
  id: 2,
  description: 'Token Sale',
}, {
  id: 3,
  description: 'Event',
}, {
  id: 4,
  description: 'Service',
}, {
  id: 5,
  description: 'Service',
}, {
  id: 6,
  description: 'White List',
}, {
  id: 7,
  description: 'Charity',
}, {
  id: 8,
  description: 'Give Away',
}];

export const validateSaleOffer = (fields = {}) => {
  const errors = [];

  if (!fields.title) {
    errors.push({
      field: 'title',
      message: dict.titleIsRequired,
    });
  }

  if (!fields.post_type_id) {
    errors.push({
      field: 'post_type_id',
      message: dict.typeIsRequired,
    });
  }

  if (!fields.action_button_title) {
    errors.push({
      field: 'action_button_title',
      message: dict.actionButtonNameIsRequired,
    });
  }

  if (!fields.action_button_url) {
    errors.push({
      field: 'action_button_url',
      message: dict.actionButtonLinkIsRequired,
    });
  }

  if (!fields.action_duration_in_days) {
    errors.push({
      field: 'action_duration_in_days',
      message: dict.timeSaleDaysIsRequired,
    });
  } else if (fields.action_duration_in_days <= 0) {
    errors.push({
      field: 'action_duration_in_days',
      message: dict.timeSaleDaysNoZero,
    });
  }

  if (!fields.main_image_filename) {
    errors.push({
      field: 'main_image_filename',
      message: dict.coverIsRequired,
    });
  }

  if (!fields.leading_text) {
    errors.push({
      field: 'leading_text',
      message: dict.leadingTextIsRequired,
    });
  }

  if (!fields.description) {
    errors.push({
      field: 'description',
      message: dict.descriptionIsRequired,
    });
  }

  return errors;
};

export const getOfferUrl = (offerId) => {
  if (!offerId) {
    return null;
  }

  return `/offer/${offerId}`;
};
