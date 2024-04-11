import { Divider, Grid, Table, TableBody, TableCell, TableContainer, TableRow, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Product } from "../../app/models/product";
import agent from "../../app/API/agent";
import NotFound from "../../app/errors/NotFound";
import LoadingComponent from "../../app/layout/LoadingComponent";
import { LoadingButton } from "@mui/lab";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { addBasketItemAsync, removeBasketItemAsync, setBasket } from "../Basket/basketSlice";

export default function ProductDetails(){
    const {id} = useParams();
    console.log(id);
    const [product, setProduct]= useState<Product | null>(null);
    const [loading, setLoading]= useState(true);
    const [quantity, setQuantity] = useState(1);
    const {basket, status} = useAppSelector(state=>state.basket);
    const dispatch = useAppDispatch();
    const item = basket?.items.find(p => p.name === product?.name);


    function handleAddItem(model: string, quantity : number) {
        setLoading(true);
        agent.Basket.addItem(model, quantity)
        .then(basket=>dispatch(setBasket(basket)))
        .catch(error => console.log(error))
        .finally(()=>setLoading(false));
      }
      function handleUpdateItem(model: string, quantity : number) {
        setLoading(true);
        if (item?.quantity === quantity) {
            setLoading(false);
            return;
        }
        item?.quantity! > quantity ? 
        dispatch((removeBasketItemAsync({model, quantity: (item!.quantity-quantity)})))
    //     agent.Basket.removeItem(productId, item?.quantity!-quantity)
    //   .then(()=> dispatch(removeItem({productId,quantity: item?.quantity!-quantity})))
    //   .catch(error => console.log(error))
    //   .finally(()=>setLoading(false))
        :
        dispatch(addBasketItemAsync({model, quantity: (quantity-item!.quantity)}));
        // agent.Basket.addItem(productId, (quantity- item?.quantity!))
        // .then(basket=>dispatch(setBasket(basket)))
        // .catch(error => console.log(error))
        // .finally(()=>setLoading(false));
      }

    function handleInputChange(event: any) {
        if (event.target.value>0)
        setQuantity(parseInt(event.target.value));
    }

    useEffect(()=> {
        if (item) setQuantity(item.quantity);
        id && agent.Catalog.details(id)
        .then(response =>setProduct(response))
        .catch(error => console.log(error))
        .finally(()=>setLoading(false));
    }, [id, item])

    if (loading) return <LoadingComponent/>

    if (!product) return <NotFound/>
    return (
        <Grid container spacing ={4}>
            <Grid item xs={6}>
                <img src = {product.pictureUrl} alt={product.name} style={{width:'100%'}}/>
            </Grid>
            <Grid item xs={6}>
                <Typography variant='h3' color='primary.main'>{product.brand + " " + product.name}</Typography>
                <Divider sx={{mb:2}}/>
                <Typography variant='h4' color='primary.secondary'>{product.price} rsd</Typography>
                <TableContainer>
                    <Table>
                        <TableBody>
                            <TableRow>
                                <TableCell>Model</TableCell>
                                <TableCell>{product.name}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Functions</TableCell>
                                <TableCell>{product.description}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Mechanism</TableCell>
                                <TableCell>{product.type}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Brand</TableCell>
                                <TableCell>{product.brand}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Quantity</TableCell>
                                <TableCell>{product.quantityInStock}</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
                <Grid container spacing = {0} >
                <Grid item xs={6}>
                    <TextField
                    type="number"
                    value = {quantity}
                    onChange={handleInputChange}
                    >
                    </TextField>
                    </Grid>
                <Grid item xs={6}>
                    <LoadingButton 
                    loading={status.includes('pending')}
                    fullWidth
                    disabled= {quantity!==item?.quantity ? false : true}
                    style={{ padding: "14px 10px" }}
                    onClick ={item ? ()=> handleUpdateItem(product.name, quantity) : ()=> handleAddItem(product.name, quantity)}
                    variant="outlined"
                    >{item ? "Update quantity" : "Add item"}</LoadingButton>
                    </Grid>
                    </Grid>
                    
            </Grid>
        </Grid>
    )
}