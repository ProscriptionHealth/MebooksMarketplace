export const MebooksLogo = () => {
  return (
    <div className="text-center">
      <div className="relative inline-block">
        {/* Main logo line - always horizontal */}
        <div className="flex items-center justify-center mb-6 text-3xl md:text-4xl lg:text-6xl font-light tracking-wide">
          {/* Brand name */}
          <span className="font-bold" style={{
            background: 'linear-gradient(45deg, #00d4aa, #f59e0b, #ec4899)', 
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            textShadow: '0 0 20px rgba(0, 212, 170, 0.3)'
          }}>
            mebooks.ai
          </span>
          
          {/* Arrow */}
          <span className="mx-6 text-3xl md:text-4xl lg:text-5xl" style={{
            color: '#0ea5e9', 
            textShadow: '0 0 20px rgba(14, 165, 233, 0.5)'
          }}>
            &lt;-
          </span>
          
          {/* Formula */}
          <span className="font-mono text-xl md:text-2xl lg:text-3xl">
            <span className="text-2xl md:text-3xl lg:text-4xl font-bold" style={{color: '#ec4899', textShadow: '0 0 15px rgba(236, 72, 153, 0.4)'}}>{`{`}</span>
            <span className="italic" style={{color: '#00d4aa', textShadow: '0 0 10px rgba(0, 212, 170, 0.3)'}}>my</span>
            <span style={{color: '#ffffff', textShadow: '0 0 8px rgba(255, 255, 255, 0.2)'}}>, </span>
            <span className="font-semibold" style={{color: '#f59e0b', textShadow: '0 0 10px rgba(245, 158, 11, 0.3)'}}>ebooks</span>
            <span className="text-xl md:text-2xl lg:text-3xl" style={{color: '#ec4899', textShadow: '0 0 10px rgba(236, 72, 153, 0.3)'}}>,...,</span>
            <span className="text-2xl md:text-3xl lg:text-4xl mx-3" style={{color: '#0ea5e9', textShadow: '0 0 10px rgba(14, 165, 233, 0.5)'}}>|</span>
            <span className="font-bold" style={{color: '#ec4899', textShadow: '0 0 15px rgba(236, 72, 153, 0.4)'}}>ai</span>
            <span className="text-2xl md:text-3xl lg:text-4xl mx-3" style={{color: '#0ea5e9', textShadow: '0 0 10px rgba(14, 165, 233, 0.5)'}}>|</span>
            <span className="text-2xl md:text-3xl lg:text-4xl font-bold" style={{color: '#ec4899', textShadow: '0 0 15px rgba(236, 72, 153, 0.4)'}}>{`}`}</span>
          </span>
        </div>
        
        {/* Subtitle */}
        <div className="text-center text-sm md:text-base italic tracking-wide opacity-80" style={{color: '#94a3b8', textShadow: '0 0 8px rgba(148, 163, 184, 0.2)'}}>
          <span className="font-bold" style={{color: '#ec4899', textShadow: '0 0 10px rgba(236, 72, 153, 0.3)'}}>ai</span> = set of Artificial Intelligence subject matter
        </div>
      </div>
    </div>
  );
};
