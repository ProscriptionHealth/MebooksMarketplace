export const MebooksLogo = () => {
  return (
    <div className="text-center mb-8">
      <div className="relative bg-white/[0.02] backdrop-blur-xl border border-white/10 rounded-2xl p-6 md:p-8 shadow-2xl inline-block">
        <div className="flex flex-col md:flex-row items-center justify-center mb-4 text-2xl md:text-3xl font-light tracking-wider">
          <span className="font-bold mb-4 md:mb-0">
            <span style={{color: '#00d4aa'}}>m</span>
            <span style={{color: '#f59e0b'}}>ebooks</span>
            <span style={{color: '#ec4899'}}>.ai</span>
          </span>
          <span className="text-cyan-400 mx-4 text-2xl md:text-3xl transform md:transform-none rotate-90 md:rotate-0 shadow-cyan-400/50 text-shadow" style={{color: '#0ea5e9'}}>
            &lt; -
          </span>
          <span className="font-mono text-lg md:text-xl text-gray-200">
            <span className="text-red-400 text-xl md:text-2xl font-bold" style={{color: '#ec4899'}}>{`{`}</span>
            <span className="text-teal-400 italic" style={{color: '#00d4aa'}}>my</span>
            <span className="text-gray-200" style={{color: '#ffffff'}}>, </span>
            <span className="text-yellow-300 font-semibold" style={{color: '#f59e0b'}}>ebooks</span>
            <span className="text-red-400 text-lg md:text-xl" style={{color: '#ec4899'}}>,...,</span>
            <span className="text-cyan-400 text-xl md:text-2xl mx-2" style={{color: '#0ea5e9'}}>|</span>
            <span className="text-red-400 font-bold" style={{color: '#ec4899'}}>ai</span>
            <span className="text-cyan-400 text-xl md:text-2xl mx-2" style={{color: '#0ea5e9'}}>|</span>
            <span className="text-red-400 text-xl md:text-2xl font-bold" style={{color: '#ec4899'}}>{`}`}</span>
          </span>
        </div>
        <div className="text-center text-lg italic tracking-wide opacity-80" style={{color: '#94a3b8'}}>
          <span className="text-red-400 font-bold" style={{color: '#ec4899'}}>ai</span> = set of Artificial Intelligence subject matter
        </div>
      </div>
    </div>
  );
};
