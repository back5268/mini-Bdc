import { convertParams, sendMail } from '@lib/node-mailer';
import { addNewsValid, listNewsValid, updateNewsValid, detailNewsValid } from '@lib/validation';
import { countNewMd, createNewMd, deleteNewMd, detailNewMd, detailTemplateMd, listNewMd, listUserMd, updateNewMd } from '@models';
import { validateData } from '@utils';

export const getListNews = async (req, res) => {
  try {
    const { error, value } = validateData(listNewsValid, req.query);
    if (error) return res.status(400).json({ status: false, mess: error });
    const { page, limit, keySearch, status } = value;
    const where = { project: req.project?._id };
    if (keySearch) where.subject = { $regex: keySearch, $options: 'i' };
    if (status || status === 0) where.status = status;
    const documents = await listNewMd(where, page, limit, [{ path: 'by', select: 'fullName' }]);
    const total = await countNewMd(where);
    res.json({ status: true, data: { documents, total } });
  } catch (error) {
    res.status(500).json({ status: false, mess: error.toString() });
  }
};

export const detailNews = async (req, res) => {
  try {
    const { error, value } = validateData(detailNewsValid, req.query);
    if (error) return res.status(400).json({ status: false, mess: error });
    const { _id } = value;
    const data = await detailNewMd({ _id });
    if (!data) return res.status(400).json({ status: false, mess: 'Tin tức không tồn tại!' });
    res.json({ status: true, data });
  } catch (error) {
    res.status(500).json({ status: false, mess: error.toString() });
  }
};

export const deleteNews = async (req, res) => {
  try {
    const { error, value } = validateData(detailNewsValid, req.body);
    if (error) return res.status(400).json({ status: false, mess: error });
    const { _id } = value;

    const data = await deleteNewMd({ _id });
    if (!data) return res.status(400).json({ status: false, mess: 'Tin tức không tồn tại!' });

    res.status(201).json({ status: true, data });
  } catch (error) {
    res.status(500).json({ status: false, mess: error.toString() });
  }
};

export const addNews = async (req, res) => {
  try {
    const { error, value } = validateData(addNewsValid, req.body);
    if (error) return res.status(400).json({ status: false, mess: error });
    const { subject, content, hashtag } = value;

    const data = await createNewMd({
      by: req.userInfo._id,
      subject,
      content,
      hashtag,
      project: req.project?._id
    });
    res.status(201).json({ status: true, data });
  } catch (error) {
    res.status(500).json({ status: false, mess: error.toString() });
  }
};

export const updateNews = async (req, res) => {
  try {
    const { error, value } = validateData(updateNewsValid, req.body);
    if (error) return res.status(400).json({ status: false, mess: error });
    const { _id, subject, content, status, hashtag } = value;

    const news = await detailNewMd({ _id });
    if (!news) return res.status(400).json({ status: false, mess: 'Tin tức không tồn tại!' });

    const data = await updateNewMd({ _id }, { subject, status, content, hashtag });
    res.status(201).json({ status: true, data });
  } catch (error) {
    res.status(500).json({ status: false, mess: error.toString() });
  }
};

export const sendNews = async (req, res) => {
  try {
    const { error, value } = validateData(detailNewsValid, req.body);
    if (error) return res.status(400).json({ status: false, mess: error });
    const { _id } = value;

    const data = await detailNewMd({ _id });
    if (!data) return res.status(400).json({ status: false, mess: 'Tin tức không tồn tại!' });
    const template = await detailTemplateMd({ type: 2, status: 1 });
    if (!template) return res.status(400).json({ status: false, mess: 'Chưa có mẫu gửi thông báo!' });

    const residents = await listUserMd({ type: 'resident', project: req.project?._id, status: 1 }, false, false, false, 'fullName email');
    for (const resident of residents) {
      const html = convertParams({ $ten_cu_dan: resident.fullName, $noi_dung: data.content }, template.content);
      const subject = convertParams({ $subject: data.subject }, template.subject);
      await sendMail({ to: resident.email, subject, html, project: req.project?._id, type: 2 });
    }

    res.status(201).json({ status: true, data });
  } catch (error) {
    res.status(500).json({ status: false, mess: error.toString() });
  }
};
