import React from 'react';
import { MOCK_TENANTS } from '../constants';
import { Server, MessageSquare, Code, Cpu } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useTranslation } from '../contexts';

const ResourceMonitor: React.FC = () => {
  const { t } = useTranslation();
  // Simulate aggregate data for the chart
  const resourceData = MOCK_TENANTS.map(t => ({
    name: t.name.split(' ')[0],
    storage: t.cloudStorageUsed,
    api: t.apiCallsMonth / 1000, // Scale down for visualization
  }));

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100">{t('resource.title')}</h2>
          <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">{t('resource.subtitle')}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: t('resource.cloudStorage'), value: '12.4 TB', limit: '50 TB', icon: Server, color: 'blue' },
          { label: t('resource.sms'), value: '1.2M', limit: '5M', icon: MessageSquare, color: 'green' },
          { label: t('resource.apiCalls'), value: '450M', limit: '1B', icon: Code, color: 'purple' },
          { label: t('resource.algoTasks'), value: '8.5k', limit: '20k', icon: Cpu, color: 'orange' },
        ].map((item, idx) => (
          <div key={idx} className="bg-white dark:bg-slate-800 p-5 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 transition-colors">
             <div className="flex items-center justify-between mb-4">
                <div className={`p-2 rounded-lg bg-${item.color}-50 dark:bg-${item.color}-900/30`}>
                    <item.icon className={`w-5 h-5 text-${item.color}-600 dark:text-${item.color}-400`} />
                </div>
                <span className="text-xs font-medium text-slate-400 dark:text-slate-500">{t('resource.totalUsage')}</span>
             </div>
             <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-100">{item.value}</h3>
             <div className="mt-2 w-full bg-slate-100 dark:bg-slate-700 rounded-full h-1.5">
                <div className={`h-1.5 rounded-full bg-${item.color}-500`} style={{ width: '35%' }}></div>
             </div>
             <p className="text-xs text-slate-400 dark:text-slate-500 mt-2">of {item.limit} {t('resource.capacity')}</p>
          </div>
        ))}
      </div>

      <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 transition-colors">
        <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-6">{t('resource.topConsumers')}</h3>
        <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
                <BarChart data={resourceData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" className="dark:stroke-slate-700" />
                    <XAxis dataKey="name" stroke="#94a3b8" tick={{fill: '#94a3b8'}} />
                    <YAxis yAxisId="left" orientation="left" stroke="#3b82f6" />
                    <YAxis yAxisId="right" orientation="right" stroke="#8b5cf6" />
                    <Tooltip 
                        cursor={{fill: 'rgba(248, 250, 252, 0.1)'}} 
                        contentStyle={{ 
                            borderRadius: '8px', 
                            border: 'none', 
                            boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                            backgroundColor: '#fff',
                            color: '#1e293b'
                        }} 
                    />
                    <Bar yAxisId="left" dataKey="storage" name="Storage (GB)" fill="#3b82f6" radius={[4, 4, 0, 0]} barSize={40} />
                    <Bar yAxisId="right" dataKey="api" name="API Calls (k)" fill="#8b5cf6" radius={[4, 4, 0, 0]} barSize={40} />
                </BarChart>
            </ResponsiveContainer>
        </div>
      </div>

      {/* Configuration Section Mock */}
      <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 transition-colors">
        <div className="flex justify-between items-center mb-4">
             <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100">{t('resource.channelConfig')}</h3>
             <button className="text-sm text-blue-600 dark:text-blue-400 font-medium hover:underline">{t('resource.manageAll')}</button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="border border-slate-200 dark:border-slate-700 rounded-lg p-4 flex items-center justify-between">
                <div>
                    <h4 className="font-medium text-slate-800 dark:text-slate-100">SMS - Primary Channel</h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Aliyun SMS Gateway • Latency 120ms</p>
                </div>
                <div className="flex items-center">
                    <span className="w-2 h-2 rounded-full bg-green-500 mr-2"></span>
                    <span className="text-sm text-slate-600 dark:text-slate-300">{t('resource.active')}</span>
                </div>
            </div>
            <div className="border border-slate-200 dark:border-slate-700 rounded-lg p-4 flex items-center justify-between">
                <div>
                    <h4 className="font-medium text-slate-800 dark:text-slate-100">Algorithm - GPU Cluster A</h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">NVIDIA A100 x 8 • Load 45%</p>
                </div>
                <div className="flex items-center">
                    <span className="w-2 h-2 rounded-full bg-green-500 mr-2"></span>
                    <span className="text-sm text-slate-600 dark:text-slate-300">{t('resource.active')}</span>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default ResourceMonitor;