import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { RootLayout } from '../components/layouts/RootLayout'
import { ManageCitiesView } from '../views/cities/ManageCitiesView'
import { AddSchoolView } from '../views/schools/AddSchoolView'
import { ManageSchoolsView } from '../views/schools/ManageSchoolsView'

export const SuperAdminRoutes: React.FC = () =>
    <RootLayout>
        <Switch>
            <Route exact path="/cities" component={ManageCitiesView} />
            <Route exact path="/schools" component={ManageSchoolsView} />
            <Route exact path="/schools/add" component={AddSchoolView} />
        </Switch>
    </RootLayout>