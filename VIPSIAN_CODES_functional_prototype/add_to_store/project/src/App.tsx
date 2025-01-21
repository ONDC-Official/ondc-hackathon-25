import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus, Package, Tags, DollarSign, Archive } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from '@/components/ui/label';

interface StoreItem {
  name: string;
  sku: string;
  category: string;
  price: number;
  quantity: number;
}

// Dashboard Component
const Dashboard = () => {
  const [items, setItems] = useState<StoreItem[]>([]);
  
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="container mx-auto p-6 space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <h2 className="text-3xl font-bold">Inventory</h2>
          <Link to="/add-item">
            <Button className="flex items-center">
              <Plus className="h-4 w-4 mr-2" />
              Add Item
            </Button>
          </Link>
        </div>

        {/* Items Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {items.map((item, index) => (
            <Card key={index} className="bg-card">
              <CardHeader>
                <CardTitle>{item.name}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex items-center text-sm">
                  <Package className="h-4 w-4 mr-2" />
                  <span>SKU: {item.sku}</span>
                </div>
                <div className="flex items-center text-sm">
                  <Tags className="h-4 w-4 mr-2" />
                  <span>Category: {item.category}</span>
                </div>
                <div className="flex items-center text-sm">
                  <DollarSign className="h-4 w-4 mr-2" />
                  <span>Price: ${item.price}</span>
                </div>
                <div className="flex items-center text-sm">
                  <Archive className="h-4 w-4 mr-2" />
                  <span>Quantity: {item.quantity}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

// Add Item Component
const AddItem = () => {
  const [formData, setFormData] = useState<StoreItem>({
    name: '',
    sku: '',
    category: '',
    price: 0,
    quantity: 0
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (field: keyof StoreItem, value: string | number) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async () => {
    if (!formData.name || !formData.sku || !formData.category) {
      setError("Please fill in all required fields.");
      return;
    }
    
    setLoading(true);
    setError('');

    try {
      // Replace with your actual API endpoint
      await axios.post('/api/items', formData);
      navigate('/');
    } catch (err) {
      console.error('Error adding item:', err);
      setError('Failed to add item. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const categories = [
    "Electronics",
    "Clothing",
    "Food",
    "Books",
    "Home & Garden",
    "Toys",
    "Sports",
    "Other"
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="container mx-auto max-w-2xl p-6">
        <Card className="bg-card">
          <CardHeader>
            <CardTitle>Add New Item</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                placeholder="Item name"
                value={formData.name}
                onChange={(e) => handleChange('name', e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="sku">SKU</Label>
              <Input
                id="sku"
                placeholder="Stock Keeping Unit"
                value={formData.sku}
                onChange={(e) => handleChange('sku', e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select
                value={formData.category}
                onValueChange={(value) => handleChange('category', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category.toLowerCase()}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="price">Price</Label>
              <Input
                id="price"
                type="number"
                min="0"
                step="0.01"
                placeholder="0.00"
                value={formData.price}
                onChange={(e) => handleChange('price', parseFloat(e.target.value))}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="quantity">Quantity</Label>
              <Input
                id="quantity"
                type="number"
                min="0"
                placeholder="0"
                value={formData.quantity}
                onChange={(e) => handleChange('quantity', parseInt(e.target.value, 10))}
              />
            </div>

            {error && (
              <p className="text-destructive text-sm">{error}</p>
            )}

            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => navigate('/')}>
                Cancel
              </Button>
              <Button onClick={handleSubmit} disabled={loading}>
                {loading ? 'Adding Item...' : 'Add Item'}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

// Main App Component with Router
const App = () => (
  <div className="dark">
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/add-item" element={<AddItem />} />
      </Routes>
    </Router>
  </div>
);

export default App;