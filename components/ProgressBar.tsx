'use client';

import { motion } from 'framer-motion';

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
}

export default function ProgressBar({ currentStep, totalSteps }: ProgressBarProps) {
  return (
    <div className="flex items-center justify-between mb-8">
      {Array.from({ length: totalSteps }, (_, i) => (
        <div key={i} className="flex items-center flex-1 last:flex-none">
          <div className="flex flex-col items-center">
            <motion.div
              animate={{
                backgroundColor: i + 1 <= currentStep ? '#00C2A8' : '#EDF2F7',
                scale: i + 1 === currentStep ? 1.1 : 1,
              }}
              className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold font-label"
            >
              <span className={i + 1 <= currentStep ? 'text-white' : 'text-dark/40'}>
                {i + 1}
              </span>
            </motion.div>
            <span className="text-xs mt-2 text-dark/60 font-label">
              {i === 0 ? 'Personal' : i === 1 ? 'Service' : 'Confirm'}
            </span>
          </div>
          {i < totalSteps - 1 && (
            <div className="flex-1 h-1 mx-3 bg-card rounded-full overflow-hidden">
              <motion.div
                animate={{ width: i + 1 < currentStep ? '100%' : '0%' }}
                className="h-full bg-accent"
                transition={{ duration: 0.5 }}
              />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
