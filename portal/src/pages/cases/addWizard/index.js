import React from 'react'
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import CaseDetails from "./CaseDeatils";
import Spec from "./AddSpec";
import Review from "./Review";



function AddSpecification(props) {
    const { path } = useRouteMatch();

    return (
        <div className='container'>

            <Switch>
                <Route exact path={path} render={(localProps) => {
                    return <CaseDetails {...localProps} state={props.state} dispatch={props.dispatch} />
                }} />
                <Route path={`${path}/spec`} state={props.state} dispatch={props.dispatch} render={(localProps)  => {
                    return <Spec  {...localProps} state={props.state} dispatch={props.dispatch}/>
                }} />
                <Route path={`${path}/review`}>
                     <Review state={props.state} dispatch={props.dispatch}/>
                </Route>


            </Switch>
        </div>
    )
}


export default AddSpecification

