
import React, { useState } from 'react';
import { MOCK_PRODUCTS, MOCK_PACKAGES } from '../constants';
import { ProductType } from '../types';
import { Package, Search, Filter, Plus, Box, Layers, Cpu, Server, HardDrive, Edit2, Trash2, Tag, ShoppingBag } from 'lucide-react';
import { useTranslation } from '../contexts';

const ProductCenter: React.FC = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState<'PRODUCTS' | 'PACKAGES'>('PRODUCTS');
  const [typeFilter, setTypeFilter] = useState<ProductType | 'ALL'>('ALL');

  const filteredProducts = MOCK_PRODUCTS.filter(p => typeFilter === 'ALL' || p.type === typeFilter);

  const getProductIcon = (type: ProductType) => {
    switch(type) {
      case 'Hardware': return <HardDrive className="w-4 h-4" />;
      case 'Software': return <Box className="w-4 h-4" />;
      case 'Algorithm': return <Cpu className="w-4 h-4" />;
      case 'Service': return <Server className="w-4 h-4" />;
      default: return <Box className="w-4 h-4" />;
    }
  };

  const getProductTypeColor = (type: ProductType) => {
    switch(type) {
      case 'Hardware': return 'bg-slate-100 text-slate-700 dark:bg-slate-700 dark:text-slate-300';
      case 'Software': return 'bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300';
      case 'Algorithm': return 'bg-purple-50 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300';
      case 'Service': return 'bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-300';
      default: return 'bg-slate-100 text-slate-700';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100">{t('product.title')}</h2>
          <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">{t('product.subtitle')}</p>
        </div>
        <div className="flex gap-2">
           {activeTab === 'PRODUCTS' ? (
             <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 shadow-sm shadow-blue-200 dark:shadow-blue-900/20 flex items-center">
                <Plus className="w-4 h-4 mr-2" />
                {t('product.add')}
            </button>
           ) : (
             <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-indigo-700 shadow-sm shadow-indigo-200 dark:shadow-indigo-900/20 flex items-center">
                <Layers className="w-4 h-4 mr-2" />
                {t('product.addPackage')}
            </button>
           )}
        </div>
      </div>

      {/* Main Content Card */}
      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden transition-colors duration-200">
        
        {/* Tabs */}
        <div className="border-b border-slate-200 dark:border-slate-700">
            <div className="flex px-4 pt-4 space-x-6">
                <button 
                    onClick={() => setActiveTab('PRODUCTS')}
                    className={`pb-4 text-sm font-medium border-b-2 transition-colors flex items-center ${activeTab === 'PRODUCTS' ? 'border-blue-600 text-blue-600 dark:text-blue-400' : 'border-transparent text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-300'}`}
                >
                    <Box className="w-4 h-4 mr-2" />
                    {t('product.tab.products')}
                </button>
                <button 
                    onClick={() => setActiveTab('PACKAGES')}
                    className={`pb-4 text-sm font-medium border-b-2 transition-colors flex items-center ${activeTab === 'PACKAGES' ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400' : 'border-transparent text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-300'}`}
                >
                    <Package className="w-4 h-4 mr-2" />
                    {t('product.tab.packages')}
                </button>
            </div>
        </div>

        {/* Toolbar */}
        <div className="p-4 bg-slate-50 dark:bg-slate-900/50 flex flex-col md:flex-row gap-4 justify-between items-center border-b border-slate-200 dark:border-slate-700">
             <div className="relative w-full max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                <input 
                    type="text" 
                    placeholder={activeTab === 'PRODUCTS' ? "Search products..." : "Search packages..."}
                    className="w-full pl-10 pr-4 py-2 border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-slate-900 dark:text-slate-100 placeholder-slate-400"
                />
            </div>
            
            {activeTab === 'PRODUCTS' && (
                <div className="flex gap-2">
                    <select 
                        value={typeFilter}
                        onChange={(e) => setTypeFilter(e.target.value as ProductType | 'ALL')}
                        className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 px-3 py-2 rounded-lg text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="ALL">All Types</option>
                        <option value="Hardware">{t('product.type.hardware')}</option>
                        <option value="Software">{t('product.type.software')}</option>
                        <option value="Algorithm">{t('product.type.algorithm')}</option>
                        <option value="Service">{t('product.type.service')}</option>
                    </select>
                </div>
            )}
        </div>

        {/* Table Content */}
        <div className="overflow-x-auto">
            {activeTab === 'PRODUCTS' ? (
                <table className="w-full text-left text-sm text-slate-600 dark:text-slate-400">
                    <thead className="bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-semibold border-b border-slate-200 dark:border-slate-700">
                        <tr>
                            <th className="px-6 py-4">{t('product.col.name')}</th>
                            <th className="px-6 py-4">{t('product.col.type')}</th>
                            <th className="px-6 py-4">{t('product.col.price')}</th>
                            <th className="px-6 py-4">{t('product.col.specs')}</th>
                            <th className="px-6 py-4">{t('product.col.status')}</th>
                            <th className="px-6 py-4 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
                        {filteredProducts.map((product) => (
                            <tr key={product.id} className="hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
                                <td className="px-6 py-4">
                                    <div className="flex flex-col">
                                        <span className="font-medium text-slate-900 dark:text-slate-100 text-base">{product.name}</span>
                                        <span className="text-xs text-slate-400 font-mono mt-0.5">{product.id}</span>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium ${getProductTypeColor(product.type)}`}>
                                        {getProductIcon(product.type)}
                                        {t(`product.type.${product.type.toLowerCase()}`)}
                                    </span>
                                </td>
                                <td className="px-6 py-4 font-mono text-slate-800 dark:text-slate-200">
                                    ¥{product.price.toLocaleString()}
                                </td>
                                <td className="px-6 py-4">
                                    <div className="max-w-xs text-xs">
                                        <p className="truncate text-slate-600 dark:text-slate-300" title={product.description}>{product.description}</p>
                                        {(product.specs || product.version) && (
                                            <p className="text-slate-400 mt-0.5 font-mono truncate">
                                                {product.specs || `Ver: ${product.version}`} {product.stock !== undefined ? `• Stock: ${product.stock}` : ''}
                                            </p>
                                        )}
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${
                                        product.status === 'Active' ? 'bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-300 border-green-200 dark:border-green-800' : 
                                        'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700'
                                    }`}>
                                        {product.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <div className="flex items-center justify-end gap-2">
                                        <button className="p-2 text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-lg transition-colors" title="Edit">
                                            <Edit2 className="w-4 h-4" />
                                        </button>
                                        <button className="p-2 text-slate-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-lg transition-colors" title="Archive">
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <table className="w-full text-left text-sm text-slate-600 dark:text-slate-400">
                    <thead className="bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-semibold border-b border-slate-200 dark:border-slate-700">
                        <tr>
                            <th className="px-6 py-4">{t('product.col.name')}</th>
                            <th className="px-6 py-4">{t('product.col.pkgContent')}</th>
                            <th className="px-6 py-4">{t('product.col.price')}</th>
                            <th className="px-6 py-4">{t('product.col.pkgSavings')}</th>
                            <th className="px-6 py-4">{t('product.col.status')}</th>
                            <th className="px-6 py-4 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
                        {MOCK_PACKAGES.map((pkg) => {
                             const savings = Math.round(((pkg.originalPrice - pkg.price) / pkg.originalPrice) * 100);
                             return (
                                <tr key={pkg.id} className="hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="flex flex-col">
                                            <span className="font-medium text-slate-900 dark:text-slate-100 text-base">{pkg.name}</span>
                                            <span className="text-xs text-slate-400 font-mono mt-0.5">{pkg.id}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex flex-col gap-1">
                                            {pkg.items.slice(0, 2).map((item, idx) => (
                                                <div key={idx} className="flex items-center text-xs text-slate-600 dark:text-slate-300">
                                                    <span className={`w-1.5 h-1.5 rounded-full mr-1.5 ${
                                                        item.type === 'Hardware' ? 'bg-slate-400' :
                                                        item.type === 'Software' ? 'bg-blue-400' : 'bg-purple-400'
                                                    }`}></span>
                                                    {item.name}
                                                </div>
                                            ))}
                                            {pkg.items.length > 2 && (
                                                <span className="text-xs text-slate-400 pl-3">+{pkg.items.length - 2} more items</span>
                                            )}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex flex-col">
                                            <span className="font-bold text-slate-800 dark:text-slate-200">¥{pkg.price.toLocaleString()}</span>
                                            <span className="text-xs text-slate-400 line-through">¥{pkg.originalPrice.toLocaleString()}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-bold bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400">
                                            <Tag className="w-3 h-3 mr-1" />
                                            {savings}% OFF
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${
                                            pkg.status === 'Active' ? 'bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-300 border-green-200 dark:border-green-800' : 
                                            'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700'
                                        }`}>
                                            {pkg.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            <button className="p-2 text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-lg transition-colors" title="Edit">
                                                <Edit2 className="w-4 h-4" />
                                            </button>
                                            <button className="p-2 text-slate-400 hover:text-green-600 dark:hover:text-green-400 hover:bg-green-50 dark:hover:bg-green-900/30 rounded-lg transition-colors" title="Sell">
                                                <ShoppingBag className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                             );
                        })}
                    </tbody>
                </table>
            )}
            
            {((activeTab === 'PRODUCTS' && filteredProducts.length === 0) || (activeTab === 'PACKAGES' && MOCK_PACKAGES.length === 0)) && (
                <div className="p-12 text-center text-slate-500 dark:text-slate-400">
                    No items found matching your criteria.
                </div>
            )}
        </div>
      </div>
    </div>
  );
};

export default ProductCenter;
