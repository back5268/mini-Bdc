import { ElectricWater } from "@models";

export const getListMonth = async (req, res) => {
  try {
    const where = { project: req.project?._id };
    res.json({ status: true, data: await ElectricWater.distinct('month', where) });
  } catch (error) {
    res.status(500).json({ status: false, mess: error.toString() });
  }
};
