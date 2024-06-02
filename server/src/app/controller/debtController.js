import { debtQueue } from '@lib/node-cron';
import { calculatorDebtValid, listDebtLogValid } from '@lib/validation';
import { countDebtLogMd, createDebtLogMd, listDebtLogMd } from '@models';
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
