export const tools = [
  {
    name: 'Công ty',
    sort: 1,
    icon: 'BuildingOffice2Icon',
    children: [
      { name: 'Quản lý phòng ban', route: '/departments', sort: 1, actions: ['delete', 'create', 'update', 'read'] },
      { name: 'Quản lý nhân sự', route: '/users', sort: 2, actions: ['delete', 'create', 'update', 'read'] },
      { name: 'Quản lý dự án', route: '/projects', sort: 3, actions: ['delete', 'create', 'update', 'read'] }
    ]
  },
  {
    name: 'Cấu hình',
    sort: 2,
    icon: 'Cog6ToothIcon',
    children: [
      { name: 'Quyền hiện có', route: '/tools', sort: 1, actions: ['update', 'read'] },
      { name: 'Phân quyền', route: '/permissions', sort: 2, actions: ['delete', 'create', 'update', 'read'] },
      { name: 'Cấu hình mẫu thông báo', route: '/templates', sort: 3, actions: ['delete', 'create', 'update', 'read'] }
    ]
  },
  {
    name: 'Dashboard',
    sort: 3,
    icon: 'Squares2X2Icon',
    children: [
      { name: 'Báo cáo tổng hợp', route: '/', sort: 1, actions: ['read'] },
      { name: 'Tổng quan dự án', route: '/project-info', sort: 2, actions: ['read'] }
    ]
  },
  {
    name: 'Căn hộ',
    sort: 4,
    icon: 'ChartBarIcon',
    children: [
      { name: 'Quản lý nhóm căn hộ', route: '/apartment-groups', sort: 1, actions: ['delete', 'create', 'update', 'read'] },
      { name: 'Quản lý căn hộ', route: '/apartments', sort: 2, actions: ['delete', 'create', 'update', 'read'] },
      { name: 'Quản lý cư dân', route: '/residents', sort: 3, actions: ['delete', 'create', 'update', 'read'] },
      { name: 'Quản lý phương tiện', route: '/vehicles', sort: 4, actions: ['delete', 'create', 'update', 'read'] },
      { name: 'Chỉ số điện nước', route: '/electric-waters', sort: 5, actions: ['delete', 'create', 'update', 'read'] }
    ]
  },
  {
    name: 'Cư dân',
    sort: 5,
    icon: 'UsersIcon',
    children: [
      { name: 'Ý kiến cư dân', route: '/options', sort: 1, actions: ['delete', 'create', 'update', 'read'] },
      { name: 'Quản lý tin tức', route: '/news', sort: 2, actions: ['delete', 'create', 'update', 'read'] },
      { name: 'Lịch sử gửi email', route: '/logs', sort: 3, actions: ['read'] }
    ]
  },
  {
    name: 'Kế toán',
    sort: 6,
    icon: 'CalculatorIcon',
    children: [
      { name: 'Quản lý dịch vụ', route: '/services', sort: 1, actions: ['delete', 'create', 'update', 'read'] },
      { name: 'Tính toán công nợ', route: '/calculator', sort: 2, actions: ['delete', 'create', 'update', 'read'] },
      { name: 'Danh sách duyệt số liệu', route: '/data-browses', sort: 3, actions: ['update', 'read'] },
      { name: 'Danh sách gửi thông báo', route: '/notifications', sort: 4, actions: ['update', 'read'] }
    ]
  },
  {
    name: 'Quản lý công nợ',
    sort: 7,
    icon: 'ComputerDesktopIcon',
    children: [
      { name: 'Quản lý phiếu thu', route: '/receipts', sort: 1, actions: ['delete', 'create', 'update', 'read'] },
      { name: 'Danh sách bảng kê', route: '/bills', sort: 2, actions: ['update', 'read'] },
      { name: 'Bảng kê dịch vụ', route: '/debits', sort: 3, actions: ['update', 'read'] },
      { name: 'Tổng hợp công nợ', route: '/debts', sort: 4, actions: ['update', 'read'] },
      { name: 'Quản lý tiền thừa', route: '/coins', sort: 5, actions: ['update', 'read'] }
    ]
  }
];
