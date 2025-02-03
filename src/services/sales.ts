// Service for interacting with sales data

import api from './api';
import { toast } from 'react-toastify';

interface Sale {
  user: number;
  vehicle: number;
  selling_price: number;
  date?: string;
}

export const makeSale = async (sale: Sale) => {
  try {
    const response = await api.post('/sales/sale', sale);
    return response.data;
  } catch (error) {
    console.error('Error making sale', error);
    toast.error('Error making sale. Please try again later!');
    throw error;
  }
};

export const deleteSale = async (id: number) => {
  try {
    const response = await api.delete(`/sales/sale/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting sale', error);
    toast.error('Error deleting sale. Please try again later!');
    throw error;
  }
};

export const getSales = async () => {
  try {
    const response = await api.get('/sales/all');
    return response.data;
  } catch (error) {
    console.error('Error fetching sales', error);
    toast.error('Failed to fetch sales. Please try again later!');
    throw error;
  }
};
