import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";
//import sideBarReducer from "./slideBarSlice";
import sideBarReaducer from "./sideBarSlice";
const appStore = configureStore({
  reducer: {
    cart: cartReducer,
    sidebar: sideBarReaducer,
  },
});

export default appStore;
