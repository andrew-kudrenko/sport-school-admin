import React from 'react'
import { Route } from 'react-router-dom'
import { CitiesTable } from '../components/cities/CitiesTable'
import { RootLayout } from '../components/layouts/RootLayout'

export const SuperAdminRoutes: React.FC = () =>
    <RootLayout>
        <Route
            exact
            path="/cities"
            component={CitiesTable}
        />
    </RootLayout>