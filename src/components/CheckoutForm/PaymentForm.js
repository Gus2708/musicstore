import { Button, Card, CircularProgress, Divider, Typography } from "@material-ui/core";
import Review from "./Review";
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import {useStateValue} from "../../StateProvider";
import {actionTypes, getBasketTotal} from "../../Reducer";   
import accounting from 'accounting';
import axios from "axios";
import {useState} from "react"


const CheckoutForm = ({backStep, nextStep}) => {
  const [ {basket, paymentMessage}, dispatch] = useStateValue();
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async(e) => {
    e.preventDefault();

    const {error, paymentMethod} = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement)
    });
    setLoading(true);
    if(!error){
      const { id } = paymentMethod;
      try {

        const {data} = await axios.post("http://localhost:3001/api/checkout", {
          id,
          amount: getBasketTotal(basket)
        })

        dispatch({
          type: actionTypes.SET_PAYMENTMESSAGE,
          paymentMessage: data.message
        });

        if(data.message === "Succesfull payment"){
          dispatch({
            type: actionTypes.EMPTY_BASKET,
            basket: [],
          })
        };

        elements.getElement(CardElement).clear();
        nextStep();
      }

      catch (error) {
        console.log(error);
        nextStep();
      };
      
    };
    setLoading(false);
    
  };

  return(
    <form onSubmit={handleSubmit}>
      <CardElement></CardElement>
      <div style={{display: "flex",
                   justifyContent:"space-between",
                   marginTop: "1.5rem"}}>
        <Button onclick={backStep}>Back</Button>
        <Button onclick={nextStep} variant="contained" type="submit" disabled={false} color="primary">{loading ? (<CircularProgress color="#fff" style={{fontSize: "1rem"}}/>): `Pay ${accounting.formatMoney(getBasketTotal(basket))}`}</Button>
      </div>

    </form>
  )
};

const stripePromise = loadStripe("pk_test_51J5Qv2IXbsEAIaUdbZaUA3FqKjAPv8BqWwoTDRPG9a0fiDXJoSpCwTsGC2PNcgwM9ORqc2r0DSOdL0znOvCLxPNN00MZMWWPoO");

const PaymentForm = ({backStep, nextStep}) => {
  return (
    <>
      <Review></Review>
      <Divider></Divider>
      <Typography variant="h6" gutterBottom style={{margin: "20px 0"}}>Payment Method</Typography>
      <Elements stripe={stripePromise}>
        <CheckoutForm backStep={backStep} nextStep={nextStep}>

        </CheckoutForm>
      </Elements>
    </>
  )
}

export default PaymentForm
