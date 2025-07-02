import React from 'react';
import { PageContainer } from '../../components/PageContainer';

export default function AuthorsHowItWorksPage() {
  return (
    <PageContainer
      title="How It Works for Authors"
      subtitle="From idea to income in 4 simple steps. No complex processes, no hidden fees."
    >
      <div className="space-y-12">
        {/* 4-Step Process */}
        <section className="space-y-8">
          <div className="bg-neural-secondary p-8 rounded-lg border border-neural-tertiary">
            <div className="flex items-start gap-6">
              <div className="bg-ai-teal text-white rounded-full w-12 h-12 flex items-center justify-center text-xl font-bold flex-shrink-0">
                1
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-semibold mb-3 text-text-primary">Create Your Author Profile</h3>
                <p className="text-text-secondary mb-4">
                  Answer a few questions about your expertise and background. Our AI generates your professional 
                  author profile automatically.
                </p>
                <div className="bg-neural-tertiary/50 p-4 rounded-lg">
                  <p className="text-sm text-text-muted font-medium">Takes 3 minutes:</p>
                  <ul className="text-sm text-text-secondary mt-2 space-y-1">
                    <li>• Professional background</li>
                    <li>• Areas of expertise</li>
                    <li>• Social media links</li>
                    <li>• Payment preferences</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-neural-secondary p-8 rounded-lg border border-neural-tertiary">
            <div className="flex items-start gap-6">
              <div className="bg-ai-teal text-white rounded-full w-12 h-12 flex items-center justify-center text-xl font-bold flex-shrink-0">
                2
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-semibold mb-3 text-text-primary">Upload Your Content</h3>
                <p className="text-text-secondary mb-4">
                  Upload PDF, EPUB, or Word documents. Our AI extracts keywords and creates semantic search optimization automatically.
                </p>
                <div className="bg-neural-tertiary/50 p-4 rounded-lg">
                  <p className="text-sm text-text-muted font-medium">AI handles automatically:</p>
                  <ul className="text-sm text-text-secondary mt-2 space-y-1">
                    <li>• Topic extraction</li>
                    <li>• Keyword generation</li>
                    <li>• Category suggestions</li>
                    <li>• Search optimization</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-neural-secondary p-8 rounded-lg border border-neural-tertiary">
            <div className="flex items-start gap-6">
              <div className="bg-ai-teal text-white rounded-full w-12 h-12 flex items-center justify-center text-xl font-bold flex-shrink-0">
                3
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-semibold mb-3 text-text-primary">Set Your Price</h3>
                <p className="text-text-secondary mb-4">
                  You have complete pricing control. Our AI provides market insights, but the final decision is yours.
                </p>
                <div className="bg-neural-tertiary/50 p-4 rounded-lg">
                  <p className="text-sm text-text-muted font-medium">Pricing insights include:</p>
                  <ul className="text-sm text-text-secondary mt-2 space-y-1">
                    <li>• Similar content pricing</li>
                    <li>• Market demand analysis</li>
                    <li>• Optimal pricing suggestions</li>
                    <li>• Revenue projections</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-neural-secondary p-8 rounded-lg border border-neural-tertiary">
            <div className="flex items-start gap-6">
              <div className="bg-ai-teal text-white rounded-full w-12 h-12 flex items-center justify-center text-xl font-bold flex-shrink-0">
                4
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-semibold mb-3 text-text-primary">Start Earning</h3>
                <p className="text-text-secondary mb-4">
                  Your ebook goes live immediately. Share your author profile link and start earning with every sale.
                </p>
                <div className="bg-neural-tertiary/50 p-4 rounded-lg">
                  <p className="text-sm text-text-muted font-medium">Revenue features:</p>
                  <ul className="text-sm text-text-secondary mt-2 space-y-1">
                    <li>• $0.25 flat fee per sale</li>
                    <li>• Daily payouts via Stripe</li>
                    <li>• Real-time analytics</li>
                    <li>• Social media promotion tools</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Revenue Comparison */}
        <section className="bg-gradient-to-br from-ai-teal/10 to-ai-blue/10 p-8 rounded-lg border border-neural-tertiary">
          <h2 className="text-3xl font-bold mb-6 text-center text-ai-teal">Revenue Comparison</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="text-center">
              <h3 className="text-xl font-semibold mb-4 text-red-400">Traditional Platforms</h3>
              <div className="bg-red-400/10 p-6 rounded-lg border border-red-400/20">
                <p className="text-3xl font-bold text-red-400 mb-2">30-70%</p>
                <p className="text-text-secondary mb-4">Commission taken from every sale</p>
                <div className="text-sm text-text-muted space-y-1">
                  <p>• Complex approval processes</p>
                  <p>• Limited pricing control</p>
                  <p>• Hidden fees and charges</p>
                  <p>• Monthly payment delays</p>
                </div>
              </div>
            </div>
            <div className="text-center">
              <h3 className="text-xl font-semibold mb-4 text-green-400">Mebooks.ai</h3>
              <div className="bg-green-400/10 p-6 rounded-lg border border-green-400/20">
                <p className="text-3xl font-bold text-green-400 mb-2">$0.25</p>
                <p className="text-text-secondary mb-4">Flat fee per transaction</p>
                <div className="text-sm text-text-muted space-y-1">
                  <p>• Instant publishing</p>
                  <p>• Complete pricing control</p>
                  <p>• Transparent fees</p>
                  <p>• Daily payouts</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </PageContainer>
  );
}