export const initParams = { page: 1, limit: 10 };

export const statuses = [
  { label: 'Active', key: 1 },
  { label: 'Inactive', key: 0 }
];

export const genders = [
  { label: 'Nam', key: 1 },
  { label: 'Nữ', key: 2 },
  { label: 'Khác', key: 3 }
];

export const toolActions = [
  { label: 'Thêm mới', key: 'create' },
  { label: 'Xem', key: 'read' },
  { label: 'Cập nhật', key: 'update' },
  { label: 'Xóa', key: 'delete' }
];

export const priceType = [
  { label: 'Một giá', key: 1 },
  { label: 'Lũy tiến', key: 2 }
];

export const serviceType = [
  { label: 'Phí dịch vụ', key: 1 },
  { label: 'Phí điện', key: 2 },
  { label: 'Phí nước', key: 3 },
  { label: 'Phí phương tiện', key: 4 },
  { label: 'Phí khác', key: 5 }
];

export const vehicleType = [
  { label: 'Ô tô', key: 1 },
  { label: 'Xe máy', key: 2 },
  { label: 'Xe máy điện', key: 3 },
  { label: 'Xe đạp', key: 4 }
];

export const electricWaterType = [
  { label: 'Điện', key: 1 },
  { label: 'Nước', key: 2 }
];

export const debtStatus = [
  { label: 'Đang xử lý', key: 1 },
  { label: 'Đã xử lý', key: 2 }
];

export const billStatus = [
  { label: 'Chờ duyệt', key: 1 },
  { label: 'Chờ gửi', key: 2 },
  { label: 'Chờ thanh toán', key: 3 },
  { label: 'Đã thanh toán', key: 4 },
  { label: 'Quá hạn thanh toán', key: 5 },
];

export const calculationRange = [
  { label: 'Tất cả căn hộ', key: 1 },
  { label: 'Nhóm căn hộ', key: 2 },
  { label: 'Căn hộ', key: 3 }
];
export const statusApartment = [
  { id: 1, name: 'Trống' },
  { id: 2, name: 'Đang cho thuê' },
  { id: 3, name: 'Đang cải tạo' }
];