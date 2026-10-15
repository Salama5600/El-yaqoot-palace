import React, { useState, useMemo, useEffect } from 'react';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { CategoryBar } from './components/CategoryBar';
import { FoodCard } from './components/FoodCard';
import { DishDetailModal } from './components/DishDetailModal';
import { ReservationModal } from './components/ReservationModal';
import { ToastNotification } from './components/ToastNotification';
import { DesignTokensDrawer } from './components/DesignTokensDrawer';
import { AmbienceSection } from './components/AmbienceSection';
import { BranchesSection } from './components/BranchesSection';
import { Footer } from './components/Footer';
import { MENU_ITEMS } from './data/menuData';
import { CategoryId, MenuItem, CartItem } from './types';
import { Sparkles, Calendar, UtensilsCrossed, ArrowUpRight } from 'lucide-react';

export default function App() {
  // Navigation & Category states
  const [activeCategory, setActiveCategory] = useState<CategoryId>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedTagFilter, setSelectedTagFilter] = useState<string | null>(null);

  // Cart / Pre-ordered items state
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [badgePulseKey, setBadgePulseKey] = useState<number>(0);

  // Toast notification state
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Modals state
  const [selectedDishDetail, setSelectedDishDetail] = useState<MenuItem | null>(null);
  const [isReservationOpen, setIsReservationOpen] = useState<boolean>(false);
  const [isDesignTokensOpen, setIsDesignTokensOpen] = useState<boolean>(false);

  // Auto-dismiss toast after 2.5 seconds as per Page 2 specification
  useEffect(() => {
    if (toastMessage) {
      const timer = setTimeout(() => {
        setToastMessage(null);
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [toastMessage]);

  // Micro-interaction when adding item to cart (Page 2 spec):
  // 1. Toast notification floats top-left for 2.5s: "تمت إضافة [اسم الطبق] إلى قائمة حجزك"
  // 2. Cart counter badge pulses (scale 1.0 to 1.25) in champagne gold
  const handleAddToCart = (item: MenuItem, quantity: number = 1) => {
    setCartItems((prev) => {
      const existing = prev.find((i) => i.dish.id === item.id);
      if (existing) {
        return prev.map((i) =>
          i.dish.id === item.id ? { ...i, quantity: i.quantity + quantity } : i
        );
      }
      return [...prev, { dish: item, quantity }];
    });

    // Trigger badge pulse
    setBadgePulseKey((k) => k + 1);

    // Trigger toast notification
    setToastMessage(`تمت إضافة [${item.name}] إلى قائمة حجزك`);
  };

  const handleUpdateCartQuantity = (dishId: string, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveFromCart(dishId);
      return;
    }
    setCartItems((prev) =>
      prev.map((i) => (i.dish.id === dishId ? { ...i, quantity } : i))
    );
  };

  const handleRemoveFromCart = (dishId: string) => {
    setCartItems((prev) => prev.filter((i) => i.dish.id !== dishId));
  };

  const totalCartCount = useMemo(() => {
    return cartItems.reduce((acc, curr) => acc + curr.quantity, 0);
  }, [cartItems]);

  // Filtered menu items based on category, search, and tags
  const filteredItems = useMemo(() => {
    return MENU_ITEMS.filter((item) => {
      // Category match
      if (activeCategory !== 'all' && item.category !== activeCategory) {
        return false;
      }

      // Search match
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const matchesName = item.name.toLowerCase().includes(query);
        const matchesDesc = item.description.toLowerCase().includes(query);
        const matchesIngredients = item.ingredients?.some((ing) =>
          ing.toLowerCase().includes(query)
        );
        if (!matchesName && !matchesDesc && !matchesIngredients) {
          return false;
        }
      }

      // Tag filter match
      if (selectedTagFilter) {
        if (selectedTagFilter === 'طلب مسبق شائع' && !item.isPopular) return false;
        if (selectedTagFilter === 'توقيع الشيف' && !item.isChefSpecial) return false;
        if (selectedTagFilter === 'نباتي' && !item.isVegetarian) return false;
      }

      return true;
    });
  }, [activeCategory, searchQuery, selectedTagFilter]);

  const scrollToMenu = () => {
    const el = document.getElementById('menu-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#2C2A29] flex flex-col font-sans selection:bg-[#7A3036]/20 selection:text-[#7A3036]">
      {/* Toast Notification (Top-Left 2.5s duration) */}
      <ToastNotification
        message={toastMessage}
        onClose={() => setToastMessage(null)}
      />

      {/* Sticky Header: 72px height, transparent to glassmorphism on scroll */}
      <Header
        cartCount={totalCartCount}
        badgePulseKey={badgePulseKey}
        onOpenCartOrReserve={() => setIsReservationOpen(true)}
      />

      {/* Stage 1: Hero Landing UI with ambient video, 32x32 mute toggle & quick reservation CTAs */}
      <HeroSection
        onOpenReservation={() => setIsReservationOpen(true)}
        onExploreMenu={scrollToMenu}
      />

      {/* Featured Innovation Highlight Banner: Integrated Reservation & Pre-Order */}
      <section className="bg-[#EFEBE4] py-8 border-y border-[#E5DCD0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#FDFBF7] rounded-[12px] p-5 sm:p-6 border border-[#C5A059]/40 shadow-soft-subtle flex flex-col md:flex-row items-center justify-between gap-5">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-[#7A3036] text-white flex items-center justify-center shrink-0 shadow-sm border border-[#C5A059]">
                <UtensilsCrossed className="w-6 h-6 text-[#C5A059]" />
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-bold text-[#7A3036] uppercase tracking-wider">
                    الابتكار الحصري في قصر الياقوت
                  </span>
                  <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-[#7A3036]/10 text-[#7A3036]">
                    Integrated Reservation
                  </span>
                </div>
                <h3 className="text-base sm:text-lg font-bold text-[#2C2A29] mb-1">
                  طاولتك جاهزة، وأطباقك الملكية تُقدّم فور وصولك!
                </h3>
                <p className="text-xs text-[#2C2A29]/75 max-w-2xl leading-relaxed">
                  تصفح المنيو أدناه، اضغط على <strong>«+ أضف للحجز»</strong> على أي طبق تفضله، وسيتولى كبار طهاتنا تحضيره ليكون جاهزاً بالدقيقة عند لحظة جلوسك.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 shrink-0 w-full md:w-auto">
              <button
                onClick={() => setIsReservationOpen(true)}
                className="w-full md:w-auto h-[44px] px-6 bg-[#7A3036] hover:bg-[#63242A] text-white text-xs sm:text-sm font-bold rounded-lg flex items-center justify-center gap-2 transition-all shadow-soft-subtle cursor-pointer"
              >
                <Calendar className="w-4 h-4 text-[#C5A059]" />
                <span>بدء الحجز والطلب المسبق</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Stage 2: Menu Section & Sticky Filter Bar at y=72px */}
      <section id="menu-section" className="py-12 relative">
        <CategoryBar
          activeCategory={activeCategory}
          onSelectCategory={(cat) => setActiveCategory(cat)}
          searchQuery={searchQuery}
          onSearchChange={(q) => setSearchQuery(q)}
          selectedTagFilter={selectedTagFilter}
          onToggleTagFilter={(tag) =>
            setSelectedTagFilter(selectedTagFilter === tag ? null : tag)
          }
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
          {/* Section Header */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#7A3036] mb-1">
                <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" />
                <span>قائمة الطهي الرفيع</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#2C2A29]">
                مختارات قصر الياقوت المعاصرة
              </h2>
            </div>
            <span className="text-xs text-[#2C2A29]/65">
              عرض {filteredItems.length} طبقاً متاحاً للحجز المسبق
            </span>
          </div>

          {/* Food Cards Grid */}
          {filteredItems.length === 0 ? (
            <div className="text-center py-16 bg-[#EFEBE4]/50 rounded-xl border border-dashed border-[#E5DCD0]">
              <p className="text-sm text-[#2C2A29]/70 mb-3">
                لم نجد أي طبق يطابق كلمة البحث أو الفلتر المختار.
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedTagFilter(null);
                  setActiveCategory('all');
                }}
                className="text-xs font-bold text-[#7A3036] hover:underline"
              >
                إعادة ضبط البحث وإظهار كافة الأطباق
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredItems.map((item) => {
                const inCartItem = cartItems.find((i) => i.dish.id === item.id);
                return (
                  <FoodCard
                    key={item.id}
                    item={item}
                    onAddToCart={(dish) => handleAddToCart(dish, 1)}
                    onOpenDetails={(dish) => setSelectedDishDetail(dish)}
                    isInCart={Boolean(inCartItem)}
                    cartQuantity={inCartItem?.quantity}
                  />
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* Dining Ambience & Seating Section */}
      <AmbienceSection
        onSelectSeatingForReservation={(seatingId) => {
          setIsReservationOpen(true);
        }}
      />

      {/* Branches & Locations Section */}
      <BranchesSection
        onSelectBranch={(branchId) => {
          setIsReservationOpen(true);
        }}
      />

      {/* Footer */}
      <Footer
        onOpenDesignTokens={() => setIsDesignTokensOpen(true)}
        onOpenReservation={() => setIsReservationOpen(true)}
      />

      {/* Modals & Overlays */}
      <DishDetailModal
        item={selectedDishDetail}
        onClose={() => setSelectedDishDetail(null)}
        onAddToCart={(dish, qty) => {
          handleAddToCart(dish, qty);
          setSelectedDishDetail(null);
        }}
        currentQuantityInCart={
          cartItems.find((i) => i.dish.id === selectedDishDetail?.id)?.quantity || 0
        }
      />

      <ReservationModal
        isOpen={isReservationOpen}
        onClose={() => setIsReservationOpen(false)}
        cartItems={cartItems}
        onUpdateCartItem={handleUpdateCartQuantity}
        onRemoveCartItem={handleRemoveFromCart}
        onExploreMoreDishes={() => scrollToMenu()}
      />

      <DesignTokensDrawer
        isOpen={isDesignTokensOpen}
        onClose={() => setIsDesignTokensOpen(false)}
        onTriggerQuickReserve={() => setIsReservationOpen(true)}
      />

      {/* Floating Sticky Mobile Quick Action for Pre-Order Cart */}
      {totalCartCount > 0 && !isReservationOpen && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 w-11/12 max-w-md">
          <button
            onClick={() => setIsReservationOpen(true)}
            className="w-full h-[52px] bg-[#7A3036] hover:bg-[#63242A] text-white rounded-xl shadow-2xl px-5 flex items-center justify-between transition-all hover:scale-[1.02] active:scale-[0.98] border border-[#C5A059]/40 cursor-pointer"
          >
            <div className="flex items-center gap-2.5">
              <span className="w-7 h-7 rounded-full bg-[#C5A059] text-white text-xs font-jakarta font-bold flex items-center justify-center">
                {totalCartCount}
              </span>
              <span className="text-xs sm:text-sm font-bold">
                أطباق محددة للطلب المسبق
              </span>
            </div>

            <div className="flex items-center gap-1.5 text-xs font-semibold text-[#FDFBF7]">
              <span>متابعة وتأكيد الحجز</span>
              <ArrowUpRight className="w-4 h-4 text-[#C5A059]" />
            </div>
          </button>
        </div>
      )}
    </div>
  );
}
