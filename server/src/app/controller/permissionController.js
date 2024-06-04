import { addPermissionValid, detailPermissionValid, listPermissionValid, updatePermissionValid } from '@lib/validation';
import {
  createPermissionMd,
  countPermissionMd,
  deletePermissionMd,
  detailPermissionMd,
  listPermissionMd,
  updatePermissionMd
} from '@models';
import { validateData } from '@utils';

export const getListPermission = async (req, res) => {
  try {
    const { error, value } = validateData(listPermissionValid, req.query);
    if (error) return res.status(400).json({ status: false, mess: error });
    const { page, limit, keySearch, status, user } = value;
    const where = {};
    if (keySearch) where.$or = [{ name: { $regex: keySearch, $options: 'i' } }];
    if (status || status === 0) where.status = status;
    if (user) where.users = user;
    const documents = await listPermissionMd(where, page, limit);
    const total = await countPermissionMd(where);
    res.json({ status: true, data: { documents, total } });
  } catch (error) {
    res.status(500).json({ status: false, mess: error.toString() });
  }
};

export const detailPermission = async (req, res) => {
  try {
    const { error, value } = validateData(detailPermissionValid, req.query);
    if (error) return res.status(400).json({ status: false, mess: error });
    const { _id } = value;
    const data = await detailPermissionMd({ _id });
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
    const { name } = value;

    const checkName = await detailPermissionMd({ name });
    if (checkName) return res.status(400).json({ status: false, mess: 'Tên nhóm quyền đã tồn tại!' });

    const data = await createPermissionMd({ by: req.userInfo._id, ...value });
    res.status(201).json({ status: true, data });
  } catch (error) {
    res.status(500).json({ status: false, mess: error.toString() });
  }
};

export const updatePermission = async (req, res) => {
  try {
    const { error, value } = validateData(updatePermissionValid, req.body);
    if (error) return res.status(400).json({ status: false, mess: error });
    const { _id, name } = value;

    const permission = await detailPermissionMd({ _id });
    if (!permission) return res.status(400).json({ status: false, mess: 'Nhóm quyền không tồn tại!' });

    if (name) {
      const checkName = await detailPermissionMd({ name });
      if (checkName) return res.status(400).json({ status: false, mess: 'Tên nhóm quyền đã tồn tại!' });
    }

    const data = await updatePermissionMd({ _id }, { updateBy: req.userInfo._id, ...value });
    res.status(201).json({ status: true, data });
  } catch (error) {
    res.status(500).json({ status: false, mess: error.toString() });
  }
};
