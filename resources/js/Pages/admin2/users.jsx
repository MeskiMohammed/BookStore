import AdminLayout from '../../Layouts/AdminLayout';
import { BrowserRouter } from 'react-router-dom';
import {UsersPage} from '../../Components/users/users-page';
// import AdminLayout from '../../../Components/admin/admin-layout';

export default function App(props) {
  return (
    <BrowserRouter>
      <AdminLayout>
        <UsersPage/>
      </AdminLayout>
    </BrowserRouter>
  );
}
