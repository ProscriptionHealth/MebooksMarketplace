import { Switch, Route } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { TechBackground } from "@/components/TechBackground";
import HomePage from "@/pages/HomePage";
import WhyWeDoPage from "@/pages/about/WhyWeDoPage";
import WhatWeDoPage from "@/pages/about/WhatWeDoPage";
import HowWeDoPage from "@/pages/about/HowWeDoPage";
import HowItWorksPage from "@/pages/HowItWorksPage";
import AuthorsPage from "@/pages/AuthorsPage";
import SeekersPage from "@/pages/SeekersPage";
import SellEbooksPage from "@/pages/authors/SellEbooksPage";
import AuthorsHowItWorksPage from "@/pages/howItWorks/AuthorsHowItWorksPage";
import SeekersHowItWorksPage from "@/pages/howItWorks/SeekersHowItWorksPage";
import UpSkillPage from "@/pages/seekers/UpSkillPage";
import SearchPage from "@/pages/seekers/SearchPage";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={HomePage} />
      
      {/* About routes */}
      <Route path="/about/why-we-do" component={WhyWeDoPage} />
      <Route path="/about/what-we-do" component={WhatWeDoPage} />
      <Route path="/about/how-we-do" component={HowWeDoPage} />
    
      {/* Authors routes */}
      <Route path="/authors" component={AuthorsPage} />
      <Route path="/authors/sell-ebooks" component={SellEbooksPage} />
      
      {/* How It Works routes */}
      <Route path="/how-it-works" component={HowItWorksPage} />
      <Route path="/how-it-works/authors" component={AuthorsHowItWorksPage} />
      <Route path="/how-it-works/seekers" component={SeekersHowItWorksPage} />
      
      {/* Seekers routes */}
      <Route path="/seekers" component={SeekersPage} />
      <Route path="/seekers/upskill" component={UpSkillPage} />
      <Route path="/seekers/search" component={SearchPage} />
      
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <div className="min-h-screen flex flex-col" style={{backgroundColor: '#0f0f23', color: '#ffffff'}}>
          <TechBackground />
          <Header />
          <main className="flex-1 relative z-10">
            <Router />
          </main>
          
          {/* Description Section Above Footer */}
          <section className="relative z-10 py-8 bg-neural-secondary/30">
            <div className="container mx-auto px-4 text-center">
              <p className="text-lg md:text-xl text-text-secondary max-w-3xl mx-auto" style={{color: '#94a3b8'}}>
                Go from idea to expert with curated ebooks on AI, Product, and Engineering. 
                Find exactly what you need with our intelligent search.
              </p>
            </div>
          </section>
          
          <Footer />
        </div>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
