import AdminLayout from '@/Layouts/AdminLayout';
import { OrderDetailsPage } from '@/components/order-details/order-details-page';

export default function App(props) {
  return (
      <AdminLayout>
        <OrderDetailsPage />
      </AdminLayout>
  );
}
