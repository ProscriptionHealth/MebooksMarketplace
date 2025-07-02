
import { PageContainer } from '../../components/PageContainer';

export default function SellEbooksPage() {
  return (
    <PageContainer
      title="Sell Ebooks"
      subtitle="Transform your expertise into income with the world's simplest ebook publishing platform."
    >
      <div className="space-y-12">
        {/* Quick Start Section */}
        <section className="bg-gradient-to-br from-ai-teal/10 to-ai-blue/10 p-8 rounded-lg border border-neural-tertiary text-center">
          <h2 className="text-3xl font-bold mb-4 text-ai-teal">Start Selling in Minutes</h2>
          <p className="text-lg text-text-secondary mb-6 max-w-3xl mx-auto">
            No complex approvals, no hidden fees, no waiting periods. Upload your ebook and start earning today.
          </p>
          <button className="bg-ai-teal hover:bg-ai-teal/90 text-white px-8 py-3 rounded-lg font-semibold transition-colors">
            Create Author Account
          </button>
        </section>

        {/* Revenue Model */}
        <section>
          <h2 className="text-3xl font-bold mb-8 text-center text-ai-blue">Transparent Revenue Model</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6 bg-neural-secondary rounded-lg border border-neural-tertiary">
              <div className="text-4xl font-bold text-ai-teal mb-4">$0.25</div>
              <h3 className="text-xl font-semibold mb-3 text-text-primary">Flat Transaction Fee</h3>
              <p className="text-text-secondary">
                That's it. No percentages, no hidden costs, no monthly fees. Just $0.25 per sale.
              </p>
            </div>
            <div className="text-center p-6 bg-neural-secondary rounded-lg border border-neural-tertiary">
              <div className="text-4xl font-bold text-green-400 mb-4">100%</div>
              <h3 className="text-xl font-semibold mb-3 text-text-primary">Your Revenue</h3>
              <p className="text-text-secondary">
                Keep everything above the $0.25 fee. Price your ebook at $5? You earn $4.75.
              </p>
            </div>
            <div className="text-center p-6 bg-neural-secondary rounded-lg border border-neural-tertiary">
              <div className="text-4xl font-bold text-ai-purple mb-4">Daily</div>
              <h3 className="text-xl font-semibold mb-3 text-text-primary">Instant Payouts</h3>
              <p className="text-text-secondary">
                Money hits your account daily via Stripe. No waiting for monthly payments.
              </p>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="text-center bg-gradient-to-r from-ai-teal/10 to-ai-blue/10 p-8 rounded-lg border border-neural-tertiary">
          <h2 className="text-3xl font-bold mb-4 text-ai-teal">Ready to Start Earning?</h2>
          <p className="text-text-secondary mb-6 max-w-2xl mx-auto">
            Join hundreds of authors already earning more with Mebooks.ai.
          </p>
          <button className="bg-ai-teal hover:bg-ai-teal/90 text-white px-8 py-3 rounded-lg font-semibold transition-colors">
            Start Publishing Now
          </button>
        </section>
      </div>
    </PageContainer>
  );
}