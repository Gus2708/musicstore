import { Paper, Typography, Stepper, Step, StepLabel } from "@material-ui/core";
import { useState } from "react";
import useStyles from "./styles";
import AddressForm from "./AddressForm";
import PaymentForm from "./PaymentForm";
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import Confirmation from "./Confirmation";
import { useStateValue } from "../../StateProvider";

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

const Checkout = () => {
  const classes = useStyles();
  const [activeStep, setActiveStep] = useState(0);
  const [{paymentMessage}, dispatch] = useStateValue();
  const steps = ["Shipping adress", "Payment details"];

  const Form = () => activeStep === 0 ? <AddressForm nextStep={nextStep} />: <PaymentForm nextStep={nextStep} backStep={backStep}/>

  const nextStep = () => setActiveStep((prevActiveStep) => prevActiveStep + 1);
  const backStep = () => setActiveStep((prevActiveStep) => prevActiveStep - 1);

  return (
    <>
    <ThemeProvider theme={theme}>
      <main className={classes.layout}>
        <Paper className={classes.paper} style={{ padding: '1rem' }}>
          <Typography component="h1" variant="h4" align="center">Checkout</Typography>
          <Stepper activeStep={activeStep} className={classes.stepper}>
            {steps.map(step => (
              <Step key={step}>
                <StepLabel>
                  {step}
                </StepLabel>
              </Step>
            ))}
          </Stepper>
              {
                activeStep === steps.length ? (<Confirmation message={paymentMessage} />): (<Form/>)
              }
        </Paper>
      </main>
    </ThemeProvider>
    </>
  )
}

export default Checkout
