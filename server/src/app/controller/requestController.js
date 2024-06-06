import { uploadFileToFirebase } from '@lib/firebase';
import { addRequestValid, detailRequestValid, listRequestValid, updateRequestValid } from '@lib/validation';
import { createRequestMd, countRequestMd, deleteRequestMd, detailRequestMd, listRequestMd, updateRequestMd } from '@models';
import { validateData } from '@utils';

export const getListRequest = async (req, res) => {
  try {
    const { error, value } = validateData(listRequestValid, req.query);
    if (error) return res.status(400).json({ status: false, mess: error });
    const { page, limit, keySearch, status, type } = value;
    const where = {};
    if (keySearch) where.$or = [{ subject: { $regex: keySearch, $options: 'i' } }, { data: { $regex: keySearch, $options: 'i' } }];
    if (status || status === 0) where.status = status;
    if (type || type === 0) where.type = type;
    const documents = await listRequestMd(where, page, limit);
    const total = await countRequestMd(where);
    res.json({ status: true, data: { documents, total } });
  } catch (error) {
    res.status(500).json({ status: false, mess: error.toString() });
  }
};

export const detailRequest = async (req, res) => {
  try {
    const { error, value } = validateData(detailRequestValid, req.query);
    if (error) return res.status(400).json({ status: false, mess: error });
    const { _id } = value;
    const data = await detailRequestMd({ _id });
    if (!data) return res.status(400).json({ status: false, mess: 'Request not found!' });
    res.json({ status: true, data });
  } catch (error) {
    res.status(500).json({ status: false, mess: error.toString() });
  }
};

export const deleteRequest = async (req, res) => {
  try {
    const { error, value } = validateData(detailRequestValid, req.body);
    if (error) return res.status(400).json({ status: false, mess: error });
    const { _id } = value;
    const data = await deleteRequestMd({ _id });
    if (!data) return res.status(400).json({ status: false, mess: 'Request not found!' });
    res.status(201).json({ status: true, data });
  } catch (error) {
    res.status(500).json({ status: false, mess: error.toString() });
  }
};

export const addRequest = async (req, res) => {
  try {
    const { error, value } = validateData(addRequestValid, req.body);
    if (error) return res.status(400).json({ status: false, mess: error });
    if (req.files?.['files']?.[0]) {
      value.files = [];
      for (const file of req.files['files']) {
        value.files.push(await uploadFileToFirebase(file));
      }
    }
    const data = await createRequestMd({ by: req.userInfo._id, ...value });
    res.status(201).json({ status: true, data });
  } catch (error) {
    res.status(500).json({ status: false, mess: error.toString() });
  }
};

export const updateRequest = async (req, res) => {
  try {
    const { error, value } = validateData(updateRequestValid, req.body);
    if (error) return res.status(400).json({ status: false, mess: error });
    const { _id, files } = value;

    const request = await detailRequestMd({ _id });
    if (!request) return res.status(400).json({ status: false, mess: 'Request not found!' });

    if (req.files?.['files']?.[0]) {
      value.files = files ? (typeof files === 'object' ? files : [files]) : [];
      for (const file of req.files['files']) {
        value.files.push(await uploadFileToFirebase(file));
      }
    }

    const data = await updateRequestMd({ _id }, { updateBy: req.userInfo._id, ...value });
    res.status(201).json({ status: true, data });
  } catch (error) {
    res.status(500).json({ status: false, mess: error.toString() });
  }
};
