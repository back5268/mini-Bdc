import { addPriceValid, detailPriceValid, listPriceValid, updatePriceValid } from '@lib/validation';
import { createPriceMd, countPriceMd, deletePriceMd, detailPriceMd, listPriceMd, updatePriceMd } from '@models';
import { validateData } from '@utils';

export const getListPrice = async (req, res) => {
  try {
    const { error, value } = validateData(listPriceValid, req.query);
    if (error) return res.status(400).json({ status: false, mess: error });
    const { page, limit, keySearch, recipe, serviceType, status } = value;
    const where = { project: req.project?._id };
    if (keySearch) where.$or = [{ name: { $regex: keySearch, $options: 'i' } }, { code: { $regex: keySearch, $options: 'i' } }];
    if (recipe) where.recipe = recipe;
    if (serviceType) where.serviceType = serviceType;
    if (status || status === 0) where.status = status;
    const documents = await listPriceMd(where, page, limit);
    const total = await countPriceMd(where);
    res.json({ status: true, data: { documents, total } });
  } catch (error) {
    res.status(500).json({ status: false, mess: error.toString() });
  }
};

export const getListPriceInfo = async (req, res) => {
  try {
    const { status, serviceType } = req.query;
    const where = { project: req.project?._id };
    if (status || status === 0) where.status = status;
    if (serviceType) where.serviceType = serviceType;
    res.json({ status: true, data: await listPriceMd(where) });
  } catch (error) {
    res.status(500).json({ status: false, mess: error.toString() });
  }
};

export const detailPrice = async (req, res) => {
  try {
    const { error, value } = validateData(detailPriceValid, req.query);
    if (error) return res.status(400).json({ status: false, mess: error });
    const { _id } = value;
    const data = await detailPriceMd({ _id });
    if (!data) return res.status(400).json({ status: false, mess: 'Bảng giá không tồn tại!' });
    res.json({ status: true, data });
  } catch (error) {
    res.status(500).json({ status: false, mess: error.toString() });
  }
};

export const deletePrice = async (req, res) => {
  try {
    const { error, value } = validateData(detailPriceValid, req.body);
    if (error) return res.status(400).json({ status: false, mess: error });
    const { _id } = value;
    const data = await deletePriceMd({ _id });
    if (!data) return res.status(400).json({ status: false, mess: 'Bảng giá không tồn tại!' });
    res.status(201).json({ status: true, data });
  } catch (error) {
    res.status(500).json({ status: false, mess: error.toString() });
  }
};

export const addPrice = async (req, res) => {
  try {
    const { error, value } = validateData(addPriceValid, req.body);
    if (error) return res.status(400).json({ status: false, mess: error });
    const { name, code } = value;

    const checkName = await detailPriceMd({ name });
    if (checkName) return res.status(400).json({ status: false, mess: 'Tên bảng giá đã tồn tại!' });

    const checkCode = await detailPriceMd({ code });
    if (checkCode) return res.status(400).json({ status: false, mess: 'Mã bảng giá đã tồn tại!' });

    value.project = req.project?._id;
    const data = await createPriceMd({ by: req.userInfo._id, ...value });
    res.status(201).json({ status: true, data });
  } catch (error) {
    res.status(500).json({ status: false, mess: error.toString() });
  }
};

export const updatePrice = async (req, res) => {
  try {
    const { error, value } = validateData(updatePriceValid, req.body);
    if (error) return res.status(400).json({ status: false, mess: error });
    const { _id, name, code } = value;

    const price = await detailPriceMd({ _id });
    if (!price) return res.status(400).json({ status: false, mess: 'Bảng giá không tồn tại!' });

    if (name) {
      const checkName = await detailPriceMd({ name });
      if (checkName) return res.status(400).json({ status: false, mess: 'Tên bảng giá đã tồn tại!' });
    }

    if (code) {
      const checkCode = await detailPriceMd({ code });
      if (checkCode) return res.status(400).json({ status: false, mess: 'Mã bảng giá đã tồn tại!' });
    }

    const data = await updatePriceMd({ _id }, { updateBy: req.userInfo._id, ...value });
    res.status(201).json({ status: true, data });
  } catch (error) {
    res.status(500).json({ status: false, mess: error.toString() });
  }
};
