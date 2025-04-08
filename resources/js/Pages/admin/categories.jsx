import AdminLayout from '@/Layouts/AdminLayout';
import { CategoriesPage } from '@/components/categories/categories-page';

export default function App(props) {
  return (
      <AdminLayout>
        <CategoriesPage />
      </AdminLayout>
  );
}
