import AdminLayout from '@/Layouts/AdminLayout';
import { BooksPage } from '@/components/books/books-page';

export default function Books({ initialBooks, categories }) {
  return (
    <AdminLayout>
      <BooksPage initialBooks={initialBooks} categories={categories} />
    </AdminLayout>
  );
}
