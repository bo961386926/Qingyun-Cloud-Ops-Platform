
import React, { useState } from 'react';
import { MOCK_ALGORITHMS } from '../constants';
import { AlgorithmStatus } from '../types';
import { UploadCloud, CheckCircle, XCircle, Search, Filter, Eye, Box, Clock, Users } from 'lucide-react';
import { useTranslation } from '../contexts';

const AlgorithmCenter: React.FC = () => {
  const { t } = useTranslation();
  const [filter, setFilter] = useState<'ALL' | 'AUDIT'>('ALL');

  const activeAlgorithms = MOCK_ALGORITHMS.filter(a => a.status === AlgorithmStatus.ACTIVE).length;
  const pendingAlgorithms = MOCK_ALGORITHMS.filter(a => a.status === AlgorithmStatus.PENDING).length;
  const totalSubscriptions = MOCK_ALGORITHMS.reduce((acc, curr) => acc + curr.subscriptions, 0);

  const filteredAlgorithms = MOCK_ALGORITHMS.filter(algo => {
    if (filter === 'AUDIT') return algo.status === AlgorithmStatus.PENDING;
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100">{t('algo.title')}</h2>
          <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">{t('algo.subtitle')}</p>
        </div>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 shadow-sm shadow-blue-200 dark:shadow-blue-900/20 flex items-center">
            <UploadCloud className="w-4 h-4 mr-2" />
            {t('algo.upload')}
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 transition-colors">
            <div className="flex justify-between items-start mb-4">
                <div className="p-2 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
                    <Box className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
            </div>
            <div>
                <h3 className="text-slate-500 dark:text-slate-400 text-sm font-medium">{t('algo.stats.active')}</h3>
                <p className="text-2xl font-bold text-slate-800 dark:text-slate-100 mt-1">{activeAlgorithms}</p>
            </div>
        </div>
        <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 transition-colors">
            <div className="flex justify-between items-start mb-4">
                <div className="p-2 bg-amber-50 dark:bg-amber-900/30 rounded-lg">
                    <Clock className="w-6 h-6 text-amber-600 dark:text-amber-400" />
                </div>
                {pendingAlgorithms > 0 && (
                    <span className="flex items-center text-xs font-medium text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/30 px-2 py-1 rounded-full">
                    {pendingAlgorithms} New
                    </span>
                )}
            </div>
            <div>
                <h3 className="text-slate-500 dark:text-slate-400 text-sm font-medium">{t('algo.stats.pending')}</h3>
                <p className="text-2xl font-bold text-slate-800 dark:text-slate-100 mt-1">{pendingAlgorithms}</p>
            </div>
        </div>
        <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 transition-colors">
            <div className="flex justify-between items-start mb-4">
                <div className="p-2 bg-purple-50 dark:bg-purple-900/30 rounded-lg">
                    <Users className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                </div>
            </div>
            <div>
                <h3 className="text-slate-500 dark:text-slate-400 text-sm font-medium">{t('algo.stats.subs')}</h3>
                <p className="text-2xl font-bold text-slate-800 dark:text-slate-100 mt-1">{totalSubscriptions}</p>
            </div>
        </div>
      </div>

      {/* Content Area */}
      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden transition-colors duration-200">
        
        {/* Tabs & Toolbar */}
        <div className="border-b border-slate-200 dark:border-slate-700">
            <div className="flex px-4 pt-4 space-x-6">
                <button 
                    onClick={() => setFilter('ALL')}
                    className={`pb-4 text-sm font-medium border-b-2 transition-colors ${filter === 'ALL' ? 'border-blue-600 text-blue-600 dark:text-blue-400' : 'border-transparent text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-300'}`}
                >
                    {t('algo.tab.all')}
                </button>
                <button 
                    onClick={() => setFilter('AUDIT')}
                    className={`pb-4 text-sm font-medium border-b-2 transition-colors flex items-center ${filter === 'AUDIT' ? 'border-amber-600 text-amber-600 dark:text-amber-400' : 'border-transparent text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-300'}`}
                >
                    {t('algo.tab.audit')}
                    {pendingAlgorithms > 0 && <span className="ml-2 bg-amber-100 text-amber-800 dark:bg-amber-900/50 dark:text-amber-300 text-xs py-0.5 px-2 rounded-full">{pendingAlgorithms}</span>}
                </button>
            </div>
        </div>

        <div className="p-4 bg-slate-50 dark:bg-slate-900/50 flex flex-col md:flex-row gap-4 justify-between items-center border-b border-slate-200 dark:border-slate-700">
             <div className="relative w-full max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                <input 
                    type="text" 
                    placeholder="Search algorithms..."
                    className="w-full pl-10 pr-4 py-2 border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-slate-900 dark:text-slate-100 placeholder-slate-400"
                />
            </div>
            <button className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 px-4 py-2 rounded-lg text-sm font-medium hover:bg-slate-50 dark:hover:bg-slate-700 flex items-center shadow-sm transition-colors">
                <Filter className="w-4 h-4 mr-2" /> Filter
            </button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-600 dark:text-slate-400">
            <thead className="bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-semibold border-b border-slate-200 dark:border-slate-700">
              <tr>
                <th className="px-6 py-4">{t('algo.col.name')}</th>
                <th className="px-6 py-4">{t('algo.col.developer')}</th>
                <th className="px-6 py-4">{t('algo.col.category')}</th>
                <th className="px-6 py-4">{t('algo.col.price')}</th>
                <th className="px-6 py-4">{t('algo.col.status')}</th>
                <th className="px-6 py-4">{t('algo.col.date')}</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
              {filteredAlgorithms.map((algo) => (
                <tr key={algo.id} className="hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                        <span className="font-medium text-slate-900 dark:text-slate-100 text-base">{algo.name}</span>
                        <span className="text-xs text-slate-400 font-mono mt-0.5">v{algo.version} • {algo.id}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-slate-800 dark:text-slate-200">{algo.developer}</td>
                  <td className="px-6 py-4">
                    <span className="bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 px-2 py-1 rounded text-xs">{algo.category}</span>
                  </td>
                  <td className="px-6 py-4 font-mono text-slate-800 dark:text-slate-200">
                    ¥{algo.price}/mo
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${
                      algo.status === AlgorithmStatus.ACTIVE ? 'bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-300 border-green-200 dark:border-green-800' : 
                      algo.status === AlgorithmStatus.PENDING ? 'bg-amber-50 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-800' : 
                      algo.status === AlgorithmStatus.REJECTED ? 'bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-300 border-red-200 dark:border-red-800' :
                      'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700'
                    }`}>
                      {algo.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-slate-500 dark:text-slate-400">{algo.submittedDate}</td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                        {algo.status === AlgorithmStatus.PENDING ? (
                            <>
                                <button className="p-2 text-green-600 hover:bg-green-50 dark:hover:bg-green-900/30 rounded-lg transition-colors tooltip" title={t('algo.action.approve')}>
                                    <CheckCircle className="w-4 h-4" />
                                </button>
                                <button className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-lg transition-colors tooltip" title={t('algo.action.reject')}>
                                    <XCircle className="w-4 h-4" />
                                </button>
                            </>
                        ) : null}
                         <button className="p-2 text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-lg transition-colors tooltip" title={t('algo.action.details')}>
                            <Eye className="w-4 h-4" />
                        </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filteredAlgorithms.length === 0 && (
            <div className="p-12 text-center text-slate-500 dark:text-slate-400">
                No algorithms found matching criteria.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AlgorithmCenter;
