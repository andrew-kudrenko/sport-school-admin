import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { RootLayout } from '../components/layouts/RootLayout'
import { CityListView } from '../views/cities/CityListView'
import { EditCityForm } from '../views/cities/EditCityForm'

export const SuperAdminRoutes: React.FC = () =>
    <RootLayout>
        <Switch>
            <Route exact path="/cities">
                <CityListView />
            </Route>
            <Route exact path="/cities/add">
                <EditCityForm />
            </Route>
        </Switch>
    </RootLayout>