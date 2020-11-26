import { Theme, createMuiTheme } from "@material-ui/core"
import * as colors from "@material-ui/core/colors"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { IState, Themes } from "../interfaces/redux.interfaces"
import { setTheme } from "../redux/actions/themes.actions"
import { useLocalStorage } from "./local-storage.hook"

export function useTheme() {
  const dispatch = useDispatch()
  const { theme: variant } = useSelector((state: IState) => state.themes)

  const [storedTheme, setStoredTheme] = useLocalStorage<Themes>('theme', (() => {
    const themeFromLocalStorage = window.localStorage.getItem('theme')

    if (!themeFromLocalStorage) {
      return Themes.Light
    }
    
    return JSON.parse(themeFromLocalStorage)
  })()) 

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


  useEffect(() => {
    setStoredTheme(variant)
  }, [variant])

  useEffect(() => {
    dispatch(setTheme(storedTheme))
  }, [])

  // useEffect(() => {
  //   setStoredTheme(variant)
  // }, [variant])

  return { theme, isDark, toggle }
}