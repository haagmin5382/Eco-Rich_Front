import { configureStore } from '@reduxjs/toolkit';
import menuReducer from './menu';
import pomoReducer from './pomo';
import userReducer from './user';
import modalSlice from './modal';
import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
const persistConfig = {
  key: 'root',
  version: 1,
  storage,
};

const persistedReducer = persistReducer(persistConfig, pomoReducer);

export default configureStore({
  reducer: {
    menu: menuReducer,
    pomo: persistedReducer,
    user: userReducer,
    modal: modalSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});
