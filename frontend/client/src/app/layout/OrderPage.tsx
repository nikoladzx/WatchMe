import { useEffect, useState } from "react";
import agent from "../../app/API/agent";
import { Button, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { Order } from "./orders";


export default function OrderPage() {
  //const {basket, status} = useAppSelector(state => state.basket);
  const [order, setOrder] = useState<Order[]>([]);


    useEffect(()=> {
        agent.Order.get().then(ord => setOrder(ord))
        .catch(error => console.log(error));
    },[])
    if (!order) return <Typography variant='h3'>You never ordered anything from our site</Typography>

    return (<>
        <TableContainer component={Paper}>
        <Table sx={{ minWidth: 1000 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell >Your Orders</TableCell>
              <TableCell align="center">Products</TableCell>
            <TableCell align="right">Total Price</TableCell>           
              <TableCell align="right">Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {order.map((item) => (
              <TableRow
              key={item.id}
              >
                <TableCell align="left">{"Order # " + item.id}</TableCell>
                {item.basketItems.length === 0 ? <TableCell align="center">You haven't bought anything</TableCell> :
                <TableCell align="center">
                {item.basketItems.map((pr) => {
                  const imageArray = Array.from({ length: pr.quantity }, (_, index) => (
                    <img key={index} src={pr.product.pictureUrl} alt={pr.product.brand} style={{ width: '15%' }} />
                  ));
              
                  return pr.quantity > 0 ? imageArray : "Niste kupili nijedan proizvod :/";
                })}
              </TableCell>
              }
                
                <TableCell align="right">
                  {item.totalPrice + " RSD"}
                  </TableCell>
                  
               
                <TableCell align="right" >
                  {item.status=== 0 ? "Pending" : "Delivered"}
                  </TableCell>
                
                
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Grid container>
        <Grid item xs={6} />
        
        <Grid item xs={6}>
        <Button
        component={Link}
        to='/Catalog'
        variant="contained"
        size="large"
        fullWidth
        >
          Order Again!
        </Button>
        </Grid>
        </Grid>  
      </>
    )
}