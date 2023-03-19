import { lazy, Suspense } from 'react';
import { Navigate } from 'react-router';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Loader from '@/components/common/Loader';

const OrderListPage = lazy(() => import('./pages/OrderListPage'));

const Router = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route
            path="/"
            element={<Navigate to="/orderList" replace={true} />}
          />
          <Route path="/orderList" element={<OrderListPage />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default Router;
