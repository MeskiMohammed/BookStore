import AdminLayout from '@/Layouts/AdminLayout';
import { OrdersPage } from '@/components/orders/orders-page';

export default function App(props) {
  return (
      <AdminLayout>
        <OrdersPage />
      </AdminLayout>
  );
}
