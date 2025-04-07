import StoreLayout from '@/Layouts/StoreLayout';
import CheckoutPage from '@/components/store/checkout-page';

export default function App(props) {
  return (
    <StoreLayout>
      <CheckoutPage />
    </StoreLayout>
  );
}
