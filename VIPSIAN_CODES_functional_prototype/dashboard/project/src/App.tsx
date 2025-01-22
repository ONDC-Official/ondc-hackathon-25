import React, { useState } from 'react';
import { Bell, Home, Box, CreditCard, FileText, Users, Settings, LogOut, Upload, Search, Filter, Plus, Download, ChevronRight, Moon, Menu, X, AlertTriangle, BarChart2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { cn } from '@/lib/utils';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Legend } from 'recharts';

// Mock data for charts
const salesData = [
  { name: 'Jan', sales: 4000, orders: 240 },
  { name: 'Feb', sales: 3000, orders: 198 },
  { name: 'Mar', sales: 5000, orders: 305 },
  { name: 'Apr', sales: 2780, orders: 189 },
  { name: 'May', sales: 1890, orders: 142 },
  { name: 'Jun', sales: 2390, orders: 178 },
  { name: 'Jul', sales: 3490, orders: 234 },
];

const categoryData = [
  { name: 'Electronics', value: 35 },
  { name: 'Clothing', value: 25 },
  { name: 'Books', value: 15 },
  { name: 'Home', value: 20 },
  { name: 'Others', value: 5 },
];

// Styled Card Component
const StyledCard = ({ children, className = '' }) => (
  <Card 
    className={cn(
      'bg-card border-border hover:shadow-xl transition-all duration-200 hover:scale-[1.02]',
      className
    )}
  >
    {children}
  </Card>
);

// Navigation Item Component
const NavItem = ({ icon: Icon, label, active, onClick }) => (
  <button
    onClick={onClick}
    className={cn(
      'flex items-center space-x-3 w-full p-3 rounded-lg transition-all duration-200',
      active ? 'bg-primary/10 text-primary' : 'hover:bg-primary/5'
    )}
  >
    <Icon size={20} />
    <span className="font-medium">{label}</span>
  </button>
);

// Page Components
const HomePage = () => (
  <div className="space-y-6">
    <Alert className="mb-6">
      <AlertTriangle className="h-4 w-4" />
      <AlertDescription>
        Complete your KYC to unlock all features. <a href="#" className="text-primary hover:underline">Complete Now</a>
      </AlertDescription>
    </Alert>
    
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <StyledCard>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <h3 className="text-muted-foreground">Total Products</h3>
            <Box className="h-5 w-5 text-primary" />
          </div>
          <p className="text-3xl font-bold mt-2">1,234</p>
          <p className="text-sm text-muted-foreground mt-1">+12% from last month</p>
        </CardContent>
      </StyledCard>
      
      <StyledCard>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <h3 className="text-muted-foreground">Active Orders</h3>
            <FileText className="h-5 w-5 text-primary" />
          </div>
          <p className="text-3xl font-bold mt-2">56</p>
          <p className="text-sm text-muted-foreground mt-1">4 pending delivery</p>
        </CardContent>
      </StyledCard>
      
      <StyledCard>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <h3 className="text-muted-foreground">Revenue</h3>
            <CreditCard className="h-5 w-5 text-primary" />
          </div>
          <p className="text-3xl font-bold mt-2">₹45,678</p>
          <p className="text-sm text-muted-foreground mt-1">+8% from last week</p>
        </CardContent>
      </StyledCard>
      
      <StyledCard>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <h3 className="text-muted-foreground">Pending KYC</h3>
            <Users className="h-5 w-5 text-primary" />
          </div>
          <p className="text-3xl font-bold mt-2">2</p>
          <p className="text-sm text-muted-foreground mt-1">Action required</p>
        </CardContent>
      </StyledCard>
    </div>
  </div>
);

const InventoryPage = () => (
  <div className="space-y-6">
    <div className="flex justify-between items-center">
      <h2 className="text-3xl font-bold">Inventory</h2>
      <Button>
        <Plus className="h-4 w-4 mr-2" />
        Add Product
      </Button>
    </div>
    <div className="flex items-center space-x-4">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input placeholder="Search products..." className="pl-10" />
      </div>
      <Button variant="outline">
        <Filter className="h-4 w-4 mr-2" />
        Filter
      </Button>
      <Button variant="outline">
        <Download className="h-4 w-4 mr-2" />
        Export
      </Button>
    </div>
    <StyledCard>
      <CardContent className="p-6">
        <p className="text-muted-foreground">Inventory content goes here</p>
      </CardContent>
    </StyledCard>
  </div>
);

