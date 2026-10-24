interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  showTagline?: boolean;
}

export default function Logo({ size = 'md', showTagline = false }: LogoProps) {
  const iconSizes = {
    sm: 'w-7 h-7 text-xs',
    md: 'w-9 h-9 text-sm',
    lg: 'w-12 h-12 text-base',
  };

  const textSizes = {
    sm: 'text-base',
    md: 'text-xl',
    lg: 'text-2xl',
  };

  return (
    <div className="flex items-center gap-2.5 group">
      {/* Sleek SVG Hexagonal Pulse Tech Node */}
      <div className={`relative ${iconSizes[size]} rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-cyan-400 p-[1.5px] shadow-lg shadow-indigo-500/20 flex-shrink-0 transition-transform group-hover:scale-105`}>
        <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center relative overflow-hidden">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-1/2 h-1/2 text-cyan-400 drop-shadow-[0_0_8px_rgba(34,211,238,0.6)]"
          >
            <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
          </svg>
        </div>
      </div>

      <div className="flex flex-col">
        <span className={`font-black tracking-tight text-white ${textSizes[size]} leading-none`}>
          ApexPulse<span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">Global</span>
        </span>
        {showTagline && (
          <span className="text-[10px] font-mono tracking-widest text-slate-400 uppercase mt-0.5">
            Digital Intelligence Network
          </span>
        )}
      </div>
    </div>
  );
}
