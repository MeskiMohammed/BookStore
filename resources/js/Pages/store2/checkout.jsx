import StoreLayout from '../../Layouts/StoreLayout';
import { BrowserRouter } from 'react-router-dom';
import CheckoutPage from '../../Components/store/checkout-page';
// import AdminLayout from '../../../Components/admin/admin-layout';

export default function App(props) {
  return (
    <BrowserRouter>
      <StoreLayout>
        <CheckoutPage/>
      </StoreLayout>
    </BrowserRouter>
  );
}
