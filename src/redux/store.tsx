import { configureStore } from '@reduxjs/toolkit';
import menuReducer from './menu';
import pomoReducer from './pomo';
import userReducer from './user';
export default configureStore({
  reducer: {
    menu: menuReducer,
    pomo: pomoReducer,
    user: userReducer,
  },
});
