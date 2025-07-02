
import React from 'react';
import { ALL_EBOOKS } from '../constants';
import { EbookCard } from './EbookCard';

export const FeaturedEbooks: React.FC = () => {
  // Get a few ebooks to feature, e.g., the first 4
  const featured = ALL_EBOOKS.slice(0, 4);

  return (
    <div>
      <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">Featured Ebooks</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {featured.map(ebook => (
          <EbookCard key={ebook.id} ebook={ebook} />
        ))}
      </div>
    </div>
  );
};
