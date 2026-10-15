import React, { useRef, useState } from 'react';
import { motion } from 'motion/react';
import { Volume2, VolumeX, Play, Crown, Clock, ShieldCheck, ArrowDown } from 'lucide-react';

interface HeroSectionProps {
  onOpenReservation: () => void;
  onExploreMenu: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onOpenReservation,
  onExploreMenu,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);

  const toggleSound = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
    }
  };

  return (
    <section className="relative pt-[72px] min-h-[90vh] lg:min-h-screen flex items-center justify-center overflow-hidden bg-[#FDFBF7]">
      {/* Background Ambience Layer with cinematic video & overlay */}
      <div className="absolute inset-0 z-0">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted={isMuted}
          playsInline
          poster="https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1600&q=80"
          className="w-full h-full object-cover opacity-25 filter saturate-[0.85] brightness-[1.05]"
        >
          <source
            src="https://assets.mixkit.co/videos/preview/mixkit-chef-garnishing-a-gourmet-dish-41443-large.mp4"
            type="video/mp4"
          />
        </video>

        {/* Soft luxury ivory gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#FDFBF7] via-[#FDFBF7]/85 to-transparent pointer-events-none"></div>
        <div className="absolute inset-0 bg-radial-[circle_at_center,_transparent_40%,_rgba(253,251,247,0.7)_100%] pointer-events-none"></div>
      </div>

      {/* Cinematic Audio/Mute Toggle (Bottom Left 32x32px as specified in Page 2) */}
      <div className="absolute bottom-6 left-6 z-20 flex items-center gap-2">
        <button
          onClick={toggleSound}
          className="w-[32px] h-[32px] rounded-full bg-[#EFEBE4]/90 backdrop-blur-md border border-[#E5DCD0] text-[#7A3036] flex items-center justify-center hover:bg-[#FDFBF7] transition-all hover:scale-105 active:scale-95 shadow-soft-subtle cursor-pointer"
          title={isMuted ? 'تشغيل الصوت السينمائي' : 'كتم الصوت'}
          aria-label="تبديل صوت الفيديو السينمائي"
        >
          {isMuted ? (
            <VolumeX className="w-4 h-4 text-[#7A3036]" />
          ) : (
            <Volume2 className="w-4 h-4 text-[#7A3036]" />
          )}
        </button>
        <span className="hidden sm:inline-block text-[11px] font-medium text-[#2C2A29]/60 bg-[#FDFBF7]/80 px-2 py-0.5 rounded-full backdrop-blur-sm border border-[#E5DCD0]/60">
          أجواء القصر الحية
        </span>
      </div>

      {/* Hero Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center flex flex-col items-center">
        {/* Redesigned Quiet Luxury Editorial Kicker - No box, no AI sparkles */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center justify-center gap-3 sm:gap-4 mb-6"
        >
          <span className="w-6 sm:w-12 h-[1px] bg-[#C5A059]/50"></span>
          <span className="text-[11px] sm:text-xs font-semibold tracking-[0.2em] uppercase font-jakarta text-[#7A3036]">
            Al-Yaqoot Palace
          </span>
          <span className="text-[#C5A059] text-xs select-none">•</span>
          <span className="text-xs sm:text-sm font-medium text-[#2C2A29]/75">
            مفهوم الفخامة الهادئة
          </span>
          <span className="w-6 sm:w-12 h-[1px] bg-[#C5A059]/50"></span>
        </motion.div>

        {/* Main Royal Heading with proper spacing */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#2C2A29] leading-[1.35] sm:leading-[1.3] mb-6 max-w-4xl"
        >
          حيث تلتقي عراقة الضيافة الملكية بلمسات{' '}
          <span className="text-[#7A3036] font-extrabold relative inline-block">
            الفخامة الهادئة
            <span className="block h-[2px] w-full bg-[#C5A059]/60 rounded-full mt-1.5"></span>
          </span>
        </motion.h1>

        {/* Subtitle / Philosophy */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-base sm:text-lg lg:text-xl text-[#2C2A29]/75 max-w-2xl mx-auto mb-10 leading-relaxed font-normal"
        >
          ابتكرنا تجربة استثنائية تمزج بين حجز طاولتك المسبق وإعداد أطباقك المفضلة فور وصولك، لتستمتع بأمسيتك في قصر الياقوت دون أي انتظار.
        </motion.p>

        {/* Action CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
        >
          {/* Primary Action Button: Large 48px height as specified */}
          <button
            onClick={onOpenReservation}
            className="w-full sm:w-auto h-[48px] px-8 bg-[#7A3036] hover:bg-[#63242A] text-white text-base font-bold rounded-lg flex items-center justify-center gap-3 transition-all duration-200 hover:-translate-y-0.5 active:scale-95 shadow-md cursor-pointer border border-[#7A3036]"
          >
            <span>احجز طاولتك الآن</span>
            <span className="text-xs bg-white/20 px-2 py-0.5 rounded text-white font-medium">
              تأكيد فوري
            </span>
          </button>

          {/* Secondary Action: Explore Menu */}
          <button
            onClick={onExploreMenu}
            className="w-full sm:w-auto h-[48px] px-8 bg-[#EFEBE4] hover:bg-[#F4EFE6] text-[#2C2A29] text-base font-semibold rounded-lg flex items-center justify-center gap-2 transition-all duration-200 border border-[#E5DCD0] cursor-pointer"
          >
            <span>استعراض قائمة الأطباق</span>
            <ArrowDown className="w-4 h-4 text-[#7A3036]" />
          </button>
        </motion.div>

        {/* Key User Benefits / Trust Chips */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-14 pt-8 border-t border-[#E5DCD0]/70 grid grid-cols-1 sm:grid-cols-3 gap-6 w-full max-w-3xl text-right"
        >
          <div className="flex items-start gap-3 p-2">
            <div className="w-8 h-8 rounded-lg bg-[#EFEBE4] text-[#7A3036] flex items-center justify-center shrink-0 border border-[#E5DCD0]">
              <Clock className="w-4 h-4 text-[#7A3036]" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-[#2C2A29]">بدون وقت انتظار للأطباق</h4>
              <p className="text-[11px] text-[#2C2A29]/70 leading-normal mt-0.5">
                ربط الطلب المسبق بتوقيت وصولك مباشرة
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-2">
            <div className="w-8 h-8 rounded-lg bg-[#EFEBE4] text-[#C5A059] flex items-center justify-center shrink-0 border border-[#E5DCD0]">
              <Crown className="w-4 h-4 text-[#C5A059]" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-[#2C2A29]">فخامة هادئة وتفاصيل راقية</h4>
              <p className="text-[11px] text-[#2C2A29]/70 leading-normal mt-0.5">
                مساحات مريحة خالية من الصخب والألوان الحادة
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-2">
            <div className="w-8 h-8 rounded-lg bg-[#EFEBE4] text-[#7A3036] flex items-center justify-center shrink-0 border border-[#E5DCD0]">
              <ShieldCheck className="w-4 h-4 text-[#7A3036]" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-[#2C2A29]">تذكرة رقمية مع Apple Pay</h4>
              <p className="text-[11px] text-[#2C2A29]/70 leading-normal mt-0.5">
                رمز QR فوري وإضافة مباشرة للتقويم وواتساب
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
