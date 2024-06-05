import { detailProjectMd } from '@models';
import { checkJson } from '@utils';

export const projectMiddleware = async (req, res, next) => {
  let info = req.header('info');
  if (!info) return res.status(401).json({ status: false, mess: 'Info không hợp lệ!' });
  info = checkJson(info) || info;
  try {
    const { project } = info;
    if (!project) return res.status(401).json({ status: false, mess: 'Dự án không hợp lệ!' });
    const where = { status: 1, _id: project }
    if (req.userInfo.type !== "admin") where._id = { $in: req.userInfo.department?.projects };
    const projectz = await detailProjectMd(where)
    if (!projectz) return res.status(401).json({ status: false, mess: 'Bạn không có quyền quản lý dự án này!' });
    req.project = projectz
    next();
  } catch (error) {
    res.status(500).json({ status: false, mess: error.toString() });
  }
};
