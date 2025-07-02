
import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-neural-tertiary">
      <div className="container mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p className="text-text-muted">&copy; {new Date().getFullYear()} Mebooks.ai. All rights reserved.</p>
          <div className="flex space-x-6">
            <a href="#" className="text-text-secondary hover:text-text-primary transition-colors">Terms</a>
            <a href="#" className="text-text-secondary hover:text-text-primary transition-colors">Privacy</a>
            <a href="#" className="text-text-secondary hover:text-text-primary transition-colors">Contact</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
