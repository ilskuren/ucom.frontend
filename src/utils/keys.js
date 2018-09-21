import { memoize } from 'lodash';

const Eos = require('eosjs');

const { ecc } = Eos.modules;

export const getActivePrivateKey = memoize((brainkey) => {
  const ownerKey = ecc.seedPrivate(brainkey);
  const activeKey = ecc.seedPrivate(ownerKey);

  return activeKey;
});
