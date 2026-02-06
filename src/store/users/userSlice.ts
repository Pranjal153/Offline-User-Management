import { createSlice } from '@reduxjs/toolkit';
import { loadUsers } from './userThunks';
import { ZellerCustomer } from '../../types/graphql';

type UserState = {
  users: ZellerCustomer[];
  loading: boolean;
};

const initialState: UserState = {
  users: [],
  loading: false,
};

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(loadUsers.pending, state => {
        state.loading = true;
      })
      .addCase(loadUsers.fulfilled, (state, action) => {
        state.users = action.payload;
        state.loading = false;
      });
  },
});

export default userSlice.reducer;
