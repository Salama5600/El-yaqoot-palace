import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Copy, Check, Sliders, Layers, Type, Box, Sparkles, Compass } from 'lucide-react';

interface DesignTokensDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onTriggerQuickReserve: () => void;
}

export const DesignTokensDrawer: React.FC<DesignTokensDrawerProps> = ({
  isOpen,
  onClose,
  onTriggerQuickReserve,
}) => {
  const [copiedHex, setCopiedHex] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'tokens' | 'flow' | 'philosophy'>('tokens');

  if (!isOpen) return null;

  const copyToClipboard = (hex: string) => {
    navigator.clipboard.writeText(hex);
    setCopiedHex(hex);
    setTimeout(() => setCopiedHex(null), 1500);
  };

  const COLOR_TOKENS = [
    {
      name: 'عاجي ناعم (Ivory)',
      hex: '#FDFBF7',
      role: 'خلفية الصفحة الرئيسية لحس واسع وراقي خالي من التشتت',
      textDark: true,
    },
    {
      name: 'بيج دافئ (Warm Beige)',
      hex: '#EFEBE4',
      role: 'خلفيات الكروت والأقسام الثانوية وحقول الإدخال',
      textDark: true,
    },
    {
      name: 'ياقوتي خافت (Muted Ruby)',
      hex: '#7A3036',
      role: 'أزرار الأكشن الرئيسية (Primary CTAs) وعناصر الجذب',
      textDark: false,
    },
    {
      name: 'ذهبي شامبانيا (Champagne Gold)',
      hex: '#C5A059',
      role: 'الحدود الدقيقة، شارات التقييم، ورقاقات التركيز وتذكرة الحجز',
      textDark: false,
    },
    {
      name: 'فحمي دافئ (Warm Charcoal)',
      hex: '#2C2A29',
      role: 'النصوص وقراءة متوازنة غير مجهدة للعين',
      textDark: false,
    },
    {
      name: 'خلفية ناعمة (Soft Active Tab)',
      hex: '#F4EFE6',
      role: 'حالة التحديد النشطة لتبويبات المنيو والفئات',
      textDark: true,
    },
  ];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex justify-end">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-[#2C2A29]/35 backdrop-blur-sm"
        />

        {/* Slide-in Drawer */}
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', damping: 28, stiffness: 280 }}
          className="relative w-full max-w-md bg-[#FDFBF7] h-full shadow-2xl border-r border-[#C5A059]/30 z-10 flex flex-col overflow-hidden"
        >
          {/* Header */}
          <div className="p-4 sm:p-5 border-b border-[#E5DCD0] flex items-center justify-between bg-[#EFEBE4]/80">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded bg-[#7A3036] text-white flex items-center justify-center">
                <Sliders className="w-4 h-4 text-[#C5A059]" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-[#2C2A29]">
                  دليل مواصفات تجربة المستخدم (UI/UX Case Study)
                </h3>
                <span className="text-[10px] text-[#7A3036] font-jakarta font-semibold">
                  Al-Yaqoot Palace • Soft Luxury Spec
                </span>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 rounded-full text-[#2C2A29]/60 hover:text-[#2C2A29] hover:bg-[#FDFBF7] cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Navigation Sub-tabs */}
          <div className="flex border-b border-[#E5DCD0] bg-[#FDFBF7] text-xs font-semibold">
            <button
              onClick={() => setActiveTab('tokens')}
              className={`flex-1 py-2.5 text-center border-b-2 cursor-pointer transition-colors ${
                activeTab === 'tokens'
                  ? 'border-[#7A3036] text-[#7A3036] bg-[#F4EFE6]'
                  : 'border-transparent text-[#2C2A29]/70 hover:text-[#2C2A29]'
              }`}
            >
              لوحة الألوان والمقاسات
            </button>
            <button
              onClick={() => setActiveTab('flow')}
              className={`flex-1 py-2.5 text-center border-b-2 cursor-pointer transition-colors ${
                activeTab === 'flow'
                  ? 'border-[#7A3036] text-[#7A3036] bg-[#F4EFE6]'
                  : 'border-transparent text-[#2C2A29]/70 hover:text-[#2C2A29]'
              }`}
            >
              مراحل رحلة المستخدم
            </button>
            <button
              onClick={() => setActiveTab('philosophy')}
              className={`flex-1 py-2.5 text-center border-b-2 cursor-pointer transition-colors ${
                activeTab === 'philosophy'
                  ? 'border-[#7A3036] text-[#7A3036] bg-[#F4EFE6]'
                  : 'border-transparent text-[#2C2A29]/70 hover:text-[#2C2A29]'
              }`}
            >
              فلسفة Soft Luxury
            </button>
          </div>

          {/* Content Body */}
          <div className="p-4 sm:p-5 overflow-y-auto space-y-6 flex-1 text-xs">
            {activeTab === 'tokens' && (
              <div className="space-y-6">
                {/* 1. Color Palette Tokens */}
                <div>
                  <h4 className="font-bold text-[#2C2A29] mb-2.5 flex items-center gap-1.5 text-xs">
                    <Layers className="w-3.5 h-3.5 text-[#C5A059]" />
                    <span>لوحة الألوان الهادئة (Soft Color Tokens):</span>
                  </h4>

                  <div className="space-y-2">
                    {COLOR_TOKENS.map((token) => (
                      <div
                        key={token.hex}
                        onClick={() => copyToClipboard(token.hex)}
                        className="p-2.5 rounded-lg border border-[#E5DCD0] bg-[#EFEBE4] hover:border-[#C5A059] flex items-center justify-between cursor-pointer transition-all"
                      >
                        <div className="flex items-center gap-2.5">
                          <div
                            className="w-7 h-7 rounded border border-black/10 shadow-xs shrink-0"
                            style={{ backgroundColor: token.hex }}
                          />
                          <div>
                            <span className="font-bold text-[#2C2A29] block">
                              {token.name}
                            </span>
                            <span className="text-[10px] text-[#2C2A29]/65">
                              {token.role}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center gap-1 text-[11px] font-jakarta font-bold text-[#7A3036] bg-white px-2 py-0.5 rounded border border-[#E5DCD0]">
                          <span>{token.hex}</span>
                          {copiedHex === token.hex ? (
                            <Check className="w-3 h-3 text-emerald-600" />
                          ) : (
                            <Copy className="w-3 h-3 opacity-60" />
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 2. UI Dimensions & Geometry */}
                <div className="border-t border-[#E5DCD0] pt-4">
                  <h4 className="font-bold text-[#2C2A29] mb-2.5 flex items-center gap-1.5 text-xs">
                    <Box className="w-3.5 h-3.5 text-[#C5A059]" />
                    <span>قواعد المقاسات والحواف (UI Dimensions & Geometry):</span>
                  </h4>

                  <div className="grid grid-cols-2 gap-2 text-[11px]">
                    <div className="p-2.5 bg-[#EFEBE4] rounded-lg border border-[#E5DCD0]">
                      <span className="text-[#2C2A29]/60 block mb-0.5">انحناء الحواف (Radius)</span>
                      <strong className="text-[#2C2A29]">
                        8px للكروت والأزرار • 6px لكروت الطعام • 16px للمودال • 12px للتذكرة
                      </strong>
                    </div>

                    <div className="p-2.5 bg-[#EFEBE4] rounded-lg border border-[#E5DCD0]">
                      <span className="text-[#2C2A29]/60 block mb-0.5">ارتفاع الأزرار</span>
                      <strong className="text-[#2C2A29]">
                        Large: 48px | Medium: 40px | Small: 32px
                      </strong>
                    </div>

                    <div className="p-2.5 bg-[#EFEBE4] rounded-lg border border-[#E5DCD0]">
                      <span className="text-[#2C2A29]/60 block mb-0.5">المسافات الفاصلة (Spacing)</span>
                      <strong className="text-[#7A3036] font-jakarta">
                        8px / 16px / 24px / 40px / 64px
                      </strong>
                    </div>

                    <div className="p-2.5 bg-[#EFEBE4] rounded-lg border border-[#E5DCD0]">
                      <span className="text-[#2C2A29]/60 block mb-0.5">الظلال الهادئة (Shadows)</span>
                      <strong className="text-[#2C2A29] font-jakarta text-[10px]">
                        0px 4px 12px rgba(44, 42, 41, 0.05)
                      </strong>
                    </div>
                  </div>
                </div>

                {/* 3. Typography Specs */}
                <div className="border-t border-[#E5DCD0] pt-4">
                  <h4 className="font-bold text-[#2C2A29] mb-2 flex items-center gap-1.5 text-xs">
                    <Type className="w-3.5 h-3.5 text-[#C5A059]" />
                    <span>الخطوط والطباعة:</span>
                  </h4>
                  <p className="text-[11px] text-[#2C2A29]/75 mb-2 leading-relaxed">
                    استخدام خط <strong>Cairo</strong> للنصوص العربية لإضفاء فخامة عصرية سهلة القراءة، وخط <strong>Plus Jakarta Sans</strong> للأرقام والرموز في تذكرة الحجز والأسعار.
                  </p>
                </div>
              </div>
            )}

            {activeTab === 'flow' && (
              <div className="space-y-4">
                <h4 className="font-bold text-[#2C2A29] flex items-center gap-1.5 text-xs">
                  <Compass className="w-3.5 h-3.5 text-[#C5A059]" />
                  <span>مراحل رحلة المستخدم (End-to-End User Journey):</span>
                </h4>

                <div className="space-y-3">
                  {/* Step 1 */}
                  <div className="p-3 bg-[#EFEBE4] rounded-lg border border-[#E5DCD0]">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-bold text-[#7A3036]">1. الهبوط والتصفح (Landing UI)</span>
                      <span className="text-[10px] bg-[#FDFBF7] px-2 py-0.5 rounded text-[#2C2A29] font-medium">
                        الهدف: 4 ثوانٍ
                      </span>
                    </div>
                    <p className="text-[11px] text-[#2C2A29]/75">
                      فيديو سينمائي يعرض الأجواء دون تشتت، شريط علوي بارتفاع 72px وزر حجز سريع 140x44px.
                    </p>
                  </div>

                  {/* Step 2 */}
                  <div className="p-3 bg-[#EFEBE4] rounded-lg border border-[#E5DCD0]">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-bold text-[#7A3036]">2. تصفح المنيو والفلترة السريعة</span>
                      <span className="text-[10px] bg-[#FDFBF7] px-2 py-0.5 rounded text-[#2C2A29] font-medium">
                        + أضف للحجز
                      </span>
                    </div>
                    <p className="text-[11px] text-[#2C2A29]/75">
                      شريط فئات ثابت عند y=72px، حقل بحث لحظي بارتفاع 40px، أنيميشن انكماش 5% عند الضغط وتوست إشعار أعلى اليسار 2.5 ثانية.
                    </p>
                  </div>

                  {/* Step 3 */}
                  <div className="p-3 bg-[#EFEBE4] rounded-lg border border-[#E5DCD0]">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-bold text-[#7A3036]">3. حجز الطاولة + الطلب المسبق</span>
                      <span className="text-[10px] bg-[#FDFBF7] px-2 py-0.5 rounded text-[#2C2A29] font-medium">
                        أقل من 60 ثانية
                      </span>
                    </div>
                    <p className="text-[11px] text-[#2C2A29]/75">
                      مودال بعرض 520px وحواف 16px، رقاقات توقيت مريحة، تحديد الفرع والجلسة وعدد الضيوف مع تعديل فوري للأطباق.
                    </p>
                  </div>

                  {/* Step 4 */}
                  <div className="p-3 bg-[#EFEBE4] rounded-lg border border-[#E5DCD0]">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-bold text-[#7A3036]">4. الدفع وتأكيد الحجز الفوري</span>
                      <span className="text-[10px] bg-[#FDFBF7] px-2 py-0.5 rounded text-[#2C2A29] font-medium">
                        Apple Pay + QR Pass
                      </span>
                    </div>
                    <p className="text-[11px] text-[#2C2A29]/75">
                      دفع بنقرة واحدة عبر Apple Pay، احتساب الضريبة، وإصدار تذكرة رقمية 360px بحواف ذهبية منقطة مع تكامل WhatsApp والتقويم.
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => {
                    onClose();
                    onTriggerQuickReserve();
                  }}
                  className="w-full h-[40px] bg-[#7A3036] hover:bg-[#63242A] text-white rounded-lg font-bold text-xs flex items-center justify-center gap-2 mt-4 cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" />
                  <span>محاكاة تجربة الحجز الآن</span>
                </button>
              </div>
            )}

            {activeTab === 'philosophy' && (
              <div className="space-y-4 text-xs leading-relaxed text-[#2C2A29]/80">
                <div className="p-3.5 bg-[#F4EFE6] rounded-xl border border-[#C5A059]/40">
                  <h4 className="font-bold text-[#7A3036] mb-1.5 text-xs">
                    لماذا مفهوم الفخامة الهادئة (Soft Luxury)؟
                  </h4>
                  <p className="text-[11px]">
                    غالباً ما تعاني مواقع المطاعم الفاخرة من التدرجات السوداء الحادة، النصوص الذهبية البراقة المجهدة، وتعقيد خطوات الحجز. قصر الياقوت يقدم نموذجاً يعتمد على البساطة الأنيقة والمساحات المفتوحة مع ألوان عاجية دافئة ولون ياقوتي خافت مريح للأعين.
                  </p>
                </div>

                <div className="p-3.5 bg-[#EFEBE4] rounded-xl border border-[#E5DCD0]">
                  <h4 className="font-bold text-[#2C2A29] mb-1.5 text-xs">
                    ميزة دمج الحجز مع الطلب المسبق (Integrated Pre-Order)
                  </h4>
                  <p className="text-[11px]">
                    الميزة الجوهرية التي تقضي على وقت الانتظار الطويل لإعداد أطباق اللحم المعتق أو الحلويات الطازجة: يصل الضيف إلى طاولته ليجد أطباقه المختارة تُقدم فور جلوسه بدرجة الحرارة المثالية.
                  </p>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
