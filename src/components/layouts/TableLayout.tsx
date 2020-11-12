import React from 'react'
import { ICity } from '../../interfaces/entities.interfaces'
import { ITableLayoutProps } from '../../interfaces/components.interfaces'
import { Alert, AlertTitle } from '@material-ui/lab'
import { CircularProgress } from '@material-ui/core'

export interface ICustomAlertProps {
    title: string
    severity: 'error' | 'success' | 'info' | 'warning'
}

export const CustomAlert: React.FC<ICustomAlertProps> = ({ children, title, severity }) =>
    <Alert severity={severity}>
        <AlertTitle>{title}</AlertTitle>
        {children}
    </Alert>

export const TableLayout: React.FC<ITableLayoutProps<ICity>> = ({ list, error, loading, children }) =>
    <>
        {
            loading
                ? <CircularProgress color="secondary" />
                : error
                    ? <CustomAlert title="Ошибка" severity="error">{error}</CustomAlert>
                    : list.length
                        ? children
                        : <CustomAlert title="Таблица пуста" severity="info">{'Здесь пока ничего нет'}</CustomAlert>
        }
    </>
