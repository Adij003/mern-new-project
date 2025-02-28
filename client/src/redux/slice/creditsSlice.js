import axios from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import {endpoints } from 'src/utils/axios';

// Define an initial state
const initialState = {
    credits: null,
    loading: false,
    error: null,
};

// Create an async thunk for fetching credits
export const fetchCredits = createAsyncThunk(
    'credits/fetchCredits',
    async () => {
        const response = await axios.get(endpoints.bounci.credits);
        return response.data.data; // Return only the data part of the response
    }
);


// Create the slice
const creditsSlice = createSlice({
    name: 'credits',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCredits.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchCredits.fulfilled, (state, action) => {
                state.loading = false;
                state.credits = action.payload; // Store the credits data in the state
            })
            .addCase(fetchCredits.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message; // Store the error message
            });
    },
});

// Export actions and reducer
// export const {  } = creditsSlice.actions;
export default creditsSlice.reducer;