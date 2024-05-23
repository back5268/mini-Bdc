import { detailToolMd, listToolMd, updateToolMd } from '@models';

export const getListTool = async (req, res) => {
  try {
    const { status } = req.query;
    const where = {};
    if (status || status === 0) where.status = status;
    res.json({ status: true, data: await listToolMd(where, false, false, false, false, { sort: 1 }) });
  } catch (error) {
    res.status(500).json({ status: false, mess: error.toString() });
  }
};

export const updateTool = async (req, res) => {
  try {
    const { _id, status } = req.body;
    const tool = await detailToolMd({ _id });
    if (!tool) return res.status(400).json({ status: false, mess: 'Quyền không tồn tại!' });
    const data = await updateToolMd({ _id }, { status });
    res.status(201).json({ status: true, data });
  } catch (error) {
    res.status(500).json({ status: false, mess: error.toString() });
  }
};
