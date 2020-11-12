import { ErrorType, IdentifiedEntity } from "./entities.interfaces";

export interface INavProps {
  open: boolean
  setOpen: (open: boolean) => void
}

export interface IDrawerOptionProps {
  text: string
  to: string
  icon: React.ReactNode
}


export interface ICheckableTableHeaderProps {
  allSelected: boolean
  onToggleAll: () => void
}

export interface ITableLayoutProps<T extends IdentifiedEntity> {
  list: Array<T>
  error: ErrorType
  loading: boolean
}

export interface ITableTemplateProps {
  header: React.ReactNode
}

export interface ICheckableTableProps {
  checked: boolean
  onToggle: () => void
}