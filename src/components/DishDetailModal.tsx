import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Plus, Minus, Flame, Sparkles, Leaf, Clock, Utensils, AlertCircle, Check } from 'lucide-react';
import { MenuItem } from '../types';

interface DishDetailModalProps {
  item: MenuItem | null;
  onClose: () => void;
  onAddToCart: (item: MenuItem, quantity: number) => void;
  currentQuantityInCart: number;
}

export const DishDetailModal: React.FC<DishDetailModalProps> = ({
  item,
  onClose,
  onAddToCart,
  currentQuantityInCart,
}) => {
  const [quantity, setQuantity] = useState(1);
  const [isPressing, setIsPressing] = useState(false);

  if (!item) return null;

  const handleAdd = () => {
    setIsPressing(true);
    setTimeout(() => setIsPressing(false), 100);
    onAddToCart(item, quantity);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop: Backdrop Blur 8px as in spec */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-[#2C2A29]/40 backdrop-blur-[8px]"
        />

        {/* Modal Window: max-width 520px, border-radius 16px as in spec */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className="relative w-full max-w-[520px] max-h-[90vh] bg-[#FDFBF7] rounded-[16px] border border-[#C5A059]/40 shadow-soft-float overflow-hidden flex flex-col z-10"
        >
          {/* Header Image */}
          <div className="relative h-56 sm:h-64 w-full bg-[#2C2A29]/10 shrink-0">
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#2C2A29]/80 via-transparent to-black/30"></div>

            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 left-4 w-9 h-9 rounded-full bg-[#FDFBF7]/80 backdrop-blur-md text-[#2C2A29] hover:bg-[#FDFBF7] flex items-center justify-center transition-all cursor-pointer shadow-sm"
              aria-label="إغلاق التفاصيل"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Badge Tags */}
            <div className="absolute top-4 right-4 flex flex-wrap gap-2">
              {item.isPopular && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-[#7A3036] text-white shadow-sm">
                  <Flame className="w-3 h-3" />
                  طلب مسبق شائع
                </span>
              )}
              {item.isChefSpecial && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-[#C5A059] text-white shadow-sm">
                  <Sparkles className="w-3 h-3" />
                  توقيع الشيف
                </span>
              )}
            </div>

            {/* Price & Name overlay */}
            <div className="absolute bottom-4 right-4 left-4 flex items-end justify-between text-white">
              <div>
                <span className="text-xs font-semibold text-[#C5A059] uppercase tracking-wider block mb-0.5">
                  قصر الياقوت • طهي ملكي
                </span>
                <h2 className="text-xl sm:text-2xl font-bold leading-tight drop-shadow-sm">
                  {item.name}
                </h2>
              </div>
              <div className="text-left shrink-0">
                <span className="font-jakarta text-2xl font-bold text-white">
                  {item.price}
                </span>
                <span className="text-xs font-medium mr-1 text-[#FDFBF7]/80">ر.س</span>
              </div>
            </div>
          </div>

          {/* Modal Body */}
          <div className="p-6 overflow-y-auto space-y-5">
            {/* Description */}
            <div>
              <h4 className="text-xs font-bold text-[#7A3036] uppercase tracking-wider mb-1">
                عن الطبق
              </h4>
              <p className="text-sm text-[#2C2A29]/80 leading-relaxed font-normal">
                {item.description}
              </p>
            </div>

            {/* Quick Specs (Calories, Servings, Prep Time) */}
            <div className="grid grid-cols-3 gap-2 py-3 px-4 bg-[#EFEBE4] rounded-lg border border-[#E5DCD0] text-center">
              <div>
                <span className="text-[10px] text-[#2C2A29]/60 block mb-0.5">السعرات الحرارية</span>
                <span className="font-jakarta font-bold text-xs text-[#2C2A29]">
                  {item.calories ? `${item.calories} سعرة` : 'محسوب بدقة'}
                </span>
              </div>
              <div className="border-x border-[#E5DCD0]">
                <span className="text-[10px] text-[#2C2A29]/60 block mb-0.5">التقديم والكمية</span>
                <span className="font-bold text-xs text-[#2C2A29]">
                  {item.serves || 'حصة فردية'}
                </span>
              </div>
              <div>
                <span className="text-[10px] text-[#2C2A29]/60 block mb-0.5">جاهزية التقديم</span>
                <span className="font-bold text-xs text-[#7A3036]">
                  فور الوصول
                </span>
              </div>
            </div>

            {/* Ingredients */}
            {item.ingredients && item.ingredients.length > 0 && (
              <div>
                <h4 className="text-xs font-bold text-[#2C2A29] mb-2 flex items-center gap-1.5">
                  <Utensils className="w-3.5 h-3.5 text-[#C5A059]" />
                  <span>المكونات المختارة بعناية:</span>
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {item.ingredients.map((ing, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 bg-[#F4EFE6] text-[#2C2A29]/80 text-xs rounded-md border border-[#E5DCD0]"
                    >
                      {ing}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Allergens warning */}
            {item.allergens && item.allergens.length > 0 && (
              <div className="flex items-center gap-2 p-2.5 rounded-lg bg-amber-50 border border-amber-200 text-amber-900 text-xs">
                <AlertCircle className="w-4 h-4 text-amber-700 shrink-0" />
                <span>
                  <strong>تنبيه الحساسية:</strong> يحتوي على {item.allergens.join('، ')}.
                </span>
              </div>
            )}
          </div>

          {/* Modal Footer / Add to reservation */}
          <div className="p-4 sm:p-5 bg-[#EFEBE4] border-t border-[#E5DCD0] flex items-center justify-between gap-4">
            {/* Quantity Stepper */}
            <div className="flex items-center bg-[#FDFBF7] rounded-lg border border-[#E5DCD0] p-1 shadow-sm">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-8 h-8 rounded text-[#2C2A29] hover:bg-[#EFEBE4] flex items-center justify-center transition-colors cursor-pointer"
                aria-label="إنقاص الكمية"
              >
                <Minus className="w-3.5 h-3.5" />
              </button>
              <span className="w-9 text-center font-jakarta font-bold text-sm text-[#2C2A29]">
                {quantity}
              </span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="w-8 h-8 rounded text-[#2C2A29] hover:bg-[#EFEBE4] flex items-center justify-center transition-colors cursor-pointer"
                aria-label="زيادة الكمية"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Primary Action Button */}
            <button
              onClick={handleAdd}
              style={{
                transform: isPressing ? 'scale(0.95)' : 'scale(1)',
                transition: 'transform 100ms ease',
              }}
              className="flex-1 h-[44px] bg-[#7A3036] hover:bg-[#63242A] text-white text-sm font-bold rounded-lg flex items-center justify-center gap-2 shadow-soft-subtle transition-all cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>إضافة للطلب المسبق</span>
              <span className="font-jakarta font-semibold mr-1">
                ({item.price * quantity} ر.س)
              </span>
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
