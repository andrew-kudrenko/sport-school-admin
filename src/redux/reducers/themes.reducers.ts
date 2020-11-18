import { IAction, IThemeState, Themes } from "../../interfaces/redux.interfaces"
import { SET_THEME } from "../types/theme.types"

const initialState: IThemeState = { theme: Themes.Light }

export const themesReducer = (state: IThemeState = initialState, { type, payload }: IAction) => {
  switch (type) {
    case SET_THEME: return { ...state, theme: payload }
    default: return state
  }
}