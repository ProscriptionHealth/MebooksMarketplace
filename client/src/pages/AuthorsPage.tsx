export default function AuthorsPage() {
  return (
    <div className="container mx-auto px-4 md:px-8 py-8 md:py-12">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-text-primary mb-6">For Authors</h1>
          <p className="text-xl text-text-secondary">
            Share your expertise with the AI community and earn with transparent pricing.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <div className="bg-neural-secondary rounded-lg p-6 text-center">
            <div className="text-4xl mb-4">📚</div>
            <h3 className="text-xl font-bold text-ai-teal mb-2">Publish Easily</h3>
            <p className="text-text-secondary text-sm">
              Upload your ebooks with our streamlined publishing workflow
            </p>
          </div>
          <div className="bg-neural-secondary rounded-lg p-6 text-center">
            <div className="text-4xl mb-4">🤖</div>
            <h3 className="text-xl font-bold text-ai-blue mb-2">AI Discovery</h3>
            <p className="text-text-secondary text-sm">
              Our AI helps readers find your content through intelligent matching
            </p>
          </div>
          <div className="bg-neural-secondary rounded-lg p-6 text-center">
            <div className="text-4xl mb-4">💰</div>
            <h3 className="text-xl font-bold text-ai-purple mb-2">Fair Revenue</h3>
            <p className="text-text-secondary text-sm">
              Keep maximum earnings with our transparent $0.25 platform fee
            </p>
          </div>
        </div>

        {/* Publishing Process */}
        <div className="space-y-8 mb-12">
          <section className="bg-neural-secondary rounded-lg p-6">
            <h3 className="text-xl font-bold text-ai-teal mb-4">Publishing Process</h3>
            <div className="grid md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="w-12 h-12 bg-ai-teal rounded-full flex items-center justify-center mx-auto mb-2">
                  <span className="text-lg font-bold text-neural-bg">1</span>
                </div>
                <h4 className="font-semibold text-text-primary text-sm mb-1">Upload</h4>
                <p className="text-text-secondary text-xs">Submit your PDF or EPUB file</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-ai-blue rounded-full flex items-center justify-center mx-auto mb-2">
                  <span className="text-lg font-bold text-neural-bg">2</span>
                </div>
                <h4 className="font-semibold text-text-primary text-sm mb-1">Details</h4>
                <p className="text-text-secondary text-xs">Add title, description, and tags</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-ai-purple rounded-full flex items-center justify-center mx-auto mb-2">
                  <span className="text-lg font-bold text-neural-bg">3</span>
                </div>
                <h4 className="font-semibold text-text-primary text-sm mb-1">Review</h4>
                <p className="text-text-secondary text-xs">Quick quality check and approval</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-ai-amber rounded-full flex items-center justify-center mx-auto mb-2">
                  <span className="text-lg font-bold text-neural-bg">4</span>
                </div>
                <h4 className="font-semibold text-text-primary text-sm mb-1">Publish</h4>
                <p className="text-text-secondary text-xs">Go live and start earning</p>
              </div>
            </div>
          </section>

          <section className="bg-neural-secondary rounded-lg p-6">
            <h3 className="text-xl font-bold text-ai-blue mb-4">Why Choose Mebooks.ai?</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-text-primary mb-2">Transparent Economics</h4>
                <ul className="text-text-secondary text-sm space-y-1">
                  <li>• Fixed $0.25 platform fee</li>
                  <li>• No percentage-based commissions</li>
                  <li>• Keep 100% of your price minus fee</li>
                  <li>• No hidden charges or surprises</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-text-primary mb-2">AI-Powered Marketing</h4>
                <ul className="text-text-secondary text-sm space-y-1">
                  <li>• Intelligent content categorization</li>
                  <li>• Automated tag generation</li>
                  <li>• Smart reader recommendations</li>
                  <li>• Complexity level assessment</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-text-primary mb-2">Global Reach</h4>
                <ul className="text-text-secondary text-sm space-y-1">
                  <li>• Worldwide distribution</li>
                  <li>• Multi-currency support</li>
                  <li>• International payment processing</li>
                  <li>• Localized marketing</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-text-primary mb-2">Author Support</h4>
                <ul className="text-text-secondary text-sm space-y-1">
                  <li>• Dedicated author dashboard</li>
                  <li>• Real-time sales analytics</li>
                  <li>• Reader feedback system</li>
                  <li>• Marketing tools and tips</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="bg-neural-secondary rounded-lg p-6">
            <h3 className="text-xl font-bold text-ai-purple mb-4">Success Stories</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-neural-tertiary rounded-lg p-4">
                <div className="flex items-center mb-2">
                  <div className="w-10 h-10 bg-ai-teal rounded-full flex items-center justify-center mr-3">
                    <span className="text-sm font-bold text-neural-bg">SC</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-text-primary">Dr. Sarah Chen</h4>
                    <p className="text-text-secondary text-xs">ML Researcher</p>
                  </div>
                </div>
                <p className="text-text-secondary text-sm">
                  "Published my first book on reinforcement learning and reached over 1,000 readers in the first month. 
                  The AI-powered discovery really works!"
                </p>
              </div>
              <div className="bg-neural-tertiary rounded-lg p-4">
                <div className="flex items-center mb-2">
                  <div className="w-10 h-10 bg-ai-blue rounded-full flex items-center justify-center mr-3">
                    <span className="text-sm font-bold text-neural-bg">MR</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-text-primary">Prof. Michael Rodriguez</h4>
                    <p className="text-text-secondary text-xs">AI Ethics Expert</p>
                  </div>
                </div>
                <p className="text-text-secondary text-sm">
                  "The transparent pricing model is refreshing. I know exactly how much I earn from each sale, 
                  and the low platform fee means more revenue for authors."
                </p>
              </div>
            </div>
          </section>
        </div>

        <div className="text-center">
          <button className="bg-ai-teal text-neural-bg px-8 py-3 rounded-lg font-semibold hover:bg-ai-teal/90 transition-colors mr-4">
            Start Publishing Today
          </button>
          <button className="border border-ai-teal text-ai-teal px-8 py-3 rounded-lg font-semibold hover:bg-ai-teal hover:text-neural-bg transition-colors">
            Learn More
          </button>
        </div>
      </div>
    </div>
  );
}
