
import { Tenant, TenantStatus, Alert, Bill, ViewState, Algorithm, AlgorithmStatus, Product, ProductPackage } from './types';
import { LayoutDashboard, Users, Server, CreditCard, Bell, Cpu, Package } from 'lucide-react';

export const NAV_ITEMS = [
  { id: ViewState.DASHBOARD, label: 'nav.dashboard', icon: LayoutDashboard },
  { id: ViewState.TENANTS, label: 'nav.tenants', icon: Users },
  { id: ViewState.RESOURCES, label: 'nav.resources', icon: Server },
  { id: ViewState.PRODUCT_CENTER, label: 'nav.products', icon: Package },
  { id: ViewState.ALGORITHMS, label: 'nav.algorithms', icon: Cpu },
  { id: ViewState.BILLING, label: 'nav.billing', icon: CreditCard },
  { id: ViewState.ALERTS, label: 'nav.alerts', icon: Bell },
];

export const MOCK_TENANTS: Tenant[] = [
  {
    id: 'T-1001',
    name: 'TechFlow Solutions',
    adminName: 'Alice Wu',
    startDate: '2024-01-15',
    endDate: '2025-01-15',
    status: TenantStatus.ACTIVE,
    cloudStorageUsed: 450,
    cloudStorageLimit: 1000,
    apiCallsMonth: 125000,
    balance: 5800.00
  },
  {
    id: 'T-1002',
    name: 'Global Retail Inc',
    adminName: 'Bob Chen',
    startDate: '2023-11-01',
    endDate: '2024-11-01',
    status: TenantStatus.WARNING, // Approaching expiry or limits
    cloudStorageUsed: 920,
    cloudStorageLimit: 1000,
    apiCallsMonth: 850000,
    balance: 1200.00
  },
  {
    id: 'T-1003',
    name: 'Alpha Stream',
    adminName: 'Charlie Zhang',
    startDate: '2024-03-10',
    endDate: '2024-04-10',
    status: TenantStatus.EXPIRED,
    cloudStorageUsed: 100,
    cloudStorageLimit: 500,
    apiCallsMonth: 5000,
    balance: -200.00
  },
  {
    id: 'T-1004',
    name: 'NextGen AI',
    adminName: 'David Li',
    startDate: '2024-05-20',
    endDate: '2025-05-20',
    status: TenantStatus.ACTIVE,
    cloudStorageUsed: 2500,
    cloudStorageLimit: 5000,
    apiCallsMonth: 2300000,
    balance: 15400.00
  },
  {
    id: 'T-1005',
    name: 'MediCare Hub',
    adminName: 'Eva Wang',
    startDate: '2024-02-01',
    endDate: '2025-02-01',
    status: TenantStatus.ACTIVE,
    cloudStorageUsed: 600,
    cloudStorageLimit: 1000,
    apiCallsMonth: 45000,
    balance: 3200.00
  }
];

export const MOCK_ALERTS: Alert[] = [
  {
    id: 'A-001',
    type: 'CRITICAL',
    message: 'Global Retail Inc (T-1002) storage usage > 90%',
    timestamp: '10 mins ago',
    tenantId: 'T-1002'
  },
  {
    id: 'A-002',
    type: 'WARNING',
    message: 'Alpha Stream (T-1003) service expired 3 days ago',
    timestamp: '2 hours ago',
    tenantId: 'T-1003'
  },
  {
    id: 'A-003',
    type: 'INFO',
    message: 'Monthly billing cycle generated successfully',
    timestamp: '5 hours ago'
  },
  {
    id: 'A-004',
    type: 'WARNING',
    message: 'SMS Channel "Verify-01" latency > 5s',
    timestamp: 'Yesterday'
  }
];

export const MOCK_BILLS: Bill[] = [
  { id: 'B-202410-001', tenantName: 'TechFlow Solutions', cycle: '2024-10', amount: 1250.00, status: 'Paid', generatedAt: '2024-11-01' },
  { id: 'B-202410-002', tenantName: 'Global Retail Inc', cycle: '2024-10', amount: 3400.50, status: 'Pending', generatedAt: '2024-11-01' },
  { id: 'B-202410-003', tenantName: 'Alpha Stream', cycle: '2024-10', amount: 150.00, status: 'Overdue', generatedAt: '2024-11-01' },
  { id: 'B-202410-004', tenantName: 'NextGen AI', cycle: '2024-10', amount: 8900.00, status: 'Paid', generatedAt: '2024-11-01' },
];

