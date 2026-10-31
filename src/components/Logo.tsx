import Image from 'next/image';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  showTagline?: boolean;
  darkVariant?: boolean;
}

export default function Logo({ size = 'md', showTagline = false, darkVariant = true }: LogoProps) {
  const iconSizes = {
    sm: 'w-7 h-7',
    md: 'w-10 h-10',
    lg: 'w-12 h-12',
  };

  const textSizes = {
    sm: 'text-base',
    md: 'text-xl',
    lg: 'text-2xl',
  };

  return (
    <div className="flex items-center gap-3 group select-none">
      <div className={`relative ${iconSizes[size]} flex-shrink-0 transition-transform duration-300 group-hover:scale-105 drop-shadow-[0_0_12px_rgba(0,242,254,0.35)]`}>
        <img
          src="/logo.svg"
          alt="ApexPulse Global Brand Emblem"
          className="w-full h-full object-contain"
        />
      </div>

      <div className="flex flex-col">
        <div className="flex items-center gap-1.5">
          <span className={`font-sans font-extrabold tracking-tight text-white ${textSizes[size]} leading-none`}>
            ApexPulse
          </span>
          <span className="font-sans font-bold text-xs uppercase tracking-widest px-1.5 py-0.5 rounded text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
            Global
          </span>
        </div>
        {showTagline && (
          <span className="text-[10px] font-mono tracking-widest uppercase mt-0.5 text-slate-400">
            Frontier Intelligence & Tech Review
          </span>
        )}
      </div>
    </div>
  );
}
