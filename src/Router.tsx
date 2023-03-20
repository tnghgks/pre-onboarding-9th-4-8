import { lazy, Suspense } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Layout from '@/components/Layout';
import LoadingFallback from './components/LoadingFallback';

const AdminPage = lazy(() => import('@/pages/AdminPage'));

const Router = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route
          path="/admin/order"
          element={
            <Suspense fallback={<LoadingFallback />}>
              <AdminPage />
            </Suspense>
          }
        />
        <Route
          path="/*"
          element={<Navigate to="/admin/order" replace={true} />}
        />
      </Route>
    </Routes>
  );
};

export default Router;
