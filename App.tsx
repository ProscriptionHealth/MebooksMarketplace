
import React, { useState, useEffect, useCallback } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { TechBackground } from './components/TechBackground';

// Import Pages
import { HomePage } from './src/pages/HomePage';
import { WhyWeDoPage } from './src/pages/About/WhyWeDoPage';
import { WhatWeDoPage } from './src/pages/About/WhatWeDoPage';
import { HowWeDoPage } from './src/pages/About/HowWeDoPage';
import { HowItWorksPage } from './src/pages/HowItWorks/HowItWorksPage';
import { AuthorsPage } from './src/pages/Authors/Sellebooks';
import { SeekersPage } from './src/pages/Seekers/SeekersPage';

const routes: { [key: string]: React.FC } = {
  '/': HomePage,
  '/about/why-we-do': WhyWeDoPage,
  '/about/what-we-do': WhatWeDoPage,
  '/about/how-we-do': HowWeDoPage,
  '/how-it-works': HowItWorksPage,
  '/authors': AuthorsPage,
  '/seekers': SeekersPage,
};

const App: React.FC = () => {
  const [route, setRoute] = useState(window.location.pathname);

  const handleNavigation = (path: string) => {
    window.history.pushState({}, '', path);
    setRoute(path);
    window.scrollTo(0, 0); // Scroll to top on page change
  };

  useEffect(() => {
    const handlePopState = () => {
      setRoute(window.location.pathname);
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const CurrentPage = routes[route] || HomePage; // Fallback to HomePage

  return (
    <div className="min-h-screen font-sans text-text-primary flex flex-col relative">
      <TechBackground key={route} />
      <Header onNavigate={handleNavigation} />
      <main className="flex-grow container mx-auto px-4 md:px-8 py-8 md:py-12 z-10">
        <CurrentPage />
      </main>
      <Footer />
    </div>
  );
};

export default App;