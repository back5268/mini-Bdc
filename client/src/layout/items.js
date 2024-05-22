import { Squares2X2Icon, AcademicCapIcon, PresentationChartBarIcon, UsersIcon, CircleStackIcon, Cog6ToothIcon, PaperAirplaneIcon } from '@heroicons/react/24/outline';

const icons = {
  Squares2X2Icon,
  AcademicCapIcon,
  PresentationChartBarIcon,
  UsersIcon,
  CircleStackIcon,
  Cog6ToothIcon,
  PaperAirplaneIcon
};

export const items = [
  { label: 'Dashboard', icon: icons.Squares2X2Icon, type: 'item', route: '' },
  { label: 'Phân quyền', icon: icons.AcademicCapIcon, type: 'item', route: '/permissions' },
  {
    label: 'Quản lý người dùng',
    icon: icons.UsersIcon,
    type: 'group',
    items: [
      { label: 'Quản lý nhân viên', type: 'item', route: '/personnel' },
      { label: 'Quản lý khách hàng', type: 'item', route: '/customers' }
    ]
  },
  {
    label: 'Quản lý kho',
    icon: icons.CircleStackIcon,
    type: 'group',
    items: [
      { label: 'Quản lý sản phẩm', type: 'item', route: '/products' },
      { label: 'Quản lý khuyến mãi', type: 'item', route: '/promotions' }
    ]
  },
  {
    label: 'Giao dịch',
    icon: icons.PresentationChartBarIcon,
    type: 'group',
    items: [
      { label: 'Quản lý giỏ hàng', type: 'item', route: '/carts' },
      { label: 'Quản lý đơn hàng', type: 'item', route: '/orders' },
      { label: 'Lịch sử giao dịch', type: 'item', route: '/transactions' }
    ]
  },
  {
    label: 'Cấu hình',
    icon: icons.Cog6ToothIcon,
    type: 'group',
    items: [
      { label: 'Tin tức', type: 'item', route: '/news' },
      { label: 'Cấu hình mẫu thông báo', type: 'item', route: '/templates' },
      { label: 'Lịch sử thông báo', type: 'item', route: '/logs' },
    ]
  },
  // {
  //   label: 'Phản hồi người dùng',
  //   icon: icons.PaperAirplaneIcon,
  //   type: 'group',
  //   items: [
  //     { label: 'Đánh giá sản phẩm', type: 'item', route: '/evaluates' },
  //     { label: 'Phản hồi người dùng', type: 'item', route: '/feedbacks' }
  //   ]
  // }
];
