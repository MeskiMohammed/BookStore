import StoreLayout from '../../Layouts/StoreLayout';
import { BrowserRouter } from 'react-router-dom';
import ProductsPage from '../../Components/store/products-page';
// import AdminLayout from '../../../Components/admin/admin-layout';

export default function App(props) {
  return (
    <BrowserRouter>
      <StoreLayout>
        <ProductsPage/>
      </StoreLayout>
    </BrowserRouter>
  );
}
