import AdminLayout from '../../Layouts/AdminLayout';
import { BrowserRouter } from 'react-router-dom';
import {ReviewsPage} from '../../Components/reviews/reviews-page';
// import AdminLayout from '../../../Components/admin/admin-layout';

export default function App(props) {
  return (
    <BrowserRouter>
      <AdminLayout>
        <ReviewsPage/>
      </AdminLayout>
    </BrowserRouter>
  );
}
