import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  Calendar as CalendarIcon,
  Clock,
  MapPin,
  Users,
  ChevronDown,
  ChevronUp,
  Plus,
  Minus,
  Trash2,
  CreditCard,
  Sparkles,
  ShieldCheck,
  Check,
  ArrowRight,
  Info,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { CartItem, ReservationData } from '../types';
import { BRANCHES, SEATING_OPTIONS, TIME_SLOTS, OCCASIONS } from '../data/menuData';
import { playLuxuryChime } from '../utils/audio';
import { ConfirmationPass } from './ConfirmationPass';
import { RubyLogo } from './RubyLogo';

interface ReservationModalProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateCartItem: (dishId: string, quantity: number) => void;
  onRemoveCartItem: (dishId: string) => void;
  onExploreMoreDishes: () => void;
}

export const ReservationModal: React.FC<ReservationModalProps> = ({
  isOpen,
  onClose,
  cartItems,
  onUpdateCartItem,
  onRemoveCartItem,
  onExploreMoreDishes,
}) => {
  // Step navigation: 1: Details & Seating, 2: Checkout, 3: Confirmation Pass
  const [step, setStep] = useState<1 | 2 | 3>(1);

  // Form states
  const [selectedBranchId, setSelectedBranchId] = useState<string>(BRANCHES[0].id);
  const [selectedSeatingId, setSelectedSeatingId] = useState<string>(SEATING_OPTIONS[0].id);
  const [selectedDate, setSelectedDate] = useState<string>(() => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  });
  const [selectedTime, setSelectedTime] = useState<string>(TIME_SLOTS[1].time);
  const [guestsCount, setGuestsCount] = useState<number>(2);
  const [selectedOccasions, setSelectedOccasions] = useState<string[]>([OCCASIONS[0]]);
  const [specialNotes, setSpecialNotes] = useState<string>('');

  // Accordion open/collapse for pre-ordered dishes
  const [isOrderSummaryOpen, setIsOrderSummaryOpen] = useState<boolean>(true);

  // Checkout inputs
  const [customerName, setCustomerName] = useState<string>('');
  const [customerPhone, setCustomerPhone] = useState<string>('');
  const [customerEmail, setCustomerEmail] = useState<string>('');
  const [saveDetails, setSaveDetails] = useState<boolean>(true);
  const [paymentMethod, setPaymentMethod] = useState<'apple_pay' | 'credit_card'>('apple_pay');

  // Credit card state
  const [cardNumber, setCardNumber] = useState<string>('•••• •••• •••• 4242');
  const [cardExpiry, setCardExpiry] = useState<string>('12/28');
  const [cardCvc, setCardCvc] = useState<string>('789');

  // Completed reservation record
  const [confirmedReservation, setConfirmedReservation] = useState<ReservationData | null>(null);

  // Load saved details from LocalStorage as specified in 4A
  useEffect(() => {
    try {
      const saved = localStorage.getItem('al_yaqoot_user_pref');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.name) setCustomerName(parsed.name);
        if (parsed.phone) setCustomerPhone(parsed.phone);
        if (parsed.email) setCustomerEmail(parsed.email);
      } else {
        // Defaults for quick demo
        setCustomerName('أحمد السعيد');
        setCustomerPhone('0501234567');
        setCustomerEmail('ahmed.vip@example.com');
      }
    } catch {
      // Local storage fallback
    }
  }, []);

  if (!isOpen) return null;

  // Selected seating option
  const activeSeating = SEATING_OPTIONS.find((s) => s.id === selectedSeatingId) || SEATING_OPTIONS[0];

  // Financial calculations
  // Deposit fee: standard refundable table deposit per person or flat per seating
  const tableDeposit = activeSeating.depositFee;
  const itemsTotal = cartItems.reduce((acc, curr) => acc + curr.dish.price * curr.quantity, 0);
  const subtotal = tableDeposit + itemsTotal;
  const vatAmount = Math.round(subtotal * 0.15);
  const grandTotal = subtotal + vatAmount;

  // Handle Occasion toggle
  const toggleOccasion = (occ: string) => {
    if (selectedOccasions.includes(occ)) {
      setSelectedOccasions(selectedOccasions.filter((o) => o !== occ));
    } else {
      setSelectedOccasions([...selectedOccasions, occ]);
    }
  };

  // Generate next 7 dates for the interactive calendar
  const generateAvailableDates = () => {
    const dates = [];
    const today = new Date();
    for (let i = 0; i < 7; i++) {
      const d = new Date();
      d.setDate(today.getDate() + i);
      const iso = d.toISOString().split('T')[0];
      const dayName = d.toLocaleDateString('ar-SA', { weekday: 'short' });
      const dayNum = d.getDate();
      const monthName = d.toLocaleDateString('ar-SA', { month: 'short' });
      dates.push({ iso, dayName, dayNum, monthName, isToday: i === 0 });
    }
    return dates;
  };

  const datesList = generateAvailableDates();

  // Complete checkout & show digital pass
  const handleCompleteBooking = (method: 'apple_pay' | 'credit_card') => {
    // Save to LocalStorage if toggle is on (Page 4A spec)
    if (saveDetails) {
      try {
        localStorage.setItem(
          'al_yaqoot_user_pref',
          JSON.stringify({
            name: customerName,
            phone: customerPhone,
            email: customerEmail,
          })
        );
      } catch (e) {
        console.warn('LocalStorage error:', e);
      }
    }

    const randomTable = Math.floor(Math.random() * 20) + 1;
    const randomCode = `#YQT-${Math.floor(1000 + Math.random() * 9000)}`;

    const newReservation: ReservationData = {
      branchId: selectedBranchId,
      seatingId: selectedSeatingId,
      date: selectedDate,
      time: selectedTime,
      guestsCount,
      occasion: selectedOccasions.join(', ') || 'عشاء راقٍ',
      specialRequests: specialNotes,
      customerName: customerName || 'ضيف قصر الياقوت',
      customerPhone: customerPhone || '0500000000',
      customerEmail: customerEmail || 'guest@example.com',
      saveDetails,
      paymentMethod: method,
      tableNumber: `طاولة ملكية #${randomTable}`,
      bookingCode: randomCode,
      bookingTimestamp: new Date().toLocaleTimeString('ar-SA'),
      items: [...cartItems],
      tableDeposit,
      itemsTotal,
      vatAmount,
      grandTotal,
    };

    setConfirmedReservation(newReservation);
    setStep(3);

    // Audio chime & Confetti
    playLuxuryChime();
    confetti({
      particleCount: 70,
      spread: 60,
      origin: { y: 0.6 },
      colors: ['#C5A059', '#7A3036', '#EFEBE4'],
    });
  };

  const resetForNewBooking = () => {
    setStep(1);
    setConfirmedReservation(null);
    onClose();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
        {/* Backdrop blur 8px as in Page 4 spec */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={step === 3 ? undefined : onClose}
          className="fixed inset-0 bg-[#2C2A29]/45 backdrop-blur-[8px]"
        />

        {/* Modal Window: max-width 520px, border-radius 16px as in Page 4 spec */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.22, ease: 'easeOut' }}
          className="relative w-full max-w-[520px] max-h-[92vh] bg-[#FDFBF7] rounded-[16px] border border-[#C5A059]/40 shadow-soft-float overflow-hidden flex flex-col z-10 my-auto"
        >
          {/* Top Header */}
          <div className="p-4 sm:p-5 border-b border-[#E5DCD0] flex items-center justify-between bg-[#FDFBF7] sticky top-0 z-20">
            <div className="flex items-center gap-2.5">
              <RubyLogo size={32} />
              <div>
                <h3 className="font-bold text-base sm:text-lg text-[#2C2A29] leading-tight">
                  {step === 1 && 'حجز الطاولة والطلب المسبق'}
                  {step === 2 && 'استمارة الدفع وتأكيد الحجز'}
                  {step === 3 && 'تذكرة الحجز الرقمية'}
                </h3>
                <span className="text-[11px] text-[#2C2A29]/65">
                  {step === 1 && 'اختر موعدك وحدد أطباقك لتصل فور حضورك'}
                  {step === 2 && 'إتمام الحجز الفوري واحتساب الفاتورة'}
                  {step === 3 && 'احفظ التذكرة وقدمها عند الاستقبال'}
                </span>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 rounded-full text-[#2C2A29]/60 hover:text-[#2C2A29] hover:bg-[#EFEBE4] transition-colors cursor-pointer"
              aria-label="إغلاق النافذة"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Stepper Progress Bar */}
          <div className="w-full bg-[#EFEBE4] h-1 flex">
            <div
              className="bg-[#7A3036] h-full transition-all duration-300"
              style={{
                width: step === 1 ? '33.3%' : step === 2 ? '66.6%' : '100%',
              }}
            ></div>
          </div>

          {/* Content Area */}
          <div className="p-4 sm:p-6 overflow-y-auto space-y-6 flex-1">
            {/* STEP 1: Reservation Details Form */}
            {step === 1 && (
              <div className="space-y-6">
                {/* 1. Branch & Seating Selection: Dropdown / Segmented control (44px height, Focus ring 2px #C5A059) */}
                <div>
                  <label className="block text-xs font-bold text-[#2C2A29] mb-1.5">
                    اختيار الفرع والجلسة المفضلة
                  </label>
                  <div className="space-y-2.5">
                    {/* Branch Select */}
                    <div className="relative">
                      <select
                        value={selectedBranchId}
                        onChange={(e) => setSelectedBranchId(e.target.value)}
                        className="w-full h-[44px] px-3.5 bg-[#EFEBE4] text-[#2C2A29] text-xs sm:text-sm font-semibold rounded-lg border border-[#E5DCD0] focus:outline-none focus:ring-2 focus:ring-[#C5A059] focus:bg-[#FDFBF7] transition-all cursor-pointer appearance-none"
                      >
                        {BRANCHES.map((b) => (
                          <option key={b.id} value={b.id}>
                            {b.name}
                          </option>
                        ))}
                      </select>
                      <ChevronDown className="w-4 h-4 text-[#7A3036] absolute left-3.5 top-3.5 pointer-events-none" />
                    </div>

                    {/* Seating Segmented Cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                      {SEATING_OPTIONS.map((seating) => {
                        const isSelected = selectedSeatingId === seating.id;
                        return (
                          <button
                            key={seating.id}
                            type="button"
                            onClick={() => setSelectedSeatingId(seating.id)}
                            className={`p-2.5 rounded-lg border text-right transition-all cursor-pointer flex flex-col justify-between ${
                              isSelected
                                ? 'bg-[#F4EFE6] border-[#C5A059] ring-2 ring-[#C5A059]/40 shadow-sm'
                                : 'bg-[#EFEBE4]/70 border-[#E5DCD0] hover:bg-[#EFEBE4]'
                            }`}
                          >
                            <span className="text-xs font-bold text-[#2C2A29] leading-tight mb-1">
                              {seating.name.split('(')[0]}
                            </span>
                            <span className="text-[10px] text-[#7A3036] font-jakarta font-bold">
                              عربون {seating.depositFee} ر.س
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* 2. Interactive Calendar Picker + Time Chips */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-xs font-bold text-[#2C2A29]">
                      التاريخ ووقت الحجز
                    </label>
                    <span className="text-[11px] text-[#7A3036] font-medium">
                      مواعيد مؤكدة فورياً
                    </span>
                  </div>

                  {/* Horizontal Interactive Calendar */}
                  <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
                    {datesList.map((d) => {
                      const isSelected = selectedDate === d.iso;
                      return (
                        <button
                          key={d.iso}
                          type="button"
                          onClick={() => setSelectedDate(d.iso)}
                          className={`min-w-[62px] py-2 px-1 rounded-lg border flex flex-col items-center justify-center transition-all cursor-pointer ${
                            isSelected
                              ? 'bg-[#7A3036] text-white border-[#7A3036] shadow-sm'
                              : 'bg-[#EFEBE4] text-[#2C2A29] border-[#E5DCD0] hover:bg-[#F4EFE6]'
                          }`}
                        >
                          <span className="text-[10px] font-medium">
                            {d.isToday ? 'اليوم' : d.dayName}
                          </span>
                          <span className="text-base font-jakarta font-bold my-0.5">
                            {d.dayNum}
                          </span>
                          <span className="text-[9px] opacity-80">{d.monthName}</span>
                        </button>
                      );
                    })}
                  </div>

                  {/* Time Chips: Available in warm beige, reserved in gray disabled (Page 3 specs) */}
                  <div className="mt-3">
                    <div className="flex items-center justify-between text-[11px] text-[#2C2A29]/65 mb-2">
                      <span>الفترات المتاحة لهذا اليوم:</span>
                      <div className="flex items-center gap-3">
                        <span className="inline-flex items-center gap-1">
                          <span className="w-2 h-2 rounded-full bg-[#EFEBE4] border border-[#C5A059]"></span>
                          متاح
                        </span>
                        <span className="inline-flex items-center gap-1">
                          <span className="w-2 h-2 rounded-full bg-[#D8CFC4]"></span>
                          مكتمل
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                      {TIME_SLOTS.map((slot, idx) => {
                        const isSelected = selectedTime === slot.time;
                        return (
                          <button
                            key={idx}
                            type="button"
                            disabled={!slot.available}
                            onClick={() => slot.available && setSelectedTime(slot.time)}
                            className={`h-[36px] rounded-md text-xs font-jakarta font-semibold flex items-center justify-center transition-all ${
                              !slot.available
                                ? 'bg-[#D8CFC4] text-[#8C827A] cursor-not-allowed border border-[#D8CFC4]'
                                : isSelected
                                ? 'bg-[#7A3036] text-white border border-[#7A3036] shadow-sm'
                                : 'bg-[#EFEBE4] text-[#2C2A29] border border-[#E5DCD0] hover:border-[#C5A059] hover:bg-[#FDFBF7] cursor-pointer'
                            }`}
                          >
                            <span>{slot.time}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* 3. Guests Stepper (+ / -) & Occasion Tags (Page 3 specs) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-[#E5DCD0]/60">
                  {/* Stepper (+ / -) */}
                  <div>
                    <label className="block text-xs font-bold text-[#2C2A29] mb-1.5">
                      عدد الضيوف (الأفراد)
                    </label>
                    <div className="h-[44px] px-3 bg-[#EFEBE4] rounded-lg border border-[#E5DCD0] flex items-center justify-between">
                      <button
                        type="button"
                        onClick={() => setGuestsCount(Math.max(1, guestsCount - 1))}
                        className="w-8 h-8 rounded bg-[#FDFBF7] text-[#2C2A29] hover:bg-white flex items-center justify-center shadow-xs cursor-pointer border border-[#E5DCD0]"
                        aria-label="إنقاص عدد الضيوف"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>

                      <div className="flex items-center gap-1.5">
                        <Users className="w-4 h-4 text-[#C5A059]" />
                        <span className="font-jakarta font-bold text-sm text-[#2C2A29]">
                          {guestsCount}
                        </span>
                        <span className="text-xs font-medium text-[#2C2A29]/70">
                          {guestsCount === 1 ? 'ضيف' : guestsCount === 2 ? 'ضيفان' : 'ضيوف'}
                        </span>
                      </div>

                      <button
                        type="button"
                        onClick={() => setGuestsCount(Math.min(12, guestsCount + 1))}
                        className="w-8 h-8 rounded bg-[#FDFBF7] text-[#2C2A29] hover:bg-white flex items-center justify-center shadow-xs cursor-pointer border border-[#E5DCD0]"
                        aria-label="زيادة عدد الضيوف"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* Occasion Tags */}
                  <div>
                    <label className="block text-xs font-bold text-[#2C2A29] mb-1.5">
                      طبيعة المناسبة
                    </label>
                    <div className="flex flex-wrap gap-1.5 max-h-[90px] overflow-y-auto">
                      {OCCASIONS.map((occ) => {
                        const isChecked = selectedOccasions.includes(occ);
                        return (
                          <button
                            key={occ}
                            type="button"
                            onClick={() => toggleOccasion(occ)}
                            className={`px-2.5 py-1 text-[11px] rounded-full border transition-all cursor-pointer ${
                              isChecked
                                ? 'bg-[#7A3036] text-white border-[#7A3036]'
                                : 'bg-[#EFEBE4] text-[#2C2A29]/75 border-[#E5DCD0] hover:bg-[#F4EFE6]'
                            }`}
                          >
                            {occ}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* 4. Collapsible Order Summary Accordion (Page 3 specs) */}
                <div className="border border-[#E5DCD0] rounded-xl overflow-hidden bg-[#EFEBE4]/50">
                  <div
                    onClick={() => setIsOrderSummaryOpen(!isOrderSummaryOpen)}
                    className="p-3.5 bg-[#EFEBE4] flex items-center justify-between cursor-pointer select-none"
                  >
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-[#C5A059]" />
                      <span className="text-xs font-bold text-[#2C2A29]">
                        قائمة الطلبات المسبقة المرتبطة بالحجز ({cartItems.length} أطباق)
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-jakarta font-bold text-xs text-[#7A3036]">
                        {itemsTotal} ر.س
                      </span>
                      {isOrderSummaryOpen ? (
                        <ChevronUp className="w-4 h-4 text-[#2C2A29]/70" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-[#2C2A29]/70" />
                      )}
                    </div>
                  </div>

                  <AnimatePresence>
                    {isOrderSummaryOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="p-3.5 space-y-2.5 bg-[#FDFBF7]"
                      >
                        {cartItems.length === 0 ? (
                          <div className="text-center py-4 text-xs text-[#2C2A29]/65">
                            <p className="mb-2">
                              لم تختر أي طبق مسبق بعد. يمكنك حجز الطاولة فقط، أو اختيار أطباقك الآن لتقديمها فور وصولك!
                            </p>
                            <button
                              type="button"
                              onClick={() => {
                                onClose();
                                onExploreMoreDishes();
                              }}
                              className="text-xs font-bold text-[#7A3036] hover:underline cursor-pointer"
                            >
                              + تصفح المنيو وإضافة أطباق للحجز
                            </button>
                          </div>
                        ) : (
                          <>
                            {cartItems.map((item) => (
                              <div
                                key={item.dish.id}
                                className="flex items-center justify-between gap-2 p-2 bg-[#EFEBE4] rounded-lg border border-[#E5DCD0]"
                              >
                                <div className="flex items-center gap-2.5 overflow-hidden">
                                  <img
                                    src={item.dish.image}
                                    alt={item.dish.name}
                                    className="w-10 h-10 rounded object-cover shrink-0"
                                  />
                                  <div className="truncate">
                                    <h5 className="text-xs font-bold text-[#2C2A29] truncate">
                                      {item.dish.name}
                                    </h5>
                                    <span className="text-[10px] text-[#7A3036] font-jakarta font-semibold">
                                      {item.dish.price} ر.س
                                    </span>
                                  </div>
                                </div>

                                {/* Controls: Stepper and delete button */}
                                <div className="flex items-center gap-1.5 shrink-0">
                                  <div className="flex items-center bg-[#FDFBF7] rounded border border-[#E5DCD0]">
                                    <button
                                      type="button"
                                      onClick={() =>
                                        onUpdateCartItem(item.dish.id, item.quantity - 1)
                                      }
                                      className="w-6 h-6 flex items-center justify-center text-[#2C2A29] hover:bg-[#EFEBE4] cursor-pointer"
                                    >
                                      <Minus className="w-3 h-3" />
                                    </button>
                                    <span className="w-6 text-center text-xs font-jakarta font-bold">
                                      {item.quantity}
                                    </span>
                                    <button
                                      type="button"
                                      onClick={() =>
                                        onUpdateCartItem(item.dish.id, item.quantity + 1)
                                      }
                                      className="w-6 h-6 flex items-center justify-center text-[#2C2A29] hover:bg-[#EFEBE4] cursor-pointer"
                                    >
                                      <Plus className="w-3 h-3" />
                                    </button>
                                  </div>

                                  <button
                                    type="button"
                                    onClick={() => onRemoveCartItem(item.dish.id)}
                                    className="p-1 text-red-700/70 hover:text-red-700 cursor-pointer"
                                    title="حذف من الطلب"
                                  >
                                    <Trash2 className="w-3.5 h-3.5" />
                                  </button>
                                </div>
                              </div>
                            ))}

                            <div className="pt-2 flex justify-between items-center text-xs">
                              <button
                                type="button"
                                onClick={() => {
                                  onClose();
                                  onExploreMoreDishes();
                                }}
                                className="text-[#7A3036] hover:underline font-semibold cursor-pointer"
                              >
                                + إضافة أطباق أخرى من المنيو
                              </button>
                              <span className="text-[11px] text-[#2C2A29]/60">
                                تقديم فوري عند الوصول
                              </span>
                            </div>
                          </>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            )}

            {/* STEP 2: Checkout & Payment Specs (Page 4A specs) */}
            {step === 2 && (
              <div className="space-y-5">
                {/* 4A: Apple Pay Button: Full width 48px height as specified */}
                <div>
                  <button
                    type="button"
                    onClick={() => handleCompleteBooking('apple_pay')}
                    className="w-full h-[48px] bg-black hover:bg-neutral-800 text-white rounded-lg flex items-center justify-center gap-2 font-semibold text-sm transition-all hover:scale-[1.01] active:scale-[0.98] shadow-sm cursor-pointer"
                  >
                    <span>الدفع السريع بواسطة</span>
                    <span className="font-bold tracking-tight text-base font-jakarta">
                      Pay
                    </span>
                  </button>
                  <div className="relative my-4 text-center">
                    <span className="absolute inset-0 flex items-center">
                      <span className="w-full border-t border-[#E5DCD0]"></span>
                    </span>
                    <span className="relative bg-[#FDFBF7] px-3 text-[11px] text-[#2C2A29]/60 font-medium">
                      أو الدفع بواسطة البطاقة الائتمانية / مدى
                    </span>
                  </div>
                </div>

                {/* Guest Contact Details */}
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-bold text-[#2C2A29] mb-1">
                      الاسم الكامل
                    </label>
                    <input
                      type="text"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      placeholder="أحمد السعيد"
                      className="w-full h-[40px] px-3.5 text-xs sm:text-sm bg-[#EFEBE4] rounded-lg border border-[#E5DCD0] focus:ring-2 focus:ring-[#C5A059] focus:outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-[#2C2A29] mb-1">
                        رقم الجوال
                      </label>
                      <input
                        type="tel"
                        value={customerPhone}
                        onChange={(e) => setCustomerPhone(e.target.value)}
                        placeholder="0501234567"
                        className="w-full h-[40px] px-3.5 text-xs sm:text-sm bg-[#EFEBE4] rounded-lg border border-[#E5DCD0] focus:ring-2 focus:ring-[#C5A059] focus:outline-none font-jakarta"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-[#2C2A29] mb-1">
                        البريد الإلكتروني
                      </label>
                      <input
                        type="email"
                        value={customerEmail}
                        onChange={(e) => setCustomerEmail(e.target.value)}
                        placeholder="name@example.com"
                        className="w-full h-[40px] px-3.5 text-xs sm:text-sm bg-[#EFEBE4] rounded-lg border border-[#E5DCD0] focus:ring-2 focus:ring-[#C5A059] focus:outline-none font-jakarta"
                      />
                    </div>
                  </div>
                </div>

                {/* Credit Card inputs */}
                <div className="p-3.5 bg-[#EFEBE4] rounded-xl border border-[#E5DCD0] space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#2C2A29] flex items-center gap-1.5">
                      <CreditCard className="w-4 h-4 text-[#7A3036]" />
                      بيانات البطاقة
                    </span>
                    <div className="flex items-center gap-1">
                      <span className="text-[10px] px-1.5 py-0.5 bg-white rounded border text-[#2C2A29] font-bold">
                        مدى
                      </span>
                      <span className="text-[10px] px-1.5 py-0.5 bg-white rounded border text-[#2C2A29] font-bold">
                        Visa
                      </span>
                      <span className="text-[10px] px-1.5 py-0.5 bg-white rounded border text-[#2C2A29] font-bold">
                        Mastercard
                      </span>
                    </div>
                  </div>

                  <div>
                    <input
                      type="text"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      placeholder="4000 1234 5678 9010"
                      className="w-full h-[38px] px-3 bg-white text-xs rounded-md border border-[#E5DCD0] focus:ring-2 focus:ring-[#C5A059] focus:outline-none font-jakarta tracking-wider"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="text"
                      value={cardExpiry}
                      onChange={(e) => setCardExpiry(e.target.value)}
                      placeholder="MM/YY"
                      className="w-full h-[38px] px-3 bg-white text-xs rounded-md border border-[#E5DCD0] focus:ring-2 focus:ring-[#C5A059] focus:outline-none font-jakarta text-center"
                    />
                    <input
                      type="text"
                      value={cardCvc}
                      onChange={(e) => setCardCvc(e.target.value)}
                      placeholder="CVC"
                      className="w-full h-[38px] px-3 bg-white text-xs rounded-md border border-[#E5DCD0] focus:ring-2 focus:ring-[#C5A059] focus:outline-none font-jakarta text-center"
                    />
                  </div>
                </div>

                {/* 4A: Order Breakdown (Transparent Cost Summary with 15% VAT) */}
                <div className="p-3.5 bg-[#F4EFE6] rounded-xl border border-[#C5A059]/30 space-y-2 text-xs">
                  <div className="flex justify-between text-[#2C2A29]/80">
                    <span>عربون حجز الطاولة ({activeSeating.name.split('(')[0]}):</span>
                    <span className="font-jakarta font-semibold">{tableDeposit} ر.س</span>
                  </div>

                  {cartItems.length > 0 && (
                    <div className="flex justify-between text-[#2C2A29]/80">
                      <span>إجمالي الأطباق المسبقة ({cartItems.length} أطباق):</span>
                      <span className="font-jakarta font-semibold">{itemsTotal} ر.س</span>
                    </div>
                  )}

                  <div className="flex justify-between text-[#2C2A29]/80">
                    <span>ضريبة القيمة المضافة (15% VAT):</span>
                    <span className="font-jakarta font-semibold">{vatAmount} ر.س</span>
                  </div>

                  <div className="pt-2 border-t border-[#C5A059]/40 flex justify-between font-bold text-sm text-[#7A3036]">
                    <span>الإجمالي المستحق للدفع:</span>
                    <span className="font-jakarta text-base">{grandTotal} ر.س</span>
                  </div>
                </div>

                {/* 4A: Save Details Toggle Switch: 44x24px to LocalStorage */}
                <div className="flex items-center justify-between p-2.5 bg-[#EFEBE4] rounded-lg border border-[#E5DCD0]">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-[#C5A059]" />
                    <span className="text-xs font-semibold text-[#2C2A29]">
                      حفظ البيانات للزيارات القادمة عبر LocalStorage
                    </span>
                  </div>

                  {/* 44x24px Toggle Switch */}
                  <button
                    type="button"
                    onClick={() => setSaveDetails(!saveDetails)}
                    className={`w-[44px] h-[24px] rounded-full transition-colors relative cursor-pointer flex items-center p-0.5 ${
                      saveDetails ? 'bg-[#7A3036]' : 'bg-[#D8CFC4]'
                    }`}
                    aria-label="تبديل حفظ البيانات"
                  >
                    <span
                      className={`w-[20px] h-[20px] rounded-full bg-white shadow-sm transition-transform ${
                        saveDetails ? 'translate-x-0' : '-translate-x-[20px]'
                      }`}
                    />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 3: Confirmation Pass */}
            {step === 3 && confirmedReservation && (
              <ConfirmationPass
                reservation={confirmedReservation}
                onNewReservation={resetForNewBooking}
              />
            )}
          </div>

          {/* Modal Footer / Navigation Controls (for Steps 1 & 2) */}
          {step !== 3 && (
            <div className="p-4 sm:p-5 bg-[#EFEBE4] border-t border-[#E5DCD0] flex items-center justify-between gap-3 sticky bottom-0 z-20">
              {step === 2 && (
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="h-[44px] px-4 rounded-lg border border-[#E5DCD0] bg-white text-[#2C2A29] text-xs font-bold hover:bg-[#FDFBF7] cursor-pointer flex items-center gap-1.5"
                >
                  <ArrowRight className="w-4 h-4" />
                  <span>تعديل الموعد</span>
                </button>
              )}

              <div className="text-right">
                <span className="text-[10px] text-[#2C2A29]/60 block">الإجمالي الشامل</span>
                <span className="font-jakarta font-bold text-base text-[#7A3036]">
                  {grandTotal} ر.س
                </span>
              </div>

              {step === 1 ? (
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="btn-ruby-primary h-[44px] px-6 text-sm flex items-center justify-center gap-2 cursor-pointer mr-auto"
                >
                  <span>متابعة للدفع والتأكيد</span>
                  <Sparkles className="w-4 h-4 text-[#C5A059]" />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => handleCompleteBooking('credit_card')}
                  className="btn-ruby-primary h-[44px] px-6 text-sm flex items-center justify-center gap-2 cursor-pointer mr-auto"
                >
                  <Check className="w-4 h-4" />
                  <span>تأكيد الحجز والدفع</span>
                </button>
              )}
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
