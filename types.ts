
export enum ViewState {
  DASHBOARD = 'DASHBOARD',
  TENANTS = 'TENANTS',
  RESOURCES = 'RESOURCES',
  BILLING = 'BILLING',
  ALERTS = 'ALERTS',
  ALGORITHMS = 'ALGORITHMS',
  PRODUCT_CENTER = 'PRODUCT_CENTER'
}

export enum TenantStatus {
  ACTIVE = 'Active',
  WARNING = 'Warning',
  EXPIRED = 'Expired',
  LOCKED = 'Locked'
}

export type Language = 'en' | 'zh-CN' | 'zh-TW' | 'si' | 'ta';
export type Theme = 'light' | 'dark';

export interface Tenant {
  id: string;
  name: string;
  adminName: string;
  startDate: string;
  endDate: string;
  status: TenantStatus;
  cloudStorageUsed: number; // in GB
  cloudStorageLimit: number; // in GB
  apiCallsMonth: number;
  balance: number;
}

export interface Alert {
  id: string;
  type: 'CRITICAL' | 'WARNING' | 'INFO';
  message: string;
  timestamp: string;
  tenantId?: string;
}

export interface Bill {
  id: string;
  tenantName: string;
  cycle: string;
  amount: number;
  status: 'Paid' | 'Pending' | 'Overdue';
  generatedAt: string;
}

export interface ResourceMetric {
  name: string;
  value: number;
  limit: number;
  unit: string;
}

export enum AlgorithmStatus {
  PENDING = 'Pending',   // Waiting for audit
  ACTIVE = 'Active',     // Approved and listed
  REJECTED = 'Rejected', // Audit failed
  DEPRECATED = 'Deprecated'
}

export interface Algorithm {
  id: string;
  name: string;
  version: string;
  developer: string;
  category: string;
  description: string;
  status: AlgorithmStatus;
  price: number; // Monthly subscription price
  subscriptions: number;
  submittedDate: string;
}

export type ProductType = 'Hardware' | 'Software' | 'Algorithm' | 'Service';

export interface Product {
  id: string;
  name: string;
  type: ProductType;
  price: number;
  status: 'Active' | 'Draft' | 'Archived';
  description: string;
  specs?: string; // For hardware mainly
  version?: string; // For software/algo
  stock?: number;
}

export interface ProductPackage {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice: number;
  items: { productId: string; name: string; type: ProductType }[]; 
  status: 'Active' | 'Draft' | 'Archived';
}
