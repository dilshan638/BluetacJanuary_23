import React from "react";
import OftadehLayout from "../../components/OftadehLayout/OftadehLayout";
import { Paper, Grid, makeStyles, Typography } from "@material-ui/core";
import OftadehBreadcrumbs from "../../components/OftadehBreadcrumbs/OftadehBreadcrumbs";

const useStyles = makeStyles((them) => ({
    paddingPaper: {
        padding: "10px 5px 5px 10px",
    },
    mt: {
        marginTop: 13,
    },
    titlePaper: {
        marginBottom: "16px",
    },
    visitorChart: {
        // height: "150px"
    },
}));

const Details = (props) => {
    const { history } = props;
    const classes = useStyles();

    return (
        <OftadehLayout>
            <OftadehBreadcrumbs path={history} />
            <h1>Details page</h1>
        </OftadehLayout>
    );
};

export default Details;
