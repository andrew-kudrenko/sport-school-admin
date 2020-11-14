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

export interface IEnhancedTableToolbarProps {
  numSelected: number
  title: string
  onRemove: () => void
}

export interface IHeadCell<T extends IdentifiedEntity> {
  id: keyof T
  label: string
  numeric: boolean
}

export type OrderType = 'asc' | 'desc'


export interface IEnhancedTableHeadProps<T extends IdentifiedEntity> {
  classes: Record<any, string>
  numSelected: number
  onRequestSort: (event: React.MouseEvent<unknown>, property: keyof T) => void
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void
  order: OrderType
  orderBy: string
  rowCount: number
  headCells: Array<IHeadCell<T>>
}

export type RemoveCallbackType = ((id: Array<IDType> | IDType) => Promise<void> | void)

export interface IEnhancedTableProps<T extends IdentifiedEntity> {
  onRemove: RemoveCallbackType
  rows: Array<T>
  headCells: Array<IHeadCell<T>>
  title: string
}