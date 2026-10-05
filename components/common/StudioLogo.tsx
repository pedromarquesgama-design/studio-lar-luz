import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface StudioLogoProps {
  variant?: 'full' | 'icon';
  theme?: 'light' | 'dark';
  className?: string;
  priority?: boolean;
}

export const StudioLogo: React.FC<StudioLogoProps> = ({
  variant = 'full',
  theme = 'light',
  className = '',
  priority = false,
}) => {
  return (
    <Link
      href="/"
      className={`inline-flex items-center transition-opacity hover:opacity-90 ${className}`}
      aria-label="Studio Lar & Luz - Página Inicial"
    >
      {variant === 'full' ? (
        <div className="relative h-12 w-52 md:h-16 md:w-60">
          <Image
            src="/brand/logo-full-transparent.png"
            alt="Studio Lar & Luz"
            fill
            priority={priority}
            sizes="(max-width: 768px) 208px, 240px"
            className={`object-contain object-center ${theme === 'dark' ? 'brightness-0 invert' : ''}`}
          />
        </div>
      ) : (
        <div className="relative h-9 w-9 md:h-10 md:w-10">
          <Image
            src="/brand/logo-icon-transparent.png"
            alt="Studio Lar & Luz"
            fill
            priority={priority}
            sizes="40px"
            className="object-contain"
          />
        </div>
      )}
    </Link>
  );
};
