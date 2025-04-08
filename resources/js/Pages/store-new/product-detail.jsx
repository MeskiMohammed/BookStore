import StoreLayout from '@/Layouts/StoreLayout';
import ProductDetailPage from '@/components/store/product-detail-page';

export default function App(props) {
  return (
    <StoreLayout>
      <ProductDetailPage />
    </StoreLayout>
  );
}
