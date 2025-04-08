import AdminLayout from '@/Layouts/AdminLayout';
import { BooksPage } from '@/components/books/books-page';

export default function App(props) {
  return (
      <AdminLayout>
        <BooksPage />
      </AdminLayout>
  );
}
