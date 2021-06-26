import { List, ListItem, ListItemText } from '@material-ui/core'
import {useStateValue} from "../../StateProvider";
import {getBasketTotal} from "../../Reducer";
import Typography from '@material-ui/core/Typography'
import accounting from 'accounting';

const Review = () => {
  const [ {basket}, dispatch] = useStateValue();
  return (
    <>
    <Typography variant="h6" gutterBottom color="initial">
      Order summary
    </Typography>

    <List disablePadding>
      {basket?.map(product=>(
        <ListItem key={product.name}>
          <ListItemText primary={product.name} secondary={`Qty: ${1}`}></ListItemText>
          <Typography variant="body2" color="initial">{accounting.formatMoney(product.price) }</Typography>
        </ListItem>
      ))}

      <ListItem> 
        <ListItemText primary="Total">
        </ListItemText>
          <Typography variant="subtitle1" color="initial">{accounting.formatMoney(getBasketTotal(basket)) }</Typography>

      </ListItem>
      
      
    </List>

    </>
  )
}

export default Review
