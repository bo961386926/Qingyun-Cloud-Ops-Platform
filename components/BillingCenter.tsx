import React from 'react';
import { MOCK_BILLS } from '../constants';
import { Download, Printer, Send, CreditCard } from 'lucide-react';
import { useTranslation } from '../contexts';

const BillingCenter: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="space-y-6">
       <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100">{t('billing.title')}</h2>
          <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">{t('billing.subtitle')}</p>
        </div>
        <div className="flex gap-3">
             <button className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 px-4 py-2 rounded-lg text-sm font-medium hover:bg-slate-50 dark:hover:bg-slate-700 flex items-center shadow-sm transition-colors">
                <CreditCard className="w-4 h-4 mr-2" /> {t('billing.paymentSettings')}
            </button>
             <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 shadow-sm shadow-blue-200 dark:shadow-blue-900/20">
                {t('billing.runCycle')}
            </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-blue-600 to-indigo-700 text-white rounded-xl p-6 shadow-lg shadow-blue-200 dark:shadow-blue-900/20">
            <p className="text-blue-100 text-sm font-medium mb-1">{t('billing.totalRevenue')}</p>
            <h3 className="text-3xl font-bold">¥128,450.00</h3>
            <div className="mt-4 flex gap-2 text-xs">
                <span className="bg-white/20 px-2 py-1 rounded">{t('billing.vsLast')}</span>
            </div>
        </div>
        <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm border border-slate-200 dark:border-slate-700 transition-colors">
            <p className="text-slate-500 dark:text-slate-400 text-sm font-medium mb-1">{t('billing.pendingInvoices')}</p>
            <h3 className="text-3xl font-bold text-slate-800 dark:text-slate-100">24</h3>
            <p className="text-amber-600 dark:text-amber-500 text-xs mt-2 font-medium">{t('billing.needsAttention')}</p>
        </div>
        <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm border border-slate-200 dark:border-slate-700 transition-colors">
            <p className="text-slate-500 dark:text-slate-400 text-sm font-medium mb-1">{t('billing.overdue')}</p>
            <h3 className="text-3xl font-bold text-slate-800 dark:text-slate-100">¥4,200.00</h3>
            <p className="text-red-500 dark:text-red-400 text-xs mt-2 font-medium">{t('billing.frozen')}</p>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 transition-colors">
        <div className="p-4 border-b border-slate-200 dark:border-slate-700">
            <h3 className="font-semibold text-slate-800 dark:text-slate-100">{t('billing.recent')}</h3>
        </div>
        <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-600 dark:text-slate-400">
                <thead className="bg-slate-50 dark:bg-slate-700/50 text-slate-700 dark:text-slate-300 font-semibold">
                    <tr>
                        <th className="px-6 py-3">{t('billing.col.id')}</th>
                        <th className="px-6 py-3">{t('table.tenant')}</th>
                        <th className="px-6 py-3">{t('billing.col.cycle')}</th>
                        <th className="px-6 py-3">{t('billing.col.amount')}</th>
                        <th className="px-6 py-3">{t('billing.col.status')}</th>
                        <th className="px-6 py-3">{t('billing.col.date')}</th>
                        <th className="px-6 py-3 text-right">{t('tenant.col.actions')}</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
                    {MOCK_BILLS.map(bill => (
                        <tr key={bill.id} className="hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
                            <td className="px-6 py-4 font-mono text-slate-500 dark:text-slate-400">{bill.id}</td>
                            <td className="px-6 py-4 font-medium text-slate-800 dark:text-slate-200">{bill.tenantName}</td>
                            <td className="px-6 py-4">{bill.cycle}</td>
                            <td className="px-6 py-4 font-medium text-slate-700 dark:text-slate-300">¥{bill.amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}</td>
                            <td className="px-6 py-4">
                                <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                                    bill.status === 'Paid' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300' :
                                    bill.status === 'Pending' ? 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300' :
                                    'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300'
                                }`}>
                                    {bill.status}
                                </span>
                            </td>
                            <td className="px-6 py-4 text-slate-500 dark:text-slate-400">{bill.generatedAt}</td>
                            <td className="px-6 py-4 text-right">
                                <div className="flex justify-end gap-2">
                                    <button className="text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors" title="Send Email">
                                        <Send className="w-4 h-4" />
                                    </button>
                                    <button className="text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 transition-colors" title="Download PDF">
                                        <Download className="w-4 h-4" />
                                    </button>
                                </div>
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

export default BillingCenter;