import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import ShoppingCart from '@material-ui/icons/ShoppingCart';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge'
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import { Link, useHistory } from 'react-router-dom'
import {useStateValue} from "../StateProvider";
import {auth} from '../firebase'
import { actionTypes } from '../Reducer';

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
)

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        marginBottom: '7rem',
    },

    appBar: {
        display: "flex",
        background: "white",
        boxShadow: 'none',
        borderBottom: 'solid 3px #383B56',
    },

    grow: {
        width: "max-content",
        flexGrow: 1,
    },

    logo: {
        flexGrow: 1,
        color: '#383B56',
        fontSize: "2rem",
        fontFamily: [
            'Noto Sans JP',
            'serif'],
        fontWeight: '500',
        whiteSpace: 'nowrap'

    },

  store: {
    marginLeft: '-4px',
    color: '#51557B',
    fontStyle: "normal",
  },

  point: {
    color: '#D90429',
    fontStyle: "normal",
    fontSize: '3rem',
    height: '3rem',
  },


  login: {
    color: '#383B56',
    border: 'solid 2px #383B56',
    marginLeft: theme.spacing(2),
    borderRadius: '.4rem',
    padding: '4px 14px',
    textTransform: 'none',
    fontSize: '1rem',
    margin: '0 12px'
  },

  shoppingcart: {
    color: '#51557B',
    fontSize: '2rem'
  },


}));

export default function Navbar() {
  const [{basket, user}, dispatch] = useStateValue();
  const classes = useStyles();
  const history = useHistory();

  const handleauth = () => {
    if(user) {
      auth.signOut();
      dispatch(
        {
          type: actionTypes.EMPTY_BASKET,
          basket: []
        });

      dispatch(
        {
          type: actionTypes.SET_USER,
          user: null
        });
        history.push("/")
    }
  }

  return (
    <div className={classes.root}>
      <AppBar className={classes.appBar} position="fixed">
        <Toolbar>
          <Link to="/" 
          style={{  textDecoration: 'none',
                    flexGrow: 1,
                    color: '#383B56',
                    fontSize: "2rem",
                    fontFamily: [
                      'Noto Sans JP',
                      'serif'],
                    fontWeight: '500',
                    marginBottom: '.7rem',
                    whiteSpace: 'nowrap'}}>
            <Typography className={classes.logo} variant="h1" color="initial">
                Music <i className={classes.store}>Store</i><i className={classes.point}>.</i>
            </Typography>         
          </Link>
            <Typography variant="h6" commponent="p" color='textPrimary'>
                Hello {user ? user.email : 'Guest'}
            </Typography>
            <Link to='/signin' style={{ textDecoration: 'none' }}>
              <Button onClick={handleauth} className={classes.login} color="inherit">{user ? "Sign out": "Sign In"}</Button>
            </Link>
            <Link to="/checkoutPage" >
              <IconButton aria-label="Show items in cart" color='inherit'>
                  <ThemeProvider theme={theme}> 
                  <Badge badgeContent={basket?.length} color='secondary'>
                          <ShoppingCart className={classes.shoppingcart}/>
                  </Badge>
                  </ThemeProvider>
              </IconButton>
            </Link>
        </Toolbar>
      </AppBar>
    </div>
  );
}