const BulkUploadPage = () => (
  <div className="space-y-6">
    <h2 className="text-3xl font-bold">Bulk Upload</h2>
    <StyledCard>
      <CardContent className="p-6">
        <p className="text-muted-foreground">Bulk upload interface goes here</p>
      </CardContent>
    </StyledCard>
  </div>
);

const PaymentPage = () => (
  <div className="space-y-6">
    <h2 className="text-3xl font-bold">Payments</h2>
    <StyledCard>
      <CardContent className="p-6">
        <p className="text-muted-foreground">Payment history and details go here</p>
      </CardContent>
    </StyledCard>
  </div>
);

const KYCPage = () => (
  <div className="space-y-6">
    <h2 className="text-3xl font-bold">KYC Verification</h2>
    <StyledCard>
      <CardContent className="p-6">
        <p className="text-muted-foreground">KYC verification process goes here</p>
      </CardContent>
    </StyledCard>
  </div>
);

const NotificationsPage = () => (
  <div className="space-y-6">
    <h2 className="text-3xl font-bold">Notifications</h2>
    <StyledCard>
      <CardContent className="p-6">
        <p className="text-muted-foreground">Notification center goes here</p>
      </CardContent>
    </StyledCard>
  </div>
);

const SettingsPage = () => (
  <div className="space-y-6">
    <h2 className="text-3xl font-bold">Settings</h2>
    <StyledCard>
      <CardContent className="p-6">
        <p className="text-muted-foreground">Settings and preferences go here</p>
      </CardContent>
    </StyledCard>
  </div>
);

const ReportingPage = () => (
  <div className="space-y-6">
    <div className="flex justify-between items-center">
      <h2 className="text-3xl font-bold">Analytics & Reports</h2>
      <Button variant="outline">
        <Download className="h-4 w-4 mr-2" />
        Export Report
      </Button>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {[
        { title: 'Total Revenue', value: '₹2,45,678', change: '+12.5%', trend: 'up' },
        { title: 'Average Order Value', value: '₹1,234', change: '+5.2%', trend: 'up' },
        { title: 'Conversion Rate', value: '3.2%', change: '-0.8%', trend: 'down' }
      ].map((stat, index) => (
        <StyledCard key={index}>
          <CardContent className="p-6">
            <h3 className="text-muted-foreground">{stat.title}</h3>
            <p className="text-3xl font-bold mt-2">{stat.value}</p>
            <p className={cn(
              "text-sm mt-1",
              stat.trend === 'up' ? 'text-green-500' : 'text-red-500'
            )}>
              {stat.change} from last month
            </p>
          </CardContent>
        </StyledCard>
      ))}
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Sales Trend Chart */}
      <StyledCard>
        <CardHeader>
          <CardTitle>Sales Trend</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={salesData}>
                <defs>
                  <linearGradient id="salesGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis dataKey="name" className="text-muted-foreground" />
                <YAxis className="text-muted-foreground" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                  }}
                  labelStyle={{ color: 'hsl(var(--foreground))' }}
                />
                <Area
                  type="monotone"
                  dataKey="sales"
                  stroke="hsl(var(--primary))"
                  fillOpacity={1}
                  fill="url(#salesGradient)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </StyledCard>

      {/* Category Distribution */}
      <StyledCard>
        <CardHeader>
          <CardTitle>Category Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={categoryData}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis dataKey="name" className="text-muted-foreground" />
                <YAxis className="text-muted-foreground" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                  }}
                  labelStyle={{ color: 'hsl(var(--foreground))' }}
                />
                <Bar
                  dataKey="value"
                  fill="hsl(var(--primary))"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </StyledCard>

      {/* Key Metrics */}
      <StyledCard className="lg:col-span-2">
        <CardHeader>
          <CardTitle>Key Performance Metrics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { label: 'Customer Retention', value: '68%', change: '+5%' },
              { label: 'Cart Abandonment', value: '24%', change: '-2%' },
              { label: 'Average Session', value: '4m 32s', change: '+12s' },
              { label: 'Return Rate', value: '3.2%', change: '-0.5%' },
            ].map((metric, index) => (
              <div key={index} className="p-4 rounded-lg bg-muted/50">
                <p className="text-sm text-muted-foreground">{metric.label}</p>
                <p className="text-2xl font-bold mt-1">{metric.value}</p>
                <p className="text-sm text-muted-foreground mt-1">{metric.change} vs last month</p>
              </div>
            ))}
          </div>
        </CardContent>
      </StyledCard>
    </div>
  </div>
);

// Main Dashboard Component
const Dashboard = () => {
  const [activePage, setActivePage] = useState('home');
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [notifications, setNotifications] = useState([
    { id: 1, title: 'New Order #1234', time: '2 mins ago', unread: true },
    { id: 2, title: 'Payment Received', time: '1 hour ago', unread: false }
  ]);
  const [showNotifications, setShowNotifications] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  const renderPage = () => {
    switch(activePage) {
      case 'inventory': return <InventoryPage />;
      case 'upload': return <BulkUploadPage />;
      case 'payments': return <PaymentPage />;
      case 'kyc': return <KYCPage />;
      case 'notifications': return <NotificationsPage />;
      case 'settings': return <SettingsPage />;
      case 'reporting': return <ReportingPage />;
      default: return <HomePage />;
    }
  };

  return (
    <div className={cn(
      'min-h-screen bg-background text-foreground',
      isDarkMode ? 'dark' : ''
    )}>
      {/* Sidebar */}
      <aside className={cn(
        'fixed top-0 left-0 h-full w-64 bg-card border-r border-border transition-transform duration-300 z-50',
        !isSidebarOpen && '-translate-x-full'
      )}>
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-xl font-bold">Dashboard</h1>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSidebarOpen(false)}
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
          
          <nav className="space-y-1">
            <NavItem icon={Home} label="Home" active={activePage === 'home'} onClick={() => setActivePage('home')} />
            <NavItem icon={Box} label="Inventory" active={activePage === 'inventory'} onClick={() => setActivePage('inventory')} />
            <NavItem icon={Upload} label="Bulk Upload" active={activePage === 'upload'} onClick={() => setActivePage('upload')} />
            <NavItem icon={CreditCard} label="Payments" active={activePage === 'payments'} onClick={() => setActivePage('payments')} />
            <NavItem icon={FileText} label="KYC" active={activePage === 'kyc'} onClick={() => setActivePage('kyc')} />
            <NavItem icon={BarChart2} label="Reports" active={activePage === 'reporting'} onClick={() => setActivePage('reporting')} />
            <NavItem icon={Bell} label="Notifications" active={activePage === 'notifications'} onClick={() => setActivePage('notifications')} />
            <NavItem icon={Settings} label="Settings" active={activePage === 'settings'} onClick={() => setActivePage('settings')} />
          </nav>
        </div>
        
        <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-border">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm">Dark Mode</span>
            <Switch checked={isDarkMode} onCheckedChange={toggleDarkMode} />
          </div>
          <Button variant="destructive" className="w-full" onClick={() => console.log('logout')}>
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className={cn(
        'transition-all duration-300',
        isSidebarOpen ? 'ml-64' : 'ml-0'
      )}>
        {/* Header */}
        <header className="sticky top-0 z-40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
          <div className="container flex h-16 items-center">
            <Button
              variant="ghost"
              size="icon"
              className={cn('mr-4', isSidebarOpen && 'hidden')}
              onClick={() => setSidebarOpen(true)}
            >
              <Menu className="h-5 w-5" />
            </Button>
            
            <div className="flex-1 flex items-center space-x-4">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search..."
                  className="pl-10"
                />
              </div>
              
              <div className="flex items-center space-x-4">
                <Button
                  variant="ghost"
                  size="icon"
                  className="relative"
                  onClick={() => setShowNotifications(!showNotifications)}
                >
                  <Bell className="h-5 w-5" />
                  {notifications.some(n => n.unread) && (
                    <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-primary" />
                  )}
                </Button>
                
                {showNotifications && (
                  <div className="absolute top-16 right-4 w-80 bg-card border border-border rounded-lg shadow-lg p-4">
                    <h3 className="font-semibold mb-3">Notifications</h3>
                    <div className="space-y-2">
                      {notifications.map(notification => (
                        <div
                          key={notification.id}
                          className={cn(
                            'p-3 rounded-lg transition-colors duration-200',
                            notification.unread ? 'bg-primary/5' : 'hover:bg-muted'
                          )}
                        >
                          <p className="font-medium">{notification.title}</p>
                          <p className="text-sm text-muted-foreground">{notification.time}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="container py-6">
          {renderPage()}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;