import { REGEX } from '@constant';
import * as yup from 'yup';

export const UserValidation = yup.object({
  email: yup.string().email('Email không đúng định dạng!').required('Email không được bỏ trống!'),
  username: yup.string().required('Tài khoản không được bỏ trống!'),
  name: yup.string().required('Họ tên không được bỏ trống!'),
  code: yup.string().required('Mã nhân viên không được bỏ trống!')
});

export const PermissionValidation = yup.object({
  name: yup.string().required('Tên nhóm quyền không được bỏ trống!')
});

export const LessonValidation = yup.object({
  courseId: yup.string().required('Khóa học không được bỏ trống!'),
  title: yup.string().required('Tiêu đề không được bỏ trống!'),
  code: yup.string().required('Tiêu đề không được bỏ trống!'),
  author: yup.string().required('Tác giả không được bỏ trống!')
});

export const QuestionValidation = yup.object({
  lessonId: yup.string().required('Bài giảng không được bỏ trống!'),
  content: yup.string().required('Câu hỏi không được bỏ trống!'),
  answer: yup.string().required('Câu trả lời không được bỏ trống!')
});

export const PostValidation = yup.object({
  title: yup.string().required('Tiêu đề không được bỏ trống!')
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
  ward: yup.string().required('Phường / Xã không được bỏ trống!'),
});

export const NewsValidation = yup.object({
  title: yup.string().required('Tiêu đề không được bỏ trống!'),
  content: yup.string().required('Nội dung không được bỏ trống!'),
  time: yup.number().required('Thời gian đọc không được bỏ trống!'),
});
