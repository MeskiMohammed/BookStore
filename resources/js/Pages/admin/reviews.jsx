import AdminLayout from '@/Layouts/AdminLayout';
import { ReviewsPage } from '@/components/reviews/reviews-page';

export default function Reviews({ initialReviews, users, books }) {
  return (
    <AdminLayout>
      <ReviewsPage initialReviews={initialReviews} users={users} books={books} />
    </AdminLayout>
  );
}
