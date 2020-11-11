import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { CitiesTable } from '../components/cities/CitiesTable'
import { EditorLayout } from '../components/layouts/editor-layout/EditorLayout'
import { RootLayout } from '../components/layouts/RootLayout'
import { EditCityForm } from '../views/cities/EditCityForm'

export const SuperAdminRoutes: React.FC = () =>
    <RootLayout>
        <Switch>
            <Route exact path="/cities">
                <EditorLayout>
                    <CitiesTable />
                </EditorLayout>
            </Route>
            <Route exact path="/cities/add">
                <EditCityForm />
            </Route>
        </Switch>
    </RootLayout>