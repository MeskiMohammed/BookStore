import StoreLayout from '@/Layouts/StoreLayout';
import CartPage from '@/components/store/cart-page';

export default function App(props) {
  return (
    <StoreLayout>
      <CartPage />
    </StoreLayout>
  );
}
