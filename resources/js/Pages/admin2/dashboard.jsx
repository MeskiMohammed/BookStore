import AdminLayout from '../../Layouts/AdminLayout';
import { BrowserRouter } from 'react-router-dom';
import AdminDashboard from '../../Components/admin/admin-dashboard';
// import AdminLayout from '../../../Components/admin/admin-layout';

export default function App(props) {
  return (
    <BrowserRouter>
      <AdminLayout>
        <AdminDashboard/>
      </AdminLayout>
    </BrowserRouter>
  );
}
