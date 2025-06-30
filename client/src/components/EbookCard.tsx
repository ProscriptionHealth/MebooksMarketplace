import { Ebook, PLATFORM_FEE } from '../types';

interface EbookCardProps {
  ebook: Ebook;
}

export const EbookCard = ({ ebook }: EbookCardProps) => {
  const complexityColors: Record<string, string> = {
    'beginner': 'bg-green-500',
    'intermediate': 'bg-yellow-500',
    'advanced': 'bg-red-500',
    'research': 'bg-purple-500'
  };

  const handleAddToCart = () => {
    // TODO: Implement cart functionality
    console.log('Adding to cart:', ebook.id);
  };

  return (
    <div className="bg-neural-secondary rounded-lg overflow-hidden hover:transform hover:scale-105 transition-all duration-300 hover:shadow-xl hover:shadow-ai-teal/10">
      <div className="relative">
        <img 
          src={ebook.coverUrl} 
          alt={`${ebook.title} cover`} 
          className="w-full h-64 object-cover"
        />
        <div className={`absolute top-3 right-3 ${complexityColors[ebook.complexity]} text-white px-2 py-1 rounded-full text-xs font-semibold capitalize`}>
          {ebook.complexity}
        </div>
      </div>
      <div className="p-6">
        <h3 className="text-lg font-bold text-text-primary mb-2 line-clamp-2">
          {ebook.title}
        </h3>
        <p className="text-text-secondary text-sm mb-2">by {ebook.author}</p>
        <p className="text-text-muted text-sm mb-4 line-clamp-2">
          {ebook.description}
        </p>
        
        <div className="flex flex-wrap gap-1 mb-4">
          {ebook.frameworkTags.slice(0, 3).map(tag => (
            <span 
              key={tag}
              className="bg-neural-tertiary text-ai-teal px-2 py-1 rounded text-xs"
            >
              {tag}
            </span>
          ))}
        </div>
        
        <div className="flex items-center justify-between mb-4">
          <div className="text-text-muted text-sm">
            {ebook.pageCount} pages
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-text-primary">
              ${ebook.price.toFixed(2)}
            </div>
            <div className="text-xs text-text-muted">
              +${PLATFORM_FEE.toFixed(2)} platform fee
            </div>
          </div>
        </div>
        
        <button 
          onClick={handleAddToCart}
          className="w-full bg-ai-teal text-neural-bg py-2 rounded-lg font-semibold hover:bg-ai-teal/90 transition-colors"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};
