import React from 'react';
import { Search, X, Sparkles, Flame, Leaf } from 'lucide-react';
import { CategoryId } from '../types';

interface CategoryBarProps {
  activeCategory: CategoryId;
  onSelectCategory: (cat: CategoryId) => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  selectedTagFilter: string | null;
  onToggleTagFilter: (tag: string) => void;
}

const CATEGORIES: { id: CategoryId; label: string }[] = [
  { id: 'all', label: 'كافة الأطباق' },
  { id: 'appetizers', label: 'المقبلات' },
  { id: 'mains', label: 'الأطباق الرئيسية' },
  { id: 'beverages', label: 'المشروبات' },
  { id: 'desserts', label: 'الحلويات' },
];

export const CategoryBar: React.FC<CategoryBarProps> = ({
  activeCategory,
  onSelectCategory,
  searchQuery,
  onSearchChange,
  selectedTagFilter,
  onToggleTagFilter,
}) => {
  return (
    <div
      id="category-bar"
      className="sticky top-[72px] z-30 bg-[#FDFBF7]/95 backdrop-blur-md border-b border-[#E5DCD0] shadow-soft-subtle py-3 transition-all"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-3">
          {/* Category Tabs: 3px ruby active line, soft background #F4EFE6 */}
          <div className="flex items-center gap-1 sm:gap-2 overflow-x-auto w-full md:w-auto pb-1 md:pb-0 scrollbar-none">
            {CATEGORIES.map((cat) => {
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => onSelectCategory(cat.id)}
                  className={`relative px-4 py-2 text-sm font-semibold rounded-t-md transition-all whitespace-nowrap cursor-pointer ${
                    isActive
                      ? 'text-[#7A3036] bg-[#F4EFE6]'
                      : 'text-[#2C2A29]/75 hover:text-[#2C2A29] hover:bg-[#EFEBE4]/60'
                  }`}
                >
                  <span>{cat.label}</span>
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-[3px] bg-[#7A3036] rounded-t-full"></span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Search Field: 40px height with magnifying glass icon and instant filtering without reload */}
          <div className="relative w-full md:w-72 lg:w-80">
            <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none text-[#7A3036]">
              <Search className="w-4 h-4 text-[#7A3036]/70" />
            </div>

            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="ابحث عن طبق، مكونات، أو نكهة..."
              className="w-full h-[40px] pr-10 pl-9 text-xs sm:text-sm bg-[#EFEBE4] text-[#2C2A29] placeholder-[#2C2A29]/50 rounded-lg border border-[#E5DCD0] focus:outline-none focus:ring-2 focus:ring-[#C5A059] focus:bg-[#FDFBF7] transition-all"
            />

            {searchQuery && (
              <button
                onClick={() => onSearchChange('')}
                className="absolute inset-y-0 left-0 pl-3 flex items-center text-[#2C2A29]/50 hover:text-[#2C2A29] cursor-pointer"
                aria-label="مسح البحث"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Quick Filter Tags */}
        <div className="flex items-center gap-2 mt-2 pt-2 border-t border-[#E5DCD0]/40 overflow-x-auto text-xs pb-0.5">
          <span className="text-[11px] font-medium text-[#2C2A29]/60 shrink-0">تصنيف سريع:</span>
          {[
            { label: 'طلب مسبق شائع', icon: Flame },
            { label: 'توقيع الشيف', icon: Sparkles },
            { label: 'نباتي', icon: Leaf },
          ].map((tag) => {
            const isSelected = selectedTagFilter === tag.label;
            const Icon = tag.icon;
            return (
              <button
                key={tag.label}
                onClick={() => onToggleTagFilter(tag.label)}
                className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-medium transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-[#7A3036] text-white'
                    : 'bg-[#EFEBE4] text-[#2C2A29]/75 hover:bg-[#F4EFE6] hover:text-[#7A3036] border border-[#E5DCD0]'
                }`}
              >
                <Icon className={`w-3 h-3 ${isSelected ? 'text-white' : 'text-[#C5A059]'}`} />
                <span>{tag.label}</span>
              </button>
            );
          })}
          {selectedTagFilter && (
            <button
              onClick={() => onToggleTagFilter('')}
              className="text-[11px] text-[#7A3036] hover:underline font-semibold pr-2"
            >
              إلغاء الفلتر
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
