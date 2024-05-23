import { listPermissionMd, listToolMd } from '@models';

export const permissionMiddleware = async (req, res, next) => {
  try {
    if (!req.userInfo || !['user', 'admin'].includes(req.userInfo.type))
      return res.status(400).json({ status: false, mess: 'Bạn không có quyền thực hiện tác vụ này!' });
    const permissionz = [];
    if (req.userInfo.type === 'user') {
      const permissions = await listPermissionMd({ users: { $elemMatch: { $eq: req.userInfo._id } }, status: 1 });
      if (permissions.length > 0) {
        permissions.forEach((p) => {
          const tools = p.tools;
          if (tools.length > 0) {
            tools.forEach((t) => {
              const index = permissionz.findIndex((pt) => pt.route === t.route);
              if (index >= 0) {
                const actions = a.actions;
                actions.forEach((a) => {
                  if (!permissionz[index]?.actions?.includes(a)) permissionz[index].actions.push(a);
                });
              } else permissionz.push({ route: t.route, actions: [...t.actions] });
            });
          }
        });
      } else return res.status(400).json({ status: false, mess: 'Bạn không có quyền thực hiện tác vụ này!' });
    } else {
      const tools = await listToolMd({ status: 1 }, false, false, false, 'name icon children', { sort: 1 });
      tools.forEach((t) => {
        const children = t.children;
        children.forEach((c) => {
          permissionz.push({ route: c.route, actions: c.actions });
        });
      });
      req.tools = tools;
    }
    req.permissions = permissionz;
    const baseUrl = req.baseUrl;
    const path = req.path;
    const method = req.method;
    const action = method === 'GET' ? 'read' : method === 'POST' ? 'create' : method === 'PUT' ? 'update' : 'delete';
    const checkPath = permissionz.find((p) => p.route === '/' + path.split('/')?.[1]);
    if (baseUrl !== '/auth' && (!checkPath || !checkPath.actions.includes(action)))
      return res.status(400).json({ status: false, mess: 'Bạn không có quyền thực hiện tác vụ này!' });
    next();
  } catch (error) {
    res.status(500).json({ status: false, mess: error.toString() });
  }
};
