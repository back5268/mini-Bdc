import { listCoinValid } from '@lib/validation';
import { countCoinMd, listCoinMd } from '@models';
import { validateData } from '@utils';

export const getListCoin = async (req, res) => {
  try {
    const { error, value } = validateData(listCoinValid, req.query);
    if (error) return res.status(400).json({ status: false, mess: error });
    const { page, limit, apartment } = value;
    const where = { project: req.project?._id };
    if (apartment) where.apartment = apartment;
    const documents = await listCoinMd(where, page, limit, [{ path: 'apartment', select: 'name code' }]);
    const total = await countCoinMd(where);
    res.json({ status: true, data: { documents, total } });
  } catch (error) {
    res.status(500).json({ status: false, mess: error.toString() });
  }
};
