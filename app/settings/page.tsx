'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import AgentForm from '@/components/AgentForm';
import AgentList from '@/components/AgentList';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/Tabs';

export default function SettingsPage() {
  const [refreshKey, setRefreshKey] = useState(0);

  const handleAgentAdded = () => {
    setRefreshKey(prev => prev + 1);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold mb-8 text-center">設定</h1>
        
        <Tabs defaultValue="add" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="add">エージェント追加</TabsTrigger>
            <TabsTrigger value="list">エージェント一覧</TabsTrigger>
          </TabsList>
          
          <TabsContent value="add">
            <AgentForm onSuccess={handleAgentAdded} />
          </TabsContent>
          
          <TabsContent value="list">
            <AgentList key={refreshKey} />
          </TabsContent>
        </Tabs>
      </motion.div>
    </div>
  );
}
