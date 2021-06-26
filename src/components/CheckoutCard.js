import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Trash from '@material-ui/icons/Delete';
import accounting from 'accounting';
import {useStateValue} from "../StateProvider";
import { actionTypes } from '../Reducer';
import { Star } from '@material-ui/icons';
import { BeakerIcon } from '@heroicons/react/solid'


const useStyles = makeStyles((theme) => ({
  root: { 
    maxWidth: 345,
    
  },
  star: {
    color: '#ffd60a'
  },
  action: {
      marginTop: "1rem",
      paddingTop: '5rem',
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
    verticalAlign: 'middle',

  },

  cardRating: {
      display: 'flex',
      flexWrap: 'nowrap',
      flexDirection: "row",
      flexGrow: 1,
  }
}));

export default function CheckoutCard({product : {id, name, price, rating, image, description, productType}}) {
  const [{basket}, dispatch] = useStateValue();
  const classes = useStyles();

  const removeItem = () => dispatch({
    type: actionTypes.REMOVE_ITEM,
    id,
  });

  return (
    <Card className={classes.root}>
      <CardHeader

        action={
          <Typography
              classname={classes.action}
              variant='h5'
              color='textSecondary'
          >
              {accounting.formatMoney(price)}
          </Typography>
        }
        title={name}
        subheader="In Stock"
      />
      <CardMedia
        className={classes.media}
        image={image}
        title={name}
      />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {description}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <div className={classes.cardRating}>
            {Array(rating) 
            .fill()
            .map((_, i) => (
              <Star className={classes.star}></Star>
            ))}
        </div>
        <IconButton aria-label="Delete" onClick={removeItem}>
            <Trash></Trash>
        </IconButton>
      </CardActions>
    </Card>
  );
}
