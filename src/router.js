import React from 'react'
import { HashRouter as Router, Switch, Route } from "react-router-dom"
import HomePage from './pages/homePage/homePage'
import EditPicPage from './pages/editPicPage/editPicPage'
import CreatedPage from './pages/createdPage/createdPage'

const BasicRoute = () =>(
    <Router>
        <Switch>
            <Route exact path="/" component={HomePage}></Route>
            <Route exact path="/editpic" component={EditPicPage}></Route>
            <Route exact path="/created" component={CreatedPage}></Route>
        </Switch>
    </Router>
)

export default BasicRoute;