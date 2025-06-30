import { useEffect, useRef } from 'react';

export const TechBackground = () => {
  const particlesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = particlesRef.current;
    if (!container) return;

    // Create floating particles
    const particleCount = 20;
    const particles: HTMLDivElement[] = [];

    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      particle.className = 'absolute w-1 h-1 bg-ai-teal rounded-full animate-pulse';
      particle.style.left = `${Math.random() * 100}%`;
      particle.style.top = `${Math.random() * 100}%`;
      particle.style.animationDelay = `${Math.random() * 2}s`;
      particle.style.animationDuration = `${2 + Math.random() * 2}s`;
      
      container.appendChild(particle);
      particles.push(particle);
    }

    // Cleanup
    return () => {
      particles.forEach(particle => {
        if (container.contains(particle)) {
          container.removeChild(particle);
        }
      });
    };
  }, []);

  return (
    <div className="fixed inset-0 -z-10">
      {/* Primary gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-neural-bg via-neural-secondary to-neural-tertiary animate-gradient-bg bg-[length:400%_400%]"></div>
      
      {/* Animated grid pattern */}
      <div className="absolute inset-0 opacity-10">
        <div 
          className="absolute inset-0" 
          style={{
            backgroundImage: `
              linear-gradient(rgba(0, 212, 170, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0, 212, 170, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px'
          }}
        ></div>
      </div>
      
      {/* Floating particles effect */}
      <div 
        ref={particlesRef}
        className="absolute inset-0 overflow-hidden"
      ></div>
    </div>
  );
};
