import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { UtensilsCrossed, Calendar } from 'lucide-react';
import { RubyLogo } from './RubyLogo';

interface HeaderProps {
  cartCount: number;
  badgePulseKey: number;
  onOpenCartOrReserve: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  cartCount,
  badgePulseKey,
  onOpenCartOrReserve,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 h-[72px] transition-all duration-300 flex items-center ${
        isScrolled
          ? 'bg-[#FDFBF7]/90 backdrop-blur-md border-b border-[#E5DCD0]/70 shadow-soft-subtle'
          : 'bg-[#FDFBF7]/50 backdrop-blur-sm'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex items-center justify-between">
        {/* Brand / Logo */}
        <div className="flex items-center gap-3">
          <a
            href="#"
            className="flex items-center gap-2 group transition-transform active:scale-95"
            aria-label="الرئيسية - قصر الياقوت"
          >
            {/* Bespoke faceted ruby gemstone icon in signature burgundy */}
            <RubyLogo size={36} className="ml-1" />
            <div className="flex flex-col">
              <span className="font-bold text-lg md:text-xl tracking-tight text-[#2C2A29] leading-tight flex items-center gap-1.5">
                قصر الياقوت
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#C5A059]"></span>
              </span>
              <span className="text-[10px] uppercase tracking-[0.2em] text-[#7A3036] font-jakarta font-semibold">
                Al-Yaqoot Palace
              </span>
            </div>
          </a>

          {/* Quiet luxury brand tagline without pill box or green dot */}
          <div className="hidden lg:flex items-center text-[12px] text-[#2C2A29]/70 font-medium tracking-normal border-r border-[#E5DCD0] pr-4 mr-1">
            <span>ملاذ الطهي الراقي والحجوزات الملكية</span>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-7 lg:gap-10 text-sm font-semibold text-[#2C2A29]/85">
          <a
            href="#menu-section"
            className="hover:text-[#7A3036] transition-colors py-1"
          >
            <span>قائمة الأطباق</span>
          </a>
          <a
            href="#experience-section"
            className="hover:text-[#7A3036] transition-colors py-1"
          >
            <span>أجواء القصر</span>
          </a>
          <a
            href="#branches-section"
            className="hover:text-[#7A3036] transition-colors py-1"
          >
            <span>الفروع</span>
          </a>
        </nav>

        {/* Right CTA & Cart Action */}
        <div className="flex items-center gap-3">
          {/* Cart / Pre-orders trigger with pulsating badge counter */}
          <button
            onClick={onOpenCartOrReserve}
            className="relative p-2 rounded-lg text-[#2C2A29] hover:bg-[#EFEBE4] transition-all cursor-pointer border border-transparent hover:border-[#E5DCD0]"
            title="سلة الحجز والطلبات المسبقة"
            aria-label="عرض قائمة الحجز المسبق"
          >
            <UtensilsCrossed className="w-5 h-5 text-[#7A3036]" />
            {cartCount > 0 && (
              <motion.span
                key={badgePulseKey}
                initial={{ scale: 1 }}
                animate={{ scale: [1, 1.25, 1] }}
                transition={{ duration: 0.35, ease: 'easeOut' }}
                className="absolute -top-1 -right-1 min-w-[20px] h-[20px] px-1 bg-[#C5A059] text-white font-jakarta text-[11px] font-bold rounded-full flex items-center justify-center shadow-sm"
              >
                {cartCount}
              </motion.span>
            )}
          </button>

          {/* Quick Reserve Button: 140x44px, ruby #7A3036, white text weight 600 */}
          <button
            onClick={onOpenCartOrReserve}
            className="w-[140px] h-[44px] bg-[#7A3036] hover:bg-[#63242A] text-white text-sm font-semibold rounded-lg flex items-center justify-center gap-2 transition-all duration-200 hover:-translate-y-0.5 active:scale-95 shadow-soft-subtle cursor-pointer shrink-0"
          >
            <Calendar className="w-4 h-4 text-[#FDFBF7]" />
            <span>حجز سريع</span>
          </button>
        </div>
      </div>
    </header>
  );
};
