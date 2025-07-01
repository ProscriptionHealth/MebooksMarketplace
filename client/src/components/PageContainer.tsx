import React from 'react';

interface PageContainerProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}

export const PageContainer: React.FC<PageContainerProps> = ({ title, subtitle, children }) => {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-text-primary">{title}</h1>
        {subtitle && (
          <p className="text-xl text-text-secondary max-w-3xl mx-auto leading-relaxed">
            {subtitle}
          </p>
        )}
      </div>
      {children}
    </div>
  );
};