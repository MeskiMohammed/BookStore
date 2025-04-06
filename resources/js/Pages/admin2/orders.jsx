import AdminLayout from '../../Layouts/AdminLayout';
import { BrowserRouter } from 'react-router-dom';
import { OrdersPage } from '../../Components/orders/orders-page';
// import AdminLayout from '../../../Components/admin/admin-layout';

export default function App(props) {
  return (
    <BrowserRouter>
      <AdminLayout>
        <OrdersPage/>
      </AdminLayout>
    </BrowserRouter>
  );
}
