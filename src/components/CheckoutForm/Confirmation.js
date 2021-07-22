import React from 'react'
import Typography from '@material-ui/core/Typography'
import { Button, Divider } from '@material-ui/core'
import { Link } from 'react-router-dom'
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';

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

const Confirmation = ({message}) => {
    console.log(message)
    return (
        <>
        <ThemeProvider theme={theme}>
            <Typography variant="h6" color="initial" style={{ padding: "2rem 0",}}>{message}</Typography>
            <Divider></Divider>
            <Typography variant="subtitle1" style={{ margin: "1rem",
                                                     opacity: "0.8"}}
            color="initial">{message === "Succesfull payment"? "Your booking reference: 8fh29hf48hgj": ""}</Typography>
            <Button style={{ textTransform: "none",
                            margin: "1rem",
                            display: "flex",
                            }} component={Link} to="/" variant="contained" color="primary">
                        Homepage
            </Button>
        </ThemeProvider>
        </>
    )
}

export default Confirmation
