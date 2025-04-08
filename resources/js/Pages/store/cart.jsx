import StoreLayout from '@/Layout/store/app';
import CartPage from '@/components/store/cart-page';

export default function App(props) {
  return (
    <StoreLayout>
      <CartPage />
    </StoreLayout>
  );
}
