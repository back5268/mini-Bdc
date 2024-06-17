import { uploadFileToFirebase } from '@lib/firebase';
import { addOptionValid, detailOptionValid, listOptionValid, updateOptionValid } from '@lib/validation';
import { createOptionMd, countOptionMd, deleteOptionMd, detailOptionMd, listOptionMd, updateOptionMd } from '@models';
import { validateData } from '@utils';

export const getListOption = async (req, res) => {
  try {
    const { error, value } = validateData(listOptionValid, req.query);
    if (error) return res.status(400).json({ status: false, mess: error });
    const { page, limit, keySearch, status, type } = value;
    const where = { project: req.project?._id };
    if (keySearch) where.$or = [{ subject: { $regex: keySearch, $options: 'i' } }];
    if (status || status === 0) where.status = status;
    if (type) where.type = type;
    const documents = await listOptionMd(where, page, limit, [{ path: 'by', select: 'fullName' }]);
    const total = await countOptionMd(where);
    res.json({ status: true, data: { documents, total } });
  } catch (error) {
    res.status(500).json({ status: false, mess: error.toString() });
  }
};

export const detailOption = async (req, res) => {
  try {
    const { error, value } = validateData(detailOptionValid, req.query);
    if (error) return res.status(400).json({ status: false, mess: error });
    const { _id } = value;
    const data = await detailOptionMd({ _id }, [{ path: 'apartment', select: 'name' }]);
    if (!data) return res.status(400).json({ status: false, mess: 'Ý kiến không tồn tại!' });
    res.json({ status: true, data });
  } catch (error) {
    res.status(500).json({ status: false, mess: error.toString() });
  }
};

export const deleteOption = async (req, res) => {
  try {
    const { error, value } = validateData(detailOptionValid, req.body);
    if (error) return res.status(400).json({ status: false, mess: error });
    const { _id } = value;
    const data = await deleteOptionMd({ _id });
    if (!data) return res.status(400).json({ status: false, mess: 'Ý kiến không tồn tại!' });
    res.status(201).json({ status: true, data });
  } catch (error) {
    res.status(500).json({ status: false, mess: error.toString() });
  }
};

export const addOption = async (req, res) => {
  try {
    const { error, value } = validateData(addOptionValid, req.body);
    if (error) return res.status(400).json({ status: false, mess: error });
    let { subject } = value;

    const checkSubject = await detailOptionMd({ subject });
    if (checkSubject) return res.status(400).json({ status: false, mess: 'Tiêu đề đã tồn tại!' });

    value.files = [];
    if (req.files?.['files']?.[0]) {
      for (const file of req.files['files']) {
        value.files.push(await uploadFileToFirebase(file));
      }
    }

    const data = await createOptionMd({ by: req.userInfo._id, project: req.project?._id, ...value, status: 1 });
    res.status(201).json({ status: true, data });
  } catch (error) {
    res.status(500).json({ status: false, mess: error.toString() });
  }
};

export const updateOption = async (req, res) => {
  try {
    const { error, value } = validateData(updateOptionValid, req.body);
    if (error) return res.status(400).json({ status: false, mess: error });
    const { _id, subject, files } = value;

    const option = await detailOptionMd({ _id });
    if (!option) return res.status(400).json({ status: false, mess: 'Ý kiến không tồn tại!' });

    if (subject) {
      const checkSubject = await detailOptionMd({ subject });
      if (checkSubject) return res.status(400).json({ status: false, mess: 'Tiêu đề đã tồn tại!' });
    }

    if (req.files?.['files']?.[0]) {
      value.files = files ? (typeof files === 'object' ? files : [files]) : [];
      for (const file of req.files['files']) {
        value.files.push(await uploadFileToFirebase(file));
      }
    }

    const data = await updateOptionMd({ _id }, { ...value });
    res.status(201).json({ status: true, data });
  } catch (error) {
    res.status(500).json({ status: false, mess: error.toString() });
  }
};
