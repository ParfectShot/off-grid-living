import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react';
import { LoadingGuideCard } from '~/features/guides';

export const Route = createFileRoute('/dashboard/guides/')({
  component: GuidesPage,
})



function GuidesPage() {
  const [isLoading, setIsLoading] = useState(false);
  
  return (
    <div className="container mx-auto py-6">
      <h1 className="text-2xl font-bold mb-6">Guides</h1>
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <LoadingGuideCard key={i} />
          ))}
        </div>
      ) : (
        <div>
          {/* Guides content will go here */}
          <p>Guides management coming soon</p>
        </div>
      )}
    </div>
  );
}
