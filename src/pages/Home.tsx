import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Card, Statistic, Spin, Button, Divider } from 'antd';
import { Pie, Bar } from '@ant-design/plots';
import { RootState, AppDispatch } from '../redux/store';
import { setVehicles } from '../redux/slices/inventorySlice';
import { setSales } from '../redux/slices/salesSlice';
import { setUser } from '../redux/slices/userSlice';
import { getVehicles } from '../services/inventory';
import { getSales } from '../services/sales';
import { getUsers } from '../services/users';
import { useNavigate } from 'react-router-dom';
import CreateSaleModal from '../components/CreateSaleModal';
import AddVehicleModal from '../components/AddVehicleModal';

const Home: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [loading, setLoading] = useState(true);
  const { vehicles } = useSelector((state: RootState) => state.inventory);
  const { sales } = useSelector((state: RootState) => state.sales);
  const { user } = useSelector((state: RootState) => state.user);
  const { failMode } = useSelector((state: RootState) => state.settings);
  const navigate = useNavigate();

  const [createSaleModalOpen, setCreateSaleModalOpen] = useState(false);
  const [addVehicleModalOpen, setAddVehicleModalOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch data
        const vehiclesData = await getVehicles({});
        const salesData = await getSales();
        const usersData = await getUsers();

        // Dispatch data to Redux
        dispatch(setVehicles(vehiclesData));
        if (Array.isArray(salesData)) {
          const formattedSales = salesData.map((sale: any) => ({
            id: sale.id,
            userId: sale.userId,
            vehicleId: sale.vehicleId,
            sellingPrice: sale.sellingPrice,
            date: sale.date,
          }));

          dispatch(setSales(formattedSales));
        }
        dispatch(setUser(usersData[0])); // Assuming we get the first user for simplicity

        setLoading(false);
      } catch (error) {
        console.error('Error fetching homepage data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, [dispatch]);

  const vehicleConditionData = [
    {
      type: 'New',
      value: vehicles.filter((v: any) => v.condition === 'New').length,
    },
    {
      type: 'Used',
      value: vehicles.filter((v: any) => v.condition === 'Used').length,
    },
  ];

  const filteredSales = Array.isArray(sales)
    ? sales.filter((s: any) => new Date(s.date).getMonth() === 0)
    : [];

  const monthlySalesData = [
    {
      month: 'Jan',
      sales: filteredSales.length,
    },
    {
      month: 'Feb',
      sales: sales.filter((s: any) => new Date(s.date).getMonth() === 1).length,
    },
    // Add for other months as needed
  ];

  const statusColor =
    failMode === 'none' ? 'green' : failMode === 'delayed' ? 'yellow' : 'red';

  const quickActions = (action: string) => {
    if (action === 'addVehicle') {
      setAddVehicleModalOpen(true); // Open Add Vehicle Modal
    } else if (action === 'createSale') {
      setCreateSaleModalOpen(true); // Open Create Sale Modal
    } else if (action === 'resetDatabase') {
      // Example: reset database (you may want to perform an API call or reset Redux state)
      console.log('Database reset triggered!');
    }
  };

  if (loading) {
    return <Spin size="large" />;
  }

  return (
    <div className="home-container">
      <Row gutter={[16, 24]} justify="space-between">
        {/* Total Vehicles Card */}
        <Col sm={24} md={12} lg={8}>
          <Card title="Total Vehicles">
            <Statistic
              title="Total"
              value={vehicles.length}
              valueStyle={{ fontSize: 24 }}
            />
            <Statistic
              title="New"
              value={vehicleConditionData.find((v) => v.type === 'New')?.value}
              valueStyle={{ fontSize: 18 }}
            />
            <Statistic
              title="Used"
              value={vehicleConditionData.find((v) => v.type === 'Used')?.value}
              valueStyle={{ fontSize: 18 }}
            />
          </Card>
        </Col>

        {/* Total Sales Card */}
        <Col sm={24} md={12} lg={8}>
          <Card title="Total Sales">
            <Statistic
              title="Total"
              value={sales.length}
              valueStyle={{ fontSize: 24 }}
            />
          </Card>
        </Col>

        {/* Total Revenue Card */}
        <Col sm={24} md={12} lg={8}>
          <Card title="Total Revenue">
            <Statistic
              title="Revenue"
              value={sales.reduce(
                (acc: any, sale: any) => acc + sale.selling_price,
                0
              )}
              valueStyle={{ fontSize: 24 }}
              prefix="$"
            />
          </Card>
        </Col>

        {/* Active Users Card */}
        <Col sm={24} md={12} lg={8}>
          <Card title="Active Users">
            <Statistic
              title="Users"
              value={user ? 1 : 0} // If user is logged in, we show 1 user
              valueStyle={{ fontSize: 24 }}
            />
          </Card>
        </Col>

        {/* Backend Status Card */}
        <Col sm={24} md={12} lg={8}>
          <Card title="Backend Status" style={{ backgroundColor: statusColor }}>
            <Statistic
              title="Mode"
              value={failMode}
              valueStyle={{ color: 'white', fontSize: 24 }}
            />
          </Card>
        </Col>
      </Row>

      {/* Inventory Condition Breakdown and Monthly Sales Trends */}
      <Row gutter={[16, 24]}>
        <Col sm={24} md={12}>
          <Card title="Inventory Condition Breakdown">
            <Pie
              data={vehicleConditionData}
              angleField="value"
              colorField="type"
              radius={0.8}
              label={{ visible: true }} // Enable labels without shape type
              interactions={['element-active']}
            />
          </Card>
        </Col>

        <Col sm={24} md={12}>
          <Card title="Monthly Sales Trends">
            <Bar
              data={monthlySalesData}
              xField="month"
              yField="sales"
              seriesField="month"
              label={{ position: 'top' }}
              color="blue"
            />
          </Card>
        </Col>
      </Row>

      {/* Recent Activity - Vehicle Additions and Sales Transactions */}
      <Row gutter={[16, 24]}>
        <Col sm={24} md={12}>
          <Card title="Recent Activity - Vehicle Additions">
            <ul>
              {vehicles.slice(0, 5).map((vehicle: any) => (
                <li key={vehicle.vin}>
                  {vehicle.make} {vehicle.model} - {vehicle.year}
                </li>
              ))}
            </ul>
          </Card>
        </Col>

        <Col sm={24} md={12}>
          <Card title="Recent Activity - Sales Transactions">
            <ul>
              {sales.slice(0, 5).map((sale: any) => (
                <li key={sale.id}>
                  Sale ID: {sale.id} - ${sale.selling_price}
                </li>
              ))}
            </ul>
          </Card>
        </Col>
      </Row>

      <Divider className="divider" style={{ borderColor: '#001529' }}>
        Quick Actions
      </Divider>

      {/* Action Buttons */}
      <Row gutter={[16, 24]}>
        <Col sm={24} md={8}>
          <Button
            type="primary"
            block
            onClick={() => quickActions('addVehicle')}
          >
            Add New Vehicle
          </Button>
        </Col>
        <Col sm={24} md={8}>
          <Button
            type="primary"
            block
            onClick={() => quickActions('createSale')}
          >
            Create New Sale
          </Button>
        </Col>
        <Col sm={24} md={8}>
          <Button
            style={{
              backgroundColor: 'red',
              borderColor: 'red',
              color: 'white',
            }}
            block
            onClick={() => quickActions('resetDatabase')}
          >
            Reset Database
          </Button>
        </Col>
      </Row>

      {/* Modals */}
      <CreateSaleModal
        open={createSaleModalOpen}
        onClose={() => setCreateSaleModalOpen(false)}
      />
      <AddVehicleModal
        open={addVehicleModalOpen}
        onClose={() => setAddVehicleModalOpen(false)}
      />
    </div>
  );
};

export default Home;
