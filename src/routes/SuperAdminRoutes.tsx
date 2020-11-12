import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { RootLayout } from '../components/layouts/RootLayout'
import EnhancedTable from '../components/tables/EnhancedTable'

export const SuperAdminRoutes: React.FC = () =>
    <RootLayout>
        <Switch>
            <Route exact path="/cities" component={EnhancedTable} />
        </Switch>
    </RootLayout>