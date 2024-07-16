import { uploadFileToFirebase } from '@lib/firebase';
import { addReceiptValid, detailReceiptValid, listReceiptValid } from '@lib/validation';
import {
  createReceiptMd,
  countReceiptMd,
  detailReceiptMd,
  listReceiptMd,
  detailBillMd,
  updateBillMd,
  detailCoinMd,
  createCoinMd,
  listCoinMd,
  updateReceiptMd,
  listBillMd
} from '@models';
import { validateData } from '@utils';

export const getListReceipt = async (req, res) => {
  try {
    const { error, value } = validateData(listReceiptValid, req.query);
    if (error) return res.status(400).json({ status: false, mess: error });
    const { page, limit, by, payer, apartment, type, paymentType, status } = value;
    const where = { project: req.project?._id };
    if (status || status === 0) where.status = status;
    if (by) where.by = by;
    if (payer) where.payer = payer;
    if (apartment) where.apartment = apartment;
    if (type) where.type = type;
    if (paymentType) where.paymentType = paymentType;
    const documents = await listReceiptMd(where, page, limit, [
      { path: 'apartment', select: 'name' },
      { path: 'payer', select: 'fullName' }
    ]);
    const total = await countReceiptMd(where);
    res.json({ status: true, data: { documents, total } });
  } catch (error) {
    res.status(500).json({ status: false, mess: error.toString() });
  }
};

export const detailReceipt = async (req, res) => {
  try {
    const { error, value } = validateData(detailReceiptValid, req.query);
    if (error) return res.status(400).json({ status: false, mess: error });
    const { _id } = value;
    const data = await detailReceiptMd({ _id });
    if (!data) return res.status(400).json({ status: false, mess: 'Phiếu không tồn tại!' });
    res.json({ status: true, data });
  } catch (error) {
    res.status(500).json({ status: false, mess: error.toString() });
  }
};

export const addReceipt = async (req, res) => {
  const { error, value } = validateData(addReceiptValid, req.body);
  if (error) return res.status(400).json({ status: false, mess: error });
  const { apartment, bill, type, amount } = value;
  let billz;
  if (bill) {
    billz = await detailBillMd({ _id: bill, status: 3 });
    if (!billz) return res.status(400).json({ status: false, mess: 'Không tìm thấy hợp đồng!' });
  }

  const checkCoin = await detailCoinMd({ apartment });
  const coinBefore = checkCoin?.coinAfter || 0;
  if ([2, 3].includes(type)) if (coinBefore < amount) res.status(400).json({ status: false, mess: 'Tiền thừa căn hộ không đủ!' });
  if (type === 3 && !billz) res.status(400).json({ status: false, mess: 'Không tìm thấy tiền thừa để hạch toán!' });

  value.files = [];
  if (req.files?.['files']?.[0]) {
    for (const file of req.files['files']) {
      value.files.push(await uploadFileToFirebase(file));
    }
  }

  let params;
  if (type === 1) {
    if (!billz) billz = { amountz: 0 };
    else billz.amountz = billz.amount - billz.paid
    if (amount > billz.amountz) {
      if (billz._id) await updateBillMd({ _id: bill }, { paid: billz.amount, status: 4 });
      params = { type: 2, amount: amount - billz.amountz, coinAfter: coinBefore + amount - billz.amountz };
    } else if (billz._id) await updateBillMd({ _id: bill }, { paid: amount, status: amount === billz.amountz ? 4 : undefined });
  } else if (type === 2) {
    params = { type: 1, amount, coinAfter: coinBefore - amount };
  } else if (type === 3) {
    params = { type: 1, amount, coinAfter: coinBefore - amount };
  }

  if (params) {
    const coin = await createCoinMd({
      project: req.project?._id,
      apartment,
      coinBefore,
      ...params
    });
    value.coin = coin._id;
  }
  const data = await createReceiptMd({ by: req.userInfo._id, project: req.project?._id, ...value, status: 1 });
  res.status(201).json({ status: true, data });
};

export const cancelReceipt = async (req, res) => {
  try {
    const { error, value } = validateData(detailReceiptValid, req.query);
    if (error) return res.status(400).json({ status: false, mess: error });
    const { _id } = value;
    const data = await detailReceiptMd({ _id });
    if (!data) return res.status(400).json({ status: false, mess: 'Phiếu không tồn tại!' });

    let coinz = 0;
    if (data.coin) {
      const coins = await listCoinMd({ apartment: data.apartment });
      if (coins?.length > 0) {
        const lastCoin = coins[0];
        const coin = coins.find((c) => c._id === data.coin);
        coinz = coin.amount || 0;
        const type = coin.type === 1 ? 2 : 1;
        await createCoinMd({
          ...coin,
          _id: undefined,
          type,
          coinBefore: lastCoin.coinAfter,
          coinAfter: lastCoin.coinAfter + (type === 1 ? -coin.amount : coin.amount)
        });
      }
    }
    if (data.bill) {
      const bill = detailBillMd({ _id: data.bill });
      if (bill) await updateBillMd({ _id: bill._id }, { paid: bill.paid - (data.amount - coinz), $pull: { receipts: _id }, status: 3 });
    }
    res.status(201).json({ status: true, data: await updateReceiptMd({ _id }, { status: 0 }) });
  } catch (error) {
    res.status(500).json({ status: false, mess: error.toString() });
  }
};

export const getListBillByApartment = async (req, res) => {
  try {
    const { error, value } = validateData(detailReceiptValid, req.query);
    if (error) return res.status(400).json({ status: false, mess: error });
    const { _id } = value;
    const data = await listBillMd({ apartment: _id, status: { $in: [3, 4, 5] } }, false, false, false, 'code _id paid amount');
    res.json({ status: true, data });
  } catch (error) {
    res.status(500).json({ status: false, mess: error.toString() });
  }
};

export const getCoinByApartment = async (req, res) => {
  try {
    const { error, value } = validateData(detailReceiptValid, req.query);
    if (error) return res.status(400).json({ status: false, mess: error });
    const { _id } = value;
    const data = await listCoinMd({ apartment: _id });
    res.json({ status: true, data: data[0]?.coinAfter });
  } catch (error) {
    res.status(500).json({ status: false, mess: error.toString() });
  }
};
