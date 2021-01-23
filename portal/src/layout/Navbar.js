import React, {useEffect, useState} from 'react';
import {Link, useHistory} from 'react-router-dom';
import {Link as MUILink, Tooltip} from '@material-ui/core';
import {useAppContext} from '../AppContext';
import {logoutUser} from '../data/userApi';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MailIcon from "@material-ui/icons/Mail";
import Badge from "@material-ui/core/Badge";
import jwtDecode from "jwt-decode";
import IconButton from "@material-ui/core/IconButton";
import NotificationsIcon from '@material-ui/icons/Notifications';
import {getNotification} from "../data/casesApi";
import * as PropTypes from "prop-types";
import ChatIcon from "@material-ui/icons/Chat";
import Typography from "@material-ui/core/Typography";


class FavoriteIcon extends React.Component {
    render() {
        return null;
    }
}

FavoriteIcon.propTypes = {
    color: PropTypes.any,
    style: PropTypes.shape({marginRight: PropTypes.number})
};

function Navbar() {


    const {user} = useAppContext();
    const history = useHistory();
    const [currentPath, setCurrentPath] = React.useState(null);

    const ditectCurrentMenu = (routeToCheck) => {
        const acctiveLocation = currentPath || history.location;
        const {pathname} = acctiveLocation;

        const test1 = new RegExp('/' + routeToCheck + '$', 'g');
        const test2 = new RegExp('/' + routeToCheck + '/', 'g');


        return (pathname.match(test1) || pathname.match(test2));
    };

    history.listen((location) => {
        setCurrentPath(location)
    });

    const [anchorEl, setAnchorEl] = React.useState(null);

    const [open, setOpen] = useState(null)

    const [count, setCount] = useState(0)

    const [caseTitle, setCaseTitle] = useState([])

    const handleOpenNotf = (event) => {
        setOpen('tfyt')
    };
    const handleCloseNotf = () => {
        setOpen(null)
    };

    const token = localStorage.FBIdToken;
    let decodedToken = null;
    if (token) {
        decodedToken = jwtDecode(token);
    }

    useEffect(() => {
        if (user && decodedToken && decodedToken.consultant) {
            getNotification()
                .then((data) => {
                    setCount(data.data.count)
                    setCaseTitle(data.data.data)
                })
                .catch((e) => {
                    console.log(e.response)
                })
        }

    }, [token])

    const notfHandleClick = (event) => {
        event.preventDefault();
        setOpen(event.currentTarget);
    };

    let notificationsMarkup =
        caseTitle && caseTitle.length > 0 ? (
            caseTitle.map((item) => {

                return (
                    <MenuItem>
                        <ChatIcon style={{marginRight: 10}}/>
                        <Typography
                            component={Link}
                            color="default"
                            variant="body1"
                        >
                            New case {item.title} has been assign to you
                        </Typography>
                    </MenuItem>
                );
            })
        ) : (
            <MenuItem>
                You have no notifications yet
            </MenuItem>
        );


    const handleClick = (event) => {
        event.preventDefault();
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        logoutUser();
        window.location.href = '/login';
    }


    return (
        <>
            <header id="header" className="header">
                <div className="header-top bg-theme-color-2 sm-text-center">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-4">
                                <div className="widget no-border m-0">
                                    <ul className="list-inline font-13 sm-text-center mt-5">
                                        <li>
                                            <a className="text-white" href="#">FAQ</a>
                                        </li>
                                        <li className="text-white">|</li>
                                        <li>
                                            <a className="text-white" href="#">Help Desk</a>
                                        </li>
                                        {!user && (<>
                                            <li class="text-white">|</li>
                                            <li>
                                                <MUILink className="text-white" to="/login" component={Link}>
                                                    Login
                                                </MUILink>
                                            </li>
                                            <li class="text-white">|</li>
                                            <li>
                                                <MUILink className="text-white" to="/signup" component={Link}>
                                                    signup
                                                </MUILink>
                                            </li>
                                        </>)}
                                    </ul>
                                </div>
                            </div>
                            <div className="col-md-8">
                                <div className="widget no-border m-0 mr-15 pull-right flip sm-pull-none sm-text-center">
                                    <ul className="styled-icons icon-circled icon-sm pull-right flip sm-pull-none sm-text-center mt-sm-15">
                                        <li><a href="#"><i className="fa fa-facebook text-white"></i></a></li>
                                        <li><a href="#"><i className="fa fa-twitter text-white"></i></a></li>
                                        <li><a href="#"><i className="fa fa-google-plus text-white"></i></a></li>
                                        <li><a href="#"><i className="fa fa-instagram text-white"></i></a></li>
                                        <li><a href="#"><i className="fa fa-linkedin text-white"></i></a></li>
                                        {user && (<li>
                                            <div class="dropdown">
                                                <a href="#" onClick={handleClick}><i
                                                    class="fa fa-user text-white"></i></a>

                                                <Menu
                                                    id="simple-menu"
                                                    anchorEl={anchorEl}
                                                    keepMounted
                                                    open={Boolean(anchorEl)}
                                                    onClose={handleClose}
                                                >
                                                    <MenuItem onClick={handleClose}>Profile</MenuItem>
                                                    <MenuItem onClick={handleLogout}>Logout</MenuItem>
                                                </Menu>
                                            </div>
                                        </li>)}

                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="header-middle p-0 bg-lightest xs-text-center">
                    <div className="container pt-0 pb-0">
                        <div className="row">
                            <div className="col-xs-12 col-sm-3 col-md-6">
                                <div className="widget no-border m-0">
                                    <a href="/"
                                       className="menuzord-brand pull-left flip xs-pull-center mt-10 mb-10"><img
                                        alt="" src="repair/images/logo-wide.png"/></a>
                                </div>
                            </div>
                            <div className="col-xs-12 col-sm-3 col-md-2">
                                <div className="widget no-border m-0">
                                    <div className="mt-15 mb-10 text-right flip sm-text-center">
                                        <div className="font-15 text-black-333 mb-5 font-weight-600"><i
                                            className="fa fa-envelope text-theme-colored font-18"></i> Mail Us Today
                                        </div>
                                        <a href="mailto:info@bluetac.com"
                                           className="font-12 text-gray"> info@bluetac.com</a>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xs-12 col-sm-3 col-md-2">
                                <div className="widget no-border m-0">
                                    <div className="mt-15 mb-10 text-right flip sm-text-center">
                                        <div className="font-15 text-black-333 mb-5 font-weight-600"><i
                                            className="fa fa-map-marker text-theme-colored font-18"></i> Company
                                            Location
                                        </div>
                                        <a href="#" className="font-12 text-gray"> 121 King Street, Melbourne</a>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xs-12 col-sm-3 col-md-2">
                                <div className="widget no-border m-0">
                                    <div className="mt-15 mb-10 text-right flip sm-text-center">
                                        <div className="font-15 text-black-333 mb-5 font-weight-600"><i
                                            className="fa fa-phone-square text-theme-colored font-18"></i> +(012) 345
                                            6789
                                        </div>
                                        <a href="#" className="font-12 text-gray"> Call us for more details</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
            <div className="header-nav">
                <div
                    className="header-nav-wrapper navbar-scrolltofixed bg-theme-colored border-bottom-theme-color-2-1px">
                    <div className="container">
                        <nav id="menuzord" className="menuzord bg-theme-colored pull-left flip menuzord-responsive">

                            <ul className="menuzord-menu onepage-nav">
                                <li><a href="/landing">Home</a></li>
                                {user && (<>
                                    <li className={ditectCurrentMenu('cases') ? "active" : ""}>
                                        <MUILink to="/cases" component={Link}>
                                            Cases
                                        </MUILink>
                                    </li>
                                    <li className={ditectCurrentMenu('profile') ? "active" : ""}>
                                        <MUILink to="/profile" component={Link}>
                                            Profile
                                        </MUILink>
                                    </li>
                                    {decodedToken && decodedToken.consultant &&
                                    <li className={ditectCurrentMenu('notification') ? "active" : ""}>
                                        {/*<Badge badgeContent={4} style={{color: 'white'}} color="primary">*/}
                                        {/*    <MailIcon />*/}
                                        {/*</Badge>*/}

                                        {/*<Tooltip placement="top" title="Notifications">*/}

                                        <Badge
                                            style={{color: 'white'}}
                                            badgeContent={count}
                                            color="primary"
                                        >
                                            <li className={ditectCurrentMenu('notification') ? "active" : ""}>
                                                <MUILink to="/notification" component={Link}>
                                                    <NotificationsIcon style={{color: 'white'}}/>
                                                </MUILink>
                                            </li>

                                        </Badge>

                                        {/*</Tooltip>*/}
                                        {/*<Menu*/}
                                        {/*    id="simple-menu"*/}
                                        {/*    anchorEl={open}*/}
                                        {/*    keepMounted*/}
                                        {/*    open={Boolean(open)}*/}
                                        {/*    onClose={handleCloseNotf}*/}
                                        {/*    // onEntered={onMenuOpened}*!/*/}
                                        {/*>*/}
                                        {/*    {notificationsMarkup}*/}


                                        {/*</Menu>*/}
                                    </li>}
                                </>)}
                            </ul>
                        </nav>
                    </div>
                </div>
            </div>
        </>
    );
}

Navbar.propTypes = {};


export default Navbar;
