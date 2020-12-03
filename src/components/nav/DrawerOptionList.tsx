import React from 'react'
import { List } from '@material-ui/core'
import { DrawerOption } from './DrawerOption'
import { AssignmentIndOutlined, ChildCareOutlined, EmojiEventsOutlined, EventNoteOutlined, MoneyOutlined, RoomOutlined, SchoolOutlined, SportsOutlined, SportsSoccerOutlined, TrendingUpOutlined } from '@material-ui/icons'
import { IDrawerOptionProps } from '../../interfaces/components.interfaces'
import { useRole } from '../../hooks/role.hook'

const adminOptions: Array<IDrawerOptionProps> = [
  { text: 'Пользователи', to: '/users/', icon: <AssignmentIndOutlined /> },
  { text: 'Группы', to: '/groups/', icon: <SportsSoccerOutlined /> },
  { text: 'Статистика', to: '/statistics/', icon: <TrendingUpOutlined /> },
  { text: 'Тренеры', to: '/coaches/', icon: <SportsOutlined /> },
  { text: 'Ученики', to: '/students/', icon: <ChildCareOutlined /> },
  { text: 'Школы', to: '/schools/', icon: <SchoolOutlined /> },
  { text: 'Абонементы', to: '/tickets/', icon: <MoneyOutlined /> }
]

const superAdminOptions: Array<IDrawerOptionProps> = [
  { text: 'Города', to: '/cities/', icon: <RoomOutlined /> },
  { text: 'Новости', to: '/news/', icon: <EventNoteOutlined /> },
  { text: 'Турниры', to: '/tournaments/', icon: <EmojiEventsOutlined /> }
]

export const DrawerOptionList: React.FC = () => {
  const { isSuperAdmin } = useRole()

  let options = [...adminOptions]
  
  if (isSuperAdmin) {
    options = [...superAdminOptions, ...options]
  }

  return (
    <List>
      {options.map(o => <DrawerOption {...o} key={o.text} />)}
    </List>
  )
}
