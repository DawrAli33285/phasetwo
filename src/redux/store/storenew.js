import { configureStore} from '@reduxjs/toolkit'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' 
import authSlice from '../slices/authSlice'
import { combineReducers } from '@reduxjs/toolkit' 
import jobsSlice from '../slices/jobsSlice'

const rootReducer=combineReducers({
    authSlice,
    jobsSlice
    
})


const persistConfig = {
    key: 'root',
    storage,
  }

  const persistedReducer = persistReducer(persistConfig, rootReducer)

  export let store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false, 
        }),
})
export let persistor = persistStore(store)


