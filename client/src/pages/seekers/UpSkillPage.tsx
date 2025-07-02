
import { PageContainer } from '../../components/PageContainer';

export default function UpSkillPage() {
  return (
    <PageContainer
      title="UpSkill"
      subtitle="Stay ahead in your career with curated learning paths designed by industry experts."
    >
      <div className="space-y-12">
        {/* Skills Assessment */}
        <section className="bg-gradient-to-br from-ai-purple/10 to-ai-blue/10 p-8 rounded-lg border border-neural-tertiary">
          <h2 className="text-3xl font-bold mb-6 text-ai-purple">Personalized Learning Paths</h2>
          <p className="text-lg text-text-secondary mb-6 max-w-3xl mx-auto">
            Our AI analyzes your current skills and career goals to create personalized learning recommendations 
            that advance your expertise efficiently.
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center p-6 bg-neural-secondary rounded-lg border border-neural-tertiary">
              <div className="text-3xl mb-4">📊</div>
              <h3 className="text-lg font-semibold mb-2 text-text-primary">Skill Assessment</h3>
              <p className="text-sm text-text-secondary">AI evaluates your current knowledge and identifies gaps</p>
            </div>
            <div className="text-center p-6 bg-neural-secondary rounded-lg border border-neural-tertiary">
              <div className="text-3xl mb-4">🎯</div>
              <h3 className="text-lg font-semibold mb-2 text-text-primary">Goal Setting</h3>
              <p className="text-sm text-text-secondary">Define your career objectives and learning priorities</p>
            </div>
            <div className="text-center p-6 bg-neural-secondary rounded-lg border border-neural-tertiary">
              <div className="text-3xl mb-4">📚</div>
              <h3 className="text-lg font-semibold mb-2 text-text-primary">Curated Path</h3>
              <p className="text-sm text-text-secondary">Receive a personalized sequence of ebooks to master</p>
            </div>
          </div>
        </section>

        {/* Popular Skill Tracks */}
        <section>
          <h2 className="text-3xl font-bold mb-8 text-center text-ai-blue">Popular Skill Tracks</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-neural-secondary p-8 rounded-lg border border-neural-tertiary">
              <div className="flex items-center mb-4">
                <div className="bg-ai-teal/20 w-12 h-12 rounded-lg flex items-center justify-center mr-4">
                  <span className="text-xl">🤖</span>
                </div>
                <h3 className="text-xl font-semibold text-text-primary">AI & Machine Learning</h3>
              </div>
              <p className="text-text-secondary mb-4">
                From fundamentals to advanced implementation, master AI technologies that are reshaping industries.
              </p>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-text-secondary">Beginner to Advanced</span>
                  <span className="text-ai-teal font-semibold">12 ebooks</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-secondary">Est. completion</span>
                  <span className="text-ai-teal font-semibold">8-12 weeks</span>
                </div>
              </div>
            </div>

            <div className="bg-neural-secondary p-8 rounded-lg border border-neural-tertiary">
              <div className="flex items-center mb-4">
                <div className="bg-ai-blue/20 w-12 h-12 rounded-lg flex items-center justify-center mr-4">
                  <span className="text-xl">💻</span>
                </div>
                <h3 className="text-xl font-semibold text-text-primary">Full-Stack Development</h3>
              </div>
              <p className="text-text-secondary mb-4">
                Build modern web applications with the latest frameworks, tools, and best practices.
              </p>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-text-secondary">Intermediate to Advanced</span>
                  <span className="text-ai-blue font-semibold">15 ebooks</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-secondary">Est. completion</span>
                  <span className="text-ai-blue font-semibold">10-16 weeks</span>
                </div>
              </div>
            </div>

            <div className="bg-neural-secondary p-8 rounded-lg border border-neural-tertiary">
              <div className="flex items-center mb-4">
                <div className="bg-ai-purple/20 w-12 h-12 rounded-lg flex items-center justify-center mr-4">
                  <span className="text-xl">📊</span>
                </div>
                <h3 className="text-xl font-semibold text-text-primary">Data Science & Analytics</h3>
              </div>
              <p className="text-text-secondary mb-4">
                Transform raw data into actionable insights using cutting-edge tools and methodologies.
              </p>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-text-secondary">Beginner to Advanced</span>
                  <span className="text-ai-purple font-semibold">14 ebooks</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-secondary">Est. completion</span>
                  <span className="text-ai-purple font-semibold">12-18 weeks</span>
                </div>
              </div>
            </div>

            <div className="bg-neural-secondary p-8 rounded-lg border border-neural-tertiary">
              <div className="flex items-center mb-4">
                <div className="bg-green-400/20 w-12 h-12 rounded-lg flex items-center justify-center mr-4">
                  <span className="text-xl">🚀</span>
                </div>
                <h3 className="text-xl font-semibold text-text-primary">Product Management</h3>
              </div>
              <p className="text-text-secondary mb-4">
                Lead product strategy and execution in tech companies with proven frameworks and methodologies.
              </p>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-text-secondary">Intermediate to Expert</span>
                  <span className="text-green-400 font-semibold">10 ebooks</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-secondary">Est. completion</span>
                  <span className="text-green-400 font-semibold">6-10 weeks</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Learning Approach */}
        <section>
          <h2 className="text-3xl font-bold mb-8 text-center text-ai-teal">How UpSkill Works</h2>
          <div className="space-y-6">
            <div className="flex items-start gap-6 p-6 bg-neural-secondary rounded-lg border border-neural-tertiary">
              <div className="bg-ai-teal text-white rounded-full w-10 h-10 flex items-center justify-center font-bold flex-shrink-0">1</div>
              <div>
                <h3 className="text-xl font-semibold mb-2 text-text-primary">Assess Current Skills</h3>
                <p className="text-text-secondary">
                  Take a quick assessment or tell us about your background. Our AI identifies your strengths and learning opportunities.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-6 p-6 bg-neural-secondary rounded-lg border border-neural-tertiary">
              <div className="bg-ai-teal text-white rounded-full w-10 h-10 flex items-center justify-center font-bold flex-shrink-0">2</div>
              <div>
                <h3 className="text-xl font-semibold mb-2 text-text-primary">Choose Your Path</h3>
                <p className="text-text-secondary">
                  Select from AI-recommended learning tracks or create a custom path based on your specific goals.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-6 p-6 bg-neural-secondary rounded-lg border border-neural-tertiary">
              <div className="bg-ai-teal text-white rounded-full w-10 h-10 flex items-center justify-center font-bold flex-shrink-0">3</div>
              <div>
                <h3 className="text-xl font-semibold mb-2 text-text-primary">Learn at Your Pace</h3>
                <p className="text-text-secondary">
                  Progress through carefully sequenced ebooks, with AI tracking your advancement and adjusting recommendations.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Success Metrics */}
        <section className="bg-gradient-to-r from-ai-teal/10 to-ai-blue/10 p-8 rounded-lg border border-neural-tertiary">
          <h2 className="text-3xl font-bold mb-6 text-center text-ai-teal">UpSkill Success Stories</h2>
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-ai-teal mb-2">89%</div>
              <p className="text-text-secondary">Complete their chosen learning path</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-ai-blue mb-2">73%</div>
              <p className="text-text-secondary">Report career advancement within 6 months</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-ai-purple mb-2">4.8/5</div>
              <p className="text-text-secondary">Average satisfaction rating</p>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="text-center">
          <h2 className="text-3xl font-bold mb-4 text-ai-teal">Ready to UpSkill?</h2>
          <p className="text-text-secondary mb-6 max-w-2xl mx-auto">
            Start your personalized learning journey today. Our AI will guide you through the most efficient path to mastery.
          </p>
          <button className="bg-ai-teal hover:bg-ai-teal/90 text-white px-8 py-3 rounded-lg font-semibold transition-colors">
            Start Skill Assessment
          </button>
        </section>
      </div>
    </PageContainer>
  );
}