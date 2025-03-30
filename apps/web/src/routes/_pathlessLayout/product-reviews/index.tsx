import { convexQuery } from '@convex-dev/react-query';
import { createFileRoute } from '@tanstack/react-router';
import { api } from '~/convex/_generated/api';
import { ProductReviewsListPage } from '~/features/product-reviews';

// TODO: Add loaders for data fetching (e.g., prefetch reviews)
// import { queryOptions } from '@tanstack/react-query';
// import { fetchProductReviews } from '~/features/product-reviews/api'; 

// export const productReviewsQueryOptions = queryOptions({
//   queryKey: ['productReviews', 'list'], 
//   queryFn: () => fetchProductReviews(), // Replace with your actual fetch function
// })

export const Route = createFileRoute('/_pathlessLayout/product-reviews/')({
  // TODO: Add loader for pre-fetching data if needed
  // loader: ({ context: { queryClient } }) => 
  //   queryClient.ensureQueryData(productReviewsQueryOptions),
  component: ProductReviewsListPage,
  head: () => {
    return {
      meta: [
        {
          name: 'robots',
          content: 'noindex',
        },
      ],
    }
  },
  loader: async (opts) => {
    const products = await opts.context.queryClient.ensureQueryData(convexQuery(api.products.listForCards, { paginationOpts: { numItems: 9, cursor: null } }));
    return products;
  },
  // TODO: Add pending/error components
  // pendingComponent: () => <div>Loading reviews...</div>,
  // errorComponent: ({ error }) => <div>Error loading reviews: {error.message}</div>,
});
