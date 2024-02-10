import { configureStore } from '@reduxjs/toolkit'
import companiesSlice from "./slices/companiesSlice";

export const store = configureStore({
  reducer: {
    companiesSlice,
  },
})
