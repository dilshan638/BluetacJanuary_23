import React, {useReducer} from 'react'
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import List from './List';
import Details from "./Details";


function Consultants() {
    const { path } = useRouteMatch();
    return (
        <>
            <Switch>
                <Route exact path={path} render={(localProps) => {
                    return <List {...localProps} />
                }} />
                <Route exact path={`${path}/detail`} render={(localProps) => {
                    return <Details {...localProps} />
                }} />
                {/*<Route path={`${path}/add`}>*/}
                {/*    <AddSpecification state={state} dispatch={dispatch} />*/}
                {/*</Route>*/}
            </Switch>
        </>
    )
}

export default Consultants

