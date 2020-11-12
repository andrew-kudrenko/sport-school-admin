import React from 'react'
import { SearchBar } from './SearchBar'
import { ActionsBar } from './ActionsBar'
import { EditorHeader } from './EditorHeader'
import { IEditorLayoutProps } from '../../../interfaces/components.interfaces'

export const EditorLayout: React.FC<IEditorLayoutProps> = ({ children, onRemove }) => {
  return (
    <>
      <EditorHeader />
      <ActionsBar onRemove={onRemove} />
      <SearchBar />
      {children}
    </>
  )
}