// This is used to determine if a user is authenticated and
// if they are allowed to visit the page they navigated to.

// If they are: they proceed to the page
// If not: they are redirected to the login page.
import React from 'react'
import { Redirect, Route } from 'react-router-dom'
import { useAppContext } from '../AppContext';

const ProtectedRoute = ({ component: Component, ...rest }) => {

  // Add your own authentication on the below line.
  const { user,setUser } = useAppContext();
  const token = localStorage.FBIdToken;
  if(!token) {
    setUser(null);
  }
  return (
    <Route
      {...rest}
      render={props =>
        (user && token) ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
        )
      }
    />
  )
}

export default ProtectedRoute