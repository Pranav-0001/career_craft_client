import {configureStore} from '@reduxjs/toolkit'
import userReducer from './user/userSlice'
import { persistReducer,persistStore } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const persistConfig={
    key:'root',
    storage
}
const persistUserReducer = persistReducer(persistConfig,userReducer)


export const Store = configureStore({
    reducer:{
        user:persistUserReducer
    }
})
export const persistor = persistStore(Store)