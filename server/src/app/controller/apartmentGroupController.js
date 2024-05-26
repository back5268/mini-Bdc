import { addApartmentGroupValid, detailApartmentGroupValid, listApartmentGroupValid, updateApartmentGroupValid, updateStatusApartmentGroupValid } from "@lib/validation";
import { countApartmentGroupMd, createApartmentGroupMd, deleteApartmentGroupMd, detailApartmentGroupMd, listApartmentGroupMd, updateApartmentGroupMd } from "@models";
import { validateData } from "@utils";

export const getListApartmentGroup = async (req, res) => {
    try {
        const { error, value } = validateData(listApartmentGroupValid, req.query);
        if (error) return res.status(400).json({ status: false, mess: error });
        const { page, limit, keySearch, project, status } = value;
        const where = { project: req.project?._id };
        if (keySearch) where.$or = [{ name: { $regex: keySearch, $options: 'i' } }, { description: { $regex: keySearch, $options: 'i' } }];
        if (status || status === 0) where.status = status;
        const documents = await listApartmentGroupMd(where, page, limit);
        const total = await countApartmentGroupMd(where);
        res.json({ status: true, data: { documents, total } });
    } catch (error) {
        res.status(500).json({ status: false, mess: error.toString() });
    }
}
export const deleteApartmentGroup = async (req, res) => {
    try {
        const { error, value } = validateData(detailApartmentGroupValid, req.body);
        if (error) return res.status(400).json({ status: false, mess: error });
        const { _id } = value;
        const data = await deleteApartmentGroupMd({ _id });
        if (!data) return res.status(400).json({ status: false, mess: 'Nhóm căn hộ không tồn tại!' });
        res.status(201).json({ status: true, data });
    } catch (error) {
        res.status(500).json({ status: false, mess: error.toString() });
    }
};
export const detailApartmentGroup = async (req, res) => {
    try {
        const { error, value } = validateData(detailApartmentGroupValid, req.query);
        if (error) return res.status(400).json({ status: false, mess: error });
        const { _id } = value;
        const data = await detailApartmentGroupMd({ _id });
        if (!data) return res.status(400).json({ status: false, mess: 'Nhóm căn hộ không tồn tại!' });
        res.json({ status: true, data });
    } catch (error) {
        res.status(500).json({ status: false, mess: error.toString() });
    }
};
export const updateApartmentGroup = async (req, res) => {
    try {
        const { error, value } = validateData(updateApartmentGroupValid, req.body);
        if (error) return res.status(400).json({ status: false, mess: error });
        const { _id, name } = value;
        const apartmentGroup = await detailApartmentGroupMd({ _id });
        if (!apartmentGroup) return res.status(400).json({ status: false, mess: 'Nhóm căn hộ không tồn tại!' });
        if (name) {
            const checkName = await detailApartmentGroupMd({ name });
            if (checkName) return res.status(400).json({ status: false, mess: 'Tên nhóm căn hộ đã tồn tại!' });
        }
        const data = await updateApartmentGroupMd({ _id }, { updateBy: req.userInfo._id, ...value });
        res.status(201).json({ status: true, data });
    } catch (error) {
        res.status(500).json({ status: false, mess: error.toString() });
    }
}
export const addApartmentGroup = async (req, res) => {
    try {
        const { error, value } = validateData(addApartmentGroupValid, req.body);
        if (error) return res.status(400).json({ status: false, mess: error });
        const { name } = value;
        if (name) {
            const checkName = await detailApartmentGroupMd({ name });
            if (checkName) return res.status(400).json({ status: false, mess: 'Tên nhóm căn hộ đã tồn tại!' });
        }
        value.project = req.project?._id;
        const data = await createApartmentGroupMd({ by: req.userInfo._id, ...value });
        res.status(201).json({ status: true, data });
    } catch (error) {
        res.status(500).json({ status: false, mess: error.toString() });
    }
};