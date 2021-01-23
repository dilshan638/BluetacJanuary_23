import React from 'react';
import moment from "moment";
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import { deepOrange, green } from '@material-ui/core/colors';
import Badge from '@material-ui/core/Badge';
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';

const useStyles = makeStyles({
  root: {
    minWidth: 350,
    margin: 8,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 12,
  },
  pos: {
    marginBottom: 12,
  },
  rounded: {
    color: '#fff',
    backgroundColor: green[500],
    width: 56,
    height: 56,
  },
  timeContainer: {
    backgroundColor: '#f8f9ff',
  },
  timeValue: {
    color: 'rgba(7,9,25,.5)',
  }
});

export default function CaseCard(props) {
  const { data } = props;
  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;
  console.info(data);
  return (
    <Card className={classes.root}>
      <CardActions>
        <Badge badgeContent={data.status} color="primary">
          <Avatar variant="rounded" className={classes.rounded}>
            {(data.title && data.title.length > 4) && (<span>{data.title.substring(0, 3)}</span>)}
          </Avatar>
        </Badge>
        <Box ml={6} pt={2}>
          <Typography variant="h5" component="h2">
            {data.title}
          </Typography>
          <Typography variant="caption" className={classes.title} color="textSecondary">
            Title
        </Typography>
        </Box>
      </CardActions>
      <CardContent>
        <Divider />
        <Box pt={1} pb={1}>
          <Typography variant="body2" component="p">
            {data.description}
          </Typography>
        </Box>
        <Divider />
        {/* Created time */}
        <Box className={classes.timeContainer} display='flex' pl={1} pr={1}>
          <Box flex={1}>
            <Typography variant='caption'><strong>Created Time</strong></Typography>
          </Box>
          <Box>
            <Typography className={classes.timeValue} variant='caption'>{moment(data.createdTime).format('L')}</Typography>
          </Box>
        </Box>

        {/* Assigned time */}
        <Box className={classes.timeContainer} display='flex' pl={1} pr={1}>
          <Box flex={1}>
            <Typography variant='caption'><strong>Assigned Time</strong></Typography>
          </Box>
          <Box>
            <Typography className={classes.timeValue} variant='caption'>{moment(data.createdTime).format('L')}</Typography>
          </Box>
        </Box>

        {/* Closed time */}
        <Box className={classes.timeContainer} display='flex' pl={1} pr={1}>
          <Box flex={1}>
            <Typography variant='caption'><strong>Closed Time</strong></Typography>
          </Box>
          <Box>
            <Typography className={classes.timeValue} variant='caption'>{moment(data.createdTime).format('L')}</Typography>
          </Box>
        </Box>

        {/* sheduledFromTime time */}
        <Box className={classes.timeContainer} display='flex' pl={1} pr={1}>
          <Box flex={1}>
            <Typography variant='caption'><strong>Sheduled From</strong></Typography>
          </Box>
          <Box>
            <Typography className={classes.timeValue} variant='caption'>{moment(data.sheduledFromTime).format('L')}</Typography>
          </Box>
        </Box>
        
        
        {/* sheduledToTime time */}
        <Box className={classes.timeContainer} display='flex' pl={1} pr={1}>
          <Box flex={1}>
            <Typography variant='caption'><strong>Sheduled To</strong></Typography>
          </Box>
          <Box>
            <Typography className={classes.timeValue} variant='caption'>{moment(data.sheduledToTime).format('L')}</Typography>
          </Box>
        </Box>


        <Typography className={classes.pos} color="textSecondary">
          Specifications
        </Typography>

      </CardContent>
      <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  );
}
