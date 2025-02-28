// src/redux/store.js
import { configureStore } from '@reduxjs/toolkit';

import userReducer from './slice/userSlice';
import creditsReducer from './slice/creditsSlice';
import listNameReducer from './slice/listNameSlice';
import fileUploadReducer from './slice/upload-slice';

export const store = configureStore({
  reducer: {
    fileUpload: fileUploadReducer,
    listName: listNameReducer,
    credits: creditsReducer,
    user : userReducer
  },
});

export default store;
