import StoreLayout from '../../Layouts/StoreLayout';
import { BrowserRouter } from 'react-router-dom';
import HomePage from '../../Components/store/home-page';
// import AdminLayout from '../../../Components/admin/admin-layout';

export default function App(props) {
  return (
    <BrowserRouter>
      <StoreLayout>
        <HomePage/>
      </StoreLayout>
    </BrowserRouter>
  );
}
