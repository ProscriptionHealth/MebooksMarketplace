export const MebooksLogo = () => {
  return (
    <div className="text-center mb-12">
      <div className="relative inline-block">
        <div className="flex flex-col md:flex-row items-center justify-center mb-4 text-3xl md:text-4xl font-light tracking-wider">
          <span className="font-bold mb-4 md:mb-0" style={{textShadow: '0 0 20px rgba(0, 212, 170, 0.3), 0 0 10px rgba(245, 158, 11, 0.2)'}}>
            <span style={{color: '#00d4aa', textShadow: '0 0 15px rgba(0, 212, 170, 0.4)'}}>m</span>
            <span style={{color: '#f59e0b', textShadow: '0 0 15px rgba(245, 158, 11, 0.4)'}}>
              <span style={{position: 'relative', display: 'inline-block'}}>
                e
                <span style={{
                  position: 'absolute',
                  top: '-0.2em',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: '0.6em',
                  height: '2px',
                  backgroundColor: '#f59e0b',
                  fontSize: '0.8em'
                }}></span>
              </span>
              books
            </span>
            <span style={{color: '#ec4899', textShadow: '0 0 15px rgba(236, 72, 153, 0.4)'}}>.ai</span>
          </span>
          <span className="mx-4 text-3xl md:text-4xl transform md:transform-none rotate-90 md:rotate-0" style={{color: '#0ea5e9', textShadow: '0 0 15px rgba(14, 165, 233, 0.4)'}}>
            &lt; -
          </span>
          <span className="font-mono text-xl md:text-2xl text-gray-200">
            <span className="text-2xl md:text-3xl font-bold" style={{color: '#ec4899', textShadow: '0 0 10px rgba(236, 72, 153, 0.3)'}}>{`{`}</span>
            <span className="italic" style={{color: '#00d4aa', textShadow: '0 0 10px rgba(0, 212, 170, 0.3)'}}>my</span>
            <span style={{color: '#ffffff', textShadow: '0 0 8px rgba(255, 255, 255, 0.2)'}}>, </span>
            <span className="font-semibold" style={{color: '#f59e0b', textShadow: '0 0 10px rgba(245, 158, 11, 0.3)'}}>ebooks</span>
            <span className="text-xl md:text-2xl" style={{color: '#ec4899', textShadow: '0 0 10px rgba(236, 72, 153, 0.3)'}}>,...,</span>
            <span className="text-2xl md:text-3xl mx-2" style={{color: '#0ea5e9', textShadow: '0 0 10px rgba(14, 165, 233, 0.3)'}}>|</span>
            <span className="font-bold" style={{color: '#ec4899', textShadow: '0 0 10px rgba(236, 72, 153, 0.3)'}}>ai</span>
            <span className="text-2xl md:text-3xl mx-2" style={{color: '#0ea5e9', textShadow: '0 0 10px rgba(14, 165, 233, 0.3)'}}>|</span>
            <span className="text-2xl md:text-3xl font-bold" style={{color: '#ec4899', textShadow: '0 0 10px rgba(236, 72, 153, 0.3)'}}>{`}`}</span>
          </span>
        </div>
        <div className="text-center text-base italic tracking-wide opacity-80" style={{color: '#94a3b8', textShadow: '0 0 8px rgba(148, 163, 184, 0.2)'}}>
          <span className="font-bold" style={{color: '#ec4899', textShadow: '0 0 10px rgba(236, 72, 153, 0.3)'}}>ai</span> = set of Artificial Intelligence subject matter
        </div>
      </div>
    </div>
  );
};
