import React from 'react';
import { MOCK_TENANTS } from '../constants';
import { TenantStatus } from '../types';
import { Search, Filter, MoreVertical, Edit2, Ban, RefreshCw } from 'lucide-react';
import { useTranslation } from '../contexts';

const TenantList: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100">{t('tenant.title')}</h2>
          <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">{t('tenant.subtitle')}</p>
        </div>
        <div className="flex gap-2">
           <button className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 px-4 py-2 rounded-lg text-sm font-medium hover:bg-slate-50 dark:hover:bg-slate-700 flex items-center shadow-sm transition-colors">
            <Filter className="w-4 h-4 mr-2" /> {t('tenant.filter')}
          </button>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 shadow-sm shadow-blue-200 dark:shadow-blue-900/20">
            {t('tenant.new')}
          </button>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden transition-colors duration-200">
        {/* Toolbar */}
        <div className="p-4 border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/50 flex items-center justify-between">
            <div className="relative w-full max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                <input 
                    type="text" 
                    placeholder={t('tenant.search')}
                    className="w-full pl-10 pr-4 py-2 border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-slate-900 dark:text-slate-100 placeholder-slate-400"
                />
            </div>
            <span className="text-sm text-slate-500 dark:text-slate-400 hidden md:block">{t('tenant.showing')} {MOCK_TENANTS.length} tenants</span>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-600 dark:text-slate-400">
            <thead className="bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-semibold border-b border-slate-200 dark:border-slate-700">
              <tr>
                <th className="px-6 py-4">{t('tenant.col.name')}</th>
                <th className="px-6 py-4">{t('tenant.col.status')}</th>
                <th className="px-6 py-4">{t('tenant.col.period')}</th>
                <th className="px-6 py-4">{t('tenant.col.usage')}</th>
                <th className="px-6 py-4">{t('tenant.col.balance')}</th>
                <th className="px-6 py-4 text-right">{t('tenant.col.actions')}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
              {MOCK_TENANTS.map((tenant) => (
                <tr key={tenant.id} className="hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                        <span className="font-medium text-slate-900 dark:text-slate-100 text-base">{tenant.name}</span>
                        <span className="text-xs text-slate-400 font-mono mt-0.5">{tenant.id} • {tenant.adminName}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${
                      tenant.status === TenantStatus.ACTIVE ? 'bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-300 border-green-200 dark:border-green-800' : 
                      tenant.status === TenantStatus.WARNING ? 'bg-amber-50 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-800' : 
                      tenant.status === TenantStatus.EXPIRED ? 'bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-300 border-red-200 dark:border-red-800' :
                      'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700'
                    }`}>
                      {tenant.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                        <span className="text-slate-900 dark:text-slate-200">{tenant.endDate}</span>
                        <span className="text-xs text-slate-400">Since {tenant.startDate}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="w-32">
                        <div className="flex justify-between text-xs mb-1">
                            <span>Storage</span>
                            <span className={tenant.cloudStorageUsed/tenant.cloudStorageLimit > 0.8 ? 'text-amber-600 dark:text-amber-400' : 'text-slate-500 dark:text-slate-400'}>
                                {Math.round((tenant.cloudStorageUsed/tenant.cloudStorageLimit)*100)}%
                            </span>
                        </div>
                        <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-1.5">
                            <div 
                                className={`h-1.5 rounded-full ${
                                    tenant.cloudStorageUsed/tenant.cloudStorageLimit > 0.9 ? 'bg-red-500' : 
                                    tenant.cloudStorageUsed/tenant.cloudStorageLimit > 0.75 ? 'bg-amber-500' : 'bg-blue-500'
                                }`} 
                                style={{ width: `${Math.min(100, (tenant.cloudStorageUsed/tenant.cloudStorageLimit)*100)}%` }}
                            ></div>
                        </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 font-mono">
                    <span className={tenant.balance < 0 ? 'text-red-600 dark:text-red-400 font-medium' : 'text-slate-600 dark:text-slate-300'}>
                        ¥{tenant.balance.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                        <button className="p-2 text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-lg transition-colors tooltip" title="Edit">
                            <Edit2 className="w-4 h-4" />
                        </button>
                        <button className="p-2 text-slate-400 hover:text-green-600 dark:hover:text-green-400 hover:bg-green-50 dark:hover:bg-green-900/30 rounded-lg transition-colors" title="Renew Service">
                            <RefreshCw className="w-4 h-4" />
                        </button>
                        <button className="p-2 text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors">
                            <MoreVertical className="w-4 h-4" />
                        </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="p-4 border-t border-slate-200 dark:border-slate-700 flex justify-center">
            <button className="text-sm text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200 font-medium">{t('tenant.loadMore')}</button>
        </div>
      </div>
    </div>
  );
};

export default TenantList;