'use client';

import { motion } from 'framer-motion';
import CalculateForm from '@/components/CalculateForm';

export default function CalculatePage() {
  return (
    <div className="max-w-2xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold mb-8 text-center">Fee計算</h1>
        <CalculateForm />
      </motion.div>
    </div>
  );
}
