import io from 'socket.io-client';
import config from '../../package.json';
import { getToken } from '../utils/token';

const token = getToken();

const socket = io(config.backend.socketEndpoint, {
  autoConnect: false,
  transports: [
    'websocket',
  ],
  query: { token },
});

export default socket;
