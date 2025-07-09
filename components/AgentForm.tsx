'use client';

import { useState } from 'react';
import { Save, Loader2 } from 'lucide-react';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Card from '@/components/ui/Card';
import toast from 'react-hot-toast';

interface AgentFormProps {
  onSuccess?: () => void;
}

export default function AgentForm({ onSuccess }: AgentFormProps) {
  const [name, setName] = useState('');
  const [abbreviation, setAbbreviation] = useState('');
  const [feeRate, setFeeRate] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name || !feeRate) {
      toast.error('必須項目を入力してください');
      return;
    }

    setLoading(true);
    
    try {
      const response = await fetch('/api/agents', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          abbreviation: abbreviation || null,
          fee_rate: parseFloat(feeRate),
        }),
      });

      if (!response.ok) {
        throw new Error('保存に失敗しました');
      }

      toast.success('エージェントを登録しました');
      setName('');
      setAbbreviation('');
      setFeeRate('');
      onSuccess?.();
    } catch (error) {
      toast.error('エラーが発生しました');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="p-6">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium mb-2">
            エージェント名 <span className="text-red-500">*</span>
          </label>
          <Input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="例: ABC人材紹介"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            略称
          </label>
          <Input
            type="text"
            value={abbreviation}
            onChange={(e) => setAbbreviation(e.target.value)}
            placeholder="例: ABC"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            Fee率 (%) <span className="text-red-500">*</span>
          </label>
          <Input
            type="number"
            step="0.01"
            value={feeRate}
            onChange={(e) => setFeeRate(e.target.value)}
            placeholder="例: 35"
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
              保存中...
            </>
          ) : (
            <>
              <Save className="w-4 h-4 mr-2" />
              保存
            </>
          )}
        </Button>
      </form>
    </Card>
  );
}
