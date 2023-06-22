import {configureStore} from '@reduxjs/toolkit'
import userReducer from './user/userSlice'
import employerReducer from './employer/employerSlice'
import { persistReducer,persistStore } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const persistConfig={
    key:'root',
    storage
}
const persistUserReducer = persistReducer(persistConfig,userReducer)
const persistEmployerReducer=persistReducer(persistConfig,employerReducer)


export const Store = configureStore({
    reducer:{
        user:persistUserReducer,
        employer:persistEmployerReducer
    }
})
export const persistor = persistStore(Store)