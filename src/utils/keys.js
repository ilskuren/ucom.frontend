import { memoize } from 'lodash';
import ecc from 'eosjs-ecc';

export const getActivePrivateKey = memoize((brainkey) => {
  const ownerKey = ecc.seedPrivate(brainkey);
  const activeKey = ecc.seedPrivate(ownerKey);

  return activeKey;
});

export const getPrivateKey = memoize(brainkey =>
  ecc.seedPrivate(brainkey));
