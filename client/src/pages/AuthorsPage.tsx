
import { PageContainer } from '../components/PageContainer';

export default function AuthorsPage() {
  return (
    <PageContainer
      title="For Authors"
      subtitle="Turn your expertise into income with the simplest publishing platform ever created."
    >
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-ai-teal/10 to-ai-blue/10 p-8 rounded-lg border border-neural-tertiary text-center mb-8">
        <h2 className="text-4xl font-bold mb-4 text-ai-teal">Publish Your Ebook in 4 Simple Steps</h2>
        <p className="text-text-secondary leading-relaxed max-w-3xl mx-auto mb-6">
          No complex contracts, no hidden fees, no waiting. Get your ebook live and earning in minutes, not months.
        </p>
        <div className="bg-neural-tertiary p-6 rounded-md inline-block">
          <p className="text-5xl font-mono font-bold text-ai-teal">$0.25</p>
          <p className="text-text-muted mt-2">Flat fee per transaction. No matter the price.</p>
        </div>
      </section>

      {/* 4-Step Process */}
      <section className="space-y-8 mb-12">
        <h2 className="text-3xl font-bold text-center mb-8 text-ai-blue">How It Works</h2>

        {/* Step 1 */}
        <div className="bg-neural-secondary p-8 rounded-lg border border-neural-tertiary">
          <div className="flex items-start gap-6">
            <div className="bg-ai-teal text-white rounded-full w-12 h-12 flex items-center justify-center text-xl font-bold flex-shrink-0">
              1
            </div>
            <div className="flex-1">
              <h3 className="text-2xl font-semibold mb-3 text-text-primary">Answer a Few Questions</h3>
              <p className="text-text-secondary mb-4">
                Our AI-powered platform generates your professional author profile in minutes. Just tell us about your expertise, 
                writing background, and what you're passionate about. No lengthy applications or approval processes.
              </p>
              <div className="bg-neural-tertiary/50 p-4 rounded-lg">
                <p className="text-sm text-text-muted font-medium">What we ask:</p>
                <ul className="text-sm text-text-secondary mt-2 space-y-1">
                  <li>• Your name and professional background</li>
                  <li>• Areas of expertise and writing experience</li>
                  <li>• Social media handles (optional, for promotion)</li>
                  <li>• Payment preferences</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Step 2 */}
        <div className="bg-neural-secondary p-8 rounded-lg border border-neural-tertiary">
          <div className="flex items-start gap-6">
            <div className="bg-ai-teal text-white rounded-full w-12 h-12 flex items-center justify-center text-xl font-bold flex-shrink-0">
              2
            </div>
            <div className="flex-1">
              <h3 className="text-2xl font-semibold mb-3 text-text-primary">Upload Your Ebook</h3>
              <p className="text-text-secondary mb-4">
                Simply upload your PDF, EPUB, or Word document. Our AI automatically creates semantic search terms and 
                keywords, making your book discoverable to the right readers. No manual tagging or SEO work required.
              </p>
              <div className="bg-neural-tertiary/50 p-4 rounded-lg">
                <p className="text-sm text-text-muted font-medium">What happens automatically:</p>
                <ul className="text-sm text-text-secondary mt-2 space-y-1">
                  <li>• AI extracts key themes and topics</li>
                  <li>• Generates relevant search keywords</li>
                  <li>• Creates semantic embeddings for intelligent search</li>
                  <li>• Suggests optimal categories and tags</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Step 3 */}
        <div className="bg-neural-secondary p-8 rounded-lg border border-neural-tertiary">
          <div className="flex items-start gap-6">
            <div className="bg-ai-teal text-white rounded-full w-12 h-12 flex items-center justify-center text-xl font-bold flex-shrink-0">
              3
            </div>
            <div className="flex-1">
              <h3 className="text-2xl font-semibold mb-3 text-text-primary">Set Your Price</h3>
              <p className="text-text-secondary mb-4">
                You control your pricing completely. Set any price you want - from $0.99 to $99.99 or more. 
                Our AI provides pricing insights based on similar books, but the final decision is always yours.
              </p>
              <div className="bg-neural-tertiary/50 p-4 rounded-lg">
                <p className="text-sm text-text-muted font-medium">Pricing features:</p>
                <ul className="text-sm text-text-secondary mt-2 space-y-1">
                  <li>• Set any price you choose</li>
                  <li>• AI-powered pricing recommendations</li>
                  <li>• Market analysis and competitor insights</li>
                  <li>• Flexible pricing updates anytime</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Step 4 */}
        <div className="bg-neural-secondary p-8 rounded-lg border border-neural-tertiary">
          <div className="flex items-start gap-6">
            <div className="bg-ai-teal text-white rounded-full w-12 h-12 flex items-center justify-center text-xl font-bold flex-shrink-0">
              4
            </div>
            <div className="flex-1">
              <h3 className="text-2xl font-semibold mb-3 text-text-primary">Collect Revenue</h3>
              <p className="text-text-secondary mb-4">
                Start earning immediately. Every sale puts money directly in your pocket, minus our simple $0.25 flat fee. 
                Drive traffic through your social media reach and watch your earnings grow.
              </p>
              <div className="bg-neural-tertiary/50 p-4 rounded-lg">
                <p className="text-sm text-text-muted font-medium">Revenue benefits:</p>
                <ul className="text-sm text-text-secondary mt-2 space-y-1">
                  <li>• Keep 100% of your earnings minus $0.25 per sale</li>
                  <li>• Daily or weekly payouts via Stripe</li>
                  <li>• Real-time sales tracking and analytics</li>
                  <li>• Social media integration for promotion</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Fee Comparison */}
      <section className="bg-neural-secondary p-8 rounded-lg border border-neural-tertiary mb-8">
        <h2 className="text-3xl font-bold mb-6 text-center text-ai-teal">The Mebooks.ai Advantage</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="text-center">
            <h3 className="text-xl font-semibold mb-4 text-red-400">Traditional Platforms</h3>
            <div className="bg-red-400/10 p-6 rounded-lg border border-red-400/20">
              <p className="text-3xl font-bold text-red-400 mb-2">30-70%</p>
              <p className="text-text-secondary">Commission taken from every sale</p>
              <div className="mt-4 text-sm text-text-muted">
                <p>• Complex approval processes</p>
                <p>• Limited pricing control</p>
                <p>• Hidden fees and charges</p>
                <p>• Slow payment processing</p>
              </div>
            </div>
          </div>
          <div className="text-center">
            <h3 className="text-xl font-semibold mb-4 text-green-400">Mebooks.ai</h3>
            <div className="bg-green-400/10 p-6 rounded-lg border border-green-400/20">
              <p className="text-3xl font-bold text-green-400 mb-2">$0.25</p>
              <p className="text-text-secondary">Flat fee per transaction</p>
              <div className="mt-4 text-sm text-text-muted">
                <p>• Instant publishing</p>
                <p>• Full pricing control</p>
                <p>• Transparent fees</p>
                <p>• Fast daily payouts</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Social Media Promotion */}
      <section className="bg-neural-secondary p-8 rounded-lg border border-neural-tertiary">
        <h2 className="text-3xl font-bold mb-6 text-center text-ai-blue">Leverage Your Social Media Reach</h2>
        <p className="text-text-secondary text-center max-w-3xl mx-auto mb-8">
          Your existing social media audience is your biggest asset. Share your author profile link, promote your books, 
          and drive traffic directly to your Mebooks.ai page. Every follower becomes a potential customer.
        </p>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="bg-neural-tertiary w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">📱</span>
            </div>
            <h3 className="text-lg font-semibold mb-2 text-text-primary">Share Your Profile</h3>
            <p className="text-sm text-text-secondary">Get a custom author profile URL to share across all your social platforms</p>
          </div>
          <div className="text-center">
            <div className="bg-neural-tertiary w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">📈</span>
            </div>
            <h3 className="text-lg font-semibold mb-2 text-text-primary">Track Performance</h3>
            <p className="text-sm text-text-secondary">See which social platforms drive the most sales and engagement</p>
          </div>
          <div className="text-center">
            <div className="bg-neural-tertiary w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">💰</span>
            </div>
            <h3 className="text-lg font-semibold mb-2 text-text-primary">Maximize Earnings</h3>
            <p className="text-sm text-text-secondary">Keep more of your revenue with our flat fee structure</p>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="text-center bg-gradient-to-r from-ai-teal/10 to-ai-blue/10 p-8 rounded-lg border border-neural-tertiary">
        <h2 className="text-3xl font-bold mb-4 text-ai-teal">Ready to Start Publishing?</h2>
        <p className="text-text-secondary mb-6 max-w-2xl mx-auto">
          Join thousands of authors who are already earning more with Mebooks.ai. 
          No upfront costs, no monthly fees, just pure earning potential.
        </p>
        <button className="bg-ai-teal hover:bg-ai-teal/90 text-white px-8 py-3 rounded-lg font-semibold transition-colors">
          Get Started Now
        </button>
      </section>
    </PageContainer>
  );
};
