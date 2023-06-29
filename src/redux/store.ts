import {configureStore} from '@reduxjs/toolkit'
import userReducer from './user/userSlice'
import employerReducer from './employer/employerSlice'
import adminReducer from './admin/adminSlice'
import { persistReducer,persistStore } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const persistConfig={
    key:'root',
    storage
}
const persistUserReducer = persistReducer(persistConfig,userReducer)
const persistEmployerReducer=persistReducer(persistConfig,employerReducer)
const persistAdminReducer= persistReducer(persistConfig,adminReducer)

export const Store = configureStore({
    reducer:{
        user:persistUserReducer,
        employer:persistEmployerReducer,
        admin:persistAdminReducer
    }
})
export const persistor = persistStore(Store)