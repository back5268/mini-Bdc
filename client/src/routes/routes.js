import {
  Bills,
  Calculator,
  DataBrowses,
  DetailPrice,
  DetailService,
  DetailVehicle,
  ElectricWater,
  Notifications,
  Prices,
  PrintBill,
  Receipts,
  Services,
  Vehicles
} from '@view/admin/accountants';
import { Apartment, ApartmentGroup, DetailApartment, DetailApartmentGroup, DetailResident, Residents } from '@view/admin/apartments';
import { Departments, DetailProject, Projects, Users } from '@view/admin/companies';
import { Templates } from '@view/admin/configs';
import { Project, Report } from '@view/admin/dashboard';
import { Coins, Debits, Debts } from '@view/admin/debts';
import { DetailPermission, Permissions, Tools } from '@view/admin/permissions';
import { Logs, News, Options } from '@view/admin/residents';
import { ForgotPassword, SignIn } from '@view/auth';

const routes = [
  { path: '/auth/signin', element: SignIn, public: true },
  { path: '/auth/forgot-password', element: ForgotPassword, public: true },

  { path: '/', element: Report, layout: true },
  { path: '/project-info', element: Project, layout: true },

  // ==================== Phân quền ====================
  { path: '/permissions', element: Permissions, layout: true },
  { path: '/permissions/create', element: DetailPermission, layout: true },
  { path: '/permissions/detail/:_id', element: DetailPermission, layout: true },
  { path: '/tools', element: Tools, layout: true },

  // ==================== Công ty ====================
  { path: '/users', element: Users, layout: true },
  { path: '/departments', element: Departments, layout: true },
  { path: '/projects', element: Projects, layout: true },
  { path: '/projects/create', element: DetailProject, layout: true },
  { path: '/projects/detail/:_id', element: DetailProject, layout: true },

  // ==================== Cấu hình ====================
  { path: '/templates', element: Templates, layout: true },

  // ==================== Kế toán ====================
  { path: '/prices', element: Prices, layout: true },
  { path: '/prices/create', element: DetailPrice, layout: true },
  { path: '/prices/detail/:_id', element: DetailPrice, layout: true },

  { path: '/services', element: Services, layout: true },
  { path: '/services/create', element: DetailService, layout: true },
  { path: '/services/detail/:_id', element: DetailService, layout: true },

  { path: '/vehicles', element: Vehicles, layout: true },
  { path: '/vehicles/create', element: DetailVehicle, layout: true },
  { path: '/vehicles/detail/:_id', element: DetailVehicle, layout: true },

  { path: '/electric-waters', element: ElectricWater, layout: true },
  { path: '/calculator', element: Calculator, layout: true },

  { path: '/bills', element: Bills, layout: true },
  { path: '/data-browses', element: DataBrowses, layout: true },
  { path: '/notifications', element: Notifications, layout: true },
  { path: '/print/:_id', element: PrintBill },

  { path: '/receipts', element: Receipts, layout: true },

  // ==================== Căn hộ ====================
  { path: '/apartment-groups', element: ApartmentGroup, layout: true },
  { path: '/apartment-groups/create', element: DetailApartmentGroup, layout: true },
  { path: '/apartment-groups/detail/:_id', element: DetailApartmentGroup, layout: true },

  { path: '/apartments', element: Apartment, layout: true },
  { path: '/apartments/create', element: DetailApartment, layout: true },
  { path: '/apartments/detail/:_id', element: DetailApartment, layout: true },

  { path: '/residents', element: Residents, layout: true },
  { path: '/residents/create', element: DetailResident, layout: true },
  { path: '/residents/detail/:_id', element: DetailResident, layout: true },

  // ==================== Cư dân ====================
  { path: '/options', element: Options, layout: true },
  { path: '/news', element: News, layout: true },
  { path: '/logs', element: Logs, layout: true },

  // ==================== Công nợ ====================
  { path: '/debits', element: Debits, layout: true },
  { path: '/debts', element: Debts, layout: true },
  { path: '/coins', element: Coins, layout: true },
];

export default routes;
