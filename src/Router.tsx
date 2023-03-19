import { Navigate } from 'react-router';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import OrderListPage from './pages/OrderListPage';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/orderList" replace={true} />} />
        <Route path="/orderList" element={<OrderListPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
