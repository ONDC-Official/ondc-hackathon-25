import React, { useState } from 'react';
import { PackageSearch, Store, DollarSign, Package, ListPlus } from 'lucide-react';

interface ProductForm {
  retailerName: string;
  sku: string;
  category: string;
  price: string;
  quantity: string;
}

interface ApiResponse {
  success: boolean;
  message: string;
}

function App() {
  const [formData, setFormData] = useState<ProductForm>({
    retailerName: '',
    sku: '',
    category: '',
    price: '',
    quantity: ''
  });

  const [isLoading, setIsLoading] = useState(false);
  const [apiMessage, setApiMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const categories = [
    'Electronics',
    'Clothing',
    'Food & Beverages',
    'Home & Garden',
    'Beauty & Personal Care',
    'Sports & Outdoors',
    'Toys & Games',
    'Books & Stationery',
    'Automotive',
    'Other'
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setApiMessage(null);

    try {
      const response = await fetch('https://c95f-2401-4900-8388-731e-a986-46cb-754a-4e9.ngrok-free.app/apii/inventory/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          retailerName: formData.retailerName,
          sku: formData.sku,
          category: formData.category,
          price: parseFloat(formData.price),
          quantity: parseInt(formData.quantity)
        })
      });

      const data: ApiResponse = await response.json();

      if (response.ok) {
        setApiMessage({ type: 'success', text: 'Product added successfully!' });
        // Reset form after successful submission
        setFormData({
          retailerName: '',
          sku: '',
          category: '',
          price: '',
          quantity: ''
        });
      } else {
        setApiMessage({ type: 'error', text: data.message || 'Failed to add product. Please try again.' });
      }
    } catch (error) {
      setApiMessage({ 
        type: 'error', 
        text: 'Network error occurred. Please check your connection and try again.' 
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="flex items-center justify-center mb-8">
            <ListPlus className="h-10 w-10 text-indigo-600" />
            <h1 className="ml-3 text-3xl font-bold text-gray-900">Add New Product</h1>
          </div>

          {apiMessage && (
            <div className={`mb-6 p-4 rounded-md ${
              apiMessage.type === 'success' ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'
            }`}>
              {apiMessage.text}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="flex items-center text-sm font-medium text-gray-700 mb-1">
                <Store className="h-4 w-4 mr-2 text-gray-500" />
                Retailer Name
              </label>
              <input
                type="text"
                name="retailerName"
                value={formData.retailerName}
                onChange={handleChange}
                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                required
                disabled={isLoading}
              />
            </div>

            <div>
              <label className="flex items-center text-sm font-medium text-gray-700 mb-1">
                <PackageSearch className="h-4 w-4 mr-2 text-gray-500" />
                Stock Keeping Unit (SKU)
              </label>
              <input
                type="text"
                name="sku"
                value={formData.sku}
                onChange={handleChange}
                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                required
                disabled={isLoading}
              />
            </div>

            <div>
              <label className="flex items-center text-sm font-medium text-gray-700 mb-1">
                <Package className="h-4 w-4 mr-2 text-gray-500" />
                Category
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                required
                disabled={isLoading}
              >
                <option value="">Select a category</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="flex items-center text-sm font-medium text-gray-700 mb-1">
                  <DollarSign className="h-4 w-4 mr-2 text-gray-500" />
                  Price
                </label>
                <div className="relative">
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    min="0"
                    step="0.01"
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    required
                    disabled={isLoading}
                  />
                </div>
              </div>

              <div>
                <label className="flex items-center text-sm font-medium text-gray-700 mb-1">
                  <Package className="h-4 w-4 mr-2 text-gray-500" />
                  Quantity
                </label>
                <input
                  type="number"
                  name="quantity"
                  value={formData.quantity}
                  onChange={handleChange}
                  min="0"
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  required
                  disabled={isLoading}
                />
              </div>
            </div>

            <div className="pt-4">
              <button
                type="submit"
                disabled={isLoading}
                className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
                  isLoading 
                    ? 'bg-indigo-400 cursor-not-allowed' 
                    : 'bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                } transition-colors duration-200`}
              >
                {isLoading ? 'Adding Product...' : 'Add Product to Store'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;