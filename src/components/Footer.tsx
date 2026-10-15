import React from 'react';
import { Sparkles, MapPin, Phone, Mail, Instagram, Twitter } from 'lucide-react';
import { RubyLogo } from './RubyLogo';

interface FooterProps {
  onOpenDesignTokens: () => void;
  onOpenReservation: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenDesignTokens,
  onOpenReservation,
}) => {
  return (
    <footer className="bg-[#2C2A29] text-[#FDFBF7] pt-16 pb-12 border-t-2 border-[#C5A059]/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-white/10">
          {/* Col 1: Brand & Philosophy */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center gap-2.5">
              <RubyLogo size={36} />
              <div>
                <span className="font-bold text-lg text-white block leading-tight">
                  قصر الياقوت
                </span>
                <span className="text-[10px] font-jakarta tracking-widest text-[#C5A059] uppercase">
                  Al-Yaqoot Palace
                </span>
              </div>
            </div>

            <p className="text-xs text-white/70 leading-relaxed font-normal">
              تجربة ضيافة استثنائية تأسست على مفهوم الفخامة الهادئة (Soft Luxury)، حيث تجتمع روعة النكهات مع هدوء المكان وسرعة الخدمة الرفيعة.
            </p>

            <button
              onClick={onOpenDesignTokens}
              className="inline-flex items-center gap-1.5 text-xs text-[#C5A059] hover:text-white transition-colors cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>استعراض كيس ستدي التصميم (UI/UX Case Study)</span>
            </button>
          </div>

          {/* Col 2: Quick Links */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-[#C5A059] uppercase tracking-wider">
              التنقل السريع
            </h4>
            <ul className="space-y-2 text-xs text-white/75">
              <li>
                <a href="#category-bar" className="hover:text-white transition-colors">
                  قائمة الأطباق الفاخرة
                </a>
              </li>
              <li>
                <button
                  onClick={onOpenReservation}
                  className="hover:text-white transition-colors text-right cursor-pointer"
                >
                  حجز طاولة وطلب مسبق
                </button>
              </li>
              <li>
                <a href="#experience-section" className="hover:text-white transition-colors">
                  صالة القصر والأجنحة الملكية
                </a>
              </li>
              <li>
                <a href="#branches-section" className="hover:text-white transition-colors">
                  فروعنا في الرياض، جدة، والخُبر
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Etiquette & Hospitality Policy */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-[#C5A059] uppercase tracking-wider">
              إرشادات الضيافة
            </h4>
            <div className="space-y-2 text-xs text-white/75 leading-relaxed">
              <p>
                <strong>الزي المعتمد:</strong> الزي الأنيق غير الرسمي (Smart Casual) والزي الوطني السعودي الرسمي.
              </p>
              <p>
                <strong>الأطفال:</strong> نرحب بالعائلات والأطفال دون سن 8 سنوات في الفترات من 01:00 م حتى 07:00 م حفاظاً على هدوء الأمسية.
              </p>
              <p>
                <strong>إلغاء الحجز:</strong> استرداد كامل للعربون حتى ساعتين قبل موعد الحجز.
              </p>
            </div>
          </div>

          {/* Col 4: Contact & Social */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-[#C5A059] uppercase tracking-wider">
              خدمة الضيوف
            </h4>
            <div className="space-y-2 text-xs text-white/75">
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#C5A059]" />
                <span className="font-jakarta">الرقم الموحد: 9200 89240</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#C5A059]" />
                <span className="font-jakarta">vip@alyaqootpalace.com</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#C5A059]" />
                <span>المملكة العربية السعودية</span>
              </div>
            </div>

            <div className="pt-2 flex items-center gap-3">
              <span className="text-xs text-white/50">تابعونا:</span>
              <a
                href="#"
                className="w-8 h-8 rounded-full bg-white/5 hover:bg-[#7A3036] flex items-center justify-center transition-colors text-white"
                aria-label="إنستغرام"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="w-8 h-8 rounded-full bg-white/5 hover:bg-[#7A3036] flex items-center justify-center transition-colors text-white"
                aria-label="تويتر إكس"
              >
                <Twitter className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Credits & Design System Attribution */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-white/50 gap-4">
          <p>© {new Date().getFullYear()} قصر الياقوت (Al-Yaqoot Palace). جميع الحقوق محفوظة.</p>
          <div className="flex items-center gap-4 text-[11px]">
            <span>مفهوم الفخامة الهادئة • Soft Luxury UI/UX Portfolio</span>
            <span className="text-[#C5A059]">•</span>
            <button
              onClick={onOpenDesignTokens}
              className="text-[#C5A059] hover:underline cursor-pointer"
            >
              Tokens & Geometry Guide
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
