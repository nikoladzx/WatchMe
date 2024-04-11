import * as React from 'react';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import { useAppSelector } from '../../app/store/configureStore';



export default function Info() {
    const {basket} = useAppSelector(state => state.basket);
    const items = basket?.items;
    const itemsPrice = items?.reduce((sum, x) => sum + x.price*x.quantity, 0);
    const shipping = itemsPrice!>25000 ? 0 : 1500;
    
  return (
    <React.Fragment>
      <Typography variant="subtitle2" color="text.secondary">
        Total
      </Typography>
      <Typography variant="h4" gutterBottom>
        {itemsPrice! + shipping + " RSD"}
      </Typography>
      <List disablePadding>
        {items?.map((product) => (
          <ListItem key={product.name} sx={{ py: 1, px: 0 }}>
            <ListItemText
              sx={{ mr: 2 }}
              primary={product.brand + " "}
              secondary={product.name}
            />
            <Typography variant="body1" fontWeight="medium">
              {"RSD " + product.price + " "}
            </Typography>
            <Typography variant="body1" fontWeight="medium">
              {"x" + product.quantity}
            </Typography>
          </ListItem>

        ))}
        <ListItem  sx={{ py: 1, px: 0 }}>
        <ListItemText
              sx={{ mr: 2 }}
              primary={shipping===0 ? "Free Shipping" : "Shipping "}
            />
            <Typography variant="body1" fontWeight="medium">
              {shipping===1500  && "1500 RSD"}
            </Typography>

        </ListItem>
      </List>

    </React.Fragment>
  );
}