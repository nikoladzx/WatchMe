import { Button, Divider, Grid, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { Add, Delete, Remove } from "@mui/icons-material";

import BasketSummary from "./BasketSummary";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { addBasketItemAsync, removeBasketItemAsync } from "./basketSlice";

export default function BasketPage() {
  const {basket} = useAppSelector(state => state.basket);
  const dispatch = useAppDispatch();


    if (!basket) return <Typography variant='h3'>Your basket is empty</Typography>

    return (<>
    {basket.items.length>0 ?
    
        <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell >Your Basket</TableCell>
              <TableCell align="right">Brand</TableCell>
            <TableCell align="right">Model</TableCell>           
              <TableCell align="right">Mehanizam</TableCell>
              <TableCell align="right">Price</TableCell>
              <TableCell align="right">Quantity</TableCell>
              <TableCell align="right">Total</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {basket.items.map((item) => (
              <TableRow
              key={item.pictureUrl}
              //sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                <img src = {item.pictureUrl} alt={item.name} style={{width:'35%'}}/>
                </TableCell>
                <TableCell align="right" style={{width:'20%'
                }}>{item.brand}</TableCell>
                <TableCell align="right">{item.name}</TableCell>
                
                <TableCell align="right">{item.type}</TableCell>
                <TableCell align="right" style ={{width: '10%'}}>{item.price + " RSD"}</TableCell>
                
                <Grid container sx={{}} >

                <TableCell align="right" >
                <IconButton color='error' onClick={()=> dispatch(removeBasketItemAsync({model: item.name, quantity: 1}))}>
                    <Remove />
                  </IconButton>
                  {item.quantity}
                  <IconButton style ={{color: 'green'}} onClick={()=> dispatch(addBasketItemAsync({model: item.name, quantity: 1}))}>
                    <Add />
                  </IconButton>
                  </TableCell>
                </Grid>
                
                <TableCell align="right" >
                  
                  {item.price * item.quantity  + " RSD"}</TableCell>
                <TableCell align = "right" >
                    <IconButton color='error'  onClick={()=> dispatch(removeBasketItemAsync({model: item.name, quantity: 0}))}>
                        <Delete/>
                    </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      : <Grid item xs={6}>
      <Paper style={{ padding: '16px', background: 'primary.secondary' }}>
      <Typography variant="h6" color="primary.secondary">
        Your basket is empty, please add something to cart if you want to continue shopping!
        </Typography>
        <Typography variant="body1">
        Brendovi kao što su Festina, Tissot, Casio, Seiko, Nooz, Bering i Daniel Wellington su samo deo raznovrsne ponude koju možete pronaći kod nas.
        Izuzev satova, brendovi Bering, Guess, Fossil, Lui Jo i Daniel Wellington nude prefinjene komade nakita.
        Ukoliko želite da usrećite vaše najmlađe, nemački brend Cool Time Kids nudi možda i najveći izbor dečijih satova.
        </Typography>
        <Typography variant="body2">
        Posebno mesto u našoj ponudi zauzimaju usluge servisa koji će preuzeti svu potrebnu brigu o održavanju Vašeg sata.
        Zamenu baterija i narukvica vršimo na licu mesta. Uložićemo maksimalan trud da Vaša očekivanja ispunimo i poverenje opravdamo.
        </Typography>
        <Typography variant="caption">
        Watch is watch d.o.o.
        PIB: 107341216
        Matični broj: 20784245
        </Typography>
        </Paper>
                  <Divider sx={{mb:2}}/>
          
                      
      </Grid>
      }
      <Grid container>
        <Grid item xs={6} />
        
        {basket.items.length>0 ? 
        <Grid item xs={6}>
        <BasketSummary/>
        <Button
        component={Link}
        to='/checkout'
        variant="contained"
        size="large"
        fullWidth
        >
          Checkout
        </Button>
        </Grid>
        : 
        <Button
        component={Link}
        to='/catalog'
        variant="contained"
        size="large"
        fullWidth
        >
          Go to catalog!
        </Button>
        
      }
        </Grid>  
      </>
    )
}