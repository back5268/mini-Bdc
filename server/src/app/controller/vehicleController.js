import { uploadFileToFirebase } from '@lib/firebase';
import { addVehicleValid, detailVehicleValid, listVehicleValid, updateVehicleValid } from '@lib/validation';
import {
  createVehicleMd,
  countVehicleMd,
  deleteVehicleMd,
  detailVehicleMd,
  listVehicleMd,
  updateVehicleMd,
  updateApartmentMd,
  detailApartmentMd
} from '@models';
import { validateData } from '@utils';

export const getListVehicle = async (req, res) => {
  try {
    const { error, value } = validateData(listVehicleValid, req.query);
    if (error) return res.status(400).json({ status: false, mess: error });
    const { page, limit, keySearch, type, apartment, status } = value;
    const where = { project: req.project?._id };
    if (keySearch) where.$or = [{ name: { $regex: keySearch, $options: 'i' } }, { licensePlate: { $regex: keySearch, $options: 'i' } }];
    if (type) where.type = type;
    if (apartment) where.apartment = apartment;
    if (status || status === 0) where.status = status;
    const documents = await listVehicleMd(where, page, limit, [
      { path: 'apartment', select: 'name' },
    ]);
    const total = await countVehicleMd(where);
    res.json({ status: true, data: { documents, total } });
  } catch (error) {
    res.status(500).json({ status: false, mess: error.toString() });
  }
};

export const detailVehicle = async (req, res) => {
  try {
    const { error, value } = validateData(detailVehicleValid, req.query);
    if (error) return res.status(400).json({ status: false, mess: error });
    const { _id } = value;
    const data = await detailVehicleMd({ _id });
    if (!data) return res.status(400).json({ status: false, mess: 'Phương tiện không tồn tại!' });
    res.json({ status: true, data });
  } catch (error) {
    res.status(500).json({ status: false, mess: error.toString() });
  }
};

export const deleteVehicle = async (req, res) => {
  try {
    const { error, value } = validateData(detailVehicleValid, req.body);
    if (error) return res.status(400).json({ status: false, mess: error });
    const { _id } = value;

    const data = await deleteVehicleMd({ _id });
    if (!data) return res.status(400).json({ status: false, mess: 'Phương tiện không tồn tại!' });

    const checkApartment = await detailApartmentMd({ _id: data.apartment });
    await updateApartmentMd({ _id: data.apartment }, { numberVehicle: checkApartment.numberVehicle - 1 });

    res.status(201).json({ status: true, data });
  } catch (error) {
    res.status(500).json({ status: false, mess: error.toString() });
  }
};

export const addVehicle = async (req, res) => {
  try {
    const { error, value } = validateData(addVehicleValid, req.body);
    if (error) return res.status(400).json({ status: false, mess: error });
    const { licensePlate, apartment } = value;

    const checkLicensePlate = await detailVehicleMd({ licensePlate, project: req.project?._id });
    if (checkLicensePlate) return res.status(400).json({ status: false, mess: 'Biển số xe đã tồn tại!' });

    const checkApartment = await detailApartmentMd({ _id: apartment });
    if (!checkApartment) return res.status(400).json({ status: false, mess: 'Căn hộ không tồn tại!' });

    value.files = [];
    if (req.files?.['files']?.[0]) {
      for (const file of req.files['files']) {
        value.files.push(await uploadFileToFirebase(file));
      }
    }

    value.project = req.project?._id;
    const data = await createVehicleMd({ by: req.userInfo._id, ...value });
    await updateApartmentMd({ _id: checkApartment._id }, { numberVehicle: checkApartment.numberVehicle + 1 });
    res.status(201).json({ status: true, data });
  } catch (error) {
    res.status(500).json({ status: false, mess: error.toString() });
  }
};

export const updateVehicle = async (req, res) => {
  try {
    const { error, value } = validateData(updateVehicleValid, req.body);
    if (error) return res.status(400).json({ status: false, mess: error });
    const { _id, licensePlate, files, apartment } = value;

    const vehicle = await detailVehicleMd({ _id });
    if (!vehicle) return res.status(400).json({ status: false, mess: 'Phương tiện không tồn tại!' });

    if (licensePlate) {
      const checkLicensePlate = await detailVehicleMd({ licensePlate, project: req.project?._id });
      if (checkLicensePlate) return res.status(400).json({ status: false, mess: 'Biển số xe đã tồn tại!' });
    }

    if (apartment) {
      const checkApartment = await detailApartmentMd({ _id: apartment._id });
      if (!checkApartment) return res.status(400).json({ status: false, mess: 'Căn hộ không tồn tại!' });
      const oldApartment = await detailApartmentMd({ _id: resident.apartment?._id });
      await updateApartmentMd({ _id: oldApartment._id }, { numberResident: oldApartment.numberResident - 1 });
      await updateApartmentMd({ _id: checkApartment._id }, { numberResident: oldApartment.numberResident + 1 });
    }

    if (req.files?.['files']?.[0]) {
      value.files = files ? (typeof files === 'object' ? files : [files]) : [];
      for (const file of req.files['files']) {
        value.files.push(await uploadFileToFirebase(file));
      }
    }

    const data = await updateVehicleMd({ _id }, { updateBy: req.userInfo._id, ...value });
    res.status(201).json({ status: true, data });
  } catch (error) {
    res.status(500).json({ status: false, mess: error.toString() });
  }
};
