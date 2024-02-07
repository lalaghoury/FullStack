// recipesReducer.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async thunk for fetching all recipes
export const getAllRecipes = createAsyncThunk('recipes/fetchAllRecipes', async () => {
  const response = await axios.get('http://localhost:5000/recipe');
  return response.data;
});

// Async thunk for fetching a single recipe
export const getSingleRecipe = createAsyncThunk('recipes/fetchSingleRecipe', async (recipe_id) => {
  const response = await axios.get(`http://localhost:5000/recipe/${recipe_id}`);
  return response.data;
});

// Slice for managing state
const recipesReducer = createSlice({
  name: 'recipes',
  initialState: {
    value: [],
    status: 'idle', // idle, loading, succeeded, failed
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    // Handling actions for getAllRecipes
    builder
      .addCase(getAllRecipes.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getAllRecipes.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.value = action.payload;
      })
      .addCase(getAllRecipes.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });

    // Handling actions for getRecipe
    builder
      .addCase(getSingleRecipe.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getSingleRecipe.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.value = action.payload;
      })
      .addCase(getSingleRecipe.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default recipesReducer.reducer;
