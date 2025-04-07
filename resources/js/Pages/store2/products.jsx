import StoreLayout from '@/Layouts/StoreLayout';
import ProductsPage from '@/components/store/products-page';

export default function App(props) {
  return (
      <StoreLayout>
        <ProductsPage />
      </StoreLayout>
  );
}
