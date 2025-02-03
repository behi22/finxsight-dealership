import React from 'react';
import { Modal, Form, Input, Button, Row, Col, Select } from 'antd';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../redux/store';
import { setVehicles } from '../redux/slices/inventorySlice';

const { Option } = Select;

const AddVehicleModal: React.FC<{ open: boolean; onClose: () => void }> = ({
  open,
  onClose,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    // Handle form submission
    console.log('Vehicle Details:', values);

    // Dispatch the action to add the vehicle to Redux
    dispatch(setVehicles(values));

    // Close the modal after submission
    onClose();
  };

  return (
    <Modal
      open={open}
      title="Add New Vehicle"
      onCancel={onClose}
      footer={null}
      width="100%"
      style={{ top: 0 }}
      styles={{
        body: {
          padding: 24,
          height: 'calc(100vh - 64px)',
          overflowY: 'scroll',
        },
      }}
    >
      <Form form={form} onFinish={onFinish} layout="vertical">
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="Make"
              name="make"
              rules={[
                { required: true, message: 'Please input the vehicle make' },
              ]}
            >
              <Input placeholder="Enter vehicle make" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Model"
              name="model"
              rules={[
                { required: true, message: 'Please input the vehicle model' },
              ]}
            >
              <Input placeholder="Enter vehicle model" />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="Year"
              name="year"
              rules={[
                { required: true, message: 'Please input the vehicle year' },
              ]}
            >
              <Input type="number" placeholder="Enter vehicle year" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Price"
              name="price"
              rules={[
                { required: true, message: 'Please input the vehicle price' },
              ]}
            >
              <Input type="number" placeholder="Enter vehicle price" />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="Condition"
              name="condition"
              rules={[
                { required: true, message: 'Please select vehicle condition' },
              ]}
            >
              <Select placeholder="Select condition">
                <Option value="New">New</Option>
                <Option value="Used">Used</Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>

        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            Add Vehicle
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddVehicleModal;
