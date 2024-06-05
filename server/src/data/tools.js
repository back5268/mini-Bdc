export const tools = [
  {
    name: 'Dashboard',
    sort: 1,
    icon: 'Squares2X2Icon',
    children: [{ name: 'Dashboard', route: '/', sort: 1, actions: ['read'] }]
  },
  {
    name: 'Phân quyền',
    sort: 2,
    icon: 'ChartBarIcon',
    children: [
      { name: 'Quyền hiện có', route: '/tools', sort: 1, actions: ['update', 'read'] },
      { name: 'Phân quyền', route: '/permissions', sort: 2, actions: ['delete', 'create', 'update', 'read'] }
    ]
  },
  {
    name: 'Công ty',
    sort: 3,
    icon: 'BuildingOffice2Icon',
    children: [
      { name: 'Quản lý phòng ban', route: '/departments', sort: 1, actions: ['delete', 'create', 'update', 'read'] },
      { name: 'Quản lý nhân sự', route: '/users', sort: 2, actions: ['delete', 'create', 'update', 'read'] },
      { name: 'Quản lý dự án', route: '/projects', sort: 3, actions: ['delete', 'create', 'update', 'read'] }
    ]
  },
  {
    name: 'Tổng quan dự án',
    sort: 4,
    icon: 'ServerIcon',
    children: [
      { name: 'Tông tin dự án', route: '/project-info', sort: 1, actions: ['read'] },
      { name: 'Thông tin liên hệ', route: '/project-contact', sort: 2, actions: ['read'] }
    ]
  },
  {
    name: 'Căn hộ - Cư dân',
    sort: 5,
    icon: 'UsersIcon',
    children: [
      { name: 'Quản lý căn hộ', route: '/apartments', sort: 1, actions: ['delete', 'create', 'update', 'read'] },
      { name: 'Quản lý cư dân', route: '/residents', sort: 2, actions: ['delete', 'create', 'update', 'read'] },
      { name: 'Quản lý thẻ', route: '/card', sort: 3, actions: ['delete', 'create', 'update', 'read'] }
    ]
  },
  {
    name: 'Ý kiến cư dân',
    sort: 6,
    icon: 'UsersIcon',
    children: [
      { name: 'Ý kiến cư dân', route: '/options', sort: 1, actions: ['delete', 'create', 'update', 'read'] },
      { name: 'Yêu cầu dịch vụ', route: '/requests', sort: 2, actions: ['delete', 'create', 'update', 'read'] }
    ]
  },
  {
    name: 'Cấu hình',
    sort: 7,
    icon: 'Cog6ToothIcon',
    children: [
      { name: 'Cấu hình mẫu thông báo', route: '/templates', sort: 1, actions: ['delete', 'create', 'update', 'read'] },
      { name: 'Quản lý tin tức', route: '/news', sort: 2, actions: ['delete', 'create', 'update', 'read'] },
      { name: 'Lịch sử gửi email', route: '/email-log', sort: 3, actions: ['read'] }
    ]
  },
  {
    name: 'Kế toán',
    sort: 8,
    icon: 'CalculatorIcon',
    children: [
      { name: 'Quản lý bảng giá', route: '/prices', sort: 1, actions: ['delete', 'create', 'update', 'read'] },
      { name: 'Quản lý dịch vụ', route: '/services', sort: 2, actions: ['delete', 'create', 'update', 'read'] },
      { name: 'Quản lý phương tiện', route: '/vehicles', sort: 3, actions: ['delete', 'create', 'update', 'read'] },
      { name: 'Chỉ số điện nước', route: '/electric-waters', sort: 4, actions: ['delete', 'create', 'update', 'read'] },
      { name: 'Tính toán công nợ', route: '/debts', sort: 5, actions: ['delete', 'create', 'update', 'read'] },
      { name: 'Danh sách duyệt số liệu', route: '/data-browses', sort: 6, actions: ['update', 'read'] },
      { name: 'Danh sách gửi thông báo', route: '/notifications', sort: 7, actions: ['update', 'read'] },
      { name: 'Danh sách bảng kê', route: '/bills', sort: 8, actions: ['update', 'read'] },
      { name: 'Quản lý phiếu thu', route: '/receipts', sort: 9, actions: ['delete', 'create', 'update', 'read'] }
    ]
  },
  {
    name: 'Quản lý công nợ',
    sort: 9,
    icon: 'ComputerDesktopIcon',
    children: [
      { name: 'Bảng kê khách hàng', route: '/customer-bills', sort: 1, actions: ['update', 'read'] },
      { name: 'Bảng kê dịch vụ', route: '/service-bills', sort: 2, actions: ['update', 'read'] },
      { name: 'Tổng hợp công nợ', route: '/debits', sort: 3, actions: ['update', 'read'] },
      { name: 'Tổng hợp chi tiết', route: '/debit-details', sort: 4, actions: ['update', 'read'] },
      { name: 'Quản lý tiền thừa', route: '/coins', sort: 5, actions: ['update', 'read'] }
    ]
  }
];
