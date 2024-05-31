import { listElectricWaterValid } from '@lib/validation';
import { countElectricWaterMd, listElectricWaterMd } from '@models';
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
      { path: 'apartment', select: 'name' },
      { path: 'by', select: 'fullName' }
    ]);
    const total = await countElectricWaterMd(where);
    res.json({ status: true, data: { documents, total } });
  } catch (error) {
    res.status(500).json({ status: false, mess: error.toString() });
  }
};
