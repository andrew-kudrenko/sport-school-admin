import React from 'react'
import { SearchBar } from './SearchBar'
import { ActionsBar } from './ActionsBar'
import { EditorHeader } from './EditorHeader'

export const EditorLayout: React.FC = ({ children }) => {
  return (
    <>
      <EditorHeader />
      <ActionsBar />
      <SearchBar />
      {children}
    </>
  )
}