import React, { useRef } from 'react';
import { motion } from 'motion/react';
import {
  CheckCircle2,
  Calendar,
  Clock,
  MapPin,
  Users,
  QrCode,
  Share2,
  Printer,
  CalendarPlus,
  ExternalLink,
  UtensilsCrossed,
  Sparkles,
} from 'lucide-react';
import { ReservationData } from '../types';
import { BRANCHES } from '../data/menuData';
import { RubyLogo } from './RubyLogo';

interface ConfirmationPassProps {
  reservation: ReservationData;
  onNewReservation: () => void;
}

export const ConfirmationPass: React.FC<ConfirmationPassProps> = ({
  reservation,
  onNewReservation,
}) => {
  const passRef = useRef<HTMLDivElement>(null);
  const branch = BRANCHES.find((b) => b.id === reservation.branchId) || BRANCHES[0];

  // WhatsApp share message
  const whatsappMessage = encodeURIComponent(
    `✨ تأكيد حجز قصر الياقوت (Al-Yaqoot Palace) ✨\n` +
      `رقم الحجز: ${reservation.bookingCode}\n` +
      `الطاولة: ${reservation.tableNumber}\n` +
      `الفرع: ${branch.name}\n` +
      `التاريخ والوقت: ${reservation.date} الساعة ${reservation.time}\n` +
      `عدد الضيوف: ${reservation.guestsCount} ضيوف\n` +
      `الطلبات المسبقة: ${reservation.items.length} أطباق جاهزة فور وصولكم\n` +
      `الموقع: ${branch.mapUrl}`
  );

  // Google Calendar event link
  const createGoogleCalendarLink = () => {
    const title = encodeURIComponent(`حجز قصر الياقوت — طاولة ${reservation.tableNumber}`);
    const details = encodeURIComponent(
      `حجز عشاء فاخر في قصر الياقوت.\nرقم الحجز: ${reservation.bookingCode}\nالطلبات المسبقة: ${reservation.items.map((i) => i.dish.name).join(', ')}`
    );
    const location = encodeURIComponent(`${branch.name}, ${branch.address}`);
    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&details=${details}&location=${location}`;
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="flex flex-col items-center justify-center py-6 px-4">
      {/* 4B: Success Animation: Pulsing Gold Checkmark as specified in Page 4 */}
      <motion.div
        initial={{ scale: 0, rotate: -45 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: 'spring', stiffness: 260, damping: 20 }}
        className="w-16 h-16 rounded-full bg-[#C5A059]/15 border-2 border-[#C5A059] flex items-center justify-center text-[#C5A059] mb-4 shadow-md"
      >
        <motion.div
          animate={{ scale: [1, 1.15, 1] }}
          transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
        >
          <CheckCircle2 className="w-10 h-10 text-[#C5A059]" />
        </motion.div>
      </motion.div>

      <motion.h2
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="text-2xl sm:text-3xl font-bold text-[#2C2A29] text-center mb-1"
      >
        تم تأكيد حجزك الملكي بنجاح
      </motion.h2>

      <p className="text-sm text-[#2C2A29]/75 text-center mb-6 max-w-md">
        يسعدنا استقبالك في قصر الياقوت. تم إصدار تذكرتك الرقمية وربط طلباتك المسبقة بتوقيت وصولك.
      </p>

      {/* Digital Reservation Pass Card: Exact specs from Page 4:
          Width: 360px, Padding: 20px, Border Radius: 12px, 2px Dashed Gold Line, Plus Jakarta Sans / Bold 700 */}
      <motion.div
        ref={passRef}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25 }}
        className="w-full max-w-[360px] bg-[#FDFBF7] rounded-[12px] p-[20px] ticket-dashed-border shadow-pass relative overflow-hidden"
      >
        {/* Pass Top Branding */}
        <div className="flex items-center justify-between border-b border-[#E5DCD0] pb-3 mb-4">
          <div className="flex items-center gap-2">
            <RubyLogo size={28} />
            <div>
              <span className="font-bold text-sm text-[#2C2A29] block leading-tight">
                قصر الياقوت
              </span>
              <span className="text-[9px] font-jakarta tracking-wider text-[#7A3036] uppercase font-bold">
                VIP Reservation Pass
              </span>
            </div>
          </div>
          <div className="text-left">
            <span className="text-[10px] text-[#2C2A29]/60 block">رقم الحجز</span>
            <span className="font-jakarta font-bold text-xs text-[#7A3036]">
              {reservation.bookingCode}
            </span>
          </div>
        </div>

        {/* Assigned Table & Status Badge */}
        <div className="bg-[#EFEBE4] rounded-lg p-3 border border-[#E5DCD0] mb-4 flex items-center justify-between">
          <div>
            <span className="text-[10px] text-[#2C2A29]/65 block">طاولتك المحجوزة</span>
            <span className="font-bold text-base text-[#7A3036] flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" />
              {reservation.tableNumber}
            </span>
          </div>
          <div className="text-left">
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
              مؤكد وفوري
            </span>
          </div>
        </div>

        {/* Reservation Details Grid */}
        <div className="space-y-2.5 text-xs text-[#2C2A29] mb-4">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-[#C5A059] shrink-0" />
            <span className="font-medium text-[#2C2A29]/70">التاريخ:</span>
            <span className="font-bold mr-auto">{reservation.date}</span>
          </div>

          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-[#C5A059] shrink-0" />
            <span className="font-medium text-[#2C2A29]/70">الوقت:</span>
            <span className="font-bold mr-auto font-jakarta">{reservation.time}</span>
          </div>

          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-[#C5A059] shrink-0" />
            <span className="font-medium text-[#2C2A29]/70">الضيوف:</span>
            <span className="font-bold mr-auto">{reservation.guestsCount} ضيوف</span>
          </div>

          <div className="flex items-start gap-2">
            <MapPin className="w-4 h-4 text-[#C5A059] shrink-0 mt-0.5" />
            <span className="font-medium text-[#2C2A29]/70">الفرع:</span>
            <span className="font-bold mr-auto text-right text-[11px] leading-tight">
              {branch.name}
            </span>
          </div>
        </div>

        {/* Pre-ordered Dishes Summary if any */}
        {reservation.items.length > 0 && (
          <div className="border-t border-dashed border-[#C5A059]/50 pt-3 mb-4">
            <div className="flex items-center gap-1.5 text-xs font-bold text-[#7A3036] mb-2">
              <UtensilsCrossed className="w-3.5 h-3.5 text-[#C5A059]" />
              <span>الطلبات المسبقة (تقديم فوري):</span>
            </div>
            <div className="space-y-1.5 max-h-28 overflow-y-auto pr-1">
              {reservation.items.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between text-[11px] text-[#2C2A29]/85 bg-[#F4EFE6] px-2 py-1 rounded"
                >
                  <span className="font-medium truncate max-w-[180px]">
                    {item.dish.name}
                  </span>
                  <span className="font-jakarta font-bold text-[#7A3036]">
                    x{item.quantity}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* QR Code Section for Fast VIP Check-in */}
        <div className="border-t border-[#E5DCD0] pt-4 flex flex-col items-center text-center">
          <div className="p-2.5 bg-white rounded-lg border border-[#E5DCD0] shadow-sm mb-2">
            {/* Visual Crisp QR Code Representation */}
            <svg
              className="w-28 h-28 text-[#2C2A29]"
              viewBox="0 0 100 100"
              fill="currentColor"
            >
              {/* Corner markers */}
              <rect x="0" y="0" width="28" height="28" rx="4" fill="#7A3036" />
              <rect x="4" y="4" width="20" height="20" rx="2" fill="white" />
              <rect x="8" y="8" width="12" height="12" rx="1" fill="#7A3036" />

              <rect x="72" y="0" width="28" height="28" rx="4" fill="#7A3036" />
              <rect x="76" y="4" width="20" height="20" rx="2" fill="white" />
              <rect x="80" y="8" width="12" height="12" rx="1" fill="#7A3036" />

              <rect x="0" y="72" width="28" height="28" rx="4" fill="#7A3036" />
              <rect x="4" y="76" width="20" height="20" rx="2" fill="white" />
              <rect x="8" y="80" width="12" height="12" rx="1" fill="#7A3036" />

              {/* Data pattern blocks */}
              <rect x="36" y="8" width="8" height="8" fill="#C5A059" />
              <rect x="52" y="8" width="12" height="8" fill="#2C2A29" />
              <rect x="36" y="24" width="16" height="8" fill="#2C2A29" />
              <rect x="12" y="36" width="8" height="12" fill="#2C2A29" />
              <rect x="28" y="36" width="12" height="8" fill="#C5A059" />
              <rect x="48" y="40" width="8" height="16" fill="#7A3036" />
              <rect x="64" y="36" width="12" height="12" fill="#2C2A29" />
              <rect x="84" y="36" width="8" height="16" fill="#C5A059" />
              <rect x="12" y="56" width="12" height="8" fill="#2C2A29" />
              <rect x="32" y="60" width="16" height="8" fill="#2C2A29" />
              <rect x="56" y="64" width="8" height="12" fill="#7A3036" />
              <rect x="72" y="60" width="16" height="8" fill="#2C2A29" />
              <rect x="40" y="80" width="12" height="12" fill="#C5A059" />
              <rect x="60" y="80" width="16" height="12" fill="#2C2A29" />
              <rect x="84" y="80" width="8" height="8" fill="#7A3036" />
            </svg>
          </div>
          <span className="text-[10px] text-[#2C2A29]/60 font-medium">
            أبرز هذا الرمز عند مدخل القصر للدخول الفوري لطاولتك
          </span>
        </div>

        {/* Map Link */}
        <a
          href={branch.mapUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 block text-center text-xs font-semibold text-[#7A3036] hover:underline flex items-center justify-center gap-1"
        >
          <span>عرض الموقع على خرائط Google</span>
          <ExternalLink className="w-3 h-3 text-[#7A3036]" />
        </a>
      </motion.div>

      {/* Integration Action Buttons as specified in Page 4 */}
      <div className="w-full max-w-[360px] mt-6 space-y-2.5">
        {/* WhatsApp Notification Share */}
        <a
          href={`https://wa.me/?text=${whatsappMessage}`}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full h-[44px] bg-[#25D366] hover:bg-[#20ba59] text-white rounded-lg font-bold text-xs flex items-center justify-center gap-2 shadow-sm transition-all"
        >
          <Share2 className="w-4 h-4" />
          <span>إرسال التذكرة عبر WhatsApp</span>
        </a>

        {/* Add to Google Calendar */}
        <a
          href={createGoogleCalendarLink()}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full h-[40px] bg-[#EFEBE4] hover:bg-[#F4EFE6] text-[#2C2A29] rounded-lg font-semibold text-xs flex items-center justify-center gap-2 border border-[#E5DCD0] transition-all"
        >
          <CalendarPlus className="w-4 h-4 text-[#7A3036]" />
          <span>إضافة إلى تقويم Google / Apple</span>
        </a>

        {/* Print / Save Pass */}
        <button
          onClick={handlePrint}
          className="w-full h-[40px] bg-[#FDFBF7] hover:bg-[#EFEBE4] text-[#2C2A29] rounded-lg font-semibold text-xs flex items-center justify-center gap-2 border border-[#C5A059]/50 transition-all cursor-pointer"
        >
          <Printer className="w-4 h-4 text-[#C5A059]" />
          <span>طباعة / حفظ التذكرة الرقمية</span>
        </button>

        {/* Book Another Table */}
        <button
          onClick={onNewReservation}
          className="w-full py-2 text-xs font-bold text-[#7A3036] hover:underline transition-colors mt-2 text-center cursor-pointer"
        >
          إجراء حجز آخر أو استعراض المنيو
        </button>
      </div>
    </div>
  );
};
