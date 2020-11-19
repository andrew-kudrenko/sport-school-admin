import React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import { LoginView } from '../views/auth/LoginView'

export const AuthRoutes: React.FC = () =>
    <Switch>
        <Route
            exact
            path="/auth/login"
            component={LoginView}
        />
        <Redirect from="*" to="/auth/login" />
    </Switch>