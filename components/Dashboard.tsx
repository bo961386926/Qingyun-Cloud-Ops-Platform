import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { MOCK_TENANTS, MOCK_ALERTS, API_USAGE_DATA, STORAGE_DISTRIBUTION } from '../constants';
import { TenantStatus } from '../types';
import { ArrowUpRight, Users, AlertTriangle, CreditCard, Activity } from 'lucide-react';
import { useTranslation } from '../contexts';

const COLORS = ['#3b82f6', '#94a3b8', '#cbd5e1'];

const MetricCard = ({ title, value, subtext, icon: Icon, trend }: any) => (
  <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700 flex flex-col justify-between h-full transition-colors duration-200">
    <div className="flex justify-between items-start mb-4">
      <div className="p-2 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
        <Icon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
      </div>
      {trend && (
        <span className="flex items-center text-xs font-medium text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/30 px-2 py-1 rounded-full">
          +{trend}% <ArrowUpRight className="w-3 h-3 ml-1" />
        </span>
      )}
    </div>
    <div>
      <h3 className="text-slate-500 dark:text-slate-400 text-sm font-medium">{title}</h3>
      <p className="text-2xl font-bold text-slate-800 dark:text-slate-100 mt-1">{value}</p>
      {subtext && <p className="text-xs text-slate-400 dark:text-slate-500 mt-2">{subtext}</p>}
    </div>
  </div>
);

const Dashboard: React.FC = () => {
  const { t } = useTranslation();
  const activeTenants = MOCK_TENANTS.filter(t => t.status === TenantStatus.ACTIVE).length;
  const warningTenants = MOCK_TENANTS.filter(t => t.status === TenantStatus.WARNING).length;
  const totalRevenue = MOCK_TENANTS.reduce((acc, curr) => acc + (curr.balance > 0 ? curr.balance : 0), 0);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard 
          title={t('dashboard.activeTenants')}
          value={activeTenants} 
          subtext={t('dashboard.newThisWeek')}
          icon={Users}
          trend={12}
        />
        <MetricCard 
          title={t('dashboard.criticalAlerts')}
          value={MOCK_ALERTS.filter(a => a.type === 'CRITICAL').length} 
          subtext={t('dashboard.immediateAttention')}
          icon={AlertTriangle}
        />
        <MetricCard 
          title={t('dashboard.monthlyRevenue')}
          value={`¥${totalRevenue.toLocaleString()}`} 
          subtext={t('dashboard.basedOnUsage')}
          icon={CreditCard}
          trend={8.5}
        />
        <MetricCard 
          title={t('dashboard.systemHealth')}
          value="99.98%" 
          subtext={t('dashboard.apiLatency')}
          icon={Activity}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* API Usage Chart */}
        <div className="lg:col-span-2 bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700 transition-colors duration-200">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100">{t('dashboard.globalApi')}</h3>
            <span className="text-xs text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-700 px-2 py-1 rounded">{t('dashboard.liveData')}</span>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={API_USAGE_DATA}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" className="dark:stroke-slate-700" />
                <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  itemStyle={{ color: '#1e293b' }}
                />
                <Line 
                  type="monotone" 
                  dataKey="calls" 
                  stroke="#3b82f6" 
                  strokeWidth={3} 
                  dot={false}
                  activeDot={{ r: 6, fill: '#2563eb' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Storage Distribution */}
        <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700 transition-colors duration-200">
          <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-6">{t('dashboard.storageDist')}</h3>
          <div className="h-64 relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={STORAGE_DISTRIBUTION}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {STORAGE_DISTRIBUTION.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex items-center justify-center flex-col pointer-events-none">
              <span className="text-2xl font-bold text-slate-800 dark:text-slate-100">12.5 TB</span>
              <span className="text-xs text-slate-500 dark:text-slate-400">{t('dashboard.totalUsed')}</span>
            </div>
          </div>
          <div className="mt-4 space-y-2">
            {STORAGE_DISTRIBUTION.map((item, idx) => (
              <div key={item.name} className="flex justify-between items-center text-sm">
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: COLORS[idx] }}></div>
                  <span className="text-slate-600 dark:text-slate-300">{item.name}</span>
                </div>
                <span className="font-medium text-slate-800 dark:text-slate-200">{item.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Critical Alerts Table */}
      <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700 transition-colors duration-200">
        <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-4">{t('dashboard.alertsTitle')}</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-600 dark:text-slate-400">
            <thead className="bg-slate-50 dark:bg-slate-700/50 text-slate-700 dark:text-slate-200 font-semibold border-b border-slate-200 dark:border-slate-700">
              <tr>
                <th className="px-4 py-3">{t('table.severity')}</th>
                <th className="px-4 py-3">{t('table.message')}</th>
                <th className="px-4 py-3">{t('table.tenant')}</th>
                <th className="px-4 py-3">{t('table.time')}</th>
                <th className="px-4 py-3">{t('table.action')}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
              {MOCK_ALERTS.map(alert => (
                <tr key={alert.id} className="hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
                  <td className="px-4 py-3">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      alert.type === 'CRITICAL' ? 'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300' : 
                      alert.type === 'WARNING' ? 'bg-amber-100 text-amber-800 dark:bg-amber-900/50 dark:text-amber-300' : 'bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300'
                    }`}>
                      {alert.type}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-slate-800 dark:text-slate-200 font-medium">{alert.message}</td>
                  <td className="px-4 py-3">{alert.tenantId || '-'}</td>
                  <td className="px-4 py-3 text-slate-500 dark:text-slate-400">{alert.timestamp}</td>
                  <td className="px-4 py-3">
                    <button className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 text-xs font-medium">{t('action.investigate')}</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;