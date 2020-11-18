import { IAction, Themes } from "../../interfaces/redux.interfaces"
import { SET_THEME } from "../types/theme.types"

export const setTheme = (payload: Themes): IAction<Themes> => ({ type: SET_THEME, payload })