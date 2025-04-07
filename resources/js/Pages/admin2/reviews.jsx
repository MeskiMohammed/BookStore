import AdminLayout from '@/Layouts/AdminLayout';
import { ReviewsPage } from '@/components/reviews/reviews-page';

export default function App(props) {
  return (
      <AdminLayout>
        <ReviewsPage />
      </AdminLayout>
  );
}