export const MOCK_ALGORITHMS: Algorithm[] = [
  {
    id: 'ALG-001',
    name: 'Face Recognition Pro',
    version: '2.1.0',
    developer: 'Vision AI Labs',
    category: 'Computer Vision',
    description: 'High-accuracy facial recognition for security access control.',
    status: AlgorithmStatus.ACTIVE,
    price: 500,
    subscriptions: 12,
    submittedDate: '2024-08-15'
  },
  {
    id: 'ALG-002',
    name: 'Traffic Flow Optimizer',
    version: '1.0.5',
    developer: 'Urban Tech',
    category: 'Smart City',
    description: 'Real-time traffic analysis and light control optimization.',
    status: AlgorithmStatus.PENDING, // Needs Audit
    price: 1200,
    subscriptions: 0,
    submittedDate: '2024-11-18'
  },
  {
    id: 'ALG-003',
    name: 'Voice Noise Cancellation',
    version: '3.0.1',
    developer: 'AudioClean Inc.',
    category: 'Audio Processing',
    description: 'Removes background noise from call center audio streams.',
    status: AlgorithmStatus.ACTIVE,
    price: 300,
    subscriptions: 45,
    submittedDate: '2024-06-20'
  },
  {
    id: 'ALG-004',
    name: 'License Plate Reader',
    version: '1.2.0',
    developer: 'Vision AI Labs',
    category: 'Computer Vision',
    description: 'Fast license plate detection for parking lots.',
    status: AlgorithmStatus.REJECTED,
    price: 400,
    subscriptions: 0,
    submittedDate: '2024-10-01'
  },
  {
    id: 'ALG-005',
    name: 'Fraud Detection Engine',
    version: '0.9.0-beta',
    developer: 'FinSecure',
    category: 'Fintech',
    description: 'Transaction anomaly detection using LSTM networks.',
    status: AlgorithmStatus.PENDING, // Needs Audit
    price: 2000,
    subscriptions: 0,
    submittedDate: '2024-11-19'
  }
];

export const API_USAGE_DATA = [
  { name: '00:00', calls: 4000 },
  { name: '04:00', calls: 3000 },
  { name: '08:00', calls: 15000 },
  { name: '12:00', calls: 25000 },
  { name: '16:00', calls: 22000 },
  { name: '20:00', calls: 18000 },
  { name: '23:59', calls: 8000 },
];

export const STORAGE_DISTRIBUTION = [
  { name: 'Active Data', value: 65 },
  { name: 'Archived', value: 25 },
  { name: 'Backup', value: 10 },
];

export const MOCK_PRODUCTS: Product[] = [
  {
    id: 'PRD-001',
    name: 'Edge AI Gateway V2',
    type: 'Hardware',
    price: 2499.00,
    status: 'Active',
    description: 'High-performance edge computing gateway for on-premise deployment.',
    specs: 'ARM Cortex-A72, 8GB RAM, 256GB SSD',
    stock: 150
  },
  {
    id: 'PRD-002',
    name: 'Smart Camera 4K',
    type: 'Hardware',
    price: 899.00,
    status: 'Active',
    description: 'Outdoor waterproof 4K IP camera with night vision.',
    specs: '4K Res, IP67, IR 30m',
    stock: 45
  },
  {
    id: 'PRD-003',
    name: 'Traffic Analysis SDK',
    type: 'Software',
    price: 500.00,
    status: 'Active',
    description: 'Software Development Kit for traffic flow analysis.',
    version: 'v2.1'
  },
  {
    id: 'PRD-004',
    name: 'Face Recognition Algo',
    type: 'Algorithm',
    price: 200.00,
    status: 'Active',
    description: 'Core algorithm license for face detection and matching.',
    version: 'v4.0'
  },
  {
    id: 'PRD-005',
    name: 'Cloud Storage 10TB',
    type: 'Service',
    price: 150.00,
    status: 'Active',
    description: 'Standard object storage monthly subscription.',
  },
  {
    id: 'PRD-006',
    name: 'Industrial Sensor Kit',
    type: 'Hardware',
    price: 1200.00,
    status: 'Draft',
    description: 'IoT sensors for vibration and temperature monitoring.',
    specs: 'Zigbee, Battery Powered',
    stock: 0
  }
];

export const MOCK_PACKAGES: ProductPackage[] = [
  {
    id: 'PKG-001',
    name: 'Smart City Starter',
    description: 'Complete kit for intersection monitoring.',
    price: 3500.00,
    originalPrice: 4298.00,
    items: [
      { productId: 'PRD-001', name: 'Edge AI Gateway V2', type: 'Hardware' },
      { productId: 'PRD-002', name: 'Smart Camera 4K', type: 'Hardware' },
      { productId: 'PRD-002', name: 'Smart Camera 4K', type: 'Hardware' }
    ],
    status: 'Active'
  },
  {
    id: 'PKG-002',
    name: 'Retail Analytics Bundle',
    description: 'Software and algorithm bundle for store heatmaps.',
    price: 650.00,
    originalPrice: 700.00,
    items: [
      { productId: 'PRD-003', name: 'Traffic Analysis SDK', type: 'Software' },
      { productId: 'PRD-004', name: 'Face Recognition Algo', type: 'Algorithm' }
    ],
    status: 'Active'
  }
];
