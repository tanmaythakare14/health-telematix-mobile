#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { logger } from 'utils/SecureLogger';

// Get slice name from CLI args
const sliceName = process.argv[2];

if (!sliceName) {
  logger.error('❌ Please provide a slice name. Example: generateReduxSlice Account');
  process.exit(1);
}

// Determine the base directory for redux slices
const reduxBaseDir = path.join(process.cwd(), 'src', 'redux', 'reducer');

// Create the specific slice directory
const sliceFolderPath = path.join(reduxBaseDir, sliceName.toLowerCase());

// Ensure the directories exist
if (!fs.existsSync(sliceFolderPath)) {
  fs.mkdirSync(sliceFolderPath, { recursive: true });
  logger.info(`Created redux slice folder: ${sliceFolderPath}`);
}

// Slice Template
const sliceTemplate = `
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import HTTPService from 'networkConfig/HttpServices';

// Define generic data type - modify as needed
interface ${sliceName}DataType {
  id: string | number;
  // Add specific fields for your data
  // For example:
  // name: string;
  // description?: string;
}

// Define the state type
interface ${sliceName}State {
  data: ${sliceName}DataType[] | null;
  loading: boolean;
  error: string | null;
}

// Initial state
const initialState: ${sliceName}State = {
  data: null,
  loading: false,
  error: null,
};

// Define params type for fetch
interface Fetch${sliceName}Params {
  page?: number;
  limit?: number;
  // Add other possible query parameters
}

// Async Thunk for fetching data
export const fetch${sliceName}Data = createAsyncThunk<
  ${sliceName}DataType[], 
  Fetch${sliceName}Params | void, 
  { rejectValue: string }
>(
  '${sliceName.toLowerCase()}/fetchData',
  async (params = {}, { rejectWithValue }) => {
    try {
      const response = await HTTPService.get<${sliceName}DataType[]>('/${sliceName.toLowerCase()}', { 
        params 
      });
      return response.data;
    } catch (error: unknown) {
      // Type-safe error handling
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue('An unexpected error occurred');
    }
  }
);

// Create the slice
const ${sliceName}Slice = createSlice({
  name: '${sliceName.toLowerCase()}',
  initialState,
  reducers: {
    // Synchronous reducers
    resetState: (state) => {
      state.data = null;
      state.loading = false;
      state.error = null;
    },
    clearError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetch${sliceName}Data.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetch${sliceName}Data.fulfilled, (state, action: PayloadAction<${sliceName}DataType[]>) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetch${sliceName}Data.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'An unexpected error occurred';
      });
  },
});

// Export actions and reducer
export const { 
  resetState, 
  clearError 
} = ${sliceName}Slice.actions;

export default ${sliceName}Slice.reducer;

// Optional: Export types for use in components
export type { 
  ${sliceName}DataType, 
  ${sliceName}State 
};
`;

// Slice index file
fs.writeFileSync(path.join(sliceFolderPath, `index.ts`), sliceTemplate.trim());

logger.info(`✅ Created Redux slice for: ${sliceName}`);
logger.info(`📂 Slice Location: ${sliceFolderPath}`);

// Generate instruction output
logger.info('\n🔧 Next Steps:');
logger.info('1. Add the reducer to your root reducer:');
logger.info(`   import ${sliceName.toLowerCase()}Reducer from './reducers/${sliceName.toLowerCase()}Reducer';`);
logger.info('2. In combineReducers, add:');
logger.info(`   ${sliceName.toLowerCase()}: ${sliceName.toLowerCase()}Reducer,`);
