import { detailBillValid, listBillValid, updateStatusBillValid } from '@lib/validation';
import { countBillMd, detailBillMd, listBillMd, updateBillMd } from '@models';
import { renderBillRp } from '@repository';
import { validateData } from '@utils';

export const getListBill = async (req, res) => {
  try {
    const { error, value } = validateData(listBillValid, req.query);
    if (error) return res.status(400).json({ status: false, mess: error });
    const { page, limit, keySearch, apartment, month, status, from, to } = value;
    const where = { project: req.project?._id };
    if (keySearch) where.$or = [{ code: { $regex: keySearch, $options: 'i' } }];
    if (status) where.status = { $in: status };
    if (apartment) where.apartment = apartment;
    if (month) where.month = month;
    if (from) where.createdAt = { $gte: from };
    if (to) {
      if (!where.createdAt) where.createdAt.$lte = to;
    }
    const documents = await listBillMd(where, page, limit, [{ path: 'apartment', select: 'name code' }]);
    const total = await countBillMd(where);
    res.json({ status: true, data: { documents, total } });
  } catch (error) {
    res.status(500).json({ status: false, mess: error.toString() });
  }
};

export const updateStatusBill = async (req, res) => {
  try {
    const { error, value } = validateData(updateStatusBillValid, req.body);
    if (error) return res.status(400).json({ status: false, mess: error });
    const { _ids, status } = value;
    for (const _id of _ids) {
      if (status === 2) {
        await updateBillMd({ _id }, { status, confirmDate: Date.now() });
      } else await updateBillMd({ _id }, { status });
    }
    res.json({ status: true, data: {} });
  } catch (error) {
    res.status(500).json({ status: false, mess: error.toString() });
  }
};

export const detailBill = async (req, res) => {
  try {
    const { error, value } = validateData(detailBillValid, req.query);
    if (error) return res.status(400).json({ status: false, mess: error });
    const { _id } = value;
    const where = { project: req.project?._id, _id };
    res.json({ status: true, data: await detailBillMd(where, [{ path: 'apartment', select: 'name code' }, { path: 'debits' }]) });
  } catch (error) {
    res.status(500).json({ status: false, mess: error.toString() });
  }
};

export const renderBill = async (req, res) => {
  try {
    const { error, value } = validateData(detailBillValid, req.query);
    if (error) return res.status(400).json({ status: false, mess: error });
    const { _id } = value;
    const { mess, data } = await renderBillRp(_id);
    if (mess) return res.status(400).json({ status: false, mess });
    res.json({ status: true, data });
  } catch (error) {
    res.status(500).json({ status: false, mess: error.toString() });
  }
};

export const sendBill = async (req, res) => {
  try {
    const { error, value } = validateData(detailBillValid, req.query);
    if (error) return res.status(400).json({ status: false, mess: error });
    const { _id } = value;
    const { mess, data } = await renderBillRp(_id);
    if (mess) return res.status(400).json({ status: false, mess });
    res.json({ status: true, data });
  } catch (error) {
    res.status(500).json({ status: false, mess: error.toString() });
  }
};
