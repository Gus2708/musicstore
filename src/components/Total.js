import accounting from 'accounting';
import Button from '@material-ui/core/Button'
import { createMuiTheme, makeStyles } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import { useStateValue } from "../StateProvider"
import {getBasketTotal} from "../Reducer";
import { Link, useHistory } from 'react-router-dom'

const theme = createMuiTheme(
    {
        palette: {
            primary: {
              main: '#383B56',
            },
            secondary: {
              main: '#D90429',
            },
          },
    }
);

const useStyles = makeStyles((theme) => ({
 root: {
     display: 'flex',
     flexDirection: 'column',
     justifyContent: 'center',
     alignItems: 'center',
     height: '20vh'
 },

 button: {
     maxWidth: '200px',
     marginTop: '2rem'
 },
 
 money: {
     marginTop: '2rem'
 }
}))

export default function Total() {
    const classes = useStyles();
    const [{basket}, dispatch] = useStateValue();

    return(
        <div className={classes.root}>
            <h5>Total items: {basket?.length}</h5>
            <h5 className={classes.money}>{accounting.formatMoney(getBasketTotal(basket))}</h5>
            <ThemeProvider theme={theme}>
            <Link to="/checkout" style={{ textDecoration: 'none' }}>
                <Button className={classes.button} variant="contained" color="secondary">
                Check Out
                </Button>
            </Link>
            </ThemeProvider>
        </div>
    )
};

