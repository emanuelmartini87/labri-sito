export const LogoMark = ({ className = "h-8 w-8" }) => (
  <svg viewBox="0 0 64 64" fill="none" className={className} aria-hidden="true">
    <path d="M12 48 L32 16 L52 48" stroke="currentColor" strokeWidth="3.5" strokeLinecap="square" />
    <path d="M23 48 L32 33 L41 48" stroke="currentColor" strokeWidth="3" strokeLinecap="square" className="text-primary" />
    <circle cx="47" cy="15" r="3.2" fill="currentColor" className="text-primary" stroke="none" />
  </svg>
);

export const Logo = ({ className = "" }) => (
  <span className={`inline-flex items-center gap-2.5 ${className}`}>
    <LogoMark />
    <span className="font-serif text-2xl tracking-tight leading-none">
      L&rsquo;Abr&igrave;
    </span>
  </span>
);
