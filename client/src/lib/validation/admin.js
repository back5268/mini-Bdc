import { REGEX } from '@constant';
import * as yup from 'yup';

export const UserValidation = yup.object({
  email: yup.string().email('Email không đúng định dạng!').required('Email không được bỏ trống!'),
  username: yup.string().required('Tài khoản không được bỏ trống!'),
  fullName: yup.string().required('Họ tên không được bỏ trống!'),
  code: yup.string().required('Mã nhân viên không được bỏ trống!'),
  department: yup.string().required('Phòng ban không được bỏ trống!')
});

export const PermissionValidation = yup.object({
  name: yup.string().required('Tên nhóm quyền không được bỏ trống!')
});

export const DepartmentValidation = yup.object({
  name: yup.string().required('Tên phòng ban không được bỏ trống!'),
  code: yup.string().required('Mã phòng ban không được bỏ trống!')
});

export const ProjectValidation = yup.object({
  name: yup.string().required('Tên dự án không được bỏ trống!'),
  code: yup.string().required('Mã dự án không được bỏ trống!'),
  address: yup.string().required('Địa chỉ không được bỏ trống!'),
  email: yup.string().email('Email không đúng định dạng!').required('Email không được bỏ trống!'),
  phone: yup.string().matches(REGEX.C_PHONE, 'Số điện thoại không đúng định dạng!').required('Mật khẩu không được bỏ trống!')
});

export const PriceValidation = yup.object({
  name: yup.string().required('Tên bảng giá không được bỏ trống!'),
  code: yup.string().required('Mã bảng giá không được bỏ trống!'),
  recipe: yup.string().required('Loại bảng giá không được bỏ trống!'),
  serviceType: yup.string().required('Loại dịch vụ không được bỏ trống!')
});

export const ApartmentGroupValidation = yup.object({
  name: yup.string().required('Tên bảng giá không được bỏ trống!'),
  apartments: yup.array().min(2, "Vui lòng chọn từ 2 căn hộ trở lên!").required('Căn hộ không được bỏ trống!'),
});

export const ApartmentValidation = yup.object({
  name: yup.string().required('Tên căn hộ không được bỏ trống!'),
  code: yup.string().required('Mã căn hộ không được bỏ trống!'),
  area: yup.number().required('Diện tích căn hộ không được bỏ trống!'),
  status: yup.number().required('Trạng thái căn hộ không được bỏ trống!'),
  floor: yup.number().required('Tầng không được bỏ trống!'),
  owner: yup.string().required('Chủ hộ không được bỏ trống!'),
});
export const ServiceValidation = yup.object({
  name: yup.string().required('Tên dịch vụ không được bỏ trống!'),
  code: yup.string().required('Mã dịch vụ không được bỏ trống!'),
  price: yup.string().required('Bảng giá không được bỏ trống!'),
  type: yup.string().required('Loại dịch vụ không được bỏ trống!')
});

export const VehicleValidation = yup.object({
  name: yup.string().required('Tên phương tiện không được bỏ trống!'),
  licensePlate: yup.string().required('Biển số xe không được bỏ trống!'),
  apartment: yup.string().required('Căn hộ không được bỏ trống!'),
  service: yup.string().required('Dịch vụ không được bỏ trống!'),
  type: yup.number().required('Loại phương tiện không được bỏ trống!')
});

export const DebtValidation = yup.object({
  month: yup.string().required('Kỳ tháng không được bỏ trống!'),
  deadline: yup.string().required('Hạn thanh toán không được bỏ trống!'),
  type: yup.string().required('Phạm vi tính toán không được bỏ trống!')
});

export const UserInfoValidation = yup.object({
  email: yup.string().email('Email không đúng định dạng!').required('Email không được bỏ trống!'),
  username: yup.string().required('Tài khoản không được bỏ trống!'),
  name: yup.string().required('Họ tên không được bỏ trống!')
});

export const ChangePasswordValidation = yup.object({
  password: yup
    .string()
    .min(6, 'Mật khẩu cần dài ít nhất 6 ký tự!')
    .matches(REGEX.PASSWORD, 'Mật khẩu cần chứa cả số và chữ số!')
    .required('Mật khẩu không được bỏ trống!'),
  newPassword: yup
    .string()
    .min(6, 'Mật khẩu cần dài ít nhất 6 ký tự!')
    .matches(REGEX.PASSWORD, 'Mật khẩu cần chứa cả số và chữ số!')
    .required('Mật khẩu không được bỏ trống!')
});

export const TemplateValidation = yup.object({
  subject: yup.string().required('Tiêu đề không được bỏ trống!'),
  code: yup.string().required('Mã mẫu thông báo không được bỏ trống!'),
  content: yup.string().required('Nội dung không được bỏ trống!'),
  type: yup.number().required('Loại thông báo không được bỏ trống!')
});

export const ProductValidation = yup.object({
  name: yup.string().required('Tên sản phẩm không được bỏ trống!'),
  code: yup.string().required('Mã sản phẩm không được bỏ trống!'),
  type: yup.string().required('Loại sản phẩm không được bỏ trống!'),
  price: yup.number().required('Giá bán ra không được bỏ trống!')
});

export const PromotionValidation = yup.object({
  title: yup.string().required('Tiêu đề không được bỏ trống!'),
  code: yup.string().required('Mã khuyến mãi không được bỏ trống!'),
  amount: yup.number().required('Giá trị khuyến mãi không được bỏ trống!'),
  amountType: yup.number().required('Loại giá trị không được bỏ trống!'),
  start: yup.date().required('Ngày bắt đầu không được bỏ trống!'),
  end: yup.date().required('Ngày kết thúc không được bỏ trống!')
});

export const ReceiptValidation = yup.object({
  product: yup.string().required('Sản phẩm không được bỏ trống!'),
  type: yup.string().required('Loại phiếu không được bỏ trống!')
});

export const PaymentValidation = yup.object({
  type: yup.string().required('Hình thức thanh toán không được bỏ trống!'),
  name: yup.string().required('Tên người nhận không được bỏ trống!'),
  phone: yup.string().matches(REGEX.C_PHONE, 'Số điện thoại không đúng định dạng!').required('Số điện thoại không được bỏ trống!'),
  city: yup.string().required('Tỉnh / Thành phố không được bỏ trống!'),
  district: yup.string().required('Quận / Huyện không được bỏ trống!'),
  ward: yup.string().required('Phường / Xã không được bỏ trống!')
});

export const NewsValidation = yup.object({
  title: yup.string().required('Tiêu đề không được bỏ trống!'),
  content: yup.string().required('Nội dung không được bỏ trống!'),
  time: yup.number().required('Thời gian đọc không được bỏ trống!')
});
