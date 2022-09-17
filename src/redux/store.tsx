import { configureStore } from '@reduxjs/toolkit';
import menuReducer from './menu';

export default configureStore({
  reducer: {
    menu: menuReducer,
  },
});
