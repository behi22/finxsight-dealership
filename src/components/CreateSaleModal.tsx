import React, { useState, useEffect } from 'react';
import {
  Modal,
  Form,
  Input,
  Button,
  Select,
  DatePicker,
  Row,
  Col,
  Spin,
} from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../redux/store';
import { setSales } from '../redux/slices/salesSlice';
import { getVehicles } from '../services/inventory';
import { getUsers } from '../services/users';
import dayjs from 'dayjs';
import { RootState } from '../redux/store';

const { Option } = Select;

const CreateSaleModal: React.FC<{ open: boolean; onClose: () => void }> = ({
  open,
  onClose,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const [loading, setLoading] = useState(true);
  const [vehicles, setVehiclesData] = useState<any[]>([]);
  const [users, setUsersData] = useState<any[]>([]);
  const [form] = Form.useForm();
  const sales = useSelector((state: RootState) => state.sales.sales); // Access sales state from Redux

  useEffect(() => {
    const fetchData = async () => {
      try {
        const vehicleData = await getVehicles({});
        const userData = await getUsers();
        setVehiclesData(vehicleData);
        setUsersData(userData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data for create sale modal', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const onFinish = (values: any) => {
    const saleData = {
      ...values,
      date: values.date ? values.date.toISOString() : null, // Convert to ISO string
      id: sales.length + 1, // Make sure to generate a new unique ID (or get from the backend)
      sellingPrice: Number(values.price), // Ensure it's a number
    };

    // Append the new sale to the existing sales array
    dispatch(setSales([...sales, saleData])); // Update Redux state

    // Close the modal after submission
    onClose();
  };

  return (
    <Modal
      open={open}
      title="Create New Sale"
      onCancel={onClose}
      footer={null}
      width={600}
    >
      {loading ? (
        <Spin size="large" />
      ) : (
        <Form
          form={form}
          onFinish={onFinish}
          layout="vertical"
          initialValues={{
            date: dayjs(), // Set the initial value for the DatePicker
          }}
        >
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Select Vehicle"
                name="vehicle"
                rules={[{ required: true, message: 'Please select a vehicle' }]}
              >
                <Select placeholder="Select a vehicle">
                  {vehicles.map((vehicle) => (
                    <Option key={vehicle.vin} value={vehicle.vin}>
                      {vehicle.make} {vehicle.model}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Select User"
                name="user"
                rules={[{ required: true, message: 'Please select a user' }]}
              >
                <Select placeholder="Select a user">
                  {users.map((user) => (
                    <Option key={user.id} value={user.id}>
                      {user.name}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Form.Item
            label="Price"
            name="price"
            rules={[{ required: true, message: 'Please input the sale price' }]}
          >
            <Input type="number" placeholder="Enter sale price" />
          </Form.Item>

          <Form.Item label="Sale Date" name="date">
            <DatePicker
              style={{ width: '100%' }}
              placeholder="Select sale date (optional)"
            />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Create Sale
            </Button>
          </Form.Item>
        </Form>
      )}
    </Modal>
  );
};

export default CreateSaleModal;
