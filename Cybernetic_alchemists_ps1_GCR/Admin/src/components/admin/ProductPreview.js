import React from 'react';
import { Card, Image, Descriptions, Tag, Typography } from 'antd';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const { Title, Text } = Typography;

const ProductPreview = ({ formValues }) => {
  if (!formValues) return null;

  return (
    <div style={{ padding: '20px', maxHeight: '70vh', overflowY: 'auto' }}>
      <Card>
        <div style={{ display: 'flex', gap: '20px' }}>
          <div style={{ width: '400px' }}>
            {formValues.images?.length > 0 ? (
              <Image
                src={URL.createObjectURL(formValues.images[0].originFileObj)}
                alt={formValues.productName}
                style={{ width: '100%', height: 'auto' }}
              />
            ) : (
              <div style={{ 
                width: '100%', 
                height: '400px', 
                background: '#f5f5f5', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center' 
              }}>
                No Image
              </div>
            )}
          </div>

          <div style={{ flex: 1 }}>
            <Title level={2}>{formValues.productName}</Title>
            <Tag color="blue">{formValues.brand}</Tag>
            <Tag color="green">{formValues.category}</Tag>

            <Descriptions column={1} style={{ marginTop: '20px' }}>
              <Descriptions.Item label="Price">
                <Text delete>${formValues.mrp}</Text>{' '}
                <Text strong>${formValues.sellingPrice}</Text>{' '}
                {formValues.discountPercentage > 0 && (
                  <Tag color="red">{formValues.discountPercentage}% OFF</Tag>
                )}
              </Descriptions.Item>
              <Descriptions.Item label="Stock">
                {formValues.stockQuantity} units
              </Descriptions.Item>
              {formValues.moq && (
                <Descriptions.Item label="Minimum Order">
                  {formValues.moq} units
                </Descriptions.Item>
              )}
            </Descriptions>

            <Title level={4} style={{ marginTop: '20px' }}>Description</Title>
            <div className="ql-editor" style={{ padding: 0 }} 
                 dangerouslySetInnerHTML={{ __html: formValues.description }} />

            {formValues.keyFeatures && (
              <>
                <Title level={4} style={{ marginTop: '20px' }}>Key Features</Title>
                <ul>
                  {formValues.keyFeatures.split('\n').map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
              </>
            )}

            {formValues.isCustomizable && (
              <>
                <Title level={4} style={{ marginTop: '20px' }}>Customization Options</Title>
                <Text>{formValues.customizationOptions}</Text>
              </>
            )}
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ProductPreview;