import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";

import OftadehListItems from "../OftadehListItems/OftadehListItems";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper
  }
}));


const NotificationsContainer = props => {
  const classes = useStyles();

  const notifList = [
    {
      id: 1,
      title: `${props.data && props.data.count!==0 ? props.data.count : 'No' } new Cases need your attention`,
      icon: "info",
      color: "primary",
      subTitle: "Jan 12, 2021, 2:20:11 pm",
    }
    // {
    //   id: 2,
    //   title: "Updates",
    //   icon: "adjust",
    //   color: "secondary",
    //   subTitle: "July 16, 2020, 12:57:11 am"
    // },
    // {
    //   id: 3,
    //   title: "wakeup",
    //   icon: "alarm",
    //   color: "error",
    //   subTitle: "July 20, 2020, 1:03:13 pm"
    // }
  ];


  return (
    <List className={classes.root}>
      <OftadehListItems type="ListItemIcon" data={ props.data? notifList : []} />
    </List>
  );
};

export default NotificationsContainer;
