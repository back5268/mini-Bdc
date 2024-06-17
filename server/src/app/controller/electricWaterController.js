import { uploadFileToFirebase } from '@lib/firebase';
import { addElectricWaterValid, detailElectricWaterValid, listElectricWaterValid } from '@lib/validation';
import { countElectricWaterMd, createElectricWaterMd, deleteElectricWaterMd, detailElectricWaterMd, listElectricWaterMd } from '@models';
import { validateData } from '@utils';

export const getListElectricWater = async (req, res) => {
  try {
    const { error, value } = validateData(listElectricWaterValid, req.query);
    if (error) return res.status(400).json({ status: false, mess: error });
    const { page, limit, apartment, type, month } = value;
    const where = { project: req.project?._id };
    if (apartment) where.apartment = apartment;
    if (type) where.type = type;
    if (month) where.month = month;
    const documents = await listElectricWaterMd(where, page, limit, [
      { path: 'by', select: 'fullName' }
    ]);
    const total = await countElectricWaterMd(where);
    res.json({ status: true, data: { documents, total } });
  } catch (error) {
    res.status(500).json({ status: false, mess: error.toString() });
  }
};

export const deleteElectricWater = async (req, res) => {
  try {
    const { error, value } = validateData(detailElectricWaterValid, req.body);
    if (error) return res.status(400).json({ status: false, mess: error });
    const { _id } = value;
    const data = await deleteElectricWaterMd({ _id });
    if (!data) return res.status(400).json({ status: false, mess: 'Chỉ số điện nước không tồn tại!' });
    res.status(201).json({ status: true, data });
  } catch (error) {
    res.status(500).json({ status: false, mess: error.toString() });
  }
};

export const addElectricWater = async (req, res) => {
  try {
    const { error, value } = validateData(addElectricWaterValid, req.body);
    if (error) return res.status(400).json({ status: false, mess: error });
    let { apartment, type, month } = value;

    const checkElectricWater = await detailElectricWaterMd({ apartment, type, month });
    if (checkElectricWater) return res.status(400).json({ status: false, mess: `Căn hộ này đã chốt ${type === 2 ? 'Nước' : 'Điện'} chỉ số kỳ tháng ${month}` });

    if (req.file) {
      value.image = await uploadFileToFirebase(req.file);
    }

    value.project = req.project?._id;
    const data = await createElectricWaterMd({ by: req.userInfo._id, ...value });
    res.status(201).json({ status: true, data });
  } catch (error) {
    res.status(500).json({ status: false, mess: error.toString() });
  }
};
