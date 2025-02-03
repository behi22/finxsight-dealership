// Service for interacting with user data

import api from './api';
import { toast } from 'react-toastify';

export const getUsers = async () => {
  try {
    const response = await api.get('/users/all');
    return response.data;
  } catch (error) {
    console.error('Error fetching users', error);
    toast.error('Failed to fetch users. Please try again later!');
    throw error;
  }
};

export const updateUser = async (id: number, user: any) => {
  try {
    const response = await api.put(`/users/user/${id}`, user);
    return response.data;
  } catch (error) {
    console.error('Error updating user', error);
    toast.error('Error updating user. Please try again later!');
    throw error;
  }
};
