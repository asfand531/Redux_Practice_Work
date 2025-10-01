import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const usersAsync = createAsyncThunk("users/usersAsync", async () => {
  const response = await fetch("https://jsonplaceholder.typicode.com/users");
  const data = await response.json();
  console.log("Your Data>>>>>>>>", data);
  return data;
});

export const usersSlice = createSlice({
  name: "users",
  initialState: {
    status: "idle",
    users: [],
    error: <h5>Oops! something went wrong</h5>,
  },
  reducers: {
    deleteUser: (state, action) => {
      state.users = state.users.filter((u) => u.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(usersAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(usersAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.users = action.payload;
      })
      .addCase(usersAsync.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export const { deleteUser } = usersSlice.actions;
export default usersSlice.reducer;
