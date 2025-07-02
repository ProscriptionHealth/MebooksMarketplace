
import React from 'react';
import { Ebook, ComplexityRating } from '../types';

interface EbookCardProps {
  ebook: Ebook;
}

const complexityColors: Record<ComplexityRating, string> = {
  [ComplexityRating.Beginner]: 'bg-green-500/10 text-green-400 border-green-500/20',
  [ComplexityRating.Intermediate]: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  [ComplexityRating.Advanced]: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
  [ComplexityRating.Research]: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
};

export const EbookCard: React.FC<EbookCardProps> = ({ ebook }) => {
  return (
    <div className="bg-neural-secondary rounded-lg overflow-hidden flex flex-col group border border-transparent hover:border-ai-purple transition-all duration-300 transform hover:-translate-y-1">
      <div className="relative">
        <img src={ebook.coverUrl} alt={`Cover for ${ebook.title}`} className="w-full h-64 object-cover" />
         <div className="absolute top-0 right-0 m-2">
          <span className={`text-xs font-semibold px-2 py-1 rounded-full border ${complexityColors[ebook.complexity]}`}>
            {ebook.complexity.charAt(0).toUpperCase() + ebook.complexity.slice(1)}
          </span>
        </div>
      </div>
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-lg font-bold text-text-primary group-hover:text-ai-teal transition-colors">{ebook.title}</h3>
        <p className="text-sm text-text-muted mt-1">by {ebook.author}</p>
        <p className="text-sm text-text-secondary mt-2 flex-grow">{ebook.description}</p>
        <div className="mt-4 flex items-center justify-between">
          <p className="text-xl font-bold text-ai-teal">${(ebook.price / 100).toFixed(2)}</p>
          <button className="bg-ai-purple text-white text-sm font-semibold py-2 px-4 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform group-hover:scale-100 scale-95">
            View Details
          </button>
        </div>
      </div>
    </div>
  );
};