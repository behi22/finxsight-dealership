import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SettingsState {
  failMode: 'none' | 'delayed' | 'error';
  isLoading: boolean;
  error: string | null;
}

const initialState: SettingsState = {
  failMode: 'none',
  isLoading: false,
  error: null,
};

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    setFailMode: (
      state,
      action: PayloadAction<'none' | 'delayed' | 'error'>
    ) => {
      state.failMode = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const { setFailMode, setLoading, setError } = settingsSlice.actions;
export const settingsReducer = settingsSlice.reducer;
