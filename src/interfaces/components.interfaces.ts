import { ErrorType, IdentifiedEntity, IDType } from "./entities.interfaces";

export interface INavProps {
  open: boolean
  setOpen: (open: boolean) => void
}

export interface IDrawerOptionProps {
  text: string
  to: string
  icon: React.ReactNode
}

export interface IEditorLayoutProps extends IActionsBarProps {
  
}

export interface ICreatingLayoutProps {
  onSaveAndResume: (() => void) | (() => Promise<void>)
  onSave: (() => void) | (() => Promise<void>)
}


export interface ITableProps<T extends IdentifiedEntity> {
  allSelected: (list: Array<T>) => boolean
  has: (id: IDType) => boolean
  onToggle: (id: IDType) => void
  onToggleAll: (list: Array<T>) => void
  list: Array<T>
}

export interface IActionsBarProps {
  onRemove: (() => Promise<void>) | (() => void)
}

export interface ITableLayoutProps<T extends IdentifiedEntity> {
  list: Array<T>
  error: ErrorType
  loading: boolean
}