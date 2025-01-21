import React, { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Spin } from 'antd';
import ErrorBoundary from './ErrorBoundary';
import AdminLayout from './components/admin/AdminLayout';
import Home from './components/admin/Home';

// Lazy load components for better performance
const ProductManagement = lazy(() => import('./components/admin/ProductManagement'));
const OrderManagement = lazy(() => import('./components/admin/OrderManagement'));
const InventoryManagement = lazy(() => import('./components/admin/InventoryManagement-enhanced'));
const Reports = lazy(() => import('./components/admin/Reports'));
const Settings = lazy(() => import('./components/admin/Settings'));
const Support = lazy(() => import('./components/admin/Support'));

const LoadingSpinner = () => (
  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
    <Spin size="large" />
  </div>
);

function App() {
  return (
    <ErrorBoundary>
      <Suspense fallback={<LoadingSpinner />}>
        <Routes>
          {/* Wrap all nested routes with AdminLayout */}
          <Route path="/" element={<AdminLayout />}>
            {/* Use exact path to prevent accidental duplicates */}
            <Route index element={<Home />} />
            <Route path="products" element={<ProductManagement />} />
            <Route path="orders" element={<OrderManagement />} />
            <Route path="inventory" element={<InventoryManagement />} />
            <Route path="reports" element={<Reports />} />
            <Route path="settings" element={<Settings />} />
            <Route path="support" element={<Support />} />
          </Route>
        </Routes>
      </Suspense>
    </ErrorBoundary>
  );
}

export default App;
