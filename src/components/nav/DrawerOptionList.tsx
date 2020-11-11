import React from 'react'
import { List } from '@material-ui/core'
import { DrawerOption } from './DrawerOption'
import { AssignmentIndOutlined, ChildCareOutlined, EmojiEventsOutlined, EventNoteOutlined, GroupOutlined, RoomOutlined, SchoolOutlined, SportsOutlined, SportsSoccerOutlined, StarsOutlined, TrendingUpOutlined } from '@material-ui/icons'
import { IDrawerOptionProps } from '../../interfaces/components.interfaces'

const options: Array<IDrawerOptionProps> = [
  { text: 'Виды премиумов', to: '/premiums/', icon: <StarsOutlined /> },
  { text: 'Города', to: '/cities/', icon: <RoomOutlined /> },
  { text: 'Новости', to: '/news/', icon: <EventNoteOutlined /> },
  { text: 'Пользователи', to: '/users/', icon: <AssignmentIndOutlined /> },
  { text: 'Группы', to: '/groups/', icon: <SportsSoccerOutlined /> },
  { text: 'Статистика', to: '/statistics/', icon: <TrendingUpOutlined /> },
  { text: 'Тренеры', to: '/coaches/', icon: <SportsOutlined /> },
  { text: 'Турниры', to: '/tournaments/', icon: <EmojiEventsOutlined /> },
  { text: 'Ученики', to: '/students/', icon: <ChildCareOutlined /> },
  { text: 'Школы', to: '/schools/', icon: <SchoolOutlined /> }
]

export const DrawerOptionList: React.FC = () =>
  <List>
    {options.map(o => <DrawerOption {...o} key={o.text} />)}
  </List>
