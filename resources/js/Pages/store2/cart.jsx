import StoreLayout from '../../Layouts/StoreLayout';
import { BrowserRouter } from 'react-router-dom';
import CartPage from '../../Components/store/cart-page';
// import AdminLayout from '../../../Components/admin/admin-layout';

export default function App(props) {
  return (
    <BrowserRouter>
      <StoreLayout>
        <CartPage/>
      </StoreLayout>
    </BrowserRouter>
  );
}
