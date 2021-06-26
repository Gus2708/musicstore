import Typography from '@material-ui/core/Typography'
import {useForm, FormProvider} from "react-hook-form";
import Grid from '@material-ui/core/Grid';
import AddressInput from './AddressInput';
import Button from '@material-ui/core/Button';
import { Link } from "react-router-dom";
import {useStateValue} from "../../StateProvider";
import { actionTypes } from '../../Reducer';

const AddressForm = ({nextStep}) => {
  const methods = useForm();
  const [{ shippingData}, dispatch] = useStateValue();

  return (
    <>
      <Typography variant="h6" gutterBottom>
        Shipping address
      </Typography>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(data=>{
          dispatch({
            type: actionTypes.SET_SHIPPINGDATA,
            shippingDat: data,
          });
          nextStep();

        })}>
          <Grid container spacing={3}>
            <AddressInput required name="firstName" label="First Name:"/>
            <AddressInput required name="lastName" label="Last Name:"/>
            <AddressInput required name="address1" label="Address:"/>
            <AddressInput required name="email" label="Email:"/>
            <AddressInput required name="city" label="City:"/>
            <AddressInput required name="postcode" label="Post Code:"/>
          </Grid>
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: "1rem"}}>
            <Button component={Link} to="/checkoutPage" variant="text" color="primary" >
              Back to Checkout Page
            </Button>
            <Button type="submit" variant="contained" color="primary">
              Next
            </Button>
          </div>
        </form>
      </FormProvider>
    </>
  )
}

export default AddressForm;
