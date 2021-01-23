import React, { useEffect, useState } from 'react';
import jwtDecode from 'jwt-decode';
import { Link, useRouteMatch } from 'react-router-dom';
import moment from "moment";
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import { colors } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import BusinessCenterIcon from '@material-ui/icons/BusinessCenter';
import { blueGrey } from '@material-ui/core/colors';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import AppsIcon from '@material-ui/icons/Apps';
import ListIcon from '@material-ui/icons/List';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import IconButton from '@material-ui/core/IconButton';
import CallIcon from '@material-ui/icons/Call';
import ChatIcon from '@material-ui/icons/Chat';

import MUIDataTable from "mui-datatables";
import merge from 'lodash.merge';
import clsx from 'clsx';


import { getCases } from '../../data/casesApi';
import PageLoader from '../../util/PageLoader';
import CaseCard from './CaseCard';
import { useAppContext } from '../../AppContext';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  margin: {
    margin: theme.spacing(1),
  },
  withoutLabel: {
    marginTop: theme.spacing(3),
  },
  textField: {
    width: '120ch',
  },
  active: {
    background: '#efefef',
    color: '#888',
  }
}));
const getMuiTheme = (isGridView) => {
  let themeAdditions = {};
  let muiTheme = {
    overrides: {
      MUIDataTable: {
        root: {
          backgroundColor: 'transparent',
          marginLeft: 40,
          marginBottom: 20,
          width: '100%',
          borderRadius: 5,
          fontSize: 12,
        },
        paper: {
          boxShadow: 'none',
          backgroundColor: 'transparent',
          width: '100%',
        },
        tableRoot: {
          border: 'solid 1px #fff',
          '& a': {
            display: 'flex',
            alignItems: 'center',
          },
          '& a > div': {
            paddingRight: 10,
          },
          '& td': {
            whiteSpace: 'nowrap',
            lineHeight: 1,
          },
          '& tr:nth-child(even)': {
            backgroundColor: colors.blueGrey[200],
            '& td': {
              color: colors.blueGrey[900],
            },
          },
          '& tr:nth-child(odd)': {
            backgroundColor: colors.blueGrey[100],
            '& td': {
              color: colors.blueGrey[900],
            },
          },
          '& th': {
            backgroundColor: colors.grey[50],
            color: colors.grey[800],
          },
        },
      },
      MUIDataTablePagination: {
        root: {
          color: colors.grey[900],

        },
      },
      MuiMenuItem: {
        root: {
          color: colors.grey[900],
        }
      },
      MUIDataTableToolbar: {
        root: {
          '& svg': {
            color: colors.grey[900],
          }
        }
      }
    },
  };
  if (isGridView) {
    themeAdditions = {
      overrides: {
        MUIDataTable: {
          tableRoot: {
            display: 'block',
            border: 'none',
            '& tbody': {
              display: 'flex',
              flexWrap: 'wrap',
              marginLeft: 0,
            },
            '& thead': {
              display: 'none',
            },
            '& tr:nth-child(odd),& tr:nth-child(even)': {
              display: 'block',
              marginRight: 5,
              marginBottom: 5,
              backgroundColor: 'transparent',
            },
            '& td': {
              display: 'block',
              backgroundColor: 'transparent',
            },
          },
          paper: {
            boxShadow: 'none',
            backgroundColor: 'transparent',
          },
        },
        MUIDataTableBodyCell: {
          root: {
            backgroundColor: 'transparent',
            width: '100%',
          },
        },
      },
    };

  }
  const dataTableTheme = merge({}, muiTheme, themeAdditions);
  return createMuiTheme(dataTableTheme);
};


