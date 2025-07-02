
import { PageContainer } from '../../components/PageContainer';

export default function SearchPage() {
  return (
    <PageContainer
      title="Search"
      subtitle="Find exactly what you need with AI-powered semantic search that understands your intent."
    >
      <div className="space-y-12">
        {/* Search Demo */}
        <section className="bg-gradient-to-br from-ai-blue/10 to-ai-purple/10 p-8 rounded-lg border border-neural-tertiary">
          <h2 className="text-3xl font-bold mb-6 text-center text-ai-blue">Try Intelligent Search</h2>
          <div className="max-w-2xl mx-auto">
            <div className="relative mb-6">
              <input
                type="text"
                placeholder="Try: 'I need to implement machine learning in my Python app'"
                className="w-full px-6 py-4 text-lg bg-neural-secondary border border-neural-tertiary rounded-lg text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-ai-blue"
                disabled
              />
              <button className="absolute right-2 top-2 bg-ai-blue text-white px-6 py-2 rounded-lg font-semibold hover:bg-ai-blue/90 transition-colors">
                Search
              </button>
            </div>
            <p className="text-center text-text-secondary">
              Our AI understands natural language and finds content based on meaning, not just keywords.
            </p>
          </div>
        </section>

        {/* Search Features */}
        <section>
          <h2 className="text-3xl font-bold mb-8 text-center text-ai-teal">How Our Search Works</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center p-6 bg-neural-secondary rounded-lg border border-neural-tertiary">
              <div className="bg-ai-blue/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🧠</span>
              </div>
              <h3 className="text-lg font-semibold mb-3 text-text-primary">Intent Understanding</h3>
              <p className="text-sm text-text-secondary">
                AI analyzes what you're really trying to accomplish, not just the words you use.
              </p>
            </div>
            <div className="text-center p-6 bg-neural-secondary rounded-lg border border-neural-tertiary">
              <div className="bg-ai-teal/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🔍</span>
              </div>
              <h3 className="text-lg font-semibold mb-3 text-text-primary">Semantic Matching</h3>
              <p className="text-sm text-text-secondary">
                Finds relevant content even when it doesn't contain your exact search terms.
              </p>
            </div>
            <div className="text-center p-6 bg-neural-secondary rounded-lg border border-neural-tertiary">
              <div className="bg-ai-purple/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📊</span>
              </div>
              <h3 className="text-lg font-semibold mb-3 text-text-primary">Relevance Ranking</h3>
              <p className="text-sm text-text-secondary">
                Results ranked by how well they match your specific needs and skill level.
              </p>
            </div>
            <div className="text-center p-6 bg-neural-secondary rounded-lg border border-neural-tertiary">
              <div className="bg-green-400/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🎯</span>
              </div>
              <h3 className="text-lg font-semibold mb-3 text-text-primary">Context Aware</h3>
              <p className="text-sm text-text-secondary">
                Considers your background and previous searches for personalized results.
              </p>
            </div>
          </div>
        </section>

        {/* Search Examples */}
        <section>
          <h2 className="text-3xl font-bold mb-8 text-center text-ai-blue">Search Examples</h2>
          <div className="space-y-6">
            <div className="bg-neural-secondary p-6 rounded-lg border border-neural-tertiary">
              <div className="flex items-start gap-4">
                <div className="bg-ai-blue/20 w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-sm">💡</span>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold mb-2 text-text-primary">Problem-Focused Search</h3>
                  <div className="bg-neural-tertiary/50 p-3 rounded mb-3">
                    <code className="text-ai-blue">"My React app is slow when handling large datasets"</code>
                  </div>
                  <p className="text-text-secondary">
                    AI understands you need performance optimization content, not general React tutorials.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-neural-secondary p-6 rounded-lg border border-neural-tertiary">
              <div className="flex items-start gap-4">
                <div className="bg-ai-teal/20 w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-sm">🎯</span>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold mb-2 text-text-primary">Goal-Oriented Search</h3>
                  <div className="bg-neural-tertiary/50 p-3 rounded mb-3">
                    <code className="text-ai-teal">"I want to transition from software engineering to product management"</code>
                  </div>
                  <p className="text-text-secondary">
                    Finds career transition guides, skill mapping content, and PM fundamentals for engineers.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-neural-secondary p-6 rounded-lg border border-neural-tertiary">
              <div className="flex items-start gap-4">
                <div className="bg-ai-purple/20 w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-sm">🔧</span>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold mb-2 text-text-primary">Implementation Search</h3>
                  <div className="bg-neural-tertiary/50 p-3 rounded mb-3">
                    <code className="text-ai-purple">"Best practices for deploying machine learning models in production"</code>
                  </div>
                  <p className="text-text-secondary">
                    Returns MLOps guides, deployment strategies, and real-world implementation case studies.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Search vs Traditional */}
        <section>
          <h2 className="text-3xl font-bold mb-8 text-center text-ai-teal">Smart Search vs Traditional Search</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-neural-secondary p-6 rounded-lg border border-neural-tertiary">
              <h3 className="text-xl font-semibold mb-4 text-red-400">Traditional Keyword Search</h3>
              <div className="space-y-3 text-sm">
                <div className="flex items-start gap-3">
                  <span className="text-red-400 mt-1">✗</span>
                  <span className="text-text-secondary">Requires exact keyword matches</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-red-400 mt-1">✗</span>
                  <span className="text-text-secondary">Misses relevant content with different terminology</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-red-400 mt-1">✗</span>
                  <span className="text-text-secondary">Doesn't understand context or intent</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-red-400 mt-1">✗</span>
                  <span className="text-text-secondary">Returns generic, poorly ranked results</span>
                </div>
              </div>
            </div>
            <div className="bg-neural-secondary p-6 rounded-lg border border-neural-tertiary">
              <h3 className="text-xl font-semibold mb-4 text-green-400">Mebooks.ai AI Search</h3>
              <div className="space-y-3 text-sm">
                <div className="flex items-start gap-3">
                  <span className="text-green-400 mt-1">✓</span>
                  <span className="text-text-secondary">Understands natural language queries</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-green-400 mt-1">✓</span>
                  <span className="text-text-secondary">Finds semantically related content</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-green-400 mt-1">✓</span>
                  <span className="text-text-secondary">Analyzes intent and provides context</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-green-400 mt-1">✓</span>
                  <span className="text-text-secondary">Curated, personalized recommendations</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="text-center bg-gradient-to-r from-ai-blue/10 to-ai-purple/10 p-8 rounded-lg border border-neural-tertiary">
          <h2 className="text-3xl font-bold mb-4 text-ai-blue">Experience Intelligent Search</h2>
          <p className="text-text-secondary mb-6 max-w-2xl mx-auto">
            Stop wasting time with irrelevant search results. Try our AI-powered search and find exactly what you need.
          </p>
          <button className="bg-ai-blue hover:bg-ai-blue/90 text-white px-8 py-3 rounded-lg font-semibold transition-colors">
            Try Smart Search Now
          </button>
        </section>
      </div>
    </PageContainer>
  );
}