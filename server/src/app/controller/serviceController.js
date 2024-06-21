import { serviceType } from '@constant';
import {
  addServiceValid,
  checkApartmentValid,
  detailServiceValid,
  listServiceValid,
  updateServiceValid,
  updateStatusServiceValid
} from '@lib/validation';
import {
  countServiceMd,
  createServiceMd,
  deleteServiceMd,
  detailServiceMd,
  listApartmentMd,
  listServiceMd,
  updateServiceMd
} from '@models';
import { validateData } from '@utils';

export const getListService = async (req, res) => {
  try {
    const { error, value } = validateData(listServiceValid, req.query);
    if (error) return res.status(400).json({ status: false, mess: error });
    const { page, limit, type, status, apartment } = value;
    const where = { project: req.project?._id };
    if (type) where.type = type;
    if (status || status === 0) where.status = status;
    if (apartment) where.apartments = { $elemMatch: { $eq: apartment } };
    const documents = await listServiceMd(where, page, limit);
    const total = await countServiceMd(where);
    res.json({ status: true, data: { documents, total } });
  } catch (error) {
    res.status(500).json({ status: false, mess: error.toString() });
  }
};

export const getListServiceInfo = async (req, res) => {
  try {
    const { type, status, apartment } = req.query;
    const where = { project: req.project?._id };
    if (type) where.type = type;
    if (apartment) where.apartments = { $elemMatch: { $eq: apartment } };
    if (status || status === 0) where.status = status;
    res.json({ status: true, data: await listServiceMd(where) });
  } catch (error) {
    res.status(500).json({ status: false, mess: error.toString() });
  }
};

export const detailService = async (req, res) => {
  try {
    const { error, value } = validateData(detailServiceValid, req.query);
    if (error) return res.status(400).json({ status: false, mess: error });
    const { _id } = value;
    const data = await detailServiceMd({ _id });
    if (!data) return res.status(400).json({ status: false, mess: 'Dịch vụ không tồn tại!' });
    res.json({ status: true, data });
  } catch (error) {
    res.status(500).json({ status: false, mess: error.toString() });
  }
};

export const deleteService = async (req, res) => {
  try {
    const { error, value } = validateData(detailServiceValid, req.body);
    if (error) return res.status(400).json({ status: false, mess: error });
    const { _id } = value;
    const data = await deleteServiceMd({ _id });
    if (!data) return res.status(400).json({ status: false, mess: 'Dịch vụ không tồn tại!' });
    res.status(201).json({ status: true, data });
  } catch (error) {
    res.status(500).json({ status: false, mess: error.toString() });
  }
};

export const checkApartment = async (req, res) => {
  try {
    const { error, value } = validateData(checkApartmentValid, req.query);
    if (error) return res.status(400).json({ status: false, mess: error });
    const { service, type, vehicleType } = value;
    const services = await listServiceMd({ type, vehicleType, status: 1 });
    const arr = [];
    if (services.length > 0) {
      services.forEach((s) => {
        if (s.apartments?.length > 0) {
          s.apartments.forEach((sa) => {
            if (!arr.includes(sa)) arr.push(sa);
          });
        }
      });
    }
    const where = {};
    where.$or = [{ _id: { $nin: arr } }];
    if (service) {
      const checkService = await detailServiceMd({ _id: service }, false, 'apartments');
      if (checkService?.apartments?.length > 0) where.$or.push({ _id: { $in: checkService.apartments } });
    }
    res.json({ status: true, data: await listApartmentMd(where, false, false, false, '_id name code area floor') });
  } catch (error) {
    res.status(500).json({ status: false, mess: error.toString() });
  }
};

export const addService = async (req, res) => {
  try {
    const { error, value } = validateData(addServiceValid, req.body);
    if (error) return res.status(400).json({ status: false, mess: error });
    const { type, vehicleType } = value;
    if (type === 4 && !vehicleType) res.status(400).json({ status: false, mess: 'Loại phương tiện không được bỏ trống!' });
    value.project = req.project?._id;
    const data = await createServiceMd({ by: req.userInfo._id, ...value, name: serviceType.find((s) => s.key === type)?.label });
    res.status(201).json({ status: true, data });
  } catch (error) {
    res.status(500).json({ status: false, mess: error.toString() });
  }
};

export const updateService = async (req, res) => {
  try {
    const { error, value } = validateData(updateServiceValid, req.body);
    if (error) return res.status(400).json({ status: false, mess: error });
    const { _id, type, vehicleType } = value;

    const service = await detailServiceMd({ _id });
    if (!service) return res.status(400).json({ status: false, mess: 'Dịch vụ không tồn tại!' });

    if (type === 4 && !vehicleType) res.status(400).json({ status: false, mess: 'Loại phương tiện không được bỏ trống!' });
    const data = await updateServiceMd({ _id }, { updateBy: req.userInfo._id, ...value });
    res.status(201).json({ status: true, data });
  } catch (error) {
    res.status(500).json({ status: false, mess: error.toString() });
  }
};

export const updateStatusService = async (req, res) => {
  try {
    const { error, value } = validateData(updateStatusServiceValid, req.body);
    if (error) return res.status(400).json({ status: false, mess: error });
    const { _id, status } = value;

    const service = await detailServiceMd({ _id });
    if (!service) return res.status(400).json({ status: false, mess: 'Dịch vụ không tồn tại!' });

    if (status === 1) {
      const apartments = service.apartments;
      const checkApartment = await detailServiceMd({
        status: 1,
        type: service.type,
        vehicleType: service.vehicleType,
        apartments: { $in: apartments }
      });
      if (checkApartment) return res.status(400).json({ status: false, mess: 'Dịch vụ này đã có trong căn hộ không thể kích hoạt!' });
    }
    const data = await updateServiceMd({ _id }, { updateBy: req.userInfo._id, ...value });
    res.status(201).json({ status: true, data });
  } catch (error) {
    res.status(500).json({ status: false, mess: error.toString() });
  }
};
