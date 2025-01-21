import React from 'react';
import { 
  Form, 
  Input, 
  InputNumber, 
  Select, 
  Upload, 
  DatePicker, 
  TreeSelect,
  Switch,
  Space,
  Button 
} from 'antd';
import 'react-quill/dist/quill.snow.css';
import { UploadOutlined } from '@ant-design/icons';
import ReactQuill from 'react-quill';

const { TextArea } = Input;

const ProductForm = ({ form, initialValues }) => {
  return (
    <Form
      form={form}
      layout="vertical"
      initialValues={{
        ...initialValues,
        images: initialValues.images || [], // Ensure images is initialized as an array
        videos: initialValues.videos || [], // Ensure videos is initialized as an array
        documents: initialValues.documents || [], // Ensure documents is initialized as an array
      }}
    >
      {/* Essential Information */}
      <h3>Essential Information</h3>
      <Form.Item
        name="productName"
        label="Product Name"
        rules={[{ required: true, message: 'Please enter product name' }]}
      >
        <Input placeholder="e.g., Organic Basmati Rice" />
      </Form.Item>

      <Form.Item
        name="category"
        label="Category"
        rules={[{ required: true, message: 'Please select category' }]}
      >
        <TreeSelect
          placeholder="Select category"
          treeData={[
            {
              title: 'Groceries & Food',
              value: 'groceries',
              children: [
                {
                  title: 'Grains & Rice',
                  value: 'grains',
                  children: [
                    { title: 'Rice', value: 'rice' },
                    { title: 'Wheat', value: 'wheat' },
                    { title: 'Millets', value: 'millets' }
                  ],
                },
                {
                  title: 'Snacks',
                  value: 'snacks',
                  children: [
                    { title: 'Chips', value: 'chips' },
                    { title: 'Nuts', value: 'nuts' },
                    { title: 'Cookies', value: 'cookies' }
                  ],
                }
              ],
            },
            {
              title: 'Home & Kitchen',
              value: 'home',
              children: [
                {
                  title: 'Cookware',
                  value: 'cookware',
                  children: [
                    { title: 'Pots & Pans', value: 'pots' },
                    { title: 'Utensils', value: 'utensils' }
                  ],
                },
                {
                  title: 'Appliances',
                  value: 'appliances',
                  children: [
                    { title: 'Small Appliances', value: 'small_appliances' },
                    { title: 'Large Appliances', value: 'large_appliances' }
                  ],
                }
              ],
            },
            {
              title: 'Fashion',
              value: 'fashion',
              children: [
                {
                  title: 'Men',
                  value: 'men',
                  children: [
                    { title: 'Clothing', value: 'men_clothing' },
                    { title: 'Footwear', value: 'men_footwear' }
                  ],
                },
                {
                  title: 'Women',
                  value: 'women',
                  children: [
                    { title: 'Clothing', value: 'women_clothing' },
                    { title: 'Footwear', value: 'women_footwear' }
                  ],
                }
              ],
            }
          ]}
          onChange={(value, label) => {
            // Reset sub-category when main category changes
            form.setFieldValue('subCategory', undefined);
          }}
        />
      </Form.Item>

      <Form.Item
        name="subCategory"
        label="Sub-Category"
        dependencies={['category']}
      >
        <Select
          placeholder="Select sub-category"
          options={(() => {
            const category = form.getFieldValue('category');
            // Define sub-categories based on selected category
            const subCategories = {
              rice: [
                { label: 'Basmati Rice', value: 'basmati' },
                { label: 'Brown Rice', value: 'brown' },
                { label: 'Jasmine Rice', value: 'jasmine' }
              ],
              wheat: [
                { label: 'Whole Wheat', value: 'whole' },
                { label: 'Refined Wheat', value: 'refined' }
              ],
              men_clothing: [
                { label: 'T-Shirts', value: 'tshirts' },
                { label: 'Shirts', value: 'shirts' },
                { label: 'Pants', value: 'pants' }
              ],
              women_clothing: [
                { label: 'Dresses', value: 'dresses' },
                { label: 'Tops', value: 'tops' },
                { label: 'Skirts', value: 'skirts' }
              ]
            };
            return subCategories[category] || [];
          })()}
        />
      </Form.Item>

      <Form.Item
        name="brand"
        label="Brand"
        rules={[{ required: true }]}
      >
        <Input />
      </Form.Item>

      {/* Detailed Description */}
      <h3>Detailed Description</h3>
      <Form.Item
        name="description"
        label="Product Description"
      >
        <ReactQuill theme="snow" />
      </Form.Item>

      <Form.Item
        name="keyFeatures"
        label="Key Features"
      >
        <TextArea rows={4} placeholder="Enter key features (one per line)" />
      </Form.Item>

      <Form.Item
        name="benefits"
        label="Benefits"
      >
        <TextArea rows={4} placeholder="Enter product benefits" />
      </Form.Item>

      {/* Pricing and Offers */}
      <h3>Pricing and Offers</h3>
      <Space align="start">
        <Form.Item
          name="mrp"
          label="MRP"
          rules={[{ required: true }]}
        >
          <InputNumber 
            min={0}
            formatter={value => `₹${value}`} // Change to rupees
          />
        </Form.Item>

        <Form.Item
          name="sellingPrice"
          label="Selling Price"
          rules={[{ required: true }]}
        >
          <InputNumber 
            min={0}
            formatter={value => `₹${value}`} // Change to rupees
          />
        </Form.Item>

        <Form.Item
          name="discountPercentage"
          label="Discount %"
        >
          <InputNumber 
            min={0} 
            max={100}
            formatter={value => `${value}%`}
            parser={value => value.replace('%', '')}
            onChange={(value) => {
              const mrp = form.getFieldValue('mrp');
              if (mrp && value) {
                const sp = (mrp - (mrp * value / 100)).toFixed(2);
                form.setFieldsValue({ sellingPrice: parseFloat(sp) });
              }
            }}
          />
        </Form.Item>

        <Form.Item
          name="tax"
          label="Tax Details"
        >
          <Select style={{ width: 120 }}>
            <Select.Option value="0">0% GST</Select.Option>
            <Select.Option value="5">5% GST</Select.Option>
            <Select.Option value="12">12% GST</Select.Option>
            <Select.Option value="18">18% GST</Select.Option>
            <Select.Option value="28">28% GST</Select.Option>
          </Select>
        </Form.Item>
      </Space>

      {/* Inventory Details */}
      <h3>Inventory Details</h3>
      <Space>
        <Form.Item
          name="stockQuantity"
          label="Stock Quantity"
          rules={[{ required: true }]}
        >
          <InputNumber min={0} />
        </Form.Item>

        <Form.Item
          name="moq"
          label="Minimum Order Quantity"
        >
          <InputNumber min={1} />
        </Form.Item>

        <Form.Item
          name="restockingTime"
          label="Restocking Time"
        >
          <Select style={{ width: 120 }}>
            <Select.Option value="1d">1 Day</Select.Option>
            <Select.Option value="3d">3 Days</Select.Option>
            <Select.Option value="1w">1 Week</Select.Option>
            <Select.Option value="2w">2 Weeks</Select.Option>
          </Select>
        </Form.Item>
      </Space>

      {/* Product Attributes */}
      <h3>Product Attributes</h3>
      <Form.Item
        name="variants"
        label="Product Variants"
      >
        <Space direction="vertical" style={{ width: '100%' }}>
          <Form.Item
            name="sizes"
            label="Sizes Available"
            noStyle
          >
            <Select mode="multiple" placeholder="Select sizes" style={{ width: '100%' }}>
              <Select.Option value="xs">XS</Select.Option>
              <Select.Option value="s">S</Select.Option>
              <Select.Option value="m">M</Select.Option>
              <Select.Option value="l">L</Select.Option>
              <Select.Option value="xl">XL</Select.Option>
              <Select.Option value="xxl">XXL</Select.Option>
            </Select>
          </Form.Item>
          
          <Form.Item
            name="colors"
            label="Colors Available"
            noStyle
          >
            <Select mode="multiple" placeholder="Select colors" style={{ width: '100%' }}>
              <Select.Option value="red">Red</Select.Option>
              <Select.Option value="blue">Blue</Select.Option>
              <Select.Option value="green">Green</Select.Option>
              <Select.Option value="black">Black</Select.Option>
              <Select.Option value="white">White</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="material"
            label="Material"
            noStyle
          >
            <Input placeholder="e.g., Cotton, Polyester, Metal" />
          </Form.Item>
        </Space>
      </Form.Item>

      <Form.Item
        name="sku"
        label="SKU"
        rules={[{ required: true }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="barcode"
        label="Barcode/UPC/EAN"
      >
        <Input />
      </Form.Item>

      {/* Shipping Details */}
      <h3>Shipping Details</h3>
      <Space direction="vertical" style={{ width: '100%' }}>
        <Space>
          <Form.Item
            name="length"
            label="Length (cm)"
          >
            <InputNumber min={0} />
          </Form.Item>

          <Form.Item
            name="width"
            label="Width (cm)"
          >
            <InputNumber min={0} />
          </Form.Item>

          <Form.Item
            name="height"
            label="Height (cm)"
          >
            <InputNumber min={0} />
          </Form.Item>
        </Space>

        <Space>
          <Form.Item
            name="weight"
            label="Weight (kg)"
          >
            <InputNumber min={0} step={0.1} />
          </Form.Item>

          <Form.Item
            name="shippingFee"
            label="Shipping Fee"
          >
            <Select style={{ width: 200 }}>
              <Select.Option value="free">Free Shipping</Select.Option>
              <Select.Option value="flat">Flat Rate</Select.Option>
              <Select.Option value="weight">Weight Based</Select.Option>
            </Select>
          </Form.Item>
        </Space>
      </Space>

      {/* Media Upload */}
      <h3>Media Upload</h3>
      <Form.Item
        name="images"
        label="Product Images"
        valuePropName="fileList"
        rules={[{ required: true, message: 'Please upload at least one product image' }]}
      >
        <Upload 
          multiple 
          listType="picture-card"
          accept=".jpg,.jpeg,.png"
        >
          <div>
            <UploadOutlined />
            <div style={{ marginTop: 8 }}>Upload</div>
          </div>
        </Upload>
      </Form.Item>

      <Form.Item
        name="videos"
        label="Product Videos"
        valuePropName="fileList"
      >
        <Upload
          accept=".mp4,.mov"
          maxCount={1}
        >
          <Button icon={<UploadOutlined />}>Upload Product Video</Button>
        </Upload>
      </Form.Item>

      <Form.Item
        name="documents"
        label="Product Documentation"
        valuePropName="fileList"
      >
        <Upload
          accept=".pdf,.doc,.docx"
        >
          <Button icon={<UploadOutlined />}>Upload Documents</Button>
        </Upload>
      </Form.Item>

      {/* Compliance and Legal */}
      <h3>Compliance and Legal</h3>
      <Form.Item
        name="certifications"
        label="Certification/Approval Documents"
      >
        <Upload accept=".pdf">
          <Button icon={<UploadOutlined />}>Upload Certificate</Button>
        </Upload>
      </Form.Item>

      <Form.Item
        name="ingredients"
        label="Ingredients/Composition"
      >
        <TextArea rows={4} placeholder="List all ingredients or materials used" />
      </Form.Item>

      <Form.Item
        name="expiryDate"
        label="Shelf Life/Expiry Date"
      >
        <DatePicker />
      </Form.Item>

      <Form.Item
        name="legalDisclaimer"
        label="Legal Disclaimer"
      >
        <TextArea rows={4} placeholder="Enter any legal disclaimers or warnings" />
      </Form.Item>

      {/* Customization Options */}
      <h3>Customization Options</h3>
      <Form.Item
        name="isCustomizable"
        label="Allow Customization"
        valuePropName="checked"
      >
        <Switch />
      </Form.Item>

      <Form.Item
        noStyle
        shouldUpdate={(prevValues, currentValues) => prevValues.isCustomizable !== currentValues.isCustomizable}
      >
        {({ getFieldValue }) =>
          getFieldValue('isCustomizable') ? (
            <Form.Item
              name="customizationOptions"
              label="Customization Details"
            >
              <TextArea rows={4} placeholder="Specify available customization options and instructions" />
            </Form.Item>
          ) : null
        }
      </Form.Item>

      {/* SEO and Visibility */}
      <h3>SEO and Visibility</h3>
      <Form.Item
        name="metaTitle"
        label="Meta Title"
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="metaDescription"
        label="Meta Description"
      >
        <TextArea rows={4} />
      </Form.Item>

      <Form.Item
        name="tags"
        label="Tags/Keywords"
      >
        <Select mode="tags" style={{ width: '100%' }} placeholder="Add tags">
        </Select>
      </Form.Item>

      {/* Product Status */}
      <h3>Product Status</h3>
      <Form.Item
        name="status"
        label="Product Visibility Status"
      >
        <Select>
          <Select.Option value="draft">Draft</Select.Option>
          <Select.Option value="pending">Pending Approval</Select.Option>
          <Select.Option value="published">Published</Select.Option>
        </Select>
      </Form.Item>
    </Form>
  );
};

export default ProductForm;
