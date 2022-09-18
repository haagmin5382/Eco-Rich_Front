import { configureStore } from '@reduxjs/toolkit';
import menuReducer from './menu';
import pomoReducer from './pomo';
export default configureStore({
  reducer: {
    menu: menuReducer,
    pomo: pomoReducer,
  },
});
