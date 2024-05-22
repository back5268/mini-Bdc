import { io } from 'socket.io-client';

const URL = process.env.REACT_APP_API_URL;
const token = localStorage.getItem('token');
export const socket = io(URL, {
  query: { token }
});
