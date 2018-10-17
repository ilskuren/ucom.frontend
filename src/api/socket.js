import io from 'socket.io-client';
import config from '../../package.json';


const socket = io(config.backend.socketEndpoint, {
  autoConnect: false,
  transports: ['websocket'],
});

export default socket;
