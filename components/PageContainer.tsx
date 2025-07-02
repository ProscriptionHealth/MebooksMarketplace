import React from 'react';

interface PageContainerProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}

export const PageContainer: React.FC<PageContainerProps> = ({ title, subtitle, children }) => {
  return (
    <div className="animate-fade-in max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-ai-teal via-ai-blue to-ai-purple">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-4 max-w-3xl mx-auto text-lg md:text-xl text-text-secondary">
            {subtitle}
          </p>
        )}
      </div>
      <div className="space-y-12">
        {children}
      </div>
    </div>
  );
};