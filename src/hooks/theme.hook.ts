import { Theme, createMuiTheme } from "@material-ui/core"
import * as colors from "@material-ui/core/colors"
import { useDispatch, useSelector } from "react-redux"
import { IState, Themes } from "../interfaces/redux.interfaces"
import { setTheme } from "../redux/actions/themes.actions"

export function useTheme() {
  const dispatch = useDispatch()
  const { theme: variant } = useSelector((state: IState) => state.themes)

  const isDark = variant === Themes.Dark

  const theme: Theme = createMuiTheme({
    palette: {
      primary: { main: colors.blue[500] },
      type: isDark ? 'dark' : 'light'
    }
  })

  function toggle() {
    if (isDark) {
      dispatch(setTheme(Themes.Light))
    } else {
      dispatch(setTheme(Themes.Dark))
    }
  }

  return { theme, isDark, toggle }
}