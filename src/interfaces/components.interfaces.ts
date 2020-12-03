import { ButtonProps } from "@material-ui/core"
import { ChangeEvent } from "react"
import { Nullable } from "../types/common.types"
import { ErrorType, IdentifiedEntity, IDType } from "./entities.interfaces"
import { ICRUDActions } from "./redux.interfaces"

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
  onRemove: ((id: string) => void) | ((id: string) => Promise<void>)
  rows: Array<T>
  headCells: Array<IHeadCell<T>>
  title: string
}

export type EditorModeType = 'edit' | 'add'

export interface IEditorFormProps {
  redirectTo: string
  title: string
  mode: EditorModeType
  isValid: boolean
  onAdd: () => void
  onRemove: () => void
  onModify: () => void
  onClearAll: () => void
  loading: ICRUDActions<boolean>
}

export interface InteractiveButtonProps extends ButtonProps {
  success: boolean
  loading: boolean
  onClick: () => void
}

export interface IEntityEditorProps {
  mode: EditorModeType
  title: string
}

export interface IFileLoaderProps {
  onSelect: (event: ChangeEvent<HTMLInputElement>) => void
  onClear: () => void
  onUpload: () => void
  preview: Nullable<string>
}

export interface IDocumentFileLoaderProps {
  onSelect: (event: ChangeEvent<HTMLInputElement>) => void
  onClear: () => void
  onUpload: () => void
  preview: Nullable<string>
}