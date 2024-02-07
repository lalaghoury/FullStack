import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getUser = createAsyncThunk('user/fetchUser', async (userId) => {
    const response = await axios.get(`http://localhost:5000/user/${userId}`);
    return response.data;
});

const userReducer = createSlice({
    name: 'user',
    initialState: {
        value: null,
        status: 'idle', // idle, loading, succeeded, failed
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getUser.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getUser.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.value = action.payload;
            })
            .addCase(getUser.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    }
});

export default userReducer.reducer;
