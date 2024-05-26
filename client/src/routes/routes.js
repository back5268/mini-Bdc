import { Dashboard } from '@view/admin';
import { DetailPermission, Permissions, Tools } from '@view/admin/permissions';
import { Departments, DetailProject, Projects, Users } from '@view/admin/companies';
import { ForgotPassword, SignIn } from '@view/auth';
import { DetailPrice, DetailService, DetailVehicle, ElectricWater, Prices, Services, Vehicles } from '@view/admin/accountants';

const routes = [
  { path: '/auth/signin', element: SignIn, public: true },
  { path: '/auth/forgot-password', element: ForgotPassword, public: true },

  { path: '/', element: Dashboard, layout: true },

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
];

export default routes;
