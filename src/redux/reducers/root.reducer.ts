import { combineReducers } from "redux"
import { authReducer } from "./auth.reducer"
import { themesReducer } from "./themes.reducers"

export const rootReducer = combineReducers({
    auth: authReducer,
    themes: themesReducer
})