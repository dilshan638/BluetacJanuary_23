import React, {useEffect, useState} from 'react';
import {BrowserRouter as Router, Route, Switch, useHistory} from 'react-router-dom';
import './App.css';
import {MuiThemeProvider} from '@material-ui/core';
import jwtDecode from 'jwt-decode';
// Components
import Navbar from './layout/Navbar';

// Pages
import cases from './pages/cases';
import landing from './pages/landing';
import login from './pages/Login';
import signup from './pages/signup';
import profile from './pages/profile';
import Notification from './pages/notification'

import axios from 'axios';
import theme from './theme';

import {AppContextProvider} from './AppContext';
import {logoutUser, getUserData} from './data/userApi';
import PageLoader from './util/PageLoader';
import ProtectedRoute from './util/ProtectedRoute';

axios.defaults.baseURL =
    // 'https://asia-northeast1-bluetac-pro.cloudfunctions.net/api';
    'http://localhost:5001/bluetac-pro/asia-northeast1/api';


function App() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    let decodedToken = null;

    const validateUser = () => {
        const token = localStorage.FBIdToken;
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
        <div id="wrapper" class="clearfix">

            <MuiThemeProvider theme={theme}>
                <AppContextProvider value={{user, setUser, decodedToken}}>
                    <Router>
                        <Navbar/>
                        <div>
                            <Switch>
                                <ProtectedRoute exact path="/" component={cases}/>
                                <Route exact path="/login" component={login}/>
                                <Route path="/signup" component={signup}/>
                                <ProtectedRoute path="/cases" component={cases}/>
                                <ProtectedRoute exact path="/profile" component={profile}/>
                                <ProtectedRoute exact path="/notification" component={Notification}/>
                            </Switch>
                        </div>
                        <footer id="footer" className="footer divider layer-overlay overlay-dark-9"
                                style={{marginTop: 'auto'}} data-bg-img="repair/images/bg/bg3.jpg">
                            <div className="footer-bottom bg-black-333">
                                <div className="container pt-20 pb-20">
                                    <div className="row">
                                        <div className="col-md-6">
                                            <p className="font-11 text-black-777 m-0">Copyright &copy;{new Date().getFullYear()} BlueTac.
                                                All Rights Reserved</p>
                                        </div>
                                        <div className="col-md-6 text-right">
                                            <div className="widget no-border m-0">
                                                <ul className="list-inline sm-text-center mt-5 font-12">
                                                    <li>
                                                        <a href="#">FAQ</a>
                                                    </li>
                                                    <li>|</li>
                                                    <li>
                                                        <a href="#">Help Desk</a>
                                                    </li>
                                                    <li>|</li>
                                                    <li>
                                                        <a href="#">Support</a>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </footer>
                    </Router>
                </AppContextProvider>
            </MuiThemeProvider>
        </div>
    );

}

export default App;
