'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Calculator, Settings } from 'lucide-react';
import Card from '@/components/ui/Card';

export default function Home() {
  return (
    <div className="max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl font-bold text-center mb-8 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          エージェントFee計算システム
        </h1>
        
        <div className="grid md:grid-cols-2 gap-6">
          <Link href="/calculate">
            <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer group">
              <div className="flex flex-col items-center justify-center p-8 text-center">
                <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Calculator className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                </div>
                <h2 className="text-2xl font-semibold mb-2">Fee計算</h2>
                <p className="text-gray-600 dark:text-gray-400">
                  エージェント名と年収を入力してFeeを自動計算
                </p>
              </div>
            </Card>
          </Link>

          <Link href="/settings">
            <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer group">
              <div className="flex flex-col items-center justify-center p-8 text-center">
                <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Settings className="w-8 h-8 text-purple-600 dark:text-purple-400" />
                </div>
                <h2 className="text-2xl font-semibold mb-2">設定</h2>
                <p className="text-gray-600 dark:text-gray-400">
                  エージェント情報とFee率を管理
                </p>
              </div>
            </Card>
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
