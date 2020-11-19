import { combineReducers } from "redux"
import { authReducer } from "./auth.reducers"
import { citiesReducer } from "./cities.reducers"
import { coachesReducer } from "./coaches.reducers"
import { groupsReducer } from "./groups.reducers"
import { newsReducer } from "./news.reducers"
import { schoolsReducer } from "./schools.reducers"
import { statisticsReducer } from "./statistics.reducers"
import { studentsReducer } from "./students.reducers"
import { themesReducer } from "./themes.reducers"
import { tournamentsReducer } from "./tournamets.actions"
import { usersReducer } from "./users.reducers"

export const rootReducer = combineReducers({
    auth: authReducer,
    cities: citiesReducer,
    schools: schoolsReducer,
    groups: groupsReducer,
    news: newsReducer,
    students: studentsReducer,
    statistics: statisticsReducer,
    tournaments: tournamentsReducer,
    coaches: coachesReducer,
    themes: themesReducer,
    users: usersReducer
})