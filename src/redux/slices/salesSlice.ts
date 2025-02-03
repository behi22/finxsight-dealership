import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Sale {
  id: number;
  userId: number;
  vehicleId: number;
  sellingPrice: number;
  date: string;
}

interface SalesState {
  sales: Sale[];
  isLoading: boolean;
  error: string | null;
}

const initialState: SalesState = {
  sales: [],
  isLoading: false,
  error: null,
};

const salesSlice = createSlice({
  name: 'sales',
  initialState,
  reducers: {
    setSales: (state, action: PayloadAction<Sale[]>) => {
      state.sales = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const { setSales, setLoading, setError } = salesSlice.actions;
export const salesReducer = salesSlice.reducer;
