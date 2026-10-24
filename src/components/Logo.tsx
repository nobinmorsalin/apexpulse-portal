interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  showTagline?: boolean;
  darkVariant?: boolean;
}

export default function Logo({ size = 'md', showTagline = false, darkVariant = false }: LogoProps) {
  const iconSizes = {
    sm: 'w-7 h-7',
    md: 'w-9 h-9',
    lg: 'w-12 h-12',
  };

  const textSizes = {
    sm: 'text-base',
    md: 'text-xl',
    lg: 'text-2xl',
  };

  return (
    <div className="flex items-center gap-3 group select-none">
      {/* Prestigious Academic Shield / Crest Emblem */}
      <div className={`relative ${iconSizes[size]} rounded-lg bg-gradient-to-br from-blue-900 via-indigo-900 to-slate-900 p-[1px] shadow-sm flex-shrink-0 transition-transform group-hover:scale-105`}>
        <div className="w-full h-full bg-slate-900 rounded-[7px] flex items-center justify-center p-1.5 border border-slate-700/50">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            className="w-full h-full text-indigo-300"
          >
            {/* Academic Shield & Open Book / Compass Crest */}
            <path
              d="M12 2L3 6v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V6l-9-4z"
              stroke="currentColor"
              strokeWidth="1.75"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-indigo-400"
            />
            <path
              d="M12 8v8M8 12h8"
              stroke="#38bdf8"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </div>
      </div>

      <div className="flex flex-col">
        <div className="flex items-center gap-1.5">
          <span className={`font-serif font-black tracking-tight ${darkVariant ? 'text-white' : 'text-slate-900'} ${textSizes[size]} leading-none`}>
            ApexPulse
          </span>
          <span className={`font-sans font-bold text-xs uppercase tracking-widest px-1.5 py-0.5 rounded ${
            darkVariant
              ? 'bg-blue-900/80 text-blue-100 border border-blue-700/70 shadow-sm'
              : 'bg-blue-50 text-blue-900 border border-blue-200'
          }`}>
            Institute
          </span>
        </div>
        {showTagline && (
          <span className={`text-[10px] font-sans tracking-widest uppercase mt-0.5 font-medium ${darkVariant ? 'text-slate-400' : 'text-slate-500'}`}>
            Global Educational & Technology Review
          </span>
        )}
      </div>
    </div>
  );
}
