import { createSlice } from '@reduxjs/toolkit';

import { FS, US } from '../types/app.types';
import { createUser, loginUser, updateUser } from '../services/RealWorld.api';
import { IUserResponce } from '../types/api.types';

// State
const initialState: {
  user: IUserResponce;
  userStatus: US;
  fetchStatus: FS;
} = {
  user: {
    email: '',
    token: '',
    username: '',
    bio: '',
    image: null,
  },
  userStatus: US.UNAUTH,
  fetchStatus: FS.IDLE,
};

// Slices
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    actionLogIn(state) {
      state.userStatus = US.AUTH;
    },
    actionLogOut(state) {
      state.userStatus = US.UNAUTH;
    },
  },
  extraReducers: (builder) => {
    builder
      // Создание пользователя
      .addCase(createUser.pending, (state) => {
        state.fetchStatus = FS.LOADING;
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.fetchStatus = FS.SUCCEEDED;
        console.log(action.payload.data);
      })
      .addCase(createUser.rejected, (state, action) => {
        state.fetchStatus = FS.REJECTED;
        console.log(action.error.message);
      })
      // Вход пользователем в систему
      .addCase(loginUser.pending, (state) => {
        state.fetchStatus = FS.LOADING;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.fetchStatus = FS.SUCCEEDED;
        state.userStatus = US.AUTH;

        const { email, username, token, image } = action.payload.data.user;
        state.user.email = email;
        state.user.username = username;
        state.user.token = token;
        state.user.image = image;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.fetchStatus = FS.REJECTED;
        console.log(action);
      })
      // Обновление данный пользователя
      .addCase(updateUser.pending, (state) => {
        state.fetchStatus = FS.LOADING;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.fetchStatus = FS.SUCCEEDED;

        const { email, username, token, image } = action.payload.data.user;
        state.user.email = email;
        state.user.username = username;
        state.user.token = token;
        state.user.image = image;
      })
      .addCase(updateUser.rejected, (state) => {
        state.fetchStatus = FS.REJECTED;
      });
  },
});

export default userSlice.reducer;
export const { actionLogIn, actionLogOut } = userSlice.actions;
