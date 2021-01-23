import React, {useEffect, useState} from "react";

import {Typography, Grid, Button, makeStyles, CircularProgress} from "@material-ui/core";
import MUIDataTable from "mui-datatables";
import OftadehLayout from "../../components/OftadehLayout/OftadehLayout";
import OftadehBreadcrumbs from "../../components/OftadehBreadcrumbs/OftadehBreadcrumbs";
import {getAllUser} from "../../data/adminApi";

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




const Consultants_List = props => {
    const { history } = props;
    const classes = useStyles();

    const [loading,setLoading] = useState(false)
    const [column,setColumn] = useState([
        {
            name: 'firstName',
            label: 'First Name',
            options: {},
        },
        {
            name: 'lastName',
            label: 'Last Name',
            options: {},
        },
        {
            name: 'email',
            label: 'Email',
            options: {},
        },
        {
            name: 'country',
            label: 'Country',
            options: {},
        },
        {
            name: 'userId',
            label: 'Action',
            options: {
                filter: false,
                sort: false,
                empty: true,
                customBodyRender: (userId, tableMeta) => {
                    return (
                        <button onClick={()=>handleClick(userId)}>
                            view
                        </button>
                    );
                }
            }
        }])



    const [page,setPage] = useState(0);

    const [count,setCount] = useState(1)

    const [rowsPerPage,setRowsPerPage] = useState(5);

    const handleClick = (userID)=>{
        console.log(userID)
        history.push(`${props.location.pathname}/detail`)
    }

    const [data,setData] = useState(['Loading Data...'])

    const options = {
        filterType: "checkbox",
        serverSide: true,
        count: count,
        rowsPerPage: rowsPerPage,
        rowsPerPageOptions: [5,10,15],
        onTableChange: (action, tableState) => {
            switch (action) {

                case 'changePage':
                    console.log('page changes')
                    changePage(tableState.page);
                    break;
                // case 'sort':
                //     this.sort(tableState.page, tableState.sortOrder);
                //     break;
                default:
            }
        },
    };

    const changePage = (page) => {
        setLoading(true)
        xhrRequest('', page)
            .then(res => {
                console.log('change page',res)
                setLoading(false)
                setPage(res.page)
                setData(res.srcData)
                setCount(res.total)
        });
    };

    const getData = async (url, page) => {
        setLoading(true)
        const res = await xhrRequest(url, page);
        return res;


    };


    const xhrRequest = async (url, page = {}) => {

        let fullData = await getAllUser(page);

        fullData.forEach((data)=>{
            data.view = 'view'
        })


        const srcData = fullData.slice(page * rowsPerPage, (page + 1) * rowsPerPage);

        const total = fullData.length;


        return {srcData,
            total,
            page}
    };

    useEffect(()=>{
        setLoading(true)

        getData('',0)
            .then((res)=>{
                setData(res.srcData)
                setLoading(false)
                setCount(res.total)
            })
    },[])



    return (
        <OftadehLayout>
            <Grid container className={classes.my3} alignItems="center">
                <Grid item className={classes.mRight}>
                    <Typography variant="h5" component="h1">
                        Consultants List
                    </Typography>
                </Grid>
                <Grid item>
                    <Button
                        onClick={() => history.push("/pages/posts/add-post")}
                        variant="outlined"
                        color="primary"
                        size="small"
                    >
                        Add new Consultant
                    </Button>
                </Grid>
            </Grid>
            <OftadehBreadcrumbs path={history} />
            <MUIDataTable
                title={
                    <Typography variant="h6">
                        Consultants List
                        {loading &&
                        <CircularProgress size={24} style={{marginLeft: 15, position: 'relative', top: 4}}/>}
                    </Typography>
                }
                data={data}
                columns={column}
                options={options}
            />
        </OftadehLayout>
    );
};

export default Consultants_List;
