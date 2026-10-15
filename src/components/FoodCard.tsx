import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Plus, Check, Info, Flame, Sparkles, Leaf } from 'lucide-react';
import { MenuItem } from '../types';

interface FoodCardProps {
  item: MenuItem;
  onAddToCart: (item: MenuItem) => void;
  onOpenDetails: (item: MenuItem) => void;
  isInCart: boolean;
  cartQuantity?: number;
}

export const FoodCard: React.FC<FoodCardProps> = ({
  item,
  onAddToCart,
  onOpenDetails,
  isInCart,
  cartQuantity = 0,
}) => {
  const [isPressing, setIsPressing] = useState(false);

  const handleAddClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsPressing(true);
    setTimeout(() => setIsPressing(false), 100);
    onAddToCart(item);
  };

  return (
    <div
      onClick={() => onOpenDetails(item)}
      className="group relative bg-[#EFEBE4] rounded-[6px] border border-[#E5DCD0] hover:border-[#C5A059]/60 transition-all duration-300 hover:shadow-soft-float overflow-hidden flex flex-col justify-between cursor-pointer"
      style={{
        boxShadow: '0px 4px 12px rgba(44, 42, 41, 0.04)',
      }}
    >
      {/* Top Media & Tags */}
      <div className="relative w-full h-[140px] sm:h-[160px] overflow-hidden bg-[#2C2A29]/5">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>

        {/* Badges / Tags */}
        <div className="absolute top-2.5 right-2.5 flex flex-wrap gap-1.5 z-10">
          {item.isPopular && (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#7A3036] text-white shadow-sm">
              <Flame className="w-2.5 h-2.5" />
              طلب شائع
            </span>
          )}
          {item.isChefSpecial && (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#C5A059] text-white shadow-sm">
              <Sparkles className="w-2.5 h-2.5" />
              توقيع الشيف
            </span>
          )}
          {item.isVegetarian && (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-700 text-white shadow-sm">
              <Leaf className="w-2.5 h-2.5" />
              نباتي
            </span>
          )}
        </div>

        {/* Quick Details Eye */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onOpenDetails(item);
          }}
          className="absolute bottom-2.5 left-2.5 p-1.5 rounded-full bg-[#FDFBF7]/85 backdrop-blur-sm text-[#2C2A29] hover:text-[#7A3036] hover:bg-[#FDFBF7] transition-all opacity-0 group-hover:opacity-100 shadow-sm"
          title="تفاصيل الطبق"
        >
          <Info className="w-3.5 h-3.5" />
        </button>

        {/* Quantity indicator if in cart */}
        {cartQuantity > 0 && (
          <span className="absolute top-2.5 left-2.5 min-w-[22px] h-[22px] px-1.5 bg-[#C5A059] text-white text-[11px] font-jakarta font-bold rounded-full flex items-center justify-center shadow-md">
            {cartQuantity}
          </span>
        )}
      </div>

      {/* Content Area */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-start justify-between gap-2 mb-1.5">
            <h3 className="font-bold text-base text-[#2C2A29] leading-snug group-hover:text-[#7A3036] transition-colors">
              {item.name}
            </h3>
            <div className="text-right shrink-0">
              <span className="font-jakarta font-bold text-base text-[#7A3036]">
                {item.price}
              </span>
              <span className="text-[11px] font-medium text-[#2C2A29]/70 mr-1">
                ر.س
              </span>
            </div>
          </div>

          <p className="text-xs text-[#2C2A29]/75 line-clamp-2 leading-relaxed mb-3">
            {item.description}
          </p>
        </div>

        {/* Bottom Bar: Action button with Micro-Interaction (shrink 5% for 100ms) */}
        <div className="pt-2 border-t border-[#E5DCD0]/60 flex items-center justify-between gap-2">
          <span className="text-[11px] text-[#2C2A29]/60 font-medium">
            {item.prepTime || 'جاهز فور الوصول'}
          </span>

          <button
            onClick={handleAddClick}
            style={{
              transform: isPressing ? 'scale(0.95)' : 'scale(1)',
              transition: 'transform 100ms ease',
            }}
            className={`h-[34px] px-3.5 rounded-md text-xs font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer ${
              isInCart
                ? 'bg-[#C5A059] hover:bg-[#b08e4d] text-white shadow-sm'
                : 'bg-[#7A3036] hover:bg-[#63242A] text-white shadow-sm'
            }`}
          >
            {isInCart ? (
              <>
                <Check className="w-3.5 h-3.5 text-white" />
                <span>تمت الإضافة (+1)</span>
              </>
            ) : (
              <>
                <Plus className="w-3.5 h-3.5 text-white" />
                <span>أضف للحجز</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
