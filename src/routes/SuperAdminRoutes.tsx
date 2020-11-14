import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { RootLayout } from '../components/layouts/RootLayout'
import { ManageCitiesView } from '../views/cities/ManageCitiesView'

export const SuperAdminRoutes: React.FC = () =>
    <RootLayout>
        <Switch>
            <Route exact path="/cities" component={ManageCitiesView} />
        </Switch>
    </RootLayout>