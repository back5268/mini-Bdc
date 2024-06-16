import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { detailUserMd } from '@models';
dotenv.config();

export const socketMiddleware = async (socket, next) => {
  try {
    const token = socket.handshake.query.token;
    const checkToken = jwt.verify(token, process.env.JWT_SECRET_TOKEN);
    const userInfo = await detailUserMd({ _id: checkToken._id });
    if (!userInfo) {
      socket.disconnect();
      return;
    }
    next();
  } catch (error) {
    socket.disconnect();
  }
};
