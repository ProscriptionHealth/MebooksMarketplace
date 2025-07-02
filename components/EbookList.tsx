
import React from 'react';
import { Ebook, GeminiSearchResponse } from '../types';
import { EbookCard } from './EbookCard';
import { SparklesIcon } from './icons/SparklesIcon';
import { CollectionIcon } from './icons/CollectionIcon';

interface EbookListProps {
  ebooks: Ebook[];
  geminiResponse: GeminiSearchResponse | null;
}

export const EbookList: React.FC<EbookListProps> = ({ ebooks, geminiResponse }) => {
  if (ebooks.length === 0) {
    return (
      <div className="text-center py-16">
        <p className="text-lg text-text-secondary">No ebooks found for your query.</p>
        <p className="text-text-muted mt-2">Try a different search to find what you're looking for.</p>
      </div>
    );
  }

  return (
    <div className="animate-fade-in">
        {geminiResponse && (
            <div className="mb-12 p-6 bg-neural-secondary rounded-lg border border-ai-purple/30">
                <div className="flex items-start gap-4">
                    {geminiResponse.is_bundle_suggestion ? <CollectionIcon className="w-8 h-8 text-ai-purple flex-shrink-0 mt-1"/> : <SparklesIcon className="w-8 h-8 text-ai-amber flex-shrink-0 mt-1"/>}
                    <div>
                        {geminiResponse.is_bundle_suggestion && geminiResponse.bundle_name && (
                            <h3 className="text-lg font-bold text-ai-purple">Bundle Suggestion: {geminiResponse.bundle_name}</h3>
                        )}
                        <p className="text-xl font-semibold text-text-primary">{geminiResponse.search_summary}</p>
                        <p className="text-text-muted mt-1">Here are some recommended resources to get you started:</p>
                    </div>
                </div>
            </div>
        )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {ebooks.map((ebook) => (
          <EbookCard key={ebook.id} ebook={ebook} />
        ))}
      </div>
    </div>
  );
};
