import { Ebook, GeminiSearchResponse } from '../types';
import { EbookCard } from './EbookCard';
import { CollectionIcon } from './icons/CollectionIcon';

interface EbookListProps {
  ebooks: Ebook[];
  geminiResponse: GeminiSearchResponse | null;
}

export const EbookList = ({ ebooks, geminiResponse }: EbookListProps) => {
  return (
    <div className="space-y-8">
      {/* AI analysis summary */}
      {geminiResponse && (
        <div className="text-center">
          <h2 className="text-2xl font-bold text-text-primary mb-4">
            {geminiResponse.search_summary}
          </h2>
          
          {/* Bundle suggestion if applicable */}
          {geminiResponse.is_bundle_suggestion && geminiResponse.bundle_name && (
            <div className="bg-ai-purple/10 border border-ai-purple/20 rounded-lg p-4 mb-6 max-w-2xl mx-auto">
              <div className="flex items-center justify-center space-x-2">
                <CollectionIcon className="w-5 h-5 text-ai-purple" />
                <p className="text-ai-purple font-semibold">
                  Consider our "{geminiResponse.bundle_name}" for comprehensive learning
                </p>
              </div>
            </div>
          )}
        </div>
      )}
      
      {/* Results count */}
      <div className="text-center">
        <p className="text-text-secondary">
          Found {ebooks.length} {ebooks.length === 1 ? 'ebook' : 'ebooks'} for you
        </p>
      </div>
      
      {/* Ebook grid */}
      {ebooks.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ebooks.map(ebook => (
            <EbookCard key={ebook.id} ebook={ebook} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-text-secondary text-lg">
            No ebooks found matching your search. Try different keywords or browse our categories.
          </p>
        </div>
      )}
    </div>
  );
};
