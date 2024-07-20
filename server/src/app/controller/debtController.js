import { debtQueue } from '@lib/node-cron';
import { sendMail } from '@lib/node-mailer';
import { calculatorDebtValid, listDebtLogValid, listDebitValid, listDebtValid, debtRemindValid } from '@lib/validation';
import {
  countDebitMd,
  countDebtLogMd,
  createDebtLogMd,
  deleteBillMd,
  deleteDebitMd,
  detailApartmentMd,
  detailBillMd,
  detailDebitMd,
  detailTemplateMd,
  listApartmentMd,
  listBillMd,
  listDebitMd,
  listDebtLogMd,
  updateBillMd
} from '@models';
import { formatNumber, ghepGiaTri, replaceFistText, validateData } from '@utils';
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
    const documents = await listDebitMd(where, page, limit, [{ path: 'apartment', select: 'name owner' }]);
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
    const debit = await detailDebitMd({ _id });
    if (!debit) return res.status(404).json({ status: false, mess: 'Không tìm thấy bảng kê dịch vụ' });
    const bill = await detailBillMd({ _id: debit.bill });
    if (!(bill && [1, 2].includes(bill.status))) return res.status(404).json({ status: false, mess: 'Bảng kê đã được gửi không thể xóa' });
    const newAmount = bill.amount - debit.summary;
    if (newAmount <= 0) await deleteBillMd({ _id: bill._id });
    else await updateBillMd({ _id: bill._id }, { amount: newAmount });

    res.json({ status: true, data: await deleteDebitMd({ _id }) });
  } catch (error) {
    res.status(500).json({ status: false, mess: error.toString() });
  }
};

export const getListDebt = async (req, res) => {
  try {
    const { error, value } = validateData(listDebtValid, req.query);
    if (error) return res.status(400).json({ status: false, mess: error });
    const { apartment } = value;
    const where = { project: req.project?._id, status: 3 };
    if (apartment) where.apartment = apartment;
    const whereApartment = { project: req.project?._id };
    if (apartment) whereApartment._id = apartment;

    const data = await listBillMd(where);
    const apartments = await listApartmentMd(whereApartment);

    const newData = [];
    apartments.forEach((a) => {
      const dataz = data.filter((d) => String(d.apartment) === String(a._id));
      if (dataz.length > 0) {
        let amount = 0;
        dataz.forEach((d) => {
          amount += d.amount - d.paid;
        });
        newData.push({ _id: a._id, name: a.name, code: a.code, amount });
      } else newData.push({ _id: a._id, name: a.name, code: a.code, amount: 0 });
    });

    res.json({ status: true, data: newData });
  } catch (error) {
    res.status(500).json({ status: false, mess: error.toString() });
  }
};

export const debtRemind = async (req, res) => {
  try {
    const { error, value } = validateData(debtRemindValid, req.body);
    if (error) return res.status(400).json({ status: false, mess: error });
    const { _ids } = value;
    const template = await detailTemplateMd({ type: 4, status: 1 });
    if (!template) return { mess: 'Chưa thiết lập mẫu nhắc nợ!' };
    const content = template.content;
    const subjectz = template.subject;
    const data = await listBillMd({ project: req.project?._id, status: 3, apartment: { $in: _ids } });
    for (const _id of _ids) {
      const apartment = await detailApartmentMd({ project: req.project?._id, _id }, [{ path: 'owner', select: 'email fullName' }]);
      if (!apartment || !apartment.owner || !apartment.owner.email) continue;
      const dataz = data.filter((d) => String(d.apartment) === String(_id));
      let amount = 0;
      dataz.forEach((d) => {
        amount += d.amount - d.paid;
      });
      if (Number(amount) > 0) {
        let html = ghepGiaTri({
          obj: {
            $ten_cu_dan: apartment.owner.fullName,
            $ten_toa_nha: req.project?.name,
            $ten_can_ho: apartment.name,
            $tong_no: formatNumber(amount),
            $email: req.project?.email,
            $phone: req.project?.phone
          },
          html: content
        });
        html = replaceFistText(html);
        let subject = ghepGiaTri({ obj: { $ngay: moment().format('DD/MM/YYYY') }, html: subjectz });
        await sendMail({ to: apartment?.owner?.email, subject, html, project: req.project?._id, type: 4 });
      }
    }

    res.json({ status: true, data: {} });
  } catch (error) {
    res.status(500).json({ status: false, mess: error.toString() });
  }
};
