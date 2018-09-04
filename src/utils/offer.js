import moment from 'moment';

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

export const getOfferEditUrl = (offerId) => {
  if (!offerId) {
    return null;
  }

  return `/posts/${offerId}/edit`;
};

export const getDateLeft = (createdAt, durationInDays) => {
  if (!createdAt || !durationInDays) {
    return null;
  }

  const nowDate = moment();
  const startDate = moment(createdAt);
  const endDate = startDate.add(durationInDays, 'days');
  const diff = endDate.diff(nowDate);
  const duration = moment.duration(diff);

  return {
    days: duration.days(),
    time: `${duration.hours()}:${duration.minutes()}:${duration.seconds()}`,
  };
};
