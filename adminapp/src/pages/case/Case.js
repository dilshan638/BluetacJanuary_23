import React from "react";
import OftadehLayout from "../../components/OftadehLayout/OftadehLayout";
import OftadehBreadcrumbs from "../../components/OftadehBreadcrumbs/OftadehBreadcrumbs";
import { Typography } from "@material-ui/core";
import MUIDataTable from "mui-datatables";
import CircularProgress from "@material-ui/core/CircularProgress";
import {getCases} from "../../data/casesApi";

import Model from './Model'
import Button from "@material-ui/core/Button";


class Case_List extends React.Component {

    state = {
        page: 0,
        count: 1,
        rowsPerPage: 5,
        sortOrder: {},
        data: [['Loading Data...']],
        isOpen:false,
        caseId:null,
        columns: [
            {
                name: 'title',
                label: 'Title',
                options: {},
            },
            {
                name: 'createdTime',
                label: 'Created Time',
                options: {},
            },
            {
                name: 'sheduledToTime',
                label: 'Sheduled To Time',
                options: {},
            },
            {
                name: 'type',
                label: 'Type',
                options: {},
            },
            {
                name: 'caseId',
                label: 'Action',
                options: {
                    filter: false,
                    sort: false,
                    empty: true,
                    customBodyRender: (caseId, tableMeta) => {
                        return (
                            <Button
                                onClick={()=>this.handleClick(caseId)}
                                style={{
                                    backgroundColor: "#55D5FF",
                                }}
                                variant="contained" size='small'>
                                <small> Assign</small>
                            </Button>
                        );
                    }
                }
            }
        ],
        isLoading: false,
    };

    handleOpen = () => {
        this.setState({isOpen:true})
    };

     handleClose = () => {
         this.setState({isOpen:false})
    };

    handleClick(caseId){
        console.log(caseId)
        this.setState({caseId:caseId})
        this.handleOpen()

    }


    componentDidMount() {
        this.getData('', 0);
    }

    getData = async (url, page) => {
        this.setState({ isLoading: true });
        const res = await this.xhrRequest(url, page);
        this.setState({ data: res.data, isLoading: false, count: res.total });
    };


    sort = (page, sortOrder) => {
        this.setState({ isLoading: true });
        this.xhrRequest('', page, sortOrder).then(res => {
            this.setState({
                data: res.data,
                page: res.page,
                sortOrder,
                isLoading: false,
                count: res.total,
            });
        });
    };

    xhrRequest = async (url, page, sortOrder = {}) => {

        let fullData = await getCases();

        fullData.data.forEach((data)=>{
            data.assign = 'assign'
        })

        const total = fullData.length;

        let sortField = sortOrder.name;
        let sortDir = sortOrder.direction;

        if (sortField) {
            fullData = fullData.sort((a, b) => {
                if (a[sortField] < b[sortField]) {
                    return (sortDir === 'asc' ? -1 : 1);
                } else if (a[sortField] > b[sortField]) {
                    return -1 * (sortDir === 'asc' ? -1 : 1);
                } else {
                    return 0;
                }
            });
        }

        const srcData = fullData.data.slice(page * this.state.rowsPerPage, (page + 1) * this.state.rowsPerPage);
        let data = srcData;

        return {data,
            total,
            page}
    };

    changePage = (page, sortOrder) => {
        this.setState({
            isLoading: true,
        });
        this.xhrRequest('', page, sortOrder).then(res => {
            this.setState({
                isLoading: false,
                page: res.page,
                sortOrder,
                data: res.data,
                count: res.total,
            });
        });
    };

    render() {
        const {data, page, count, isLoading, rowsPerPage, sortOrder,isOpen,caseId,columns} = this.state;
        const { history } = this.props;

        const options = {
            filter: true,
            filterType: 'dropdown',
            responsive: 'vertical',
            serverSide: true,
            count: count,
            // selectableRows: true,
            // selectableRowsOnClick: true,
            rowsPerPage: rowsPerPage,
            rowsPerPageOptions: [],
            sortOrder: sortOrder,

            onTableChange: (action, tableState) => {
                switch (action) {
                    case 'changePage':
                        this.changePage(tableState.page, tableState.sortOrder);
                        break;
                    case 'sort':
                        this.sort(tableState.page, tableState.sortOrder);
                        break;
                    default:
                }
            },
        };

        return (
            <OftadehLayout>
                <OftadehBreadcrumbs path={history} />
                <MUIDataTable
                    title={
                        <Typography variant="h6">
                            Case List
                            {isLoading &&
                            <CircularProgress size={24} style={{marginLeft: 15, position: 'relative', top: 4}}/>}
                        </Typography>
                    }
                    data={data}
                    columns={columns}
                    options={options}
                />
                {
                    isOpen &&
                    <Model
                        state={isOpen}
                        caseId={caseId}
                        onClose={this.handleClose}
                    />
                }
            </OftadehLayout>
        );

    }
}

export default Case_List;
