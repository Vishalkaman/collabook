import { configureStore } from '@reduxjs/toolkit';
import notebooksReducer from './notebooksSlice';

const store = configureStore({
  reducer: {
    notebooks: notebooksReducer,
    // Add other reducers here if you have them
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;