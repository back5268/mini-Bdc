import { listCoinValid } from '@lib/validation';
import { listApartmentMd, listCoinMd } from '@models';
import { validateData } from '@utils';

export const getListCoin = async (req, res) => {
  try {
    const { error, value } = validateData(listCoinValid, req.query);
    if (error) return res.status(400).json({ status: false, mess: error });
    const { apartment } = value;
    const where = { project: req.project?._id };
    if (apartment) where.apartment = apartment;
    const whereApartment = { project: req.project?._id };
    if (apartment) where._id = apartment;
    const data = await listCoinMd(where);
    const apartments = await listApartmentMd(whereApartment);

    const newData = [];
    apartments.forEach((a) => {
      const item = data.find((d) => String(d.apartment) === String(a._id));
      if (!newData.find((n) => n._id === a._id)) newData.push({ _id: a._id, name: a.name, code: a.code, coin: item?.coinAfter || 0 });
    });

    res.json({ status: true, data: newData });
  } catch (error) {
    res.status(500).json({ status: false, mess: error.toString() });
  }
};
