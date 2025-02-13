import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Vehicle {
  id: number;
  make: string;
  model: string;
  year: number;
  price: number;
  condition: string;
  status: string;
}

interface InventoryState {
  vehicles: Vehicle[];
  isLoading: boolean;
  error: string | null;
}

const initialState: InventoryState = {
  vehicles: [],
  isLoading: false,
  error: null,
};

const inventorySlice = createSlice({
  name: 'inventory',
  initialState,
  reducers: {
    setVehicles: (state, action: PayloadAction<Vehicle[]>) => {
      state.vehicles = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    resetInventory: () => initialState,
  },
});

export const { setVehicles, setLoading, setError, resetInventory } =
  inventorySlice.actions;
export const inventoryReducer = inventorySlice.reducer;
