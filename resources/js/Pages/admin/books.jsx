import AdminLayout from '@/Layouts/AdminLayout';
import { BooksPage } from '@/components/books/books-page';

export default function App({ initialBooks }) {
  return (
    <AdminLayout>
      <BooksPage initialBooks={initialBooks} />
    </AdminLayout>
  );
}
