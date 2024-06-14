import { addNewsValid, listNewsValid, updateNewsValid, detailNewsValid } from '@lib/validation';
import { countNewMd, createNewMd, deleteNewMd, detailNewMd, listNewMd, updateNewMd } from '@models';
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
    const { title, content, time, hashtag } = value;

    const data = await createNewMd({
      by: req.userInfo._id,
      title,
      content,
      time,
      hashtag
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
    const { _id, subject, content, status, time, hashtag } = value;

    const news = await detailNewMd({ _id });
    if (!news) return res.status(400).json({ status: false, mess: 'Tin tức không tồn tại!' });

    const data = await updateNewMd({ _id }, { subject, status, content, time, hashtag });
    res.status(201).json({ status: true, data });
  } catch (error) {
    res.status(500).json({ status: false, mess: error.toString() });
  }
};
