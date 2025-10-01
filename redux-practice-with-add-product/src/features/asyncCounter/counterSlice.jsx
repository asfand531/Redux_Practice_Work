import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Step 1: Create an async thunk
export const incrementAsync = createAsyncThunk(
  "counter/incrementAsync",
  async (amount, thunkAPI) => {
    return new Promise((resolve) => setTimeout(() => resolve(amount), 1000));
  }
);

// Step 2: Create a slice
export const counterSlice = createSlice({
  name: "counter",
  initialState: {
    value: 0,
    status: "Succeeded", // idle | loading | succeeded | failed
  },
  reducers: {
    decrement: (state) => {
      state.value -= 1;
      if (state.value < 0) {
        state.value = 0;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(incrementAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(incrementAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        console.log(state.status);
        state.value += action.payload;
      })
      .addCase(incrementAsync.rejected, (state) => {
        state.status = "failed";
      });
  },
});

// Export actions
export const { decrement } = counterSlice.actions;
export default counterSlice.reducer;
