import io from 'socket.io-client';
import { getToken } from '../utils/token';
import { getBackendConfig } from '../utils/config';

const token = getToken();

const socket = io(getBackendConfig().socketEndpoint, {
  autoConnect: false,
  transports: [
    'websocket',
  ],
  query: { token },
});

export default socket;
