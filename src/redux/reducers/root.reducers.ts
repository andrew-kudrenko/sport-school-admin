import { combineReducers } from "redux"
import { authReducer } from "./auth.reducers"
import { citiesReducer } from "./cities.reducers"

export const rootReducer = combineReducers({
    auth: authReducer,
    cities: citiesReducer
})