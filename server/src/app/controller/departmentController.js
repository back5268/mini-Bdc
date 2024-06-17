import { addDepartmentValid, detailDepartmentValid, listDepartmentValid, updateDepartmentValid } from '@lib/validation';
import { createDepartmentMd, countDepartmentMd, deleteDepartmentMd, detailDepartmentMd, listDepartmentMd, updateDepartmentMd } from '@models';
import { validateData } from '@utils';

export const getListDepartment = async (req, res) => {
  try {
    const { error, value } = validateData(listDepartmentValid, req.query);
    if (error) return res.status(400).json({ status: false, mess: error });
    const { page, limit, keySearch, status } = value;
    const where = {};
    if (keySearch) where.$or = [{ name: { $regex: keySearch, $options: 'i' } }];
    if (status || status === 0) where.status = status
    const documents = await listDepartmentMd(where, page, limit);
    const total = await countDepartmentMd(where);
    res.json({ status: true, data: { documents, total } });
  } catch (error) {
    res.status(500).json({ status: false, mess: error.toString() });
  }
};

export const getListDepartmentInfo = async (req, res) => {
  try {
    res.json({ status: true, data: await listDepartmentMd({}, false, false, false, "_id name code") });
  } catch (error) {
    res.status(500).json({ status: false, mess: error.toString() });
  }
};

export const detailDepartment = async (req, res) => {
  try {
    const { error, value } = validateData(detailDepartmentValid, req.query);
    if (error) return res.status(400).json({ status: false, mess: error });
    const { _id } = value;
    const data = await detailDepartmentMd({ _id });
    if (!data) return res.status(400).json({ status: false, mess: 'Phòng ban không tồn tại!' });
    res.json({ status: true, data });
  } catch (error) {
    res.status(500).json({ status: false, mess: error.toString() });
  }
};

export const deleteDepartment = async (req, res) => {
  try {
    const { error, value } = validateData(detailDepartmentValid, req.body);
    if (error) return res.status(400).json({ status: false, mess: error });
    const { _id } = value;
    const data = await deleteDepartmentMd({ _id });
    if (!data) return res.status(400).json({ status: false, mess: 'Phòng ban không tồn tại!' });
    res.status(201).json({ status: true, data });
  } catch (error) {
    res.status(500).json({ status: false, mess: error.toString() });
  }
};

export const addDepartment = async (req, res) => {
  try {
    const { error, value } = validateData(addDepartmentValid, req.body);
    if (error) return res.status(400).json({ status: false, mess: error });
    let { name, code } = value;

    const checkName = await detailDepartmentMd({ name });
    if (checkName) return res.status(400).json({ status: false, mess: 'Tên phòng ban đã tồn tại!' });

    const checkCode = await detailDepartmentMd({ code });
    if (checkCode) return res.status(400).json({ status: false, mess: 'Mã phòng ban đã tồn tại!' });

    const data = await createDepartmentMd({ by: req.userInfo._id, ...value });
    res.status(201).json({ status: true, data });
  } catch (error) {
    res.status(500).json({ status: false, mess: error.toString() });
  }
};

export const updateDepartment = async (req, res) => {
  try {
    const { error, value } = validateData(updateDepartmentValid, req.body);
    if (error) return res.status(400).json({ status: false, mess: error });
    const { _id, name, code } = value;

    const Department = await detailDepartmentMd({ _id });
    if (!Department) return res.status(400).json({ status: false, mess: 'Phòng ban không tồn tại!' });

    if (name) {
      const checkName = await detailDepartmentMd({ name });
      if (checkName) return res.status(400).json({ status: false, mess: 'Tên phòng ban đã tồn tại!' });
    }

    if (code) {
      const checkCode = await detailDepartmentMd({ code });
      if (checkCode) return res.status(400).json({ status: false, mess: 'Mã phòng ban đã tồn tại!' });
    }

    const data = await updateDepartmentMd({ _id }, { updateBy: req.userInfo._id, ...value });
    res.status(201).json({ status: true, data });
  } catch (error) {
    res.status(500).json({ status: false, mess: error.toString() });
  }
};
