import AdminLayout from '@/Layouts/AdminLayout';
import { UsersPage } from '@/components/users/users-page';

export default function App(props) {
  return (
      <AdminLayout>
        <UsersPage />
      </AdminLayout>
  );
}
