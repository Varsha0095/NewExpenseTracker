import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from "./AuthReducer";
import ExpenseReducer from "./ExpenseReducer";
import PremiumReducer from './Premium';
import themeReducer from "./Theme";

const store = configureStore({
  // reducer: { auth: AuthReducer, expense: ExpenseReducer },
  reducer: {
    auth: AuthReducer,
    expense: ExpenseReducer,
    theme: themeReducer,
    premium: PremiumReducer,
  }

});
export default store;
