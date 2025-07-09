'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calculator, Copy, Loader2 } from 'lucide-react';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Card from '@/components/ui/Card';
import toast from 'react-hot-toast';
import { formatCurrency } from '@/lib/utils';

interface CalculationResult {
  agent_name: string;
  fee_rate: number;
  annual_salary: number;
  fee_amount: number;
}

export default function CalculateForm() {
  const [agentInput, setAgentInput] = useState('');
  const [salary, setSalary] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<CalculationResult | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!agentInput || !salary) {
      toast.error('すべての項目を入力してください');
      return;
    }

    setLoading(true);
    
    try {
      const response = await fetch('/api/calculate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          agent_input: agentInput,
          annual_salary: parseFloat(salary),
        }),
      });

      if (!response.ok) {
        throw new Error('計算に失敗しました');
      }

      const data = await response.json();
      setResult(data);
      toast.success('計算が完了しました');
    } catch (error) {
      toast.error('エラーが発生しました');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    if (result) {
      navigator.clipboard.writeText(result.fee_amount.toString());
      toast.success('コピーしました');
    }
  };

  return (
    <>
      <Card className="p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2">
              エージェント名（略称可）
            </label>
            <Input
              type="text"
              value={agentInput}
              onChange={(e) => setAgentInput(e.target.value)}
              placeholder="例: ABC人材、ABC"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              年収（円）
            </label>
            <Input
              type="number"
              value={salary}
              onChange={(e) => setSalary(e.target.value)}
              placeholder="例: 5000000"
              required
            />
          </div>

          <Button
            type="submit"
            className="w-full"
            disabled={loading}
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                計算中...
              </>
            ) : (
              <>
                <Calculator className="w-4 h-4 mr-2" />
                Fee計算
              </>
            )}
          </Button>
        </form>
      </Card>

      <AnimatePresence>
        {result && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="mt-6 p-6">
              <h3 className="text-lg font-semibold mb-4">計算結果</h3>
              
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">エージェント名:</span>
                  <span className="font-medium">{result.agent_name}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-600">Fee率:</span>
                  <span className="font-medium">{result.fee_rate}%</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-600">年収:</span>
                  <span className="font-medium">{formatCurrency(result.annual_salary)}</span>
                </div>
                
                <div className="h-px bg-gray-200 dark:bg-gray-700 my-4" />
                
                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold">Fee金額:</span>
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                      {formatCurrency(result.fee_amount)}
                    </span>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={copyToClipboard}
                      title="コピー"
                    >
                      <Copy className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
