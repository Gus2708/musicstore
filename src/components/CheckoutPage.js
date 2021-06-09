import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography'
import CheckoutCard from './CheckoutCard';
import Total from './Total';
import Button from '@material-ui/core/Button';
import {Link} from 'react-router-dom';
import {useStateValue} from "../StateProvider";



const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
}));


export default function Checkoutpage() {
    const classes = useStyles();
    const [{basket}, dispatch] = useStateValue();

    function FormRow(){
        return(
            <React.Fragment>
                {basket?.map( (item) => (
                    <Grid item xs={12} sm={8} md={6} lg={4}>
                        <CheckoutCard key={item.id} product={item} ></CheckoutCard>
                    </Grid>
                ))}
            </React.Fragment>
        )
    };

    return (
        <div className={classes.root}>
        <Grid container spacing={3}>
            <Grid item xs={12}>
                <Typography variant="h4" align="center" gutterBottom>Shopping cart</Typography>
            </Grid>
            <Grid item xs={12} sm={8} md={9} container spacing={2}>
                <FormRow />
            </Grid>
            <Grid item xs={12} sm={4} md={3}>
                <Typography variant="h4" align="center" gutterBottom>
                    <Total></Total>
                </Typography>
            </Grid>
            <Grid item xs={12} alignContent='center'>
                <Link to='/'>
                    <Button variant="outlined" color="default">
                    Homepage
                    </Button>
                </Link>
            </Grid>
        </Grid>
        </div>
    );
}
