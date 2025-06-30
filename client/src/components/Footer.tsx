export const Footer = () => {
  return (
    <footer className="bg-neural-secondary border-t border-neural-tertiary mt-auto">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand section */}
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-lg font-bold text-text-primary mb-4">Mebooks.ai</h3>
            <p className="text-text-secondary text-sm">
              The AI-powered ebook marketplace where knowledge meets innovation. 
              Find curated content from industry experts and accelerate your learning journey.
            </p>
          </div>
          
          {/* Quick links */}
          <div>
            <h4 className="text-sm font-semibold text-text-primary mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-text-secondary hover:text-ai-teal transition-colors">Browse Ebooks</a></li>
              <li><a href="#" className="text-text-secondary hover:text-ai-teal transition-colors">Become an Author</a></li>
              <li><a href="#" className="text-text-secondary hover:text-ai-teal transition-colors">About Us</a></li>
              <li><a href="#" className="text-text-secondary hover:text-ai-teal transition-colors">Contact</a></li>
            </ul>
          </div>
          
          {/* Support */}
          <div>
            <h4 className="text-sm font-semibold text-text-primary mb-4">Support</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-text-secondary hover:text-ai-teal transition-colors">Help Center</a></li>
              <li><a href="#" className="text-text-secondary hover:text-ai-teal transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="text-text-secondary hover:text-ai-teal transition-colors">Terms of Service</a></li>
              <li><a href="#" className="text-text-secondary hover:text-ai-teal transition-colors">Refund Policy</a></li>
            </ul>
          </div>
        </div>
        
        {/* Copyright */}
        <div className="border-t border-neural-tertiary mt-8 pt-8 text-center">
          <p className="text-text-muted text-sm">
            © 2024 Mebooks.ai. All rights reserved. Built for the AI community.
          </p>
        </div>
      </div>
    </footer>
  );
};
