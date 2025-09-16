import { useState } from "react";
import { Link } from "wouter";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Check,
  X,
  Star,
  Sparkles,
  Users,
  Building,
  Heart,
  GraduationCap,
  Zap,
  Crown,
  Shield,
  Headphones,
  Globe,
  BarChart3,
  Settings,
  ArrowRight,
} from "lucide-react";

const plans = {
  individual: [
    {
      id: "free",
      name: "Free Starter",
      price: "$0",
      period: "forever",
      description: "Perfect for trying out our platform",
      icon: Sparkles,
      color: "border-gray-200",
      popular: false,
      features: [
        "3 content pieces per month",
        "Basic AI content generation",
        "Standard templates",
        "PDF downloads",
        "Community support",
        "Basic illustrations",
      ],
      limitations: [
        "Watermarked content",
        "Standard quality exports",
        "No video creation",
        "No custom branding",
      ],
    },
    {
      id: "plus",
      name: "Individual Plus",
      price: "$9.99",
      period: "per month",
      description: "For serious individual creators",
      icon: Star,
      color: "border-vebooks-primary",
      popular: true,
      features: [
        "Unlimited content creation",
        "Advanced AI features",
        "All premium templates",
        "HD video creation",
        "Custom illustrations",
        "Multiple export formats",
        "Priority support",
        "No watermarks",
        "Analytics dashboard",
        "Custom branding",
      ],
      limitations: [],
    },
  ],
  family: [
    {
      id: "family",
      name: "Family Plan",
      price: "$19.99",
      period: "per month",
      description: "Perfect for families with multiple children",
      icon: Heart,
      color: "border-pink-500",
      popular: true,
      features: [
        "Up to 6 family members",
        "Unlimited content creation",
        "Child-safe content filters",
        "Parental controls & monitoring",
        "Family sharing library",
        "Custom character creation",
        "Progress tracking per child",
        "Educational games & activities",
        "Multiple learning styles",
        "Bedtime story collections",
        "COPPA compliant",
      ],
      limitations: [],
    },
  ],
  educator: [
    {
      id: "classroom",
      name: "Classroom",
      price: "$29.99",
      period: "per month",
      description: "For individual teachers and small classrooms",
      icon: GraduationCap,
      color: "border-blue-500",
      popular: false,
      features: [
        "Up to 30 students",
        "Unlimited content creation",
        "Classroom management tools",
        "Student progress tracking",
        "Assignment distribution",
        "Grade integration",
        "Curriculum alignment",
        "Professional templates",
        "Bulk content generation",
        "Parent communication tools",
      ],
      limitations: [],
    },
    {
      id: "school",
      name: "School License",
      price: "$99.99",
      period: "per month",
      description: "For schools and educational institutions",
      icon: Building,
      color: "border-purple-500",
      popular: true,
      features: [
        "Unlimited students & teachers",
        "School-wide content library",
        "Advanced analytics & reporting",
        "Administrator dashboard",
        "SSO integration",
        "LMS integration",
        "Custom branding",
        "Professional development resources",
        "Priority support",
        "Training sessions",
        "API access",
      ],
      limitations: [],
    },
  ],
  enterprise: [
    {
      id: "enterprise",
      name: "Enterprise",
      price: "Custom",
      period: "pricing",
      description: "For large organizations and districts",
      icon: Crown,
      color: "border-gold-500",
      popular: false,
      features: [
        "Unlimited everything",
        "Custom AI model training",
        "White-label solutions",
        "Advanced security & compliance",
        "Dedicated success manager",
        "Custom integrations",
        "On-premise deployment options",
        "Advanced analytics suite",
        "Custom contract terms",
        "24/7 priority support",
        "Professional services",
        "Regulatory compliance",
      ],
      limitations: [],
    },
  ],
};

const addOns = [
  {
    id: "premium-voice",
    name: "Premium Voice Pack",
    price: "$4.99/month",
    description: "Professional narrators and multiple voice options",
    icon: Headphones,
  },
  {
    id: "advanced-analytics",
    name: "Advanced Analytics",
    price: "$9.99/month",
    description: "Detailed learning insights and progress tracking",
    icon: BarChart3,
  },
  {
    id: "api-access",
    name: "API Access",
    price: "$19.99/month",
    description: "Integrate Vebooks.ai with your existing tools",
    icon: Settings,
  },
];

const faqs = [
  {
    question: "Can I change plans anytime?",
    answer: "Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately, and we'll prorate any billing adjustments.",
  },
  {
    question: "Is there a free trial for paid plans?",
    answer: "Yes! All paid plans come with a 14-day free trial. No credit card required to start your trial.",
  },
  {
    question: "What content formats can I create?",
    answer: "You can create interactive eBooks, educational videos, workbooks, and personalized stories in multiple formats including PDF, EPUB, MP4, and interactive web content.",
  },
  {
    question: "Is my content COPPA compliant?",
    answer: "Yes, all content created on our platform is COPPA compliant. We have built-in safety measures and content moderation to ensure child-appropriate content.",
  },
  {
    question: "Do you offer volume discounts?",
    answer: "Yes, we offer volume discounts for large organizations, school districts, and bulk licenses. Contact our sales team for custom pricing.",
  },
];

