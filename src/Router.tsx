import { Navigate, Route, Routes } from 'react-router-dom';
import OrderListPage from '@/pages/OrderListPage';
import Layout from '@/components/Layout';

const Router = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/order" element={<OrderListPage />} />
        <Route path="/*" element={<Navigate to="/order" replace={true} />} />
      </Route>
    </Routes>
  );
};

export default Router;
