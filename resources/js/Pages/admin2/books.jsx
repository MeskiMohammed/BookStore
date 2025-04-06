import AdminLayout from '../../Layouts/AdminLayout';
import { BrowserRouter } from 'react-router-dom';
import {BooksPage} from '../../Components/books/books-page';
// import AdminLayout from '../../../Components/admin/admin-layout';

export default function App(props) {
  return (
    <BrowserRouter>
      <AdminLayout>
        <BooksPage/>
      </AdminLayout>
    </BrowserRouter>
  );
}
