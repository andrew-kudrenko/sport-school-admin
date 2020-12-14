import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { RootLayout } from '../components/layouts/RootLayout'
import { AddCoachView } from '../views/coaches/AddCoachView'
import { ManageCoachesView } from '../views/coaches/ManageCoachesView'
import { AddGroupView } from '../views/groups/AddGroupView'
import { EditGroupView } from '../views/groups/EditGroupView'
import { ManageGroupsView } from '../views/groups/ManageGroupsView'
import { ManageLogsView } from '../views/logs/ManageLogsView'
import { AddSchoolView } from '../views/schools/AddSchoolView'
import { EditSchoolView } from '../views/schools/EditSchoolView'
import { ManageSchoolsView } from '../views/schools/ManageSchoolsView'
import { AddStatisticsView } from '../views/statistics/AddStatisticsView'
import { EditStatisticsView } from '../views/statistics/EditStatisticsView'
import { ManageStatisticsView } from '../views/statistics/ManageStatisticsView'
import { AddStudentView } from '../views/students/AddStudentView'
import { EditStudentView } from '../views/students/EditStudentView'
import { ManageStudentsView } from '../views/students/ManageStudentsView'
import { AddTicketView } from '../views/tickets/AddTicketView'
import { EditTicketView } from '../views/tickets/EditTicketView'
import { ManageTicketsView } from '../views/tickets/ManageTicketsView'
import { AddUserView } from '../views/users/AddUserView'
import { EditUserView } from '../views/users/EditUserView'
import { ManageUsersView } from '../views/users/ManageUsersView'

export const AdminRoutes: React.FC = () =>
    <RootLayout>
        <Switch>
            <Route exact path="/schools/edit/:id" component={EditSchoolView} />
            <Route exact path="/schools/add" component={AddSchoolView} />
            <Route exact path="/schools" component={ManageSchoolsView} />

            <Route exact path="/users/edit/:id" component={EditUserView} />
            <Route exact path="/users/add" component={AddUserView} />
            <Route exact path="/users" component={ManageUsersView} />

            <Route exact path="/coaches/edit/:id" component={AddCoachView} />
            <Route exact path="/coaches/add" component={AddCoachView} />
            <Route exact path="/coaches" component={ManageCoachesView} />

            <Route exact path="/groups/edit/:id" component={EditGroupView} />
            <Route exact path="/groups/add" component={AddGroupView} />
            <Route exact path="/groups" component={ManageGroupsView} />

            <Route exact path="/students/edit/:id" component={EditStudentView} />
            <Route exact path="/students/add" component={AddStudentView} />
            <Route exact path="/students" component={ManageStudentsView} />

            <Route exact path="/statistics/edit/:id" component={EditStatisticsView} />
            <Route exact path="/statistics/add" component={AddStatisticsView} />
            <Route exact path="/statistics" component={ManageStatisticsView} />

            <Route exact path="/tickets/edit/:id" component={EditTicketView} />
            <Route exact path="/tickets/add" component={AddTicketView} />
            <Route exact path="/tickets" component={ManageTicketsView} />

            <Route exact path="/logs/" component={ManageLogsView} />
            
            <Redirect from="/logs/*" to="/logs/" />
            <Redirect from="/auth/*" to="/schools/" />
        </Switch>
    </RootLayout>