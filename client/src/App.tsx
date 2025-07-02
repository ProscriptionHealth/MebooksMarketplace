import { useState } from "react";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { TechBackground } from "./components/TechBackground";
import HomePage from "./pages/HomePage";

function App() {
  const [currentPage, setCurrentPage] = useState('/');

  const handleNavigate = (path: string) => {
    setCurrentPage(path);
  };

  const renderPage = () => {
    switch (currentPage) {
      case '/':
        return <HomePage />;
      case '/about':
        return (
          <div className="min-h-screen pt-16">
            <div className="max-w-4xl mx-auto px-4 py-16">
              <h1 className="text-4xl font-bold text-ai-blue mb-8">About Mebooks.ai</h1>
              <p className="text-lg text-gray-700 mb-6">
                Mebooks.ai is your premier destination for AI-focused educational content.
              </p>
              <p className="text-lg text-gray-700">
                We connect knowledge seekers with expert authors in the AI field through our unique $0.25 flat-fee model.
              </p>
            </div>
          </div>
        );
      case '/authors':
        return (
          <div className="min-h-screen pt-16">
            <div className="max-w-4xl mx-auto px-4 py-16">
              <h1 className="text-4xl font-bold text-ai-blue mb-8">Authors</h1>
              <p className="text-lg text-gray-700 mb-6">
                Join our community of expert authors and share your knowledge with the world.
              </p>
              <p className="text-lg text-gray-700">
                Earn from your expertise with our transparent revenue sharing model.
              </p>
            </div>
          </div>
        );
      case '/how-it-works':
        return (
          <div className="min-h-screen pt-16">
            <div className="max-w-4xl mx-auto px-4 py-16">
              <h1 className="text-4xl font-bold text-ai-blue mb-8">How It Works</h1>
              <p className="text-lg text-gray-700 mb-6">
                Our platform makes it easy to discover, purchase, and access AI-focused educational content.
              </p>
              <p className="text-lg text-gray-700">
                With our $0.25 flat fee model, learning is accessible to everyone.
              </p>
            </div>
          </div>
        );
      case '/seekers':
        return (
          <div className="min-h-screen pt-16">
            <div className="max-w-4xl mx-auto px-4 py-16">
              <h1 className="text-4xl font-bold text-ai-blue mb-8">Knowledge Seekers</h1>
              <p className="text-lg text-gray-700 mb-6">
                Discover curated AI and technology resources from industry experts.
              </p>
              <p className="text-lg text-gray-700">
                Upskill with our comprehensive library of ebooks and learning materials.
              </p>
            </div>
          </div>
        );
      default:
        return <HomePage />;
    }
  };

  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen bg-gradient-to-br from-ai-bg-start to-ai-bg-end relative overflow-hidden">
        <TechBackground />
        <Header onNavigate={handleNavigate} />
        <main className="relative z-10">
          {renderPage()}
        </main>
        <Footer />
      </div>
    </QueryClientProvider>
  );
}

export default App;