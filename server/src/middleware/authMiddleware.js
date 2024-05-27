import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { detailUserMd } from '@models';
dotenv.config();

export const authMiddleware = async (req, res, next) => {
  console.log(req.query, 7);
  const token = req.header('Bearer');
  if (!token) return res.status(401).json({ status: false, mess: 'Token không hợp lệ!' });
  try {
    const checkToken = jwt.verify(token, process.env.JWT_SECRET_TOKEN);
    const userInfo = await detailUserMd({ _id: checkToken._id }, [{ path: 'department', select: '_id name projects' }]);

    if (!userInfo) return res.status(401).json({ status: false, mess: 'Token không hợp lệ!' });
    if (userInfo.token !== token) return res.status(401).json({ status: false, mess: 'Tài khoản đã được đăng nhập ở nơi khác!' });
    if (userInfo.status === 0)
      return res
        .status(401)
        .json({ status: false, mess: 'Tài khoản của bạn chưa được kích hoạt hoặc đã bị khóa, vui lòng liên hệ quản trị viên!' });
    req.userInfo = userInfo;
    next();
  } catch (error) {
    res.status(500).json({ status: false, mess: error.toString() });
  }
};
