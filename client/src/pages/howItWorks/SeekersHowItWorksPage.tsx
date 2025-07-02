import React from 'react';
import { PageContainer } from '@/components/PageContainer';

export default function SeekersHowItWorksPage() {
  return (
    <PageContainer
      title="How It Works for Seekers"
      subtitle="Discover the exact knowledge you need with AI-powered search and curated recommendations."
    >
      <div className="space-y-12">
        {/* Search Process */}
        <section className="space-y-8">
          <div className="bg-neural-secondary p-8 rounded-lg border border-neural-tertiary">
            <div className="flex items-start gap-6">
              <div className="bg-ai-blue text-white rounded-full w-12 h-12 flex items-center justify-center text-xl font-bold flex-shrink-0">
                1
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-semibold mb-3 text-text-primary">Describe What You Need</h3>
                <p className="text-text-secondary mb-4">
                  Tell our AI what you're trying to learn or solve. Use natural language - no need for specific keywords.
                </p>
                <div className="bg-neural-tertiary/50 p-4 rounded-lg">
                  <p className="text-sm text-text-muted font-medium">Example searches:</p>
                  <ul className="text-sm text-text-secondary mt-2 space-y-1">
                    <li>• "I need to implement machine learning in my Python app"</li>
                    <li>• "How to scale a React application for enterprise"</li>
                    <li>• "Product management strategies for AI startups"</li>
                    <li>• "Data visualization best practices"</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-neural-secondary p-8 rounded-lg border border-neural-tertiary">
            <div className="flex items-start gap-6">
              <div className="bg-ai-blue text-white rounded-full w-12 h-12 flex items-center justify-center text-xl font-bold flex-shrink-0">
                2
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-semibold mb-3 text-text-primary">AI Analyzes Your Intent</h3>
                <p className="text-text-secondary mb-4">
                  Our AI understands the context and intent behind your search, matching you with the most relevant content.
                </p>
                <div className="bg-neural-tertiary/50 p-4 rounded-lg">
                  <p className="text-sm text-text-muted font-medium">AI processing includes:</p>
                  <ul className="text-sm text-text-secondary mt-2 space-y-1">
                    <li>• Intent analysis and context understanding</li>
                    <li>• Topic extraction and keyword expansion</li>
                    <li>• Skill level assessment</li>
                    <li>• Learning path recommendations</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-neural-secondary p-8 rounded-lg border border-neural-tertiary">
            <div className="flex items-start gap-6">
              <div className="bg-ai-blue text-white rounded-full w-12 h-12 flex items-center justify-center text-xl font-bold flex-shrink-0">
                3
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-semibold mb-3 text-text-primary">Get Curated Recommendations</h3>
                <p className="text-text-secondary mb-4">
                  Receive a curated list of ebooks that match your needs, along with AI-generated summaries explaining why each is relevant.
                </p>
                <div className="bg-neural-tertiary/50 p-4 rounded-lg">
                  <p className="text-sm text-text-muted font-medium">Each recommendation includes:</p>
                  <ul className="text-sm text-text-secondary mt-2 space-y-1">
                    <li>• Relevance explanation</li>
                    <li>• Skill level requirements</li>
                    <li>• Key topics covered</li>
                    <li>• Author credentials</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-neural-secondary p-8 rounded-lg border border-neural-tertiary">
            <div className="flex items-start gap-6">
              <div className="bg-ai-blue text-white rounded-full w-12 h-12 flex items-center justify-center text-xl font-bold flex-shrink-0">
                4
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-semibold mb-3 text-text-primary">Purchase and Learn</h3>
                <p className="text-text-secondary mb-4">
                  Buy the ebooks you need with our simple $0.25 platform fee. Download immediately and start learning.
                </p>
                <div className="bg-neural-tertiary/50 p-4 rounded-lg">
                  <p className="text-sm text-text-muted font-medium">Purchase benefits:</p>
                  <ul className="text-sm text-text-secondary mt-2 space-y-1">
                    <li>• Transparent $0.25 flat fee</li>
                    <li>• Instant download access</li>
                    <li>• Multiple format support</li>
                    <li>• Lifetime access</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* AI Features */}
        <section className="bg-gradient-to-br from-ai-blue/10 to-ai-purple/10 p-8 rounded-lg border border-neural-tertiary">
          <h2 className="text-3xl font-bold mb-6 text-center text-ai-blue">AI-Powered Discovery</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="bg-ai-blue/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🔍</span>
              </div>
              <h3 className="text-lg font-semibold mb-3 text-text-primary">Semantic Search</h3>
              <p className="text-text-secondary">
                Find content based on meaning, not just keywords. Our AI understands what you're really looking for.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-ai-purple/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🎯</span>
              </div>
              <h3 className="text-lg font-semibold mb-3 text-text-primary">Intent Matching</h3>
              <p className="text-text-secondary">
                Get recommendations that match your specific goals and current skill level.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-ai-teal/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📚</span>
              </div>
              <h3 className="text-lg font-semibold mb-3 text-text-primary">Learning Paths</h3>
              <p className="text-text-secondary">
                AI suggests complementary ebooks to create complete learning journeys.
              </p>
            </div>
          </div>
        </section>

        {/* Value Proposition */}
        <section>
          <h2 className="text-3xl font-bold mb-8 text-center text-ai-teal">Why Choose Mebooks.ai</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-neural-secondary p-6 rounded-lg border border-neural-tertiary">
              <h3 className="text-xl font-semibold mb-4 text-green-400">What You Get</h3>
              <ul className="text-text-secondary space-y-2">
                <li>• AI-curated content specifically for your needs</li>
                <li>• Expert-authored practical guides</li>
                <li>• Transparent $0.25 platform fee</li>
                <li>• Instant access and downloads</li>
                <li>• Quality content from verified experts</li>
              </ul>
            </div>
            <div className="bg-neural-secondary p-6 rounded-lg border border-neural-tertiary">
              <h3 className="text-xl font-semibold mb-4 text-red-400">What You Avoid</h3>
              <ul className="text-text-secondary space-y-2">
                <li>• Endless searching through irrelevant content</li>
                <li>• Expensive courses with poor ROI</li>
                <li>• Generic tutorials that don't fit your context</li>
                <li>• Hidden fees and subscription traps</li>
                <li>• Outdated or theoretical information</li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    </PageContainer>
  );
}