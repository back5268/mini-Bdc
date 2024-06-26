import { debtQueue } from '@lib/node-cron';
import { calculatorDebtValid, listDebtLogValid, listDebitValid, listDebtValid } from '@lib/validation';
import { countDebitMd, countDebtLogMd, createDebtLogMd, deleteBillMd, deleteDebitMd, detailBillMd, detailDebitMd, listBillMd, listDebitMd, listDebtLogMd, updateBillMd } from '@models';
import { validateData } from '@utils';
import moment from 'moment';

export const getListDebtLog = async (req, res) => {
  try {
    const { error, value } = validateData(listDebtLogValid, req.query);
    if (error) return res.status(400).json({ status: false, mess: error });
    const { page, limit, month, status, from, to } = value;
    const where = { project: req.project?._id };
    if (status) where.status = status;
    if (month) where.month = month;
    if (from) where.createdAt = { $gte: from };
    if (to) {
      if (!where.createdAt) where.createdAt.$lte = to;
    }
    const documents = await listDebtLogMd(where, page, limit, [{ path: 'by', select: 'fullName' }]);
    const total = await countDebtLogMd(where);
    res.json({ status: true, data: { documents, total } });
  } catch (error) {
    res.status(500).json({ status: false, mess: error.toString() });
  }
};

export const calculatorDebt = async (req, res) => {
  try {
    const { error, value } = validateData(calculatorDebtValid, req.body);
    if (error) return res.status(400).json({ status: false, mess: error });
    const { month, deadline, services, apartments } = value;
    const debtLog = await createDebtLogMd({
      project: req.project?._id,
      by: req.userInfo?._id,
      title: `Tính toán công nợ ${moment().format('DD/MM/YYYY HH:mm:ss')}`,
      month,
      deadline,
      apartments,
      services,
      status: 1
    });
    debtQueue.push({ debtLogId: debtLog._id, projectId: req.project?._id, month, deadline, services, apartments }, true);
    res.json({ status: true, data: 1 });
  } catch (error) {
    res.status(500).json({ status: false, mess: error.toString() });
  }
};

export const getListDebit = async (req, res) => {
  try {
    const { error, value } = validateData(listDebitValid, req.query);
    if (error) return res.status(400).json({ status: false, mess: error });
    const { page, limit, month, apartment, from, to, serviceType } = value;
    const where = { project: req.project?._id };
    if (serviceType) where.serviceType = serviceType;
    if (apartment) where.apartment = apartment;
    if (month) where.month = month;
    if (from) where.createdAt = { $gte: from };
    if (to) {
      if (!where.createdAt) where.createdAt.$lte = to;
    }
    const documents = await listDebitMd(where, page, limit, [
      { path: 'apartment', select: 'name owner' }
    ]);
    const total = await countDebitMd(where);
    res.json({ status: true, data: { documents, total } });
  } catch (error) {
    res.status(500).json({ status: false, mess: error.toString() });
  }
};

export const deleteDebit = async (req, res) => {
  try {
    const { error, value } = validateData({ _id: 'string' }, req.body);
    if (error) return res.status(400).json({ status: false, mess: error });
    const { _id } = value;
    const debit = await detailDebitMd({ _id })
    if (!debit) return res.status(404).json({ status: false, mess: 'Không tìm thấy bảng kê dịch vụ' });
    const bill = await detailBillMd({ _id: debit.bill })
    if (!(bill && [1,2].includes(bill.status))) return res.status(404).json({ status: false, mess: 'Bảng kê đã được gửi không thể xóa' });
    const newAmount = bill.amount - debit.summary
    if (newAmount <= 0) await deleteBillMd({ _id: bill._id })
    else await updateBillMd({ _id: bill._id }, { amount: newAmount })

    res.json({ status: true, data: await deleteDebitMd({ _id }) });
  } catch (error) {
    res.status(500).json({ status: false, mess: error.toString() });
  }
};

export const getListDebt = async (req, res) => {
  try {
    const { error, value } = validateData(listDebtValid, req.query);
    if (error) return res.status(400).json({ status: false, mess: error });
    const { month, apartment } = value;
    const where = { project: req.project?._id, status: { $in: [3, 4, 5] } };
    if (apartment) where.apartment = apartment;
    if (month) where.month = { $lte: month };

    const data = await listBillMd(where);
    const newData = [];
    data.forEach((d) => {
      const index = newData.findIndex((n) => n.apartment === d.apartment);
      if (index >= 0) {
        if (data.month === month) {
          newData[index].amount += d.amount;
          newData[index].paid += d.paid;
        } else {
          newData[index].before += d.paid - d.amount;
        }
      } else {
        if (data.month === month) newData.push({ apartment: d.apartment, month: month, before: 0, amount: d.amount, paid: d.paid });
        else newData.push({ apartment: d.apartment, month: month, before: d.paid - d.amount, amount: 0, paid: 0 });
      }
    });

    res.json({ status: true, data: newData });
  } catch (error) {
    res.status(500).json({ status: false, mess: error.toString() });
  }
};
