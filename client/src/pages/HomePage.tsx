import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  BookOpen,
  Sparkles,
  Users,
  Star,
  ArrowRight,
  PlayCircle,
  Brain,
  Heart,
  Globe,
  Shield,
  Palette,
  Video,
} from "lucide-react";

const features = [
  {
    icon: Brain,
    title: "AI-Powered Generation",
    description: "Advanced AI creates personalized content based on your preferences and learning style.",
  },
  {
    icon: Palette,
    title: "Custom Illustrations",
    description: "Beautiful, personalized illustrations generated to match your content perfectly.",
  },
  {
    icon: Video,
    title: "Video Creation",
    description: "Transform written content into engaging educational videos with voiceover.",
  },
  {
    icon: Users,
    title: "Multi-User Support",
    description: "Family accounts, educator tools, and collaborative creation features.",
  },
  {
    icon: Shield,
    title: "Child-Safe Content",
    description: "COPPA-compliant platform with advanced content moderation and parental controls.",
  },
  {
    icon: Globe,
    title: "Multi-Language",
    description: "Create content in multiple languages with cultural sensitivity.",
  },
];

const useCases = [
  {
    title: "Parents",
    description: "Create personalized children's books featuring your child's name and interests",
    icon: Heart,
    color: "from-pink-500 to-rose-500",
  },
  {
    title: "Educators",
    description: "Develop customized classroom materials that address diverse student needs",
    icon: BookOpen,
    color: "from-blue-500 to-indigo-500",
  },
  {
    title: "Students",
    description: "Generate custom study guides tailored to your learning style and pace",
    icon: Star,
    color: "from-yellow-500 to-orange-500",
  },
  {
    title: "Authors",
    description: "Leverage AI to create professional-quality educational content efficiently",
    icon: Sparkles,
    color: "from-purple-500 to-violet-500",
  },
];

const stats = [
  { label: "Content Created", value: "50K+", icon: BookOpen },
  { label: "Active Users", value: "10K+", icon: Users },
  { label: "Languages Supported", value: "25+", icon: Globe },
  { label: "Customer Satisfaction", value: "98%", icon: Star },
];

export default function HomePage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-vebooks-primary/5 to-vebooks-secondary/5"></div>
        <div className="container mx-auto px-4 relative">
          <div className="text-center max-w-4xl mx-auto">
            <div className="flex justify-center mb-6">
              <div className="flex items-center space-x-2 bg-white rounded-full px-4 py-2 shadow-lg border">
                <Sparkles className="h-5 w-5 text-vebooks-primary" />
                <span className="text-sm font-medium text-vebooks-primary">
                  AI-Powered Educational Content
                </span>
              </div>
            </div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-poppins font-bold mb-6">
              Create{" "}
              <span className="gradient-text">Personalized</span>{" "}
              Learning Content with AI
            </h1>

            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Transform your learning preferences into engaging, customized books and videos.
              Perfect for educators, parents, students, and content creators.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <Button size="xl" variant="gradient" asChild>
                <Link href="/create">
                  <Sparkles className="mr-2 h-5 w-5" />
                  Start Creating Free
                </Link>
              </Button>
              <Button size="xl" variant="outline" asChild>
                <Link href="/templates">
                  <PlayCircle className="mr-2 h-5 w-5" />
                  Watch Demo
                </Link>
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-2xl mx-auto">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="flex justify-center mb-2">
                    <stat.icon className="h-6 w-6 text-vebooks-primary" />
                  </div>
                  <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-poppins font-bold mb-4">
              Powerful Features for{" "}
              <span className="gradient-text">Every Creator</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Our AI-powered platform provides everything you need to create
              engaging educational content tailored to your audience.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-vebooks-primary/10 rounded-lg">
                      <feature.icon className="h-6 w-6 text-vebooks-primary" />
                    </div>
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-poppins font-bold mb-4">
              Perfect for{" "}
              <span className="gradient-text">Every Learning Journey</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Whether you're a parent, educator, student, or content creator,
              Vebooks.ai adapts to your unique needs and goals.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {useCases.map((useCase, index) => (
              <Card key={index} className="text-center border-0 shadow-lg hover:shadow-xl transition-all hover:scale-105">
                <CardHeader>
                  <div className="mx-auto mb-4">
                    <div className={`w-16 h-16 rounded-full bg-gradient-to-r ${useCase.color} flex items-center justify-center`}>
                      <useCase.icon className="h-8 w-8 text-white" />
                    </div>
                  </div>
                  <CardTitle className="text-2xl">{useCase.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    {useCase.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-poppins font-bold mb-4">
              How It Works
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Create personalized educational content in just a few simple steps.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              {
                step: "1",
                title: "Answer Questions",
                description: "Tell us about your learning preferences, interests, and goals through our intelligent questionnaire.",
                icon: Brain,
              },
              {
                step: "2",
                title: "AI Creates Content",
                description: "Our advanced AI generates personalized educational content, including text, images, and videos.",
                icon: Sparkles,
              },
              {
                step: "3",
                title: "Download & Share",
                description: "Get your custom content in multiple formats and share it with your learners or students.",
                icon: BookOpen,
              },
            ].map((step, index) => (
              <div key={index} className="text-center">
                <div className="relative mb-6">
                  <div className="w-16 h-16 mx-auto bg-vebooks-primary rounded-full flex items-center justify-center text-white text-2xl font-bold">
                    {step.step}
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-vebooks-secondary rounded-full flex items-center justify-center">
                    <step.icon className="h-4 w-4 text-white" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-vebooks-primary to-vebooks-secondary">
        <div className="container mx-auto px-4">
          <div className="text-center text-white">
            <h2 className="text-3xl md:text-5xl font-poppins font-bold mb-4">
              Ready to Transform Learning?
            </h2>
            <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
              Join thousands of educators, parents, and creators who are already
              using Vebooks.ai to create amazing educational content.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="xl" variant="secondary" asChild>
                <Link href="/register">
                  Get Started Free
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button size="xl" variant="outline" className="text-white border-white hover:bg-white hover:text-vebooks-primary" asChild>
                <Link href="/pricing">
                  View Pricing
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}