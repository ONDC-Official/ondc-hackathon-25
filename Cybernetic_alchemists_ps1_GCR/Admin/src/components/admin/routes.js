import React from 'react';
import { Route, Switch } from 'react-router-dom';
import DashboardEnhanced from './Dashboard-enhanced';
import DashboardNew from './Dashboard-new';
import OrderManagement from './OrderManagement';
import InventoryManagement from './InventoryManagement-enhanced';
import ProductManagement from './ProductManagement';
import RevenueManagement from './RevenueManagement'; // Import the RevenueManagement component

const Routes = () => {
  return (
    <Switch>
      <Route path="/dashboard-enhanced" component={DashboardEnhanced} />
      <Route path="/dashboard-new" component={DashboardNew} />
      <Route path="/order-management" component={OrderManagement} />
      <Route path="/inventory-management" component={InventoryManagement} />
      <Route path="/product-management" component={ProductManagement} />
      <Route path="/RevenueManagement" component={RevenueManagement} /> {/* Add this line */}
      {/* Add more routes as needed */}
    </Switch>
  );
};

export default Routes;
