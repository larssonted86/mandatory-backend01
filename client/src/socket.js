import io from 'socket.io-client';
let socket;
export function getSocket() {
  if (!socket) {
    socket = io('localhost:8090');
  }
  return socket;
};
