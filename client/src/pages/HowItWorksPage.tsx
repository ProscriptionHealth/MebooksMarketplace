export default function HowItWorksPage() {
  return (
    <div className="container mx-auto px-4 md:px-8 py-8 md:py-12">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-text-primary mb-6">How It Works</h1>
          <p className="text-xl text-text-secondary">
            Simple steps to discover, purchase, and learn from AI experts.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <div className="text-center">
            <div className="w-16 h-16 bg-ai-teal rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold text-neural-bg">1</span>
            </div>
            <h3 className="text-lg font-semibold text-text-primary mb-2">Search</h3>
            <p className="text-text-secondary text-sm">
              Use our AI-powered search to find relevant content
            </p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-ai-blue rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold text-neural-bg">2</span>
            </div>
            <h3 className="text-lg font-semibold text-text-primary mb-2">Discover</h3>
            <p className="text-text-secondary text-sm">
              Browse curated ebooks from industry experts
            </p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-ai-purple rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold text-neural-bg">3</span>
            </div>
            <h3 className="text-lg font-semibold text-text-primary mb-2">Purchase</h3>
            <p className="text-text-secondary text-sm">
              Buy with just $0.25 platform fee
            </p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-ai-amber rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold text-neural-bg">4</span>
            </div>
            <h3 className="text-lg font-semibold text-text-primary mb-2">Learn</h3>
            <p className="text-text-secondary text-sm">
              Access your content instantly and start learning
            </p>
          </div>
        </div>

        {/* Detailed steps */}
        <div className="space-y-8">
          <section className="bg-neural-secondary rounded-lg p-6">
            <h3 className="text-xl font-bold text-ai-teal mb-4">🔍 Smart Search Experience</h3>
            <p className="text-text-secondary mb-4">
              Our AI understands what you're looking for, even if you're not sure how to express it.
            </p>
            <div className="grid md:grid-cols-2 gap-4 text-text-secondary text-sm">
              <div>
                <strong className="text-text-primary">Natural language queries:</strong> 
                "I want to learn about neural networks for beginners"
              </div>
              <div>
                <strong className="text-text-primary">Topic suggestions:</strong> 
                Get personalized recommendations based on your interests
              </div>
              <div>
                <strong className="text-text-primary">Bundle recommendations:</strong> 
                Discover related books that complement your learning path
              </div>
              <div>
                <strong className="text-text-primary">Difficulty matching:</strong> 
                Find content that matches your current skill level
              </div>
            </div>
          </section>

          <section className="bg-neural-secondary rounded-lg p-6">
            <h3 className="text-xl font-bold text-ai-blue mb-4">📚 Content Discovery</h3>
            <p className="text-text-secondary mb-4">
              Every book on our platform is carefully curated and categorized for easy discovery.
            </p>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="text-center bg-neural-tertiary rounded-lg p-4">
                <div className="text-2xl mb-2">🎯</div>
                <h4 className="font-semibold text-text-primary mb-2">Complexity Ratings</h4>
                <p className="text-text-secondary text-xs">Beginner, Intermediate, Advanced, Research</p>
              </div>
              <div className="text-center bg-neural-tertiary rounded-lg p-4">
                <div className="text-2xl mb-2">🏷️</div>
                <h4 className="font-semibold text-text-primary mb-2">Framework Tags</h4>
                <p className="text-text-secondary text-xs">TensorFlow, PyTorch, Scikit-learn, and more</p>
              </div>
              <div className="text-center bg-neural-tertiary rounded-lg p-4">
                <div className="text-2xl mb-2">📖</div>
                <h4 className="font-semibold text-text-primary mb-2">Detailed Previews</h4>
                <p className="text-text-secondary text-xs">Author info, page count, and content samples</p>
              </div>
            </div>
          </section>

          <section className="bg-neural-secondary rounded-lg p-6">
            <h3 className="text-xl font-bold text-ai-purple mb-4">💳 Simple Purchasing</h3>
            <p className="text-text-secondary mb-4">
              Transparent pricing with no hidden fees or complicated subscription models.
            </p>
            <div className="bg-neural-tertiary rounded-lg p-4">
              <div className="text-center">
                <div className="text-lg font-semibold text-text-primary mb-2">Pricing Structure</div>
                <div className="text-3xl font-bold text-ai-amber mb-2">Book Price + $0.25</div>
                <div className="text-text-secondary text-sm">That's it. No percentage fees, no monthly subscriptions.</div>
              </div>
            </div>
          </section>

          <section className="bg-neural-secondary rounded-lg p-6">
            <h3 className="text-xl font-bold text-ai-amber mb-4">🚀 Start Learning</h3>
            <p className="text-text-secondary mb-4">
              Once purchased, your content is immediately available across all your devices.
            </p>
            <div className="grid md:grid-cols-2 gap-4 text-text-secondary text-sm">
              <div>
                <strong className="text-text-primary">Instant Access:</strong> 
                Download immediately after purchase
              </div>
              <div>
                <strong className="text-text-primary">Multiple Formats:</strong> 
                PDF and EPUB available for all books
              </div>
              <div>
                <strong className="text-text-primary">Cloud Storage:</strong> 
                Access your library from anywhere
              </div>
              <div>
                <strong className="text-text-primary">Progress Tracking:</strong> 
                Keep track of your learning journey
              </div>
            </div>
          </section>
        </div>

        <div className="text-center mt-12">
          <button className="bg-ai-teal text-neural-bg px-8 py-3 rounded-lg font-semibold hover:bg-ai-teal/90 transition-colors">
            Start Exploring Now
          </button>
        </div>
      </div>
    </div>
  );
}
