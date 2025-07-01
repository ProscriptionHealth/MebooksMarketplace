import React from 'react';
import { PageContainer } from '../../components/PageContainer';

export default function WhyWeDoPage() {
  return (
    <PageContainer
      title="Why We Do"
      subtitle="Our mission to revolutionize knowledge sharing and empower creators in the AI-driven world."
    >
      <div className="space-y-12">
        {/* Mission Section */}
        <section className="bg-gradient-to-br from-ai-teal/10 to-ai-blue/10 p-8 rounded-lg border border-neural-tertiary">
          <h2 className="text-3xl font-bold mb-6 text-ai-teal">Our Mission</h2>
          <p className="text-lg text-text-secondary leading-relaxed">
            We believe that knowledge should flow freely between experts and learners. In a world where AI is transforming 
            every industry, the gap between those who understand these technologies and those who need to learn them is 
            growing wider every day. Mebooks.ai exists to bridge that gap with the simplest, most equitable platform 
            for knowledge sharing ever created.
          </p>
        </section>

        {/* Problem Section */}
        <section>
          <h2 className="text-3xl font-bold mb-6 text-ai-blue">The Problem We're Solving</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-neural-secondary p-6 rounded-lg border border-neural-tertiary">
              <h3 className="text-xl font-semibold mb-4 text-red-400">For Knowledge Seekers</h3>
              <ul className="text-text-secondary space-y-2">
                <li>• Information overload without quality curation</li>
                <li>• Expensive courses that don't deliver practical value</li>
                <li>• Generic content that doesn't address specific needs</li>
                <li>• Difficulty finding trustworthy expert guidance</li>
              </ul>
            </div>
            <div className="bg-neural-secondary p-6 rounded-lg border border-neural-tertiary">
              <h3 className="text-xl font-semibold mb-4 text-red-400">For Knowledge Creators</h3>
              <ul className="text-text-secondary space-y-2">
                <li>• Complex publishing platforms with high barriers</li>
                <li>• Unfair revenue splits that favor platforms</li>
                <li>• Limited reach and discoverability</li>
                <li>• Time-consuming marketing and promotion requirements</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section>
          <h2 className="text-3xl font-bold mb-6 text-ai-purple">Our Core Values</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center p-6">
              <div className="bg-ai-teal/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl text-ai-teal">🎯</span>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-text-primary">Simplicity</h3>
              <p className="text-text-secondary">
                Complex problems require simple solutions. We eliminate friction at every step.
              </p>
            </div>
            <div className="text-center p-6">
              <div className="bg-ai-blue/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl text-ai-blue">⚖️</span>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-text-primary">Fairness</h3>
              <p className="text-text-secondary">
                Creators deserve to keep their earnings. Our flat fee model ensures transparency.
              </p>
            </div>
            <div className="text-center p-6">
              <div className="bg-ai-purple/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl text-ai-purple">🚀</span>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-text-primary">Innovation</h3>
              <p className="text-text-secondary">
                AI-powered discovery ensures the right knowledge finds the right people.
              </p>
            </div>
          </div>
        </section>

        {/* Impact Section */}
        <section className="bg-neural-secondary p-8 rounded-lg border border-neural-tertiary">
          <h2 className="text-3xl font-bold mb-6 text-center text-ai-teal">The Impact We're Creating</h2>
          <div className="max-w-4xl mx-auto">
            <p className="text-lg text-text-secondary leading-relaxed mb-6">
              Every day, professionals struggle to keep up with rapidly evolving technologies while experts struggle 
              to monetize their knowledge effectively. By solving both problems simultaneously, we're creating a 
              virtuous cycle that benefits everyone.
            </p>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="text-center">
                <div className="text-4xl font-bold text-ai-teal mb-2">$0.25</div>
                <p className="text-text-secondary">Flat fee empowers creators to price their content fairly</p>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-ai-blue mb-2">AI-Powered</div>
                <p className="text-text-secondary">Intelligent matching connects seekers with relevant content</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </PageContainer>
  );
}