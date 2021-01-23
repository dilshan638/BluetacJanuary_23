import React, {useReducer} from 'react'
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import List from './List';
import AddSpecification from "./addWizard";
import {initialState , reducer} from './config/Reducer'

function Cases() {
    const { path } = useRouteMatch();
    const [state, dispatch] = useReducer(reducer , initialState)
    return (
        <>  
            <Switch>
                <Route exact path={path}>
                    <List />
                </Route>
                <Route exact path={`${path}/list`}>
                    <List />
                </Route>
                <Route path={`${path}/add`}>
                    <AddSpecification state={state} dispatch={dispatch} />
                </Route>
            </Switch>
        </>
    )
}

Cases.propTypes = {

}

export default Cases

