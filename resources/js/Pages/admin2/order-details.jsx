import AdminLayout from '../../Layouts/AdminLayout';
import { BrowserRouter } from 'react-router-dom';
import { OrderDetailsPage } from '../../Components/order-details/order-details-page';
// import AdminLayout from '../../../Components/admin/admin-layout';

export default function App(props) {
  return (
    <BrowserRouter>
      <AdminLayout>
        <OrderDetailsPage/>
      </AdminLayout>
    </BrowserRouter>
  );
}
