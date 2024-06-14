import { uploadFileToFirebase } from '@lib/firebase';
import { addApartmentValid, detailApartmentValid, listApartmentValid, updateApartmentValid } from '@lib/validation';
import { countApartmentMd, createApartmentMd, deleteApartmentMd, detailApartmentMd, listApartmentMd, updateApartmentMd } from '@models';
import { validateData } from '@utils';

export const getListApartment = async (req, res) => {
  try {
    const { error, value } = validateData(listApartmentValid, req.query);
    if (error) return res.status(400).json({ status: false, mess: error });
    const { page, limit, keySearch, status } = value;
    const where = { project: req.project?._id };
    if (keySearch) where.$or = [{ name: { $regex: keySearch, $options: 'i' } }, { code: { $regex: keySearch, $options: 'i' } }];
    if (status) where.status = status;
    const documents = await listApartmentMd(where, page, limit, [{ path: 'owner', select: 'fullName' }]);
    const total = await countApartmentMd(where);
    res.json({ status: true, data: { documents, total } });
  } catch (error) {
    res.status(500).json({ status: false, mess: error.toString() });
  }
};

export const getListApartmentInfo = async (req, res) => {
  try {
    res.json({ status: true, data: await listApartmentMd({ project: req.project?._id }, false, false, false, '_id name code') });
  } catch (error) {
    res.status(500).json({ status: false, mess: error.toString() });
  }
};

export const deleteApartment = async (req, res) => {
  try {
    const { error, value } = validateData(detailApartmentValid, req.body);
    if (error) return res.status(400).json({ status: false, mess: error });
    const { _id } = value;
    const data = await deleteApartmentMd({ _id });
    if (!data) return res.status(400).json({ status: false, mess: 'Căn hộ không tồn tại!' });
    res.status(201).json({ status: true, data });
  } catch (error) {
    res.status(500).json({ status: false, mess: error.toString() });
  }
};

export const detailApartment = async (req, res) => {
  try {
    const { error, value } = validateData(detailApartmentValid, req.query);
    if (error) return res.status(400).json({ status: false, mess: error });
    const { _id } = value;
    const data = await detailApartmentMd({ _id });
    if (!data) return res.status(400).json({ status: false, mess: 'Căn hộ không tồn tại!' });
    res.json({ status: true, data });
  } catch (error) {
    res.status(500).json({ status: false, mess: error.toString() });
  }
};

export const updateApartment = async (req, res) => {
  try {
    const { error, value } = validateData(updateApartmentValid, req.body);
    if (error) return res.status(400).json({ status: false, mess: error });
    const { _id, name, code, images } = value;

    const apartment = await detailApartmentMd({ _id });
    if (!apartment) return res.status(400).json({ status: false, mess: 'Căn hộ không tồn tại!' });

    if (name) {
      const checkName = await detailApartmentMd({ name, project: req.project?._id });
      if (checkName) return res.status(400).json({ status: false, mess: 'Căn hộ đã tồn tại!' });
    }

    if (code) {
      const checkCode = await detailApartmentMd({ code, project: req.project?._id });
      if (checkCode) return res.status(400).json({ status: false, mess: 'Mã căn hộ đã tồn tại!' });
    }

    if (req.files?.['images']?.[0]) {
      value.images = images ? (typeof images === 'object' ? images : [images]) : [];
      for (const file of req.files['images']) {
        value.images.push(await uploadFileToFirebase(file));
      }
    }

    const data = await updateApartmentMd({ _id }, { updateBy: req.userInfo._id, ...value });
    res.status(201).json({ status: true, data });
  } catch (error) {
    res.status(500).json({ status: false, mess: error.toString() });
  }
};

export const addApartment = async (req, res) => {
  try {
    const { error, value } = validateData(addApartmentValid, req.body);
    if (error) return res.status(400).json({ status: false, mess: error });
    const { name, code } = value;
    if (name) {
      const checkName = await detailApartmentMd({ name, project: req.project?._id });
      if (checkName) return res.status(400).json({ status: false, mess: 'Căn hộ đã tồn tại!' });
    }

    if (code) {
      const checkCode = await detailApartmentMd({ code, project: req.project?._id });
      if (checkCode) return res.status(400).json({ status: false, mess: 'Mã căn hộ đã tồn tại!' });
    }

    value.images = [];
    if (req.files?.['images']?.[0]) {
      for (const file of req.files['images']) {
        value.images.push(await uploadFileToFirebase(file));
      }
    }

    value.project = req.project?._id;
    const data = await createApartmentMd({ by: req.userInfo._id, ...value });
    res.status(201).json({ status: true, data });
  } catch (error) {
    res.status(500).json({ status: false, mess: error.toString() });
  }
};
