import React from 'react'
import {Route, Switch, useRouteMatch} from 'react-router-dom';
import List from "./List";
import AddSpec from "./AddSpec";


function Specification() {
    const {path} = useRouteMatch();

    return (
        <>
            <Switch>
                <Route exact path={path} render={(localProps) => {
                    return <List {...localProps} />
                }}/>
                <Route exact path={`${path}/addSpecification`} render={(localProps) => {
                    return <AddSpec {...localProps} />
                }}/>
                {/*<Route path={`${path}/add`}>*/}
                {/*    <AddSpecification state={state} dispatch={dispatch} />*/}
                {/*</Route>*/}
            </Switch>
        </>
    )
}

export default Specification

