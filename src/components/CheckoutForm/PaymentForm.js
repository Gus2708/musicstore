import { Button, Card, Divider, Typography } from "@material-ui/core";
import Review from "./Review";
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import {useStateValue} from "../../StateProvider";
import {getBasketTotal} from "../../Reducer";   
import accounting from 'accounting';
import axios from "axios";


const CheckoutForm = ({backStep, nextStep}) => {
  const [ {basket}, dispatch] = useStateValue();
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async(e) => {
    e.preventDefault();

    const {error, paymentMethod} = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement)
    });

    if(!error){
      const { id } = paymentMethod;
      try {

        const {data} = await axios.post("http://localhost:3001/api/checkout", {
          id,
          amount: getBasketTotal(basket)
        })

        console.log(data);     
      }
      catch (error) {
        console.log(error);
      }
    };
    
  };

  return(
    <form onSubmit={handleSubmit}>
      <CardElement></CardElement>
      <div style={{display: "flex",
                   justifyContent:"space-between",
                   marginTop: "1.5rem"}}>
        <Button onclick={backStep}>Back</Button>
        <Button onclick={nextStep} variant="contained" type="submit" disabled={false} color="primary">Pay {accounting.formatMoney(getBasketTotal(basket))}</Button>
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
