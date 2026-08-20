import React, { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const StatCounter = ({ value, label, prefix = '', suffix = '' }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);

  // Extract numeric part
  const numericVal = parseFloat(value) || 0;

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const duration = 2000; // 2 seconds
      const steps = 40;
      const stepTime = duration / steps;
      const increment = numericVal / steps;

      const timer = setInterval(() => {
        start += increment;
        if (start >= numericVal) {
          setCount(numericVal);
          clearInterval(timer);
        } else {
          setCount(start);
        }
      }, stepTime);

      return () => clearInterval(timer);
    }
  }, [isInView, numericVal]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5 }}
      className="text-center p-6 glass-panel rounded-3xl"
    >
      <p className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white flex items-center justify-center">
        <span>{prefix}</span>
        <span>{numericVal % 1 === 0 ? Math.round(count) : count.toFixed(1)}</span>
        <span className="text-brand-500">{suffix}</span>
      </p>
      <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mt-2">
        {label}
      </p>
    </motion.div>
  );
};

export default StatCounter;