export default function PricingPage() {
  const [billingCycle, setBillingCycle] = useState("monthly");
  const [selectedCategory, setSelectedCategory] = useState("individual");

  const getDiscountedPrice = (price: string) => {
    if (billingCycle === "annual" && price !== "$0" && price !== "Custom") {
      const numPrice = parseFloat(price.replace("$", ""));
      const discountedPrice = (numPrice * 12 * 0.8).toFixed(2);
      return `$${discountedPrice}`;
    }
    return billingCycle === "annual" && price !== "$0" && price !== "Custom"
      ? `$${(parseFloat(price.replace("$", "")) * 12).toFixed(2)}`
      : price;
  };

  const currentPlans = plans[selectedCategory as keyof typeof plans];

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-6xl font-poppins font-bold mb-4">
          Simple, <span className="gradient-text">Transparent</span> Pricing
        </h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Choose the plan that fits your needs. Start creating amazing educational content today with our AI-powered platform.
        </p>
      </div>

      {/* Billing Toggle */}
      <div className="flex justify-center mb-8">
        <div className="flex items-center space-x-4 bg-muted p-1 rounded-lg">
          <button
            onClick={() => setBillingCycle("monthly")}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              billingCycle === "monthly"
                ? "bg-background text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Monthly
          </button>
          <button
            onClick={() => setBillingCycle("annual")}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors flex items-center space-x-2 ${
              billingCycle === "annual"
                ? "bg-background text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <span>Annual</span>
            <Badge variant="secondary" className="text-xs">Save 20%</Badge>
          </button>
        </div>
      </div>

      {/* Plan Category Tabs */}
      <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="mb-12">
        <TabsList className="grid w-full grid-cols-4 max-w-2xl mx-auto">
          <TabsTrigger value="individual" className="flex items-center gap-2">
            <Star className="h-4 w-4" />
            Individual
          </TabsTrigger>
          <TabsTrigger value="family" className="flex items-center gap-2">
            <Heart className="h-4 w-4" />
            Family
          </TabsTrigger>
          <TabsTrigger value="educator" className="flex items-center gap-2">
            <GraduationCap className="h-4 w-4" />
            Educator
          </TabsTrigger>
          <TabsTrigger value="enterprise" className="flex items-center gap-2">
            <Building className="h-4 w-4" />
            Enterprise
          </TabsTrigger>
        </TabsList>
      </Tabs>

      {/* Pricing Cards */}
      <div className={`grid gap-8 mb-16 ${
        currentPlans.length === 1 ? "max-w-md mx-auto" :
        currentPlans.length === 2 ? "md:grid-cols-2 max-w-4xl mx-auto" :
        "md:grid-cols-2 lg:grid-cols-3"
      }`}>
        {currentPlans.map((plan) => (
          <Card
            key={plan.id}
            className={`relative ${plan.color} ${
              plan.popular ? "shadow-lg ring-2 ring-vebooks-primary" : ""
            }`}
          >
            {plan.popular && (
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <Badge className="bg-vebooks-primary text-white">Most Popular</Badge>
              </div>
            )}

            <CardHeader className="text-center">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-gradient-to-r from-vebooks-primary to-vebooks-secondary rounded-lg flex items-center justify-center">
                  <plan.icon className="h-8 w-8 text-white" />
                </div>
              </div>
              <CardTitle className="text-2xl">{plan.name}</CardTitle>
              <CardDescription>{plan.description}</CardDescription>
              <div className="pt-4">
                <div className="text-4xl font-bold">
                  {getDiscountedPrice(plan.price)}
                  {plan.price !== "$0" && plan.price !== "Custom" && billingCycle === "annual" && (
                    <div className="text-lg text-muted-foreground line-through">
                      ${(parseFloat(plan.price.replace("$", "")) * 12).toFixed(2)}/year
                    </div>
                  )}
                </div>
                <div className="text-sm text-muted-foreground">
                  {billingCycle === "annual" && plan.price !== "$0" && plan.price !== "Custom"
                    ? "per year"
                    : plan.period}
                </div>
              </div>
            </CardHeader>

            <CardContent className="space-y-6">
              <div>
                <h4 className="font-semibold mb-3 flex items-center">
                  <Check className="h-4 w-4 text-green-500 mr-2" />
                  What's included
                </h4>
                <ul className="space-y-2">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start text-sm">
                      <Check className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              {plan.limitations.length > 0 && (
                <div>
                  <h4 className="font-semibold mb-3 flex items-center">
                    <X className="h-4 w-4 text-red-500 mr-2" />
                    Limitations
                  </h4>
                  <ul className="space-y-2">
                    {plan.limitations.map((limitation, index) => (
                      <li key={index} className="flex items-start text-sm text-muted-foreground">
                        <X className="h-4 w-4 text-red-500 mr-2 mt-0.5 flex-shrink-0" />
                        {limitation}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <Button
                className="w-full"
                variant={plan.popular ? "gradient" : "outline"}
                size="lg"
                asChild
              >
                <Link href={plan.id === "enterprise" ? "/contact" : "/register"}>
                  {plan.id === "enterprise" ? "Contact Sales" : plan.id === "free" ? "Get Started Free" : "Start Free Trial"}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>

              {plan.id !== "free" && plan.id !== "enterprise" && (
                <p className="text-xs text-center text-muted-foreground">
                  14-day free trial • No credit card required
                </p>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Add-ons */}
      <div className="mb-16">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-4">Enhance Your Experience</h2>
          <p className="text-muted-foreground">
            Optional add-ons to supercharge your content creation
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {addOns.map((addon) => (
            <Card key={addon.id} className="text-center">
              <CardHeader>
                <div className="flex justify-center mb-3">
                  <div className="w-12 h-12 bg-vebooks-primary/10 rounded-lg flex items-center justify-center">
                    <addon.icon className="h-6 w-6 text-vebooks-primary" />
                  </div>
                </div>
                <CardTitle className="text-lg">{addon.name}</CardTitle>
                <CardDescription>{addon.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold mb-4">{addon.price}</div>
                <Button variant="outline" className="w-full">
                  Add to Plan
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Features Comparison */}
      <div className="mb-16">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-4">Compare Features</h2>
          <p className="text-muted-foreground">
            See what's included in each plan at a glance
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-border rounded-lg">
            <thead>
              <tr className="bg-muted">
                <th className="border border-border p-4 text-left">Feature</th>
                <th className="border border-border p-4 text-center">Free</th>
                <th className="border border-border p-4 text-center">Plus</th>
                <th className="border border-border p-4 text-center">Family</th>
                <th className="border border-border p-4 text-center">Educator</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-border p-4">Content pieces per month</td>
                <td className="border border-border p-4 text-center">3</td>
                <td className="border border-border p-4 text-center">Unlimited</td>
                <td className="border border-border p-4 text-center">Unlimited</td>
                <td className="border border-border p-4 text-center">Unlimited</td>
              </tr>
              <tr>
                <td className="border border-border p-4">AI content generation</td>
                <td className="border border-border p-4 text-center">Basic</td>
                <td className="border border-border p-4 text-center">Advanced</td>
                <td className="border border-border p-4 text-center">Advanced</td>
                <td className="border border-border p-4 text-center">Advanced</td>
              </tr>
              <tr>
                <td className="border border-border p-4">Video creation</td>
                <td className="border border-border p-4 text-center"><X className="h-4 w-4 text-red-500 mx-auto" /></td>
                <td className="border border-border p-4 text-center"><Check className="h-4 w-4 text-green-500 mx-auto" /></td>
                <td className="border border-border p-4 text-center"><Check className="h-4 w-4 text-green-500 mx-auto" /></td>
                <td className="border border-border p-4 text-center"><Check className="h-4 w-4 text-green-500 mx-auto" /></td>
              </tr>
              <tr>
                <td className="border border-border p-4">Custom branding</td>
                <td className="border border-border p-4 text-center"><X className="h-4 w-4 text-red-500 mx-auto" /></td>
                <td className="border border-border p-4 text-center"><Check className="h-4 w-4 text-green-500 mx-auto" /></td>
                <td className="border border-border p-4 text-center"><Check className="h-4 w-4 text-green-500 mx-auto" /></td>
                <td className="border border-border p-4 text-center"><Check className="h-4 w-4 text-green-500 mx-auto" /></td>
              </tr>
              <tr>
                <td className="border border-border p-4">Analytics dashboard</td>
                <td className="border border-border p-4 text-center"><X className="h-4 w-4 text-red-500 mx-auto" /></td>
                <td className="border border-border p-4 text-center">Basic</td>
                <td className="border border-border p-4 text-center">Advanced</td>
                <td className="border border-border p-4 text-center">Advanced</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* FAQ */}
      <div className="mb-16">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
          <p className="text-muted-foreground">
            Got questions? We've got answers.
          </p>
        </div>

        <div className="max-w-3xl mx-auto space-y-6">
          {faqs.map((faq, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle className="text-lg">{faq.question}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{faq.answer}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="text-center bg-gradient-to-r from-vebooks-primary to-vebooks-secondary rounded-lg p-8 text-white">
        <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
        <p className="text-xl mb-6 opacity-90">
          Join thousands of educators and creators using Vebooks.ai to transform learning
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" variant="secondary" asChild>
            <Link href="/register">
              Start Free Trial
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
          <Button size="lg" variant="outline" className="text-white border-white hover:bg-white hover:text-vebooks-primary" asChild>
            <Link href="/contact">
              Contact Sales
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}