import React, { useState } from 'react'
import { Drawer } from './Drawer'
import { Navbar } from './Navbar'

export const Nav: React.FC = () => {
  const [open, setOpen] = useState(false)
  
  return (
    <>
      <Navbar open={open} setOpen={setOpen} />
      <Drawer open={open} setOpen={setOpen} />
    </>
  )
}