export default function SeekersPage() {
  return (
    <div className="container mx-auto px-4 md:px-8 py-8 md:py-12">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-text-primary mb-6">For Seekers</h1>
          <p className="text-xl text-text-secondary">
            Accelerate your AI learning journey with expert-curated content.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <div className="bg-neural-secondary rounded-lg p-6 text-center">
            <div className="text-4xl mb-4">🔍</div>
            <h3 className="text-xl font-bold text-ai-teal mb-2">Smart Search</h3>
            <p className="text-text-secondary text-sm">
              Find exactly what you need with AI-powered search and recommendations
            </p>
          </div>
          <div className="bg-neural-secondary rounded-lg p-6 text-center">
            <div className="text-4xl mb-4">👥</div>
            <h3 className="text-xl font-bold text-ai-blue mb-2">Expert Authors</h3>
            <p className="text-text-secondary text-sm">
              Learn from industry practitioners and leading AI researchers
            </p>
          </div>
          <div className="bg-neural-secondary rounded-lg p-6 text-center">
            <div className="text-4xl mb-4">💡</div>
            <h3 className="text-xl font-bold text-ai-purple mb-2">Affordable Access</h3>
            <p className="text-text-secondary text-sm">
              Quality content at fair prices with minimal platform fees
            </p>
          </div>
        </div>

        {/* Learning Paths */}
        <div className="space-y-8 mb-12">
          <section className="bg-neural-secondary rounded-lg p-6">
            <h3 className="text-xl font-bold text-ai-teal mb-4">Popular Learning Paths</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-neural-tertiary rounded-lg p-4">
                <h4 className="font-semibold text-text-primary mb-2">🤖 AI Fundamentals</h4>
                <p className="text-text-secondary text-sm mb-3">
                  Start your AI journey with foundational concepts and practical applications.
                </p>
                <div className="flex flex-wrap gap-1">
                  <span className="bg-neural-bg text-ai-teal px-2 py-1 rounded text-xs">Beginner</span>
                  <span className="bg-neural-bg text-ai-teal px-2 py-1 rounded text-xs">Python</span>
                  <span className="bg-neural-bg text-ai-teal px-2 py-1 rounded text-xs">Math</span>
                </div>
              </div>
              <div className="bg-neural-tertiary rounded-lg p-4">
                <h4 className="font-semibold text-text-primary mb-2">🧠 Machine Learning</h4>
                <p className="text-text-secondary text-sm mb-3">
                  Master ML algorithms, from linear regression to advanced ensemble methods.
                </p>
                <div className="flex flex-wrap gap-1">
                  <span className="bg-neural-bg text-ai-blue px-2 py-1 rounded text-xs">Intermediate</span>
                  <span className="bg-neural-bg text-ai-blue px-2 py-1 rounded text-xs">Scikit-learn</span>
                  <span className="bg-neural-bg text-ai-blue px-2 py-1 rounded text-xs">Statistics</span>
                </div>
              </div>
              <div className="bg-neural-tertiary rounded-lg p-4">
                <h4 className="font-semibold text-text-primary mb-2">🔥 Deep Learning</h4>
                <p className="text-text-secondary text-sm mb-3">
                  Build neural networks and work with cutting-edge deep learning frameworks.
                </p>
                <div className="flex flex-wrap gap-1">
                  <span className="bg-neural-bg text-ai-purple px-2 py-1 rounded text-xs">Advanced</span>
                  <span className="bg-neural-bg text-ai-purple px-2 py-1 rounded text-xs">TensorFlow</span>
                  <span className="bg-neural-bg text-ai-purple px-2 py-1 rounded text-xs">PyTorch</span>
                </div>
              </div>
              <div className="bg-neural-tertiary rounded-lg p-4">
                <h4 className="font-semibold text-text-primary mb-2">🚀 AI in Production</h4>
                <p className="text-text-secondary text-sm mb-3">
                  Deploy, scale, and maintain AI systems in real-world environments.
                </p>
                <div className="flex flex-wrap gap-1">
                  <span className="bg-neural-bg text-ai-amber px-2 py-1 rounded text-xs">Expert</span>
                  <span className="bg-neural-bg text-ai-amber px-2 py-1 rounded text-xs">MLOps</span>
                  <span className="bg-neural-bg text-ai-amber px-2 py-1 rounded text-xs">Cloud</span>
                </div>
              </div>
            </div>
          </section>

          <section className="bg-neural-secondary rounded-lg p-6">
            <h3 className="text-xl font-bold text-ai-blue mb-4">Why Learn With Us?</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-text-primary mb-2">Curated Quality</h4>
                <ul className="text-text-secondary text-sm space-y-1">
                  <li>• Expert-reviewed content</li>
                  <li>• Industry-tested knowledge</li>
                  <li>• Regularly updated materials</li>
                  <li>• Clear difficulty ratings</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-text-primary mb-2">Personalized Experience</h4>
                <ul className="text-text-secondary text-sm space-y-1">
                  <li>• AI-powered recommendations</li>
                  <li>• Custom learning paths</li>
                  <li>• Progress tracking</li>
                  <li>• Skill-based matching</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-text-primary mb-2">Community Support</h4>
                <ul className="text-text-secondary text-sm space-y-1">
                  <li>• Direct author interaction</li>
                  <li>• Peer learning groups</li>
                  <li>• Q&A forums</li>
                  <li>• Knowledge sharing</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-text-primary mb-2">Fair Pricing</h4>
                <ul className="text-text-secondary text-sm space-y-1">
                  <li>• Transparent cost structure</li>
                  <li>• No monthly subscriptions</li>
                  <li>• Pay only for what you need</li>
                  <li>• Lifetime access to purchases</li>
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
                    <span className="text-sm font-bold text-neural-bg">JD</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-text-primary">John Developer</h4>
                    <p className="text-text-secondary text-xs">Software Engineer → ML Engineer</p>
                  </div>
                </div>
                <p className="text-text-secondary text-sm">
                  "Started with zero ML knowledge. After 6 months of focused learning through Mebooks.ai, 
                  I landed my dream job as an ML engineer at a tech startup."
                </p>
              </div>
              <div className="bg-neural-tertiary rounded-lg p-4">
                <div className="flex items-center mb-2">
                  <div className="w-10 h-10 bg-ai-blue rounded-full flex items-center justify-center mr-3">
                    <span className="text-sm font-bold text-neural-bg">AE</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-text-primary">Alice Entrepreneur</h4>
                    <p className="text-text-secondary text-xs">Startup Founder</p>
                  </div>
                </div>
                <p className="text-text-secondary text-sm">
                  "The AI-powered search helped me find exactly what I needed to integrate ML into my product. 
                  Saved months of research and thousands in consulting fees."
                </p>
              </div>
            </div>
          </section>

          <section className="bg-neural-secondary rounded-lg p-6">
            <h3 className="text-xl font-bold text-ai-amber mb-4">Pricing Structure</h3>
            <div className="bg-neural-tertiary rounded-lg p-6 text-center">
              <h4 className="text-2xl font-bold text-text-primary mb-2">Simple & Transparent</h4>
              <div className="text-4xl font-bold text-ai-amber mb-2">Book Price + $0.25</div>
              <p className="text-text-secondary mb-4">That's our entire fee structure. No hidden costs, no subscriptions.</p>
              <div className="grid md:grid-cols-3 gap-4 text-sm">
                <div>
                  <strong className="text-text-primary">✅ What's Included:</strong>
                  <ul className="text-text-secondary mt-1">
                    <li>• Lifetime access</li>
                    <li>• Multiple formats</li>
                    <li>• Cloud sync</li>
                  </ul>
                </div>
                <div>
                  <strong className="text-text-primary">❌ No Hidden Fees:</strong>
                  <ul className="text-text-secondary mt-1">
                    <li>• No monthly charges</li>
                    <li>• No percentage fees</li>
                    <li>• No access restrictions</li>
                  </ul>
                </div>
                <div>
                  <strong className="text-text-primary">💡 Example:</strong>
                  <ul className="text-text-secondary mt-1">
                    <li>• $29.99 book</li>
                    <li>• +$0.25 platform fee</li>
                    <li>• =$30.24 total</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>
        </div>

        <div className="text-center">
          <button className="bg-ai-blue text-neural-bg px-8 py-3 rounded-lg font-semibold hover:bg-ai-blue/90 transition-colors mr-4">
            Start Learning Now
          </button>
          <button className="border border-ai-blue text-ai-blue px-8 py-3 rounded-lg font-semibold hover:bg-ai-blue hover:text-neural-bg transition-colors">
            Browse Catalog
          </button>
        </div>
      </div>
    </div>
  );
}
