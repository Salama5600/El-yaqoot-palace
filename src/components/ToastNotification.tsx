import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, X } from 'lucide-react';

interface ToastProps {
  message: string | null;
  onClose: () => void;
}

export const ToastNotification: React.FC<ToastProps> = ({ message, onClose }) => {
  return (
    <AnimatePresence>
      {message && (
        <motion.div
          initial={{ opacity: 0, x: -50, y: 0 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          exit={{ opacity: 0, x: -30, transition: { duration: 0.2 } }}
          transition={{ type: 'spring', stiffness: 350, damping: 25 }}
          className="fixed top-20 left-4 md:left-8 z-50 flex items-center gap-3 px-4 py-3 bg-[#FDFBF7] text-[#2C2A29] rounded-lg border border-[#C5A059]/40 shadow-soft-float max-w-sm"
          style={{
            boxShadow: '0 8px 24px rgba(44, 42, 41, 0.08), 0 0 0 1px rgba(197, 160, 89, 0.35)',
          }}
        >
          <div className="w-8 h-8 rounded-full bg-[#7A3036]/10 text-[#7A3036] flex items-center justify-center shrink-0">
            <CheckCircle2 className="w-5 h-5 text-[#7A3036]" />
          </div>

          <div className="flex-1 text-sm font-semibold leading-snug">
            {message}
          </div>

          <button
            onClick={onClose}
            className="text-[#2C2A29]/50 hover:text-[#2C2A29] p-1 transition-colors"
            aria-label="إغلاق الإشعار"
          >
            <X className="w-4 h-4" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
