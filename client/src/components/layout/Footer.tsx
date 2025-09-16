import { Link } from "wouter";
import { BookOpen, Twitter, Facebook, Instagram, Linkedin, Mail } from "lucide-react";

const navigation = {
  product: [
    { name: "Create Content", href: "/create" },
    { name: "Templates", href: "/templates" },
    { name: "Pricing", href: "/pricing" },
    { name: "Features", href: "/features" },
  ],
  company: [
    { name: "About", href: "/about" },
    { name: "Blog", href: "/blog" },
    { name: "Careers", href: "/careers" },
    { name: "Contact", href: "/contact" },
  ],
  support: [
    { name: "Help Center", href: "/help" },
    { name: "Community", href: "/community" },
    { name: "API Docs", href: "/docs" },
    { name: "Status", href: "/status" },
  ],
  legal: [
    { name: "Privacy Policy", href: "/privacy" },
    { name: "Terms of Service", href: "/terms" },
    { name: "Cookie Policy", href: "/cookies" },
    { name: "COPPA Compliance", href: "/coppa" },
  ],
};

const socialLinks = [
  {
    name: "Twitter",
    href: "#",
    icon: Twitter,
  },
  {
    name: "Facebook",
    href: "#",
    icon: Facebook,
  },
  {
    name: "Instagram",
    href: "#",
    icon: Instagram,
  },
  {
    name: "LinkedIn",
    href: "#",
    icon: Linkedin,
  },
];

export function Footer() {
  return (
    <footer className="bg-background border-t">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-12 lg:py-16">
          <div className="xl:grid xl:grid-cols-3 xl:gap-8">
            {/* Company info */}
            <div className="space-y-8 xl:col-span-1">
              <Link href="/" className="flex items-center space-x-2">
                <div className="flex items-center justify-center w-8 h-8 bg-gradient-to-r from-vebooks-primary to-vebooks-secondary rounded-lg">
                  <BookOpen className="h-5 w-5 text-white" />
                </div>
                <span className="font-poppins font-bold text-xl gradient-text">
                  Vebooks.ai
                </span>
              </Link>
              <p className="text-muted-foreground text-base max-w-md">
                Revolutionizing education through AI-powered content creation.
                Transform your learning preferences into engaging, customized
                books and videos for learners of all ages.
              </p>
              <div className="flex space-x-6">
                {socialLinks.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="text-muted-foreground hover:text-vebooks-primary transition-colors"
                  >
                    <span className="sr-only">{item.name}</span>
                    <item.icon className="h-6 w-6" />
                  </a>
                ))}
              </div>
            </div>

            {/* Navigation links */}
            <div className="mt-12 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
              <div className="md:grid md:grid-cols-2 md:gap-8">
                <div>
                  <h3 className="text-sm font-semibold text-foreground tracking-wider uppercase">
                    Product
                  </h3>
                  <ul className="mt-4 space-y-4">
                    {navigation.product.map((item) => (
                      <li key={item.name}>
                        <Link
                          href={item.href}
                          className="text-base text-muted-foreground hover:text-foreground transition-colors"
                        >
                          {item.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="mt-12 md:mt-0">
                  <h3 className="text-sm font-semibold text-foreground tracking-wider uppercase">
                    Company
                  </h3>
                  <ul className="mt-4 space-y-4">
                    {navigation.company.map((item) => (
                      <li key={item.name}>
                        <Link
                          href={item.href}
                          className="text-base text-muted-foreground hover:text-foreground transition-colors"
                        >
                          {item.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="md:grid md:grid-cols-2 md:gap-8">
                <div>
                  <h3 className="text-sm font-semibold text-foreground tracking-wider uppercase">
                    Support
                  </h3>
                  <ul className="mt-4 space-y-4">
                    {navigation.support.map((item) => (
                      <li key={item.name}>
                        <Link
                          href={item.href}
                          className="text-base text-muted-foreground hover:text-foreground transition-colors"
                        >
                          {item.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="mt-12 md:mt-0">
                  <h3 className="text-sm font-semibold text-foreground tracking-wider uppercase">
                    Legal
                  </h3>
                  <ul className="mt-4 space-y-4">
                    {navigation.legal.map((item) => (
                      <li key={item.name}>
                        <Link
                          href={item.href}
                          className="text-base text-muted-foreground hover:text-foreground transition-colors"
                        >
                          {item.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Newsletter subscription */}
          <div className="mt-12 border-t pt-8">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
              <div>
                <h3 className="text-sm font-semibold text-foreground tracking-wider uppercase">
                  Subscribe to our newsletter
                </h3>
                <p className="mt-2 text-base text-muted-foreground">
                  Get the latest updates on new features and educational content.
                </p>
              </div>
              <form className="mt-4 lg:mt-0 lg:ml-6">
                <div className="flex max-w-md">
                  <label htmlFor="email-address" className="sr-only">
                    Email address
                  </label>
                  <input
                    id="email-address"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="min-w-0 flex-1 rounded-l-lg border border-input bg-background px-4 py-2 text-base text-foreground placeholder:text-muted-foreground focus:border-ring focus:outline-none focus:ring-2 focus:ring-ring"
                    placeholder="Enter your email"
                  />
                  <button
                    type="submit"
                    className="flex-shrink-0 rounded-r-lg bg-vebooks-primary px-6 py-2 text-base font-medium text-white hover:bg-vebooks-primary/90 focus:outline-none focus:ring-2 focus:ring-vebooks-primary focus:ring-offset-2 transition-colors"
                  >
                    <Mail className="h-5 w-5" />
                    <span className="sr-only">Subscribe</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* Bottom section */}
        <div className="border-t py-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
            <p className="text-base text-muted-foreground">
              &copy; {new Date().getFullYear()} Vebooks.ai. All rights reserved.
            </p>
            <p className="mt-2 lg:mt-0 text-sm text-muted-foreground">
              Built with ❤️ for educators, parents, and learners worldwide.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}