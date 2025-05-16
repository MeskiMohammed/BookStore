import AdminLayout from '@/Layouts/AdminLayout';
import { CategoriesPage } from '@/components/categories/categories-page';

export default function Categories({ initialCategories }) {
  return (
      <AdminLayout>
      <CategoriesPage initialCategories={initialCategories} />
      </AdminLayout>
  );
}
