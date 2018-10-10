import io from 'socket.io-client';
import config from '../../package.json';

const socket = io.connect(config.backend.socketEndpoint);

export default socket;
