import io from 'socket.io-client';

const socket = io('http://192.168.1.225:8000/')

export default socket;