export default function WhatWeDoPage() {
  return (
    <div className="container mx-auto px-4 md:px-8 py-8 md:py-12">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-text-primary mb-6">What We Do</h1>
          <p className="text-xl text-text-secondary">
            Connecting AI experts with knowledge seekers through our innovative marketplace.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="bg-neural-secondary rounded-lg p-6">
            <h3 className="text-xl font-bold text-ai-teal mb-4">For Authors</h3>
            <ul className="space-y-2 text-text-secondary">
              <li>• Transparent $0.25 flat platform fee</li>
              <li>• AI-powered content discovery</li>
              <li>• Global reach and marketing</li>
              <li>• Seamless publishing workflow</li>
              <li>• Real-time analytics and insights</li>
              <li>• Community engagement tools</li>
            </ul>
          </div>
          <div className="bg-neural-secondary rounded-lg p-6">
            <h3 className="text-xl font-bold text-ai-blue mb-4">For Seekers</h3>
            <ul className="space-y-2 text-text-secondary">
              <li>• Curated AI content from experts</li>
              <li>• Intelligent search and recommendations</li>
              <li>• Affordable access to premium knowledge</li>
              <li>• Community-driven learning</li>
              <li>• Progress tracking and certificates</li>
              <li>• Direct author interaction</li>
            </ul>
          </div>
        </div>

        <div className="space-y-8">
          <section className="bg-neural-secondary rounded-lg p-6">
            <h3 className="text-xl font-bold text-ai-purple mb-4">Platform Features</h3>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-3xl mb-2">🤖</div>
                <h4 className="font-semibold text-text-primary mb-2">AI-Powered Search</h4>
                <p className="text-text-secondary text-sm">Find exactly what you need with intelligent content matching</p>
              </div>
              <div className="text-center">
                <div className="text-3xl mb-2">📚</div>
                <h4 className="font-semibold text-text-primary mb-2">Quality Curation</h4>
                <p className="text-text-secondary text-sm">Expert-reviewed content ensures high-quality learning materials</p>
              </div>
              <div className="text-center">
                <div className="text-3xl mb-2">💰</div>
                <h4 className="font-semibold text-text-primary mb-2">Fair Pricing</h4>
                <p className="text-text-secondary text-sm">Transparent pricing with minimal platform fees</p>
              </div>
            </div>
          </section>

          <section className="bg-neural-secondary rounded-lg p-6">
            <h3 className="text-xl font-bold text-ai-amber mb-4">Technology Stack</h3>
            <p className="text-text-secondary mb-4">
              Built with cutting-edge technology to provide the best user experience:
            </p>
            <div className="grid md:grid-cols-2 gap-4 text-text-secondary text-sm">
              <div>
                <strong className="text-text-primary">Frontend:</strong> React, TypeScript, Tailwind CSS
              </div>
              <div>
                <strong className="text-text-primary">AI Integration:</strong> Google Gemini 2.5 Flash
              </div>
              <div>
                <strong className="text-text-primary">Search:</strong> Semantic search with embeddings
              </div>
              <div>
                <strong className="text-text-primary">Payments:</strong> Stripe for secure transactions
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
