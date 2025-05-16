import AdminLayout from '@/Layouts/AdminLayout';
import { UsersPage } from '@/components/users/users-page';

export default function Users({ initialUsers }) {
  return (
    <AdminLayout>
      <UsersPage initialUsers={initialUsers} />
    </AdminLayout>
  );
}
