import React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import { LoginView } from '../views/auth/LoginView'
import { RegisterView } from '../views/auth/RegisterView'

export const AuthRoutes: React.FC = () =>
    <Switch>
        <Route
            exact
            path="/auth/login"
            component={LoginView}
        />
        <Route
            exact
            path="/auth/register"
            component={RegisterView}
        />
        <Redirect from="*" to="/auth/login" />
    </Switch>