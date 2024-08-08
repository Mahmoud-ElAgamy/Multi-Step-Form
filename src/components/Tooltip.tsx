import { useEffect, useRef } from "react";

import useFormContext from "../hooks/useFormContext";

type TooltipProps = {
  message: string;
  isVisible: boolean;
  hideTooltip: () => void;
};

const Tooltip = ({ message, isVisible, hideTooltip }: TooltipProps) => {
  const { currentStep, motion, AnimatePresence } = useFormContext();

  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    if (isVisible && timerRef.current === null) {
      timerRef.current = setTimeout(hideTooltip, 3000);
    } else if (!isVisible && timerRef.current !== null) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }, [isVisible, hideTooltip]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
          className={`absolute top-full md:top-[110%] ${currentStep === 2 && "lg:left-1/3"} z-[1] mt-1 rounded bg-Strawberry-red p-2 text-sm text-white shadow-lg`}
        >
          <span className="absolute bottom-full left-1/2 h-0 w-0 -translate-x-1/2 transform border-b-8 border-l-8 border-r-8 border-Strawberry-red border-l-transparent border-r-transparent border-t-transparent"></span>

          {message}
        </motion.p>
      )}
    </AnimatePresence>
  );
};

export default Tooltip;
