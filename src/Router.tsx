import { Navigate, Route, Routes } from 'react-router-dom';
import OrderListPage from '@/pages/OrderListPage';

const Router = () => {
  return (
    <Routes>
      <Route path="/order" element={<OrderListPage />} />
      <Route path="/*" element={<Navigate to="/order" replace={true} />} />
    </Routes>
  );
};

export default Router;
