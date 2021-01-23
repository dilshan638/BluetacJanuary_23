import React from 'react'
import {Redirect, Route} from 'react-router-dom'
import {useAppContext} from '../AppContext';

const ProtectedRoute = ({component: Component, ...rest}) => {
    const {user, setUser} = useAppContext();

    const token = localStorage.FBIdAdminToken;
    if (!token) {
        setUser(null);
    }
    return (
        <Route
            {...rest}

            render={props =>
                (user && token) ? (
                    <Component {...props} />
                ) : (

                    <Redirect to={{pathname: '/login', state: {from: props.location}}}/>
                )
            }
        />
    )
}

export default ProtectedRoute