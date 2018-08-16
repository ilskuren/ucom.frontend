import config from '../../package.json';

const Eos = require('eosjs');

const { ecc } = Eos.modules;

export const login = ({ brainkey, accountName }) => {
  const ownerKey = ecc.seedPrivate(brainkey);
  const activeKey = ecc.seedPrivate(ownerKey);
  const sign = ecc.sign(accountName, activeKey);
  const publicKey = ecc.privateToPublic(activeKey);

  return fetch(`${config.backend.httpEndpoint}/api/v1/auth/register`, {
    method: 'post',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      sign,
      account_name: accountName,
      public_key: publicKey,
    }),
  })
    .then(resp => resp.json());
};
