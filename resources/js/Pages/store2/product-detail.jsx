import StoreLayout from '../../Layouts/StoreLayout';
import { BrowserRouter } from 'react-router-dom';
import ProductDetailPage from '../../Components/store/product-detail-page';
// import AdminLayout from '../../../Components/admin/admin-layout';

export default function App(props) {
  return (
    <BrowserRouter>
      <StoreLayout>
        <ProductDetailPage/>
      </StoreLayout>
    </BrowserRouter>
  );
}
