import { configureStore } from "@reduxjs/toolkit";
import { PersistConfig, persistReducer, persistStore } from "redux-persist";
import logger from "redux-logger";
import { reducers } from "./rootReducers";  // Combine your reducers here
import storageSession from 'redux-persist/lib/storage/session';
// Persist configuration
const persistConfig: PersistConfig<ReturnType<typeof reducers>> = {
  key: "root",
  storage:storageSession,
  timeout: 0,  // Adjust if you want to handle persistence delays differently
};

// Persisted reducer
const persistedReducer = persistReducer(persistConfig, reducers);

// Configure the Redux store with persist and middleware
export const store = configureStore({
  reducer: persistedReducer,
  devTools: import.meta.env.NODE_ENV !== "production",  // Enable devTools in development
  middleware: (getDefaultMiddleware) => {
    const baseMiddleware = getDefaultMiddleware({
      serializableCheck: false,  // Disable serializable check for redux-persist
    });

    // Add logger middleware only in development mode
    return import.meta.env.NODE_ENV === "development"
      ? baseMiddleware.concat(logger)
      : baseMiddleware;
  },
});

// Custom type for dispatch (important for async thunks)
export type AppDispatch = typeof store.dispatch;

// Persistor for redux-persist
export const persistor = persistStore(store);

export default store;
