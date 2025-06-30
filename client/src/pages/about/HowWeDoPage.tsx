export default function HowWeDoPage() {
  return (
    <div className="container mx-auto px-4 md:px-8 py-8 md:py-12">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-text-primary mb-6">How We Do It</h1>
          <p className="text-xl text-text-secondary">
            Our technology stack and approach to building the future of AI education.
          </p>
        </div>
        
        <div className="space-y-8">
          <div className="bg-neural-secondary rounded-lg p-6">
            <h3 className="text-xl font-bold text-ai-purple mb-4">AI-Powered Technology</h3>
            <p className="text-text-secondary mb-4">
              Using Google Gemini AI for intelligent search, content analysis, and personalized recommendations.
            </p>
            <div className="grid md:grid-cols-2 gap-4 text-text-secondary text-sm">
              <div>
                <strong className="text-text-primary">Natural Language Processing:</strong> 
                Understanding user queries and content context
              </div>
              <div>
                <strong className="text-text-primary">Semantic Search:</strong> 
                Matching content based on meaning, not just keywords
              </div>
              <div>
                <strong className="text-text-primary">Content Analysis:</strong> 
                Automatic categorization and complexity assessment
              </div>
              <div>
                <strong className="text-text-primary">Personalization:</strong> 
                Tailored recommendations based on user preferences
              </div>
            </div>
          </div>

          <div className="bg-neural-secondary rounded-lg p-6">
            <h3 className="text-xl font-bold text-ai-amber mb-4">Fair Economics</h3>
            <p className="text-text-secondary mb-4">
              Our transparent $0.25 platform fee ensures authors keep maximum revenue while maintaining platform sustainability.
            </p>
            <div className="bg-neural-tertiary rounded-lg p-4">
              <h4 className="font-semibold text-text-primary mb-2">Revenue Model</h4>
              <div className="space-y-2 text-text-secondary text-sm">
                <div className="flex justify-between">
                  <span>Platform Fee (fixed):</span>
                  <span className="text-ai-amber font-semibold">$0.25</span>
                </div>
                <div className="flex justify-between">
                  <span>Author Revenue:</span>
                  <span className="text-ai-teal font-semibold">Book Price - $0.25</span>
                </div>
                <div className="text-xs text-text-muted mt-2">
                  No percentage fees, no hidden costs, just transparent pricing.
                </div>
              </div>
            </div>
          </div>

          <div className="bg-neural-secondary rounded-lg p-6">
            <h3 className="text-xl font-bold text-ai-blue mb-4">Quality Assurance</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-text-primary mb-2">Content Review</h4>
                <ul className="text-text-secondary text-sm space-y-1">
                  <li>• Expert peer review process</li>
                  <li>• Automated quality checks</li>
                  <li>• Community feedback integration</li>
                  <li>• Regular content updates</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-text-primary mb-2">Author Verification</h4>
                <ul className="text-text-secondary text-sm space-y-1">
                  <li>• Professional credential verification</li>
                  <li>• Industry experience validation</li>
                  <li>• Portfolio and work history review</li>
                  <li>• Community reputation system</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-neural-secondary rounded-lg p-6">
            <h3 className="text-xl font-bold text-ai-teal mb-4">Security & Privacy</h3>
            <p className="text-text-secondary mb-4">
              We prioritize user data protection and secure transactions throughout our platform.
            </p>
            <div className="grid md:grid-cols-3 gap-4 text-text-secondary text-sm">
              <div>
                <strong className="text-text-primary">Data Encryption:</strong> 
                End-to-end encryption for all user data
              </div>
              <div>
                <strong className="text-text-primary">Secure Payments:</strong> 
                PCI-compliant payment processing
              </div>
              <div>
                <strong className="text-text-primary">Privacy First:</strong> 
                GDPR compliance and minimal data collection
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
