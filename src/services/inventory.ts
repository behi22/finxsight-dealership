// Service for interacting with vehicle data

import api from './api';
import { toast } from 'react-toastify';

interface Vehicle {
  make: string;
  model: string;
  year: number;
  price: number;
  vin: string;
  condition: string;
  mileage: number;
  status: string;
  photo_url: string;
}

export const getVehicles = async (params: any) => {
  try {
    const response = await api.get('/inventory/vehicles', { params });
    return response.data;
  } catch (error) {
    console.error('Error fetching vehicles', error);
    toast.error('Failed to fetch vehicles. Please try again later!');
    throw error;
  }
};

export const createVehicle = async (vehicle: Vehicle) => {
  try {
    const response = await api.post('/inventory/vehicle', vehicle);
    return response.data;
  } catch (error) {
    console.error('Error creating vehicle', error);
    toast.error('Error creating vehicle. Please try again later!');
    throw error;
  }
};

export const updateVehicle = async (id: number, vehicle: Vehicle) => {
  try {
    const response = await api.put(`/inventory/vehicle/${id}`, vehicle);
    return response.data;
  } catch (error) {
    console.error('Error updating vehicle', error);
    toast.error('Error updating vehicle. Please try again later!');
    throw error;
  }
};

export const deleteVehicle = async (id: number) => {
  try {
    const response = await api.delete(`/inventory/vehicle/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting vehicle', error);
    toast.error('Error deleting vehicle. Please try again later!');
    throw error;
  }
};
