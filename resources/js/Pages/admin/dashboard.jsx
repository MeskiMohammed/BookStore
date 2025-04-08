import AdminLayout from '@/Layouts/AdminLayout';
import AdminDashboard from '@/components/admin/admin-dashboard';

export default function App(props) {
  return (
      <AdminLayout>
        <AdminDashboard />
      </AdminLayout>
  );
}
