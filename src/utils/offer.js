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
  description: 'Whitelist',
}, {
  id: 6,
  description: 'Charity',
}, {
  id: 7,
  description: 'Giveaway',
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
  if (diff < 0) {
    return null;
  }
  const duration = moment.duration(diff);

  return {
    years: duration.years(),
    days: duration.days(),
    time: `${duration.hours()}:${duration.minutes()}:${duration.seconds()}`,
  };
};
