export default function WhyWeDoPage() {
  return (
    <div className="container mx-auto px-4 md:px-8 py-8 md:py-12">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-text-primary mb-6">
            Why We Do What We Do
          </h1>
          <p className="text-xl text-text-secondary">
            Our mission to democratize AI knowledge and empower the next generation of innovators.
          </p>
        </div>
        
        <div className="space-y-12">
          {/* Mission statement */}
          <section className="bg-neural-secondary rounded-lg p-8">
            <h2 className="text-2xl font-bold text-ai-teal mb-4">Our Mission</h2>
            <p className="text-text-secondary leading-relaxed">
              We believe that AI knowledge should be accessible to everyone, not just those with deep pockets or 
              extensive academic backgrounds. Our platform bridges the gap between cutting-edge AI research and 
              practical implementation, making expert knowledge available to practitioners, entrepreneurs, and 
              learners worldwide.
            </p>
          </section>
          
          {/* Problem statement */}
          <section className="bg-neural-secondary rounded-lg p-8">
            <h2 className="text-2xl font-bold text-ai-blue mb-4">The Problem We Solve</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold text-text-primary mb-2">Knowledge Gap</h3>
                <p className="text-text-secondary text-sm">
                  Traditional education systems move too slowly to keep up with AI advancements, 
                  leaving practitioners behind.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-text-primary mb-2">Access Barriers</h3>
                <p className="text-text-secondary text-sm">
                  High costs and limited access prevent many from accessing quality AI education 
                  and resources.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-text-primary mb-2">Information Overload</h3>
                <p className="text-text-secondary text-sm">
                  With countless resources available, it's difficult to find quality, 
                  curated content that matches your skill level.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-text-primary mb-2">Expert Disconnect</h3>
                <p className="text-text-secondary text-sm">
                  Industry experts often lack platforms to easily share their knowledge 
                  with the broader community.
                </p>
              </div>
            </div>
          </section>

          {/* Vision */}
          <section className="bg-neural-secondary rounded-lg p-8">
            <h2 className="text-2xl font-bold text-ai-purple mb-4">Our Vision</h2>
            <p className="text-text-secondary leading-relaxed">
              We envision a world where AI knowledge flows freely between experts and learners, 
              where anyone with curiosity and dedication can access world-class education, 
              and where innovation is accelerated through shared understanding. 
              Our platform is the catalyst for this transformation.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
