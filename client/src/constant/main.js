export const initParams = { page: 1, limit: 10 };

export const statuses = [
  { label: 'Active', key: '1' },
  { label: 'Inactive', key: '0' }
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
  { label: 'Chờ duyệt', key: 1, color: 'purple' },
  { label: 'Chờ gửi', key: 2, color: 'blue' },
  { label: 'Chờ thanh toán', key: 3, color: 'cyan' },
  { label: 'Đã thanh toán', key: 4, color: 'green' },
  { label: 'Quá hạn thanh toán', key: 5, color: 'red' }
];

export const calculationRange = [
  { label: 'Tất cả căn hộ', key: 1 },
  { label: 'Nhóm căn hộ', key: 2 },
  { label: 'Căn hộ', key: 3 }
];

export const apartmentStatus = [
  { label: 'Trống', key: 1 },
  { label: 'Đang cho thuê', key: 2 },
  { label: 'Đang cải tạo', key: 3 }
];

export const optionStatus = [
  { label: 'BQL đã tiếp nhận', key: 1, color: 'purple' },
  { label: 'BQL đang xử lý', key: 2, color: 'blue' },
  { label: 'Chờ cư dân phản hồi', key: 3, color: 'cyan' },
  { label: 'Hoàn thành', key: 4, color: 'success' },
  { label: 'Hủy', key: 5, color: 'red' }
];

export const optionType = [
  { label: 'Vệ sinh', key: 1 },
  { label: 'Bảo vệ', key: 2 },
  { label: 'Tiếng ồn', key: 3 },
  { label: 'Tiện ích', key: 4 },
  { label: 'Dịch vụ khách hàng', key: 5 },
  { label: 'Bãi đỗ xe', key: 6 },
  { label: 'Thang máy', key: 7 },
  { label: 'Hỗ trợ kỹ thuật', key: 8 },
  { label: 'Phí và thanh toán', key: 9 },
  { label: 'Khác', key: 10 }
];

export const logType = [
  { label: 'Quên mật khẩu', key: 1 },
  { label: 'Gửi thông báo tin tức', key: 2 },
  { label: 'Gửi thông báo phí', key: 3 },
  { label: 'Gửi thông báo phí', key: 4 },
];

export const logStatus = [
  { label: 'Đang gửi', key: 0, color: 'yellow' },
  { label: 'Đã gửi', key: 1, color: 'green' },
  { label: 'Có lỗi', key: 2, color: 'red' }
];

export const templateType = [
  { label: 'Quên mật khẩu', key: 1 },
  { label: 'Thông báo', key: 2 },
  { label: 'Bảng kê', key: 3 },
  { label: 'Phiếu thu', key: 4 },
  { label: 'Phiếu chi', key: 5 }
];

export const receiptType = [
  { label: 'Phiếu thu', key: 1, color: 'purple' },
  { label: 'Phiếu hoàn tiền', key: 2, color: 'blue' },
  { label: 'Phiếu hạch toán', key: 3, color: 'cyan' }
];

export const paymentType = [
  { label: 'Chuyển khoản', key: 1 },
  { label: 'Tiền mặt', key: 2 },
  { label: 'Hạch toán tự động', key: 3 }
];

export const residentType = [
  { label: 'Chủ hộ', key: 1 },
  { label: 'Vợ chồng', key: 2 },
  { label: 'Con', key: 3 },
  { label: 'Bố mẹ', key: 4 },
  { label: 'Anh chị em', key: 5 },
  { label: 'Khách thuê', key: 6 },
  { label: 'Chủ hộ cũ', key: 7 }
];
