import {
  addServiceValid,
  checkApartment,
  checkApartmentValid,
  detailServiceValid,
  listServiceValid,
  updateServiceValid,
  updateStatusServiceValid
} from '@lib/validation';
import {
  createServiceMd,
  countServiceMd,
  deleteServiceMd,
  detailServiceMd,
  listServiceMd,
  updateServiceMd,
  listApartmentMd,
  detailPriceMd
} from '@models';
import { validateData } from '@utils';

export const getListService = async (req, res) => {
  try {
    const { error, value } = validateData(listServiceValid, req.query);
    if (error) return res.status(400).json({ status: false, mess: error });
    const { page, limit, keySearch, type, status } = value;
    const where = {};
    if (keySearch) where.$or = [{ name: { $regex: keySearch, $options: 'i' } }, { code: { $regex: keySearch, $options: 'i' } }];
    if (type) where.type = type;
    if (status || status === 0) where.status = status;
    const documents = await listServiceMd(where, page, limit);
    const total = await countServiceMd(where);
    res.json({ status: true, data: { documents, total } });
  } catch (error) {
    res.status(500).json({ status: false, mess: error.toString() });
  }
};

export const detailService = async (req, res) => {
  try {
    const { error, value } = validateData(detailServiceValid, req.query);
    if (error) return res.status(400).json({ status: false, mess: error });
    const { _id } = value;
    const data = await detailServiceMd({ _id }, [{ path: 'price', select: 'name code prices' }]);
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
    const { error, value } = validateData(checkApartmentValid, req.body);
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
      if (checkService && checkService.apartments.length > 0) where.$or.push({ _id: { $in: checkService.apartments } });
    }
    res.json({ status: true, data: await listApartmentMd({ _id: { $nin: arr } }) }, false, false, false, '_id name code');
  } catch (error) {
    res.status(500).json({ status: false, mess: error.toString() });
  }
};

export const addService = async (req, res) => {
  try {
    const { error, value } = validateData(addServiceValid, req.body);
    if (error) return res.status(400).json({ status: false, mess: error });
    const { name, code, price, type, vehicleType } = value;

    const checkName = await detailServiceMd({ name });
    if (checkName) return res.status(400).json({ status: false, mess: 'Tên dịch vụ đã tồn tại!' });

    const checkCode = await detailServiceMd({ code });
    if (checkCode) return res.status(400).json({ status: false, mess: 'Mã dịch vụ đã tồn tại!' });
    if (type === 4 && !vehicleType) res.status(400).json({ status: false, mess: 'Loại phương tiện không được bỏ trống!' });

    const checkPrice = await detailPriceMd({ _id: price });
    if (!checkPrice) return res.status(400).json({ status: false, mess: 'Bảng giá không tồn tại!' });

    value.project = req.project?._id;
    const data = await createServiceMd({ by: req.userInfo._id, ...value });
    res.status(201).json({ status: true, data });
  } catch (error) {
    res.status(500).json({ status: false, mess: error.toString() });
  }
};

export const updateService = async (req, res) => {
  try {
    const { error, value } = validateData(updateServiceValid, req.body);
    if (error) return res.status(400).json({ status: false, mess: error });
    const { _id, name, code, price, type, vehicleType } = value;

    const service = await detailServiceMd({ _id });
    if (!service) return res.status(400).json({ status: false, mess: 'Dịch vụ không tồn tại!' });

    if (name) {
      const checkName = await detailServiceMd({ name });
      if (checkName) return res.status(400).json({ status: false, mess: 'Tên dịch vụ đã tồn tại!' });
    }

    if (code) {
      const checkCode = await detailServiceMd({ code });
      if (checkCode) return res.status(400).json({ status: false, mess: 'Mã dịch vụ đã tồn tại!' });
    }

    if (price) {
      const checkPrice = await detailPriceMd({ _id: price });
      if (!checkPrice) return res.status(400).json({ status: false, mess: 'Bảng giá không tồn tại!' });
    }

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
