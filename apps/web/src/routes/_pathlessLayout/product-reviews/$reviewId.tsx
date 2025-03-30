import { createFileRoute, useParams } from '@tanstack/react-router';
import { ProductReviewDetailsPage } from '~/features/product-reviews';

// TODO: Add loaders for data fetching (e.g., prefetch review details)
// import { queryOptions } from '@tanstack/react-query';
// import { fetchProductReviewById } from '~/features/product-reviews/api'; 

// export const productReviewQueryOptions = (reviewId: string) => queryOptions({
//   queryKey: ['productReviews', 'detail', reviewId],
//   queryFn: () => fetchProductReviewById(reviewId), // Replace with your actual fetch function
// });

export const Route = createFileRoute('/_pathlessLayout/product-reviews/$reviewId')({
  // TODO: Add loader for pre-fetching data if needed
  // loader: ({ params: { reviewId }, context: { queryClient } }) => 
  //   queryClient.ensureQueryData(productReviewQueryOptions(reviewId)),
  component: ProductReviewDetailsPage, 
  head: () => {
    return {
      meta: [
        {
          name: 'robots',
          content: 'noindex',
        },
      ],
    }
  }
  // TODO: Add pending/error components
  // pendingComponent: () => <div>Loading review details...</div>,
  // errorComponent: ({ error }) => <div>Error loading review: {error.message}</div>,
});
