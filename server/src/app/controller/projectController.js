import { uploadFileToFirebase } from '@lib/firebase';
import { addProjectValid, detailProjectValid, listProjectValid, updateProjectValid } from '@lib/validation';
import {
  createProjectMd,
  countProjectMd,
  deleteProjectMd,
  detailProjectMd,
  listProjectMd,
  updateProjectMd,
  detailDepartmentMd,
  updateDepartmentMd
} from '@models';
import { validateData } from '@utils';

export const getListProject = async (req, res) => {
  try {
    const { error, value } = validateData(listProjectValid, req.query);
    if (error) return res.status(400).json({ status: false, mess: error });
    const { page, limit, keySearch, email, status } = value;
    const where = {};
    if (keySearch) where.$or = [{ name: { $regex: keySearch, $options: 'i' } }, { code: { $regex: keySearch, $options: 'i' } }];
    if (email) where.$or = [{ email: { $regex: email, $options: 'i' } }, { phone: { $regex: email, $options: 'i' } }];
    if (status || status === 0) where.status = status;
    const documents = await listProjectMd(where, page, limit);
    const total = await countProjectMd(where);
    res.json({ status: true, data: { documents, total } });
  } catch (error) {
    res.status(500).json({ status: false, mess: error.toString() });
  }
};

export const getListProjectInfo = async (req, res) => {
  try {
    res.json({ status: true, data: await listProjectMd({ status: 1 }) });
  } catch (error) {
    res.status(500).json({ status: false, mess: error.toString() });
  }
};

export const detailProject = async (req, res) => {
  try {
    const { error, value } = validateData(detailProjectValid, req.query);
    if (error) return res.status(400).json({ status: false, mess: error });
    const { _id } = value;
    const data = await detailProjectMd({ _id });
    if (!data) return res.status(400).json({ status: false, mess: 'Dự án không tồn tại!' });
    res.json({ status: true, data });
  } catch (error) {
    res.status(500).json({ status: false, mess: error.toString() });
  }
};

export const deleteProject = async (req, res) => {
  try {
    const { error, value } = validateData(detailProjectValid, req.body);
    if (error) return res.status(400).json({ status: false, mess: error });
    const { _id } = value;
    const project = await detailProjectMd({ _id });
    if (!project) return res.status(400).json({ status: false, mess: 'Dự án không tồn tại!' });
    await updateDepartmentMd({ _id: project.department }, { $pull: { projects: _id } });
    res.status(201).json({ status: true, data: await deleteProjectMd({ _id }) });
  } catch (error) {
    res.status(500).json({ status: false, mess: error.toString() });
  }
};

export const addProject = async (req, res) => {
  try {
    const { error, value } = validateData(addProjectValid, req.body);
    if (error) return res.status(400).json({ status: false, mess: error });
    const { name, code, department } = value;

    const checkName = await detailProjectMd({ name });
    if (checkName) return res.status(400).json({ status: false, mess: 'Tên dự án đã tồn tại!' });

    const checkCode = await detailProjectMd({ code });
    if (checkCode) return res.status(400).json({ status: false, mess: 'Mã dự án đã tồn tại!' });

    if (req.files?.['avatar']?.[0]) {
      value.avatar = await uploadFileToFirebase(req.files?.['avatar']?.[0]);
    }

    const checkDepartment = await detailDepartmentMd({ id: department });
    if (!checkDepartment) return res.status(400).json({ status: false, mess: 'Phòng ban không tồn tại!' });

    value.images = [];
    if (req.files?.['images']?.[0]) {
      for (const file of req.files['images']) {
        value.images.push(await uploadFileToFirebase(file));
      }
    }

    const data = await createProjectMd({ by: req.userInfo._id, ...value });
    await updateDepartmentMd({ _id: checkDepartment._id }, { $addToSet: { projects: data._id } });
    res.status(201).json({ status: true, data });
  } catch (error) {
    res.status(500).json({ status: false, mess: error.toString() });
  }
};

export const updateProject = async (req, res) => {
  try {
    const { error, value } = validateData(updateProjectValid, req.body);
    if (error) return res.status(400).json({ status: false, mess: error });
    const { _id, name, code, images, department } = value;

    const project = await detailProjectMd({ _id });
    if (!project) return res.status(400).json({ status: false, mess: 'Dự án không tồn tại!' });

    if (name) {
      const checkName = await detailProjectMd({ name });
      if (checkName) return res.status(400).json({ status: false, mess: 'Tên dự án đã tồn tại!' });
    }

    if (code) {
      const checkCode = await detailProjectMd({ code });
      if (checkCode) return res.status(400).json({ status: false, mess: 'Mã dự án đã tồn tại!' });
    }

    if (department) {
      const checkDepartment = await detailDepartmentMd({ id: department });
      if (!checkDepartment) return res.status(400).json({ status: false, mess: 'Phòng ban không tồn tại!' });
      await updateDepartmentMd({ _id: department }, { $addToSet: { projects: _id } });
      await updateDepartmentMd({ _id: project.department }, { $pull: { projects: _id } });
    }

    if (req.files?.['avatar']?.[0]) {
      value.avatar = await uploadFileToFirebase(req.files?.['avatar']?.[0]);
    }

    if (req.files?.['images']?.[0]) {
      value.images = images ? (typeof images === 'object' ? images : [images]) : [];
      for (const file of req.files['images']) {
        value.images.push(await uploadFileToFirebase(file));
      }
    }

    const data = await updateProjectMd({ _id }, { updateBy: req.userInfo._id, ...value });
    res.status(201).json({ status: true, data });
  } catch (error) {
    res.status(500).json({ status: false, mess: error.toString() });
  }
};
