import { addPermissionValid, detailPermissionValid, listPermissionValid, updatePermissionValid } from '@lib/validation';
import {
  addPermissionMd,
  countListPermissionMd,
  deletePermissionMd,
  getDetailPermissionMd,
  getListPermissionMd,
  updatePermissionMd
} from '@models';
import { validateData } from '@utils';

export const tools = [
  {
    name: 'Dashboard',
    icon: 'Squares2X2Icon',
    children: [
      {
        name: 'Dashboard',
        route: '/',
        actions: ['read']
      }
    ]
  },
  {
    name: 'Phân quyền',
    icon: 'AcademicCapIcon',
    children: [{ name: 'Phân quyền', route: '/permissions', actions: ['create', 'update', 'delete', 'read'] }]
  },
  {
    name: 'Quản lý người dùng',
    icon: 'UsersIcon',
    children: [
      { name: 'Quản lý nhân viên', route: '/personnel', actions: ['create', 'update', 'delete', 'read'] },
      { name: 'Quản lý khách hàng', route: '/customers', actions: ['create', 'update', 'delete', 'read'] }
    ]
  },
  {
    name: 'Quản lý kho',
    icon: 'CircleStackIcon',
    children: [
      { name: 'Quản lý sản phẩm', route: '/products', actions: ['create', 'update', 'delete', 'read'] },
      { name: 'Quản lý khuyến mãi', route: '/promotions', actions: ['create', 'update', 'delete', 'read'] }
    ]
  },
  {
    name: 'Giao dịch',
    icon: 'PresentationChartBarIcon',
    children: [
      { name: 'Quản lý giỏ hàng', route: '/carts', actions: ['create', 'update', 'delete', 'read'] },
      { name: 'Quản lý đơn hàng', route: '/orders', actions: ['create', 'update', 'delete', 'read'] },
      { name: 'Lịch sử giao dịch', route: '/transactions', actions: ['create', 'update', 'delete', 'read'] }
    ]
  },
  {
    name: 'Cấu hình',
    icon: 'Cog6ToothIcon',
    children: [
      { name: 'Cấu hình mẫu thông báo', route: '/templates', actions: ['create', 'update', 'delete', 'read'] },
      { name: 'Lịch sử thông báo', route: '/logs', actions: ['create', 'update', 'delete', 'read'] }
    ]
  },
  {
    name: 'Phản hồi người dùng',
    icon: 'PaperAirplaneIcon',
    children: [
      { name: 'Đánh giá sản phẩm', route: '/evaluates', actions: ['create', 'update', 'delete', 'read'] },
      { name: 'Phản hồi người dùng', route: '/feedbacks', actions: ['create', 'update', 'delete', 'read'] }
    ]
  }
];

export const getToolByUser = async (req, res) => {
  try {
    res.json({ status: true, data: req.tools });
  } catch (error) {
    res.status(500).json({ status: false, mess: error.toString() });
  }
};

export const getListTool = async (req, res) => {
  try {
    res.json({ status: true, data: tools });
  } catch (error) {
    res.status(500).json({ status: false, mess: error.toString() });
  }
};

export const getListPermission = async (req, res) => {
  try {
    const { error, value } = validateData(listPermissionValid, req.query);
    if (error) return res.status(400).json({ status: false, mess: error });
    const { page, limit, keySearch, status, user } = value;
    const where = {};
    if (keySearch) where.$or = [{ name: { $regex: keySearch, $options: 'i' } }];
    if (status || status === 0) where.status = status;
    if (user) where.users = user;
    const documents = await getListPermissionMd(where, page, limit);
    const total = await countListPermissionMd(where);
    res.json({ status: true, data: { documents, total } });
  } catch (error) {
    console.log(1);
    res.status(500).json({ status: false, mess: error.toString() });
  }
};

export const detailPermission = async (req, res) => {
  try {
    const { error, value } = validateData(detailPermissionValid, req.query);
    if (error) return res.status(400).json({ status: false, mess: error });
    const { _id } = value;
    const data = await getDetailPermissionMd({ _id });
    if (!data) return res.status(400).json({ status: false, mess: 'Nhóm quyền không tồn tại!' });
    res.json({ status: true, data });
  } catch (error) {
    res.status(500).json({ status: false, mess: error.toString() });
  }
};

export const deletePermission = async (req, res) => {
  try {
    const { error, value } = validateData(detailPermissionValid, req.body);
    if (error) return res.status(400).json({ status: false, mess: error });
    const { _id } = value;
    const data = await deletePermissionMd({ _id });
    if (!data) return res.status(400).json({ status: false, mess: 'Nhóm quyền không tồn tại!' });
    res.status(201).json({ status: true, data });
  } catch (error) {
    res.status(500).json({ status: false, mess: error.toString() });
  }
};

export const addPermission = async (req, res) => {
  try {
    const { error, value } = validateData(addPermissionValid, req.body);
    if (error) return res.status(400).json({ status: false, mess: error });
    let { name, users, tools, description } = value;

    const checkName = await getDetailPermissionMd({ name });
    if (checkName) return res.status(400).json({ status: false, mess: 'Tên nhóm quyền đã tồn tại!' });

    const data = await addPermissionMd({ by: req.userInfo._id, name, users, tools, description });
    res.status(201).json({ status: true, data });
  } catch (error) {
    res.status(500).json({ status: false, mess: error.toString() });
  }
};

export const updatePermission = async (req, res) => {
  try {
    const { error, value } = validateData(updatePermissionValid, req.body);
    if (error) return res.status(400).json({ status: false, mess: error });
    const { _id, name, description, status, users, tools } = value;

    const permission = await getDetailPermissionMd({ _id });
    if (!permission) return res.status(400).json({ status: false, mess: 'Nhóm quyền không tồn tại!' });

    if (name) {
      const checkName = await getDetailPermissionMd({ name });
      if (checkName) return res.status(400).json({ status: false, mess: 'Tên nhóm quyền đã tồn tại!' });
    }

    const data = await updatePermissionMd({ _id }, { updateBy: req.userInfo._id, name, description, status, users, tools });
    res.status(201).json({ status: true, data });
  } catch (error) {
    res.status(500).json({ status: false, mess: error.toString() });
  }
};
