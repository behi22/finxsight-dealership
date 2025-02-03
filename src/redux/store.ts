import { configureStore } from '@reduxjs/toolkit';
import { inventoryReducer } from './slices/inventorySlice';
import { userReducer } from './slices/userSlice';
import { salesReducer } from './slices/salesSlice';
import { settingsReducer } from './slices/settingsSlice';

const store = configureStore({
  reducer: {
    inventory: inventoryReducer,
    user: userReducer,
    sales: salesReducer,
    settings: settingsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
