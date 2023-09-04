import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import foodService from "./foodService";
const initialState = {
  foodItems: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

// Create new food item
export const createFood = createAsyncThunk(
  "foods/create",
  async (foodData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      //console.log(foodData);
      return await foodService.createFood(foodData, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Get user foodItems
export const getAllFood = createAsyncThunk(
  "foods/getAll",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await foodService.getAllFood(token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Delete food item
export const deleteFood = createAsyncThunk(
  "foods/delete",
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await foodService.deleteFood(id, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);
export const foodSlice = createSlice({
  name: "foods",
  initialState,
  reducers: {
    reset: (state) => {
      state = initialState;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createFood.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createFood.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        //console.log(action.payload);
        state.foodItems.push(action.payload);
      })
      .addCase(createFood.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getAllFood.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllFood.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.foodItems = action.payload;
      })
      .addCase(getAllFood.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(deleteFood.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteFood.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.foodItems = state.foodItems.filter(
          (foodItem) => foodItem._id !== action.payload.id
        );
      })
      .addCase(deleteFood.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = foodSlice.actions;
export default foodSlice.reducer;
