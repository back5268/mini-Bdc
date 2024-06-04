import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { getDetailUserMd, getListPermissionMd, getListToolMd } from '@models';
dotenv.config();

export const authMiddleware = async (req, res, next) => {
  const token = req.header('Bearer');
  if (!token) return res.status(401).json({ status: false, mess: 'Token không hợp lệ!' });
  try {
    const checkToken = jwt.verify(token, process.env.JWT_SECRET_TOKEN);
    const userInfo = await getDetailUserMd({ _id: checkToken._id });

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

export const permissionMiddleware = async (req, res, next) => {
  try {
    if (!req.userInfo || ['user', 'admin'].includes(req.userInfo.type))
      return res.status(400).json({ status: false, mess: 'Bạn không có quyền thực hiện tác vụ này!' });
    const permissionTools = [];
    if (req.userInfo.type === 'user') {
      const permissions = await getListPermissionMd({ users: { $elemMatch: { $eq: req.userInfo._id }, status: 1 } });
      if (permissions.length > 0) {
        permissions.forEach((p) => {
          const tools = p.tools;
          if (tools.length > 0) {
            tools.forEach((t) => {
              const index = permissionTools.findIndex((pt) => pt.route === t.route);
              if (index >= 0) {
                const actions = a.actions;
                actions.forEach((a) => {
                  if (!permissionTools[index]?.actions?.includes(a)) permissionTools[index].actions.push(a);
                });
              } else permissionTools.push({ route: t.route, actions: [...t.actions] });
            });
          }
        });
      } else return res.status(400).json({ status: false, mess: 'Bạn không có quyền thực hiện tác vụ này!' });
    } else {
      const tools = await getListToolMd({ status: 1 });
      tools.forEach(t => {
        const children = t.children
        children.forEach(c => {
          permissionTools.push({ route: c.route, actions: c.actions })
        })
      })
    }
    req.tools = permissionTools
    next();
  } catch (error) {
    res.status(500).json({ status: false, mess: error.toString() });
  }
};
