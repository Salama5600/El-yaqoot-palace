import React from 'react';
import { MapPin, Phone, Clock, ExternalLink, Car, Shield } from 'lucide-react';
import { BRANCHES } from '../data/menuData';

interface BranchesSectionProps {
  onSelectBranch: (branchId: string) => void;
}

export const BranchesSection: React.FC<BranchesSectionProps> = ({ onSelectBranch }) => {
  return (
    <section id="branches-section" className="py-20 bg-[#FDFBF7] border-t border-[#E5DCD0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-end justify-between mb-12 gap-4">
          <div>
            <span className="text-xs font-bold text-[#7A3036] tracking-wider uppercase block mb-1">
              مواقعنا وقصورنا الفاخرة
            </span>
            <h2 className="text-2xl sm:text-4xl font-bold text-[#2C2A29]">
              فروع قصر الياقوت في المملكة
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-[#2C2A29]/70 max-w-md">
            نرحب بضيوفنا الكرام في فروعنا الثلاثة بالرياض، جدة، والخُبر، مع توفير خدمة صف السيارات الفاخرة (Valet Parking) لكافة الحجوزات.
          </p>
        </div>

        {/* Branch Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {BRANCHES.map((b) => (
            <div
              key={b.id}
              className="p-6 bg-[#EFEBE4] rounded-[8px] border border-[#E5DCD0] hover:border-[#C5A059] transition-all flex flex-col justify-between shadow-soft-subtle"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-[#FDFBF7] text-[#7A3036] border border-[#E5DCD0]">
                    {b.city}
                  </span>
                  <div className="flex items-center gap-1 text-[11px] text-[#2C2A29]/60 font-medium">
                    <Car className="w-3.5 h-3.5 text-[#C5A059]" />
                    <span>موقف VIP مجاني</span>
                  </div>
                </div>

                <h3 className="text-base font-bold text-[#2C2A29] mb-2">{b.name}</h3>
                <p className="text-xs text-[#2C2A29]/75 mb-4 leading-relaxed flex items-start gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#7A3036] shrink-0 mt-0.5" />
                  <span>{b.address}</span>
                </p>

                <div className="space-y-1.5 text-[11px] text-[#2C2A29]/70 border-t border-[#E5DCD0]/70 pt-3 mb-5">
                  <div className="flex items-center gap-2">
                    <Clock className="w-3 h-3 text-[#C5A059]" />
                    <span>ساعات العمل: 01:00 م – 01:00 ص يومياً</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-3 h-3 text-[#C5A059]" />
                    <span className="font-jakarta">9200 89240</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 pt-2 border-t border-[#E5DCD0]">
                <button
                  onClick={() => onSelectBranch(b.id)}
                  className="flex-1 h-[38px] rounded-lg bg-[#7A3036] hover:bg-[#63242A] text-white text-xs font-bold transition-colors cursor-pointer flex items-center justify-center"
                >
                  حجز طاولة بهذا الفرع
                </button>
                <a
                  href={b.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-[38px] h-[38px] rounded-lg bg-[#FDFBF7] hover:bg-white text-[#2C2A29] border border-[#E5DCD0] flex items-center justify-center transition-colors shrink-0"
                  title="الخريطة والموقع"
                >
                  <ExternalLink className="w-3.5 h-3.5 text-[#7A3036]" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
