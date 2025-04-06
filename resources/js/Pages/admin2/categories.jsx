import AdminLayout from '../../Layouts/AdminLayout';
import { BrowserRouter } from 'react-router-dom';
import {CategoriesPage} from '../../Components/categories/categories-page';
// import AdminLayout from '../../../Components/admin/admin-layout';

export default function App(props) {
  return (
    <BrowserRouter>
      <AdminLayout>
        <CategoriesPage/>
      </AdminLayout>
    </BrowserRouter>
  );
}
