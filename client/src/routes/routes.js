import { Dashboard, DetailPermission, Permissions } from '@view/admin';
import { Personnel } from '@view/admin/users';
import { ForgotPassword, SignIn, SignUp } from '@view/auth';

const routes = [
  { path: '/auth/signin', element: SignIn, public: true },
  { path: '/auth/signup', element: SignUp, public: true },
  { path: '/auth/forgot-password', element: ForgotPassword, public: true },

  { path: '/admin', element: Dashboard, layout: true },
  { path: '/admin/personnel', element: Personnel, layout: true },
  { path: '/admin/permissions', element: Permissions, layout: 'admin' },
  { path: '/admin/permissions/create', element: DetailPermission, layout: 'admin' },
  { path: '/admin/permissions/detail/:_id', element: DetailPermission, layout: 'admin' },
];

export default routes;
