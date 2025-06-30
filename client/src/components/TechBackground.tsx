import React, { useState, useEffect } from 'react';

// A collection of math, stats, and ML equations
const EQUATIONS = [
  'P(A|B) = (P(B|A)P(A)) / P(B)',
  'σ(x) = 1 / (1 + e⁻ˣ)',
  'θ := θ - α∇J(θ)',
  'y = β₀ + β₁x + ε',
  'S(yᵢ) = eʸᵢ / Σⱼ eʸⱼ',
  'H(X) = -Σ p(x) log p(x)',
  'σ = √Σ(xᵢ - μ)² / N',
  'C = A × B',
  '∫ f(x) dx',
  '∇²f',
  'argmax(f(x))',
  'E[X] = Σx * P(x)',
  'Cov(X,Y) = E[(X-μₓ)(Y-μᵧ)]',
  'R² = 1 - (SSᵣₑₛ / SSₜₒₜ)',
  'L(θ|x) = P(x|θ)',
];

interface Equation {
  id: number;
  content: string;
  style: React.CSSProperties;
}

// Generates a list of equations with random positions and styles
const generateEquations = (count: number, width: number, height: number): Equation[] => {
  const equations: Equation[] = [];
  for (let i = 0; i < count; i++) {
    equations.push({
      id: i,
      content: EQUATIONS[i % EQUATIONS.length],
      style: {
        top: `${Math.random() * height}px`,
        left: `${Math.random() * width}px`,
        fontSize: `${Math.random() * 8 + 8}px`, // 8px to 16px
        opacity: Math.random() * 0.15 + 0.1, // 0.1 to 0.25
      },
    });
  }
  return equations;
};

export const TechBackground: React.FC = () => {
  const [equations, setEquations] = useState<Equation[]>([]);
  
  useEffect(() => {
    // Function to set dimensions and regenerate equations
    const updateDimensionsAndRegenerate = () => {
        const innerWidth = window.innerWidth;
        const scrollHeight = document.body.scrollHeight;
        // Generate a sparse number of equations based on screen width
        const count = Math.floor(innerWidth / 80); 
        setEquations(generateEquations(count, innerWidth, scrollHeight));
    };
    
    // Use a timeout to regenerate after a short delay to ensure layout is stable
    const initialTimeout = setTimeout(updateDimensionsAndRegenerate, 100);

    let resizeTimer: number;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(updateDimensionsAndRegenerate, 150);
    };

    window.addEventListener('resize', handleResize);
    return () => {
        clearTimeout(initialTimeout);
        clearTimeout(resizeTimer);
        window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <>
      {/* Primary gradient background */}
      <div 
        className="fixed inset-0 -z-20"
        style={{
          background: 'linear-gradient(135deg, #0f0f23 0%, #1a1a3e 35%, #16213e 70%, #0f0f23 100%)'
        }}
      ></div>
      
      {/* Mathematical equations overlay */}
      <div className="fixed inset-0 -z-10 pointer-events-none overflow-hidden" aria-hidden="true">
        {equations.map(({ id, content, style }) => (
          <span
            key={id}
            className="absolute font-mono"
            style={{
              ...style,
              color: ['#00d4aa', '#0ea5e9', '#8b5cf6', '#f59e0b'][id % 4]
            }}
          >
            {content}
          </span>
        ))}
      </div>
    </>
  );
};