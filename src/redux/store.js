import { configureStore } from "@reduxjs/toolkit";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
  persistReducer,
  persistStore,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import auth from "../modules/auth/redux/auth.js";
import profile from "../modules/auth/redux/profile.js";
import thirdPartySlice from "../modules/thirdParty/redux/thirdParty-slice.js";
import couponsSlice from "../modules/coupons/redux/coupons-slice.js";
import activitiesSlice from "../modules/activities/redux/activities-slice.js";
import orderSlice from "../modules/orders/redux/orders-slice.js";
import leaderBoard from "../modules/leaderboard/redux/leaderBoard-slice.js";
import notificationReducer from "../modules/notification/redux/notifications.js";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
};
const persistedReducer = persistReducer(persistConfig, auth);
export const store = configureStore({
  reducer: {
    user: persistedReducer,
    profile,
    thirdPartySlice,
    couponsSlice,
    activitiesSlice,
    orderSlice,
    leaderBoard,
    notificationReducer,
    
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});
export let persistor = persistStore(store);
