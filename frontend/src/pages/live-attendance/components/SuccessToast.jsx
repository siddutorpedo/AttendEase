import React, { useEffect } from 'react';
import Icon from '../../../components/AppIcon';

const SuccessToast = ({ message, isVisible, onClose }) => {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-flow">
      <div className="bg-success text-success-foreground rounded-lg shadow-elevated p-4 flex items-center gap-3 min-w-[300px]">
        <div className="w-8 h-8 rounded-full bg-success-foreground/20 flex items-center justify-center flex-shrink-0">
          <Icon name="CheckCircle2" size={18} color="#FFFFFF" />
        </div>
        <p className="font-medium flex-1">{message}</p>
        <button
          onClick={onClose}
          className="p-1 rounded hover:bg-success-foreground/20 transition-colors"
        >
          <Icon name="X" size={16} color="#FFFFFF" />
        </button>
      </div>
    </div>
  );
};

export default SuccessToast;