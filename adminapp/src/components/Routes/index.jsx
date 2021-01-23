import React, {useEffect, useState} from "react";
import {BrowserRouter as Router, Switch, Route, Redirect} from "react-router-dom";
import jwtDecode from 'jwt-decode';
import DashboardPage from "../../pages/dashboard/DashboardPage";
import AllPostsPage from "../../pages/posts/all-posts/AllPostsPage";
import AddPostPage from "../../pages/posts/add-post/AddPostPage";
import CalendarPage from "../../pages/calendar/CalendarPage";
import ForgotPasswordPage from "../../pages/auth/forgot-password/ForgotPasswordPage";
import LoginPage from "../../pages/auth/login/LoginPage";
import RegisterPage from "../../pages/auth/register/RegisterPage";
import Error404Page from "../../pages/errors/404/Error404Page";
import Error500Page from "../../pages/errors/500/Error500Page";
import AboutPage from "../../pages/about/AboutPage";
import {getUserData, logoutUser} from "../../data/adminApi";
import axios from 'axios';
import {AppContextProvider} from "../../AppContext";
import PageLoader from "../../utils/PageLoader";
import ProtectedRoute from "../../utils/ProtectedRoute";
import Consultants from "../../pages/consultants";
import Case_List from "../../pages/case/Case";
import Spec_List from "../../pages/specification/List";

axios.defaults.baseURL =
    // 'https://asia-northeast1-bluetac-pro.cloudfunctions.net/api';
    'http://localhost:500o/bluetac-pro/asia-northeast1/api';

const Routes = () => {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    let decodedToken = null;

    const validateUser = () => {
        const token = localStorage.FBIdAdminToken;
        if (token) {
            decodedToken = jwtDecode(token);
            if (decodedToken.exp * 1000 < Date.now()) {
                logoutUser();
                window.location.href = '/login';
            } else if (!user) {
                setLoading(true);
                axios.defaults.headers.common['Authorization'] = token;
                getUserData().then((data) => {
                    setUser({...data, decodedToken});
                    setLoading(false);
                });
            }
        } else {
            setLoading(false);
            setUser(null);
        }
    }

    useEffect(() => {
        validateUser();
    }, []);
    if (loading) {
        return <PageLoader/>
    }

    return (
        <AppContextProvider value={{user, setUser, decodedToken}}>
            <Router>
                <Switch>
                    <ProtectedRoute exact path="/" component={DashboardPage}/>
                    <Route exact path="/login" component={LoginPage}/>
                    <ProtectedRoute path="/consultants" component={Consultants}/>

                    <ProtectedRoute path="/cases" component={Case_List}/>

                    <ProtectedRoute path="/spec" component={Spec_List}/>


                    <Route exact path="/pages/posts" component={AllPostsPage}/>
                    <Route exact path="/pages/posts/add-post" component={AddPostPage}/>
                    <Route exact path="/pages/calendar" component={CalendarPage}/>
                    <Route exact path="/pages/auth/forgot-password" component={ForgotPasswordPage}/>
                    <Route exact path="/pages/auth/login" component={LoginPage}/>
                    <Route exact path="/pages/auth/register" component={RegisterPage}/>
                    <Route exact path="/pages/errors/error-500" component={Error500Page}/>
                    <Route exact path="/pages/errors/error-404" component={Error404Page}/>
                    <Route exact path="/pages/about" component={AboutPage}/>

                    component: () => <Redirect to="/pages/errors/error-404"/>
                </Switch>
            </Router>
        </AppContextProvider>
    );
};

export default Routes;
