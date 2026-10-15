import React from 'react';
import { Sparkles, Crown, Sun, Music, Coffee, Clock } from 'lucide-react';
import { SEATING_OPTIONS } from '../data/menuData';

interface AmbienceSectionProps {
  onSelectSeatingForReservation: (seatingId: string) => void;
}

export const AmbienceSection: React.FC<AmbienceSectionProps> = ({
  onSelectSeatingForReservation,
}) => {
  const AMBIENCE_PILLARS = [
    {
      title: 'صالة القصر الإمبراطورية',
      type: 'داخلية فاخرة',
      desc: 'ثريات كريستالية ناعمة وموسيقى بيانو كلاسيكية حية تصاحب وجبتك بعيداً عن صخب المدينة.',
      image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80',
      icon: Crown,
      seatingId: 'indoor_royal',
    },
    {
      title: 'شرفة التراس الأندلسية',
      type: 'في الهواء الطلق',
      desc: 'جلسات خارجية مطلة على نوافير القصر مع رذاذ معطر برائحة الخزامى وأشجار الزيتون المعمرة.',
      image: 'https://images.unsplash.com/photo-1543007630-9710e4a00a20?auto=format&fit=crop&w=800&q=80',
      icon: Sun,
      seatingId: 'terrace_garden',
    },
    {
      title: 'الأجنحة الملكية الخاصة (VIP)',
      type: 'خصوصية كاملة',
      desc: 'مقصورات خاصة مع مدخل مستقل ومضيف مخصص لقاءات الأعمال والعائلات الرفيعة.',
      image: 'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=800&q=80',
      icon: Sparkles,
      seatingId: 'private_suite',
    },
  ];

  return (
    <section id="experience-section" className="py-20 bg-[#EFEBE4]/60 border-t border-[#E5DCD0]/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FDFBF7] text-[#7A3036] text-xs font-semibold mb-3 border border-[#E5DCD0]">
            <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" />
            <span>جلسات صممت لتلائم ذوقك</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-bold text-[#2C2A29] leading-tight mb-4">
            أجواء قصر الياقوت: رحلة في عوالم الضيافة
          </h2>
          <p className="text-sm text-[#2C2A29]/75 leading-relaxed">
            اختر الجلسة التي تناسب مناسبتك، سواء كانت عشاءً رومانسياً هادئاً، اجتماع عمل استراتيجي، أو احتفالاً عائلياً خاصاً.
          </p>
        </div>

        {/* Ambience Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {AMBIENCE_PILLARS.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="bg-[#FDFBF7] rounded-[8px] border border-[#E5DCD0] overflow-hidden shadow-soft-subtle hover:shadow-soft-float transition-all duration-300 flex flex-col justify-between group"
              >
                <div className="relative h-52 overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>

                  <span className="absolute bottom-3 right-3 text-xs font-bold text-white bg-black/40 backdrop-blur-sm px-2.5 py-1 rounded-md border border-white/20">
                    {item.type}
                  </span>
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-7 h-7 rounded-full bg-[#EFEBE4] text-[#7A3036] flex items-center justify-center">
                        <Icon className="w-4 h-4 text-[#C5A059]" />
                      </div>
                      <h3 className="text-base font-bold text-[#2C2A29]">{item.title}</h3>
                    </div>

                    <p className="text-xs text-[#2C2A29]/75 leading-relaxed mb-4">
                      {item.desc}
                    </p>
                  </div>

                  <button
                    onClick={() => onSelectSeatingForReservation(item.seatingId)}
                    className="w-full h-[38px] rounded-lg bg-[#EFEBE4] hover:bg-[#7A3036] hover:text-white text-[#7A3036] text-xs font-bold border border-[#E5DCD0] transition-colors cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    <span>احجز هذه الجلسة</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
