export interface INavProps {
  open: boolean
  setOpen: (open: boolean) => void
}

export interface IDrawerOptionProps {
  text: string
  to: string
  icon: React.ReactNode
}

export interface IEditorLayoutProps {
  title: string
}

export interface ICreatingLayoutProps {
  onSaveAndResume: (() => void) | (() => Promise<void>)
  onSave: (() => void) | (() => Promise<void>)
}