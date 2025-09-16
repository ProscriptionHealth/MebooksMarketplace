import { Link } from "wouter";
import { Button } from "@/components/ui/button";

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-20">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          About <span className="gradient-text">Vebooks.ai</span>
        </h1>
        <p className="text-xl text-muted-foreground mb-8">
          We're revolutionizing education through AI-powered personalized content creation.
        </p>
        <Button asChild>
          <Link href="/contact">Get In Touch</Link>
        </Button>
      </div>
    </div>
  );
}