import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  filterUsers: [],
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    FILTER_USERS(state, action) {
      const { users, search } = action.payload;

      const temporaryUsers = users.filter(
        (user) =>
          user.name.toLowerCase().includes(search.toLowerCase()) || user.email.toLowerCase().includes(search.toLowerCase())|| user.role.toLowerCase().includes(search.toLowerCase())
      );
      state.filterUsers = temporaryUsers;
    },
  },
});

export const { FILTER_USERS } = filterSlice.actions;
export const selectFilterUsers = (state) => state.filter.filterUsers;

export default filterSlice.reducer;
