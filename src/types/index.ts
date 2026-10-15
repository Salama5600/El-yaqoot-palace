export type CategoryId = 'all' | 'appetizers' | 'mains' | 'beverages' | 'desserts';

export interface MenuItem {
  id: string;
  name: string;
  arabicName: string;
  category: CategoryId;
  price: number;
  description: string;
  calories?: number;
  serves?: string;
  prepTime?: string;
  image: string;
  isPopular?: boolean;
  isChefSpecial?: boolean;
  isVegetarian?: boolean;
  tags?: string[];
  ingredients?: string[];
  allergens?: string[];
}

export interface Branch {
  id: string;
  name: string;
  city: string;
  address: string;
  mapUrl: string;
}

export interface SeatingOption {
  id: string;
  name: string;
  description: string;
  depositFee: number;
  iconName: string;
}

export interface TimeSlot {
  time: string;
  available: boolean;
  period: 'afternoon' | 'evening' | 'night';
}

export interface CartItem {
  dish: MenuItem;
  quantity: number;
  notes?: string;
}

export interface ReservationData {
  branchId: string;
  seatingId: string;
  date: string;
  time: string;
  guestsCount: number;
  occasion: string;
  specialRequests?: string;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  saveDetails: boolean;
  paymentMethod: 'apple_pay' | 'credit_card';
  tableNumber: string;
  bookingCode: string;
  bookingTimestamp: string;
  items: CartItem[];
  tableDeposit: number;
  itemsTotal: number;
  vatAmount: number;
  grandTotal: number;
}
