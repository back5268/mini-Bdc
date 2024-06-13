import { uploadFileToFirebase } from '@lib/firebase';
import {
    addResidentValid,
    listResidentValid
} from '@lib/validation';
import { countUserMd, createUserMd, detailUserMd, listUserMd } from '@models';
import { validateData } from '@utils';

export const getListResident = async (req, res) => {
    try {
        const { error, value } = validateData(listResidentValid, req.query);
        if (error) return res.status(400).json({ status: false, mess: error });
        const { page, limit, keySearch, status } = value;
        const where = { type: 'resident' };
        if (keySearch) where.$or = [{ name: { $regex: keySearch, $options: 'i' } }, { code: { $regex: keySearch, $options: 'i' } }];
        if (status || status === 0) where.status = status;
        const documents = await listUserMd(where, page, limit);
        const total = await countUserMd(where);
        res.json({ status: true, data: { documents, total } });
    } catch (error) {
        res.status(500).json({ status: false, mess: error.toString() });
    }
};

export const addResident = async (req, res) => {
    try {
        const { error, value } = validateData(addResidentValid, req.body);
        if (error) return res.status(400).json({ status: false, mess: error });
        const { username, code, email } = value;

        const checkEmail = await detailUserMd({ email });
        if (checkEmail) return res.status(400).json({ status: false, mess: 'Email đã tồn tại!' });

        const checkUsername = await detailUserMd({ username });
        if (checkUsername) return res.status(400).json({ status: false, mess: 'Username đã tồn tại!' });

        const checkCode = await detailUserMd({ code });
        if (checkCode) return res.status(400).json({ status: false, mess: 'Mã nhân viên đã tồn tại!' });

        if (req.file) {
            value.avatar = await uploadFileToFirebase(req.file);
        }

        res.json({ status: true, data: await createUserMd(value) });
    } catch (error) {
        res.status(500).json({ status: false, mess: error.toString() });
    }
};