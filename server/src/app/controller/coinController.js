import { autoAccountingValid, listCoinValid } from '@lib/validation';
import { createCoinMd, createReceiptMd, detailCoinMd, listApartmentMd, listBillMd, listCoinMd, updateBillMd } from '@models';
import { validateData } from '@utils';

export const getListCoin = async (req, res) => {
  try {
    const { error, value } = validateData(listCoinValid, req.query);
    if (error) return res.status(400).json({ status: false, mess: error });
    const { apartment } = value;
    const where = { project: req.project?._id };
    if (apartment) where.apartment = apartment;
    const whereApartment = { project: req.project?._id };
    if (apartment) whereApartment._id = apartment;
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

export const autoAccounting = async (req, res) => {
  try {
    const { error, value } = validateData(autoAccountingValid, req.body);
    if (error) return res.status(400).json({ status: false, mess: error });
    const { _ids } = value;
    for (const _id of _ids) {
      const coin = await detailCoinMd({ apartment: _id });
      if (coin) {
        let coinBefore = coin.coinAfter || 0;
        const bills = await listBillMd({ apartment: _id, status: 3 }, false, false, false, false, { created_at: 1 });
        for (const bill of bills) {
          if (coinBefore && Number(coinBefore) > 0) {
            const debt = bill.amount - bill.paid;
            const amount = debt > coinBefore ? coinBefore : debt;
            const paid = amount + bill.paid;
            await updateBillMd({ _id: bill }, { paid, status: paid === bill.amount ? 4 : undefined });
            const coin = await createCoinMd({
              project: req.project?._id,
              apartment: _id,
              coinBefore,
              type: 1,
              amount,
              coinAfter: coinBefore - amount
            });
            await createReceiptMd({
              by: req.userInfo._id,
              payer: req.userInfo._id,
              bill,
              project: req.project?._id,
              apartment: _id,
              coin: coin._id,
              type: 3,
              paymentType: 3,
              amount,
              note: 'Hạch toán tự động'
            });
            coinBefore -= amount;
          }
        }
      }
    }

    res.json({ status: true, data: {} });
  } catch (error) {
    res.status(500).json({ status: false, mess: error.toString() });
  }
};
