import { uploadFileToFirebase } from '@lib/firebase';
import { addResidentValid, detailResidentValid, listResidentValid, updateResidentValid } from '@lib/validation';
import {
  countUserMd,
  createUserMd,
  deleteUserMd,
  detailApartmentMd,
  detailUserMd,
  listUserMd,
  updateApartmentMd,
  updateUserMd
} from '@models';
import { validateData } from '@utils';

export const getListResident = async (req, res) => {
  try {
    const { error, value } = validateData(listResidentValid, req.query);
    if (error) return res.status(400).json({ status: false, mess: error });
    const { page, limit, keySearch, status, email, apartment } = value;
    const where = { project: req.project?._id, type: 'resident' };
    if (keySearch) where.$or = [{ name: { $regex: keySearch, $options: 'i' } }];
    if (email) where.$or = [{ email: { $regex: email, $options: 'i' } }, { phone: { $regex: email, $options: 'i' } }];
    if (status || status === 0) where.status = status;
    if (apartment) where['apartment._id'] = apartment;
    const documents = await listUserMd(where, page, limit);
    const total = await countUserMd(where);
    res.json({ status: true, data: { documents, total } });
  } catch (error) {
    res.status(500).json({ status: false, mess: error.toString() });
  }
};

export const getListResidentInfo = async (req, res) => {
  try {
    res.json({
      status: true,
      data: await listUserMd({ project: req.project?._id, type: 'resident' }, false, false, false, '_id fullName')
    });
  } catch (error) {
    res.status(500).json({ status: false, mess: error.toString() });
  }
};

export const detailResident = async (req, res) => {
  try {
    const { error, value } = validateData(detailResidentValid, req.query);
    if (error) return res.status(400).json({ status: false, mess: error });
    const { _id } = value;
    const data = await detailUserMd({ _id });
    if (!data) return res.status(400).json({ status: false, mess: 'Cư dân không tồn tại!' });
    res.status(201).json({ status: true, data });
  } catch (error) {
    res.status(500).json({ status: false, mess: error.toString() });
  }
};

export const deleteResident = async (req, res) => {
  try {
    const { error, value } = validateData(detailResidentValid, req.body);
    if (error) return res.status(400).json({ status: false, mess: error });
    const { _id } = value;
    const data = await deleteUserMd({ _id });
    if (!data) return res.status(400).json({ status: false, mess: 'Cư dân không tồn tại!' });

    const apartment = await detailApartmentMd({ _id: data.apartment?._id });
    if (apartment) {
      const params = { numberResident: apartment.numberResident - 1 };
      if (data.apartment?.type === 1) params.owner = null;
      await updateApartmentMd({ _id: data.apartment?._id }, params);
    }

    res.status(201).json({ status: true, data });
  } catch (error) {
    res.status(500).json({ status: false, mess: error.toString() });
  }
};

export const addResident = async (req, res) => {
  try {
    const { error, value } = validateData(addResidentValid, req.body);
    if (error) return res.status(400).json({ status: false, mess: error });
    const { phone, email, apartment } = value;

    const checkEmail = await detailUserMd({ email, project: req.project?._id });
    if (checkEmail) return res.status(400).json({ status: false, mess: 'Email đã tồn tại!' });

    const checkPhone = await detailUserMd({ phone, project: req.project?._id });
    if (checkPhone) return res.status(400).json({ status: false, mess: 'Số điện thoại đã tồn tại!' });

    const checkApartment = await detailApartmentMd({ _id: apartment._id });
    if (!checkApartment) return res.status(400).json({ status: false, mess: 'Căn hộ không tồn tại!' });

    if (req.file) {
      value.avatar = await uploadFileToFirebase(req.file);
    }

    const data = await createUserMd({ project: req.project?._id, ...value, type: 'resident' });
    const params = { numberResident: checkApartment.numberResident + 1 };
    if (Number(apartment.type) === 1) {
      if (checkApartment.owner) await updateUserMd({ _id: checkApartment.owner }, { apartment: { _id: checkApartment._id, type: 7 } });
      params.owner = data._id;
    }
    await updateApartmentMd({ _id: checkApartment._id }, params);
    res.json({ status: true, data });
  } catch (error) {
    res.status(500).json({ status: false, mess: error.toString() });
  }
};

export const updateResident = async (req, res) => {
  try {
    const { error, value } = validateData(updateResidentValid, req.body);
    if (error) return res.status(400).json({ status: false, mess: error });
    const { _id, phone, email, apartment } = value;

    const resident = await detailUserMd({ _id });
    if (!resident) return res.status(400).json({ status: false, mess: 'Cư dân không tồn tại!' });

    if (email) {
      const checkEmail = await detailUserMd({ email, project: req.project?._id });
      if (checkEmail) return res.status(400).json({ status: false, mess: 'Email đã tồn tại!' });
    }

    if (phone) {
      const checkPhone = await detailUserMd({ phone, project: req.project?._id });
      if (checkPhone) return res.status(400).json({ status: false, mess: 'Số điện thoại đã tồn tại!' });
    }

    if (apartment) {
      if (apartment._id === resident.apartment?._id) {
        if (resident.apartment.type === 1) await updateApartmentMd({ _id: apartment._id }, { owner: null });
      } else {
        const checkApartment = await detailApartmentMd({ _id: apartment._id });
        if (!checkApartment) return res.status(400).json({ status: false, mess: 'Căn hộ không tồn tại!' });
        const oldApartment = await detailApartmentMd({ _id: resident.apartment?._id });
        if (resident.apartment.type === 1)
          await updateApartmentMd({ _id: oldApartment._id }, { owner: null, numberResident: oldApartment.numberResident - 1 });
        else await updateApartmentMd({ _id: oldApartment._id }, { numberResident: oldApartment.numberResident - 1 });
        const params = { numberResident: checkApartment.numberResident + 1 };
        if (apartment.type === 1) {
          if (checkApartment.owner) await updateUserMd({ _id: checkApartment.owner }, { apartment: { _id: checkApartment._id, type: 7 } });
          params.owner = _id;
        }
        await updateApartmentMd({ _id: checkApartment._id }, { ...params });
      }
    }

    if (req.file) {
      value.avatar = await uploadFileToFirebase(req.file);
    }

    const data = await updateUserMd({ _id }, value);
    res.status(201).json({ status: true, data });
  } catch (error) {
    res.status(500).json({ status: false, mess: error.toString() });
  }
};
