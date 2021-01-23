import React, {useEffect, useState} from "react";
import {Typography, Grid, Button, makeStyles} from "@material-ui/core";
import OftadehLayout from "../../components/OftadehLayout/OftadehLayout";
import AddSpec from "./AddSpec";
import {getAllSpec} from "../../data/adminApi";
import SpecificationBox from "./SpecificationBox";
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles(theme => ({
    my3: {
        margin: "1.3rem 0"
    },
    mb0: {
        marginBottom: 0
    },
    mRight: {
        marginRight: ".85rem"
    },
    p1: {
        padding: ".85rem"
    }
}));


const Spec_List = props => {
    const {history} = props;
    const classes = useStyles();


    const [add, setAdd] = useState(false);

    const [spec, setSpec] = useState([])

    const [loading,setLoading] = useState(false)

    const trigger = ()=>{
        apiCall()
    }

    const handleNew = (e) => {
        e.preventDefault();
        setAdd(true)
    }

    const apiCall = ()=>{
        getAllSpec()
            .then(({data}) => {
                setSpec(data)
                setLoading(true)
            })
            .catch(e => {
                console.log(e.message)
            })
    }

    useEffect(() => {
        apiCall()
    }, [])


    return (
        <OftadehLayout>
            {/*<OftadehBreadcrumbs path={history}/>*/}
            <Grid container className={classes.my3} alignItems="center">

                <Grid item className={classes.mRight}>
                    <Typography variant="h5" component="h1">
                        Specifications
                    </Typography>
                </Grid>
                <Grid item>
                    <Button
                        onClick={handleNew}
                        // onClick={() => history.push(`/spec/addSpecification`)}
                        variant="outlined"
                        color="primary"
                        size="small"
                    >
                        Add new Specification
                    </Button>
                </Grid>
            </Grid>
            {add && <AddSpec spec={spec} trigger={trigger} handleClose={() => {
                setAdd(false)
            }}/>}

            {loading ? <SpecificationBox spec={spec} /> : <CircularProgress size={24} style={{marginLeft: 15, position: 'relative', top: 4}}/> }



        </OftadehLayout>
    );
};

export default Spec_List;
