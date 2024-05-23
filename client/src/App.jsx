import { AuthProvider, ConfirmDialog, LazyLoading, NavigationScroll, Toastify } from './components/base';
import Routes from './routes';
import { ScrollToTop } from '@layout/shared';

const App = () => {
  return (
    <AuthProvider>
      <ConfirmDialog />
      <Toastify />
      <LazyLoading />
      <ScrollToTop />
      <NavigationScroll>
        <Routes />
      </NavigationScroll>
    </AuthProvider>
  );
};

export default App;
