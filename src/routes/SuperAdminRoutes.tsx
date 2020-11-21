import React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import { RootLayout } from '../components/layouts/RootLayout'
import { AddCityView } from '../views/cities/AddCityView'
import { EditCityView } from '../views/cities/EditCityView'
import { ManageCitiesView } from '../views/cities/ManageCitiesView'
import { AddCoachView } from '../views/coaches/AddCoachView'
import { ManageCoachesView } from '../views/coaches/ManageCoachesView'
import { AddGroupView } from '../views/groups/AddGroupView'
import { EditGroupView } from '../views/groups/EditGroupView'
import { ManageGroupsView } from '../views/groups/ManageGroupsView'
import { AddNewsView } from '../views/news/AddNewsView'
import { EditNewsView } from '../views/news/EditNewsView'
import { ManageNewsView } from '../views/news/ManageNewsView'
import { AddSchoolView } from '../views/schools/AddSchoolView'
import { EditSchoolView } from '../views/schools/EditSchoolView'
import { ManageSchoolsView } from '../views/schools/ManageSchoolsView'
import { AddStatisticsView } from '../views/statistics/AddStatisticsView'
import { EditStatisticsView } from '../views/statistics/EditStatisticsView'
import { ManageStatisticsView } from '../views/statistics/ManageStatisticsView'
import { AddStudentView } from '../views/students/AddStudentView'
import { EditStudentView } from '../views/students/EditStudentView'
import { ManageStudentsView } from '../views/students/ManageStudentsView'
import { AddTournamentView } from '../views/tournaments/AddTournamentView'
import { EditTournamentView } from '../views/tournaments/EditTournamentView'
import { ManageTournamentsView } from '../views/tournaments/ManageTournmentsView'
import { AddUserView } from '../views/users/AddUserView'
import { EditUserView } from '../views/users/EditUserView'
import { ManageUsersView } from '../views/users/ManageUsersView'

export const SuperAdminRoutes: React.FC = () =>
    <RootLayout>
        <Switch>
            <Route exact path="/cities/edit/:id" component={EditCityView} />
            <Route exact path="/cities/add" component={AddCityView} />
            <Route exact path="/cities" component={ManageCitiesView} />
{/* 
            <Route exact path="/schools/edit/:id" component={EditSchoolView} />
            <Route exact path="/schools/add" component={AddSchoolView} />
            <Route exact path="/schools" component={ManageSchoolsView} />

            <Route exact path="/users/edit/:id" component={EditUserView} />
            <Route exact path="/users/add" component={AddUserView} />
            <Route exact path="/users" component={ManageUsersView} />

            <Route exact path="/news/edit/:id" component={EditNewsView} />
            <Route exact path="/news/add" component={AddNewsView} />
            <Route exact path="/news" component={ManageNewsView} />

            <Route exact path="/tournaments/edit/:id" component={EditTournamentView} />
            <Route exact path="/tournaments/add" component={AddTournamentView} />
            <Route exact path="/tournaments" component={ManageTournamentsView} />
            
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
            <Route exact path="/statistics" component={ManageStatisticsView} /> */}

            <Redirect from="/auth/*" to="/cities/" />
        </Switch>
    </RootLayout>