function list() {
  const [gridView, setGridView] = useState(true);
  const [cases, setCases] = useState(null);

  const columns = [
    {
      name: "status",
      label: 'Status',
      options: {
        sort: true
      }
    },
    {
      name: "title",
      label: 'Title',
      options: {
        sort: true
      }
    },
    {
      name: "createdTime",
      label: 'Created Time',
      options: {
        sort: true,
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <>{moment(value).fromNow()}</>
          )
        }
      }
    },
    {
      name: "createdTime",
      label: 'Assigned Time',
      options: {
        sort: true,
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <>{moment(value).fromNow()}</>
          )
        }
      }
    },
    {
      name: "createdTime",
      label: 'Closed Time',
      options: {
        sort: true,
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <>{moment(value).format('L')}</>
          )
        }
      }
    },
    {
      name: "sheduledFromTime",
      label: 'Sheduled From Time',
      options: {
        sort: true,
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <>{moment(value).format('L')}</>
          )
        }
      }
    },
    {
      name: "sheduledToTime",
      label: 'Sheduled To Time',
      options: {
        sort: true,
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <>{moment(value).format('L')}</>
          )
        }
      }
    },
    {
      name: "hoursWorked",
      label: 'Hours Worked',
      options: {
        sort: true
      }
    },
    {
      name: "type",
      label: 'Type',
      options: {
        sort: true
      }
    },
    {
      name: "type",
      label: 'Cases in parallel',
      options: {
        sort: false,
        filter: false,
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <>{`NA`}</>
          )
        }
      }
    },
    {
      name: "caseId",
      label: ' ',
      options: {
        sort: false,
        filter: false,
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <>
              <IconButton aria-label="delete" size="small">
                <CallIcon fontSize="inherit" />
              </IconButton>
              <IconButton aria-label="delete" size="small">
                <ChatIcon fontSize="inherit" />
              </IconButton>
            </>
          )
        }
      }
    },
    {
      name: "customerId",
      options: {
        display: false,
      }
    },
  ];
  const options = {
    title: false,
    filter: false,
    print: false,
    download: false,
    viewColumns: false,
    customToolbar: false,
    selectableRows: 'none',
    search: false,
    rowHover: false,
  };

  if (gridView) {
    options.customRowRender = (data, dataIndex, rowIndex, allData = cases) => {
      return (<CaseCard data={allData[dataIndex]} />)
    };
  } else {
    options.customRowRender = null;
  }
  const { path } = useRouteMatch();

  const [search, setSearch] = useState('');
  const classes = useStyles();
  const handleChange = (event) => {
    setSearch(event.target.value);
  };
  useEffect(() => {
    getCases().then(
      (res) => {
        console.info('*****', res);
        setCases(res.data);
      }
    )
  }, []);
  // const classes = useStyles();
  if (!cases) {
    return <PageLoader />;
  }
  const token = localStorage.FBIdToken;
  let decodedToken = null;
  if (token) {
    decodedToken = jwtDecode(token);
  }
  return (
    <>
      <Paper elevation={3}>
        <Box p={2} className='container' display='flex'>
          <Box mr={2}>
            <Paper elevation={2} style={{ padding: 16 }}>
              <BusinessCenterIcon style={{ color: blueGrey[200], fontSize: 40 }} />
            </Paper>
          </Box>
          <Box>
            <Typography variant='h2'>Cases</Typography>
            <Typography variant='caption'>Manage your cases</Typography>
          </Box>
          <Box display='flex' flexDirection='column' pl={4} justifyContent='center'>
            <FormControl className={classes.margin} variant="outlined" margin='dense'>
              <InputLabel htmlFor="outlined-adornment-amount">Find cases</InputLabel>
              <OutlinedInput
                id="outlined-adornment-amount"
                value={search}
                onChange={handleChange}
                startAdornment={<InputAdornment position="start">Case ID:</InputAdornment>}
                labelWidth={80}
              />
            </FormControl>
          </Box>
          <Box flex='1' />
          <Box display='flex' flexDirection='row' alignItems='center'>
            <ButtonGroup color="primary" aria-label="outlined primary button group" style={{ marginRight: 16 }}>
              <Button size="small" className={clsx(gridView && classes.active)}
                onClick={() => setGridView(true)}>
                <AppsIcon />
              </Button>
              <Button size="small" className={clsx(!gridView && classes.active)}
                onClick={() => setGridView(false)}>
                <ListIcon />
              </Button>
            </ButtonGroup>
            {decodedToken.customer && (<Link to='/cases/add'>
              <Button
                variant="contained"
                color="primary"
                size="small"
                className={classes.button}
                startIcon={<AddCircleOutlineIcon />}
              >
                New case
            </Button>
            </Link>)}

          </Box>
        </Box>
      </Paper>
      <div className='container'>
        <Box mt={2}>
          <MuiThemeProvider theme={getMuiTheme(gridView)}>

            {cases && (<MUIDataTable
              data={cases}
              columns={columns}
              options={options}
            />)}
          </MuiThemeProvider>
        </Box>
      </div>
    </>
  );
}

list.propTypes = {
};

export default list;
