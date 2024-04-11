import * as React from 'react';

import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useAppSelector } from '../../app/store/configureStore';
import { UserInfo } from '../profile/info';
import { CreditCard } from './creditCard';

interface ReviewProp {
  info: UserInfo | undefined;
  creditCard : CreditCard | null;
}

export default function Review({info, creditCard} :  ReviewProp) {
  const {basket} = useAppSelector(state => state.basket);
    const total = basket?.items.reduce((sum, x) => sum + x.price*x.quantity, 0);
    const count = basket?.items.length + " Selected";
    const shipping = (total!-1500) > 25000 ? 0 : 1500;
  return (
    <Stack spacing={2}>
      <List disablePadding>
        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText primary="Products" secondary = {count} />
          <Typography variant="body2">{total + " RSD" }</Typography>
        </ListItem>
        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText primary="Shipping" secondary="Plus taxes" />
          <Typography variant="body2">{shipping === 0 ? "Free shipping" : shipping + " RSD"} </Typography>
        </ListItem>
        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText primary="Total" />
          <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
            {total! + shipping + " RSD"}
          </Typography>
        </ListItem>
      </List>
      <Divider />
      <Stack
        direction="column"
        divider={<Divider flexItem />}
        spacing={2}
        sx={{ my: 2 }}
      >
        <div>
          <Typography variant="subtitle2" gutterBottom>
            Shipment details
          </Typography>
          <Typography gutterBottom>{info?.name + " " + info?.surname + ", " + info?.phoneNumber}</Typography>
          <Typography color="text.secondary" gutterBottom>
            {info?.city + ", " + info?.street + ", " + info?.number}
          </Typography>
        </div>
        <div>
          <Typography variant="subtitle2" gutterBottom>
            Payment details
          </Typography>
          
          <Typography gutterBottom>{"Owner of credit card : " + creditCard?.name}</Typography>
          <Typography gutterBottom>{"Card number : xxxx-xxxx-xxxx-" + 
          creditCard?.cardNumber[creditCard.cardNumber.length-4] + 
          creditCard?.cardNumber[creditCard.cardNumber.length-3] +
          creditCard?.cardNumber[creditCard.cardNumber.length-2] +
          creditCard?.cardNumber[creditCard.cardNumber.length-1]}</Typography>
          <Typography gutterBottom>{"CVV : XXX"}</Typography>
          <Typography gutterBottom>{"Expiration Date : " + creditCard?.expDate}</Typography>
          <Divider/>
            
          
        </div>
      </Stack>
    </Stack>
  );
}