import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Card, Statistic, Spin, Button, Divider } from 'antd';
import { Pie, Column } from '@ant-design/plots';
import { RootState, AppDispatch } from '../redux/store';
import { setVehicles } from '../redux/slices/inventorySlice';
import { setSales } from '../redux/slices/salesSlice';
import { setUser } from '../redux/slices/userSlice';
import { getVehicles } from '../services/inventory';
import { getSales } from '../services/sales';
import { getUsers } from '../services/users';
import CreateSaleModal from '../components/CreateSaleModal';
import AddVehicleModal from '../components/AddVehicleModal';

const Home: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [loading, setLoading] = useState(true);
  const { vehicles } = useSelector((state: RootState) => state.inventory);
  const { sales } = useSelector((state: RootState) => state.sales);
  const { user } = useSelector((state: RootState) => state.user);
  const { failMode } = useSelector((state: RootState) => state.settings);

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

        // Initialize with random sales data if the store is empty
        if (sales.length === 0) {
          const initialSales = [
            {
              id: 1,
              userId: 1,
              vehicleId: 1,
              sellingPrice: 10000,
              date: '2024-02-07',
            },
            {
              id: 2,
              userId: 2,
              vehicleId: 2,
              sellingPrice: 15000,
              date: '2024-02-07',
            },
            {
              id: 3,
              userId: 3,
              vehicleId: 3,
              sellingPrice: 20000,
              date: '2024-06-08',
            },
            {
              id: 4,
              userId: 4,
              vehicleId: 4,
              sellingPrice: 12000,
              date: '2024-06-08',
            },
            {
              id: 5,
              userId: 5,
              vehicleId: 5,
              sellingPrice: 34000,
              date: '2024-06-08',
            },
            {
              id: 6,
              userId: 6,
              vehicleId: 6,
              sellingPrice: 22000,
              date: '2024-06-08',
            },
            {
              id: 7,
              userId: 7,
              vehicleId: 7,
              sellingPrice: 8000,
              date: '2024-06-08',
            },
            {
              id: 8,
              userId: 8,
              vehicleId: 8,
              sellingPrice: 28000,
              date: '2024-10-01',
            },
          ];
          dispatch(setSales(initialSales));
        } else if (Array.isArray(salesData)) {
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

  // Ensure that vehicles data is available before filtering
  const vehicleConditionData =
    Array.isArray(vehicles) && vehicles.length > 0
      ? [
          {
            type: 'New',
            value: vehicles.filter((v: any) => v.condition === 'new').length,
          },
          {
            type: 'Used',
            value: vehicles.filter((v: any) => v.condition === 'used').length,
          },
        ]
      : [];

  // Ensure that sales data is available before filtering
  const filteredSales = Array.isArray(sales)
    ? sales.filter((s: any) => new Date(s.date).getMonth() === 0)
    : [];

  const monthlySalesData = [
    {
      month: 'Jan',
      sales: sales.filter((s: any) => new Date(s.date).getMonth() === 0).length,
    },
    {
      month: 'Feb',
      sales: sales.filter((s: any) => new Date(s.date).getMonth() === 1).length,
    },
    {
      month: 'Mar',
      sales: sales.filter((s: any) => new Date(s.date).getMonth() === 2).length,
    },
    {
      month: 'Apr',
      sales: sales.filter((s: any) => new Date(s.date).getMonth() === 3).length,
    },
    {
      month: 'May',
      sales: sales.filter((s: any) => new Date(s.date).getMonth() === 4).length,
    },
    {
      month: 'Jun',
      sales: sales.filter((s: any) => new Date(s.date).getMonth() === 5).length,
    },
    {
      month: 'Jul',
      sales: sales.filter((s: any) => new Date(s.date).getMonth() === 6).length,
    },
    {
      month: 'Aug',
      sales: sales.filter((s: any) => new Date(s.date).getMonth() === 7).length,
    },
    {
      month: 'Sep',
      sales: sales.filter((s: any) => new Date(s.date).getMonth() === 8).length,
    },
    {
      month: 'Oct',
      sales: sales.filter((s: any) => new Date(s.date).getMonth() === 9).length,
    },
    {
      month: 'Nov',
      sales: sales.filter((s: any) => new Date(s.date).getMonth() === 10)
        .length,
    },
    {
      month: 'Dec',
      sales: sales.filter((s: any) => new Date(s.date).getMonth() === 11)
        .length,
    },
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

  // Show a loading spinner until data is available
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
              value={Array.isArray(vehicles) ? vehicles.length : 0}
              valueStyle={{ fontSize: 24 }}
            />
            <Statistic
              title="New"
              value={
                vehicleConditionData.find((v) => v.type === 'New')?.value || 0
              }
              valueStyle={{ fontSize: 18 }}
            />
            <Statistic
              title="Used"
              value={
                vehicleConditionData.find((v) => v.type === 'Used')?.value || 0
              }
              valueStyle={{ fontSize: 18 }}
            />
          </Card>
        </Col>

        {/* Total Sales Card */}
        <Col sm={24} md={12} lg={8}>
          <Card title="Total Sales">
            <Statistic
              title="Total"
              value={Array.isArray(sales) ? sales.length : 0}
              valueStyle={{ fontSize: 24 }}
            />
          </Card>
        </Col>

        {/* Total Revenue Card */}
        <Col sm={24} md={12} lg={8}>
          <Card title="Total Revenue">
            <Statistic
              title="Revenue"
              value={
                Array.isArray(sales)
                  ? sales.reduce(
                      (acc: number, sale: any) =>
                        acc + (Number(sale.sellingPrice) || 0),
                      0
                    )
                  : 0
              }
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
              interactions={['element-active']}
            />
          </Card>
        </Col>

        <Col sm={24} md={12}>
          <Card
            title="Monthly Sales Trends"
            className="sales"
            style={{
              width: '100%',
              borderRadius: '8px',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
            }}
          >
            <Column
              data={monthlySalesData}
              xField="month"
              yField="sales"
              seriesField="month"
            />
          </Card>
        </Col>
      </Row>

      {/* Recent Activity - Vehicle Additions and Sales Transactions */}
      <Row gutter={[16, 24]}>
        <Col sm={24} md={12}>
          <Card title="Recent Activity - Vehicle Additions">
            <ul>
              {Array.isArray(vehicles) &&
                vehicles
                  .slice()
                  .reverse()
                  .slice(0, 5)
                  .map((vehicle: any) => (
                    <li key={vehicle.vin || vehicle.id}>
                      {vehicle.make} {vehicle.model} - {vehicle.year}
                    </li>
                  ))}
            </ul>
          </Card>
        </Col>

        <Col sm={24} md={12}>
          <Card title="Recent Activity - Sales Transactions">
            <ul>
              {Array.isArray(sales) &&
                [...sales]
                  .sort(
                    (a, b) =>
                      new Date(b.date).getTime() - new Date(a.date).getTime()
                  ) // Sort by date, descending (latest first)
                  .slice(0, 5) // Get the latest 5 sales
                  .map((sale: any) => (
                    <li key={sale.id}>
                      Sale ID: {sale.id} - ${sale.sellingPrice}
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
