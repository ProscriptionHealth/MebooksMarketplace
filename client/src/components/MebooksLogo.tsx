export const MebooksLogo = () => {
  return (
    <div className="text-center mb-12">
      <div className="relative bg-white/[0.02] backdrop-blur-xl border border-white/10 rounded-3xl p-12 md:p-20 shadow-2xl inline-block">
        <div className="flex flex-col md:flex-row items-center justify-center mb-8 text-3xl md:text-5xl font-light tracking-wider">
          <span className="bg-gradient-to-r from-cyan-400 via-red-400 to-teal-400 bg-clip-text text-transparent font-bold mb-4 md:mb-0">
            mebooks.ai
          </span>
          <span className="text-cyan-400 mx-6 text-4xl md:text-5xl transform md:transform-none rotate-90 md:rotate-0 shadow-cyan-400/50 text-shadow">
            &lt;-
          </span>
          <span className="font-mono text-2xl md:text-3xl text-gray-200">
            <span className="text-red-400 text-3xl md:text-4xl font-bold">{`{`}</span>
            <span className="text-teal-400 italic">my</span>
            <span className="text-gray-200">, </span>
            <span className="text-yellow-300 font-semibold">ebooks</span>
            <span className="text-red-400 text-2xl md:text-3xl">,...,</span>
            <span className="text-cyan-400 text-3xl md:text-4xl mx-3">|</span>
            <span className="text-red-400 font-bold">ai</span>
            <span className="text-cyan-400 text-3xl md:text-4xl mx-3">|</span>
            <span className="text-red-400 text-3xl md:text-4xl font-bold">{`}`}</span>
          </span>
        </div>
        <div className="text-center text-lg text-gray-400 italic tracking-wide opacity-80">
          <span className="text-red-400 font-bold">ai</span> = set of Artificial Intelligence subject matter
        </div>
      </div>
    </div>
  );
};
