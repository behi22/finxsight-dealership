// Service for interacting with settings data

import api from './api';
import { toast } from 'react-toastify';

export const getDBFile = async () => {
  try {
    const response = await api.get('/settings/db');
    return response.data;
  } catch (error) {
    console.error('Error getting DataBase file', error);
    toast.error('Failed to get DataBase file. Please try again later!');
    throw error;
  }
};

export const uploadDBFile = async (file: File) => {
  try {
    const formData = new FormData();
    formData.append('file', file);

    const response = await api.post('/settings/db', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error uploading DataBase file', error);
    toast.error('Failed to upload DataBase file. Please try again later!');
    throw error;
  }
};

export const resetDatabase = async () => {
  try {
    const response = await api.post('/settings/reset-db');
    return response.data;
  } catch (error) {
    console.error('Error resetting DataBase', error);
    toast.error('Failed to reset DataBase. Please try again later!');
    throw error;
  }
};

export const setFailMode = async (mode: 'none' | 'delayed' | 'error') => {
  try {
    const response = await api.post(`/settings/failing?mode=${mode}`);
    return response.data;
  } catch (error) {
    console.error('Error setting fail mode', error);
    toast.error('Failed to set fail mode. Please try again later!');
    throw error;
  }
};
