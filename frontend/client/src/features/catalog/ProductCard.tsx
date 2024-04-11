import {Avatar, CardMedia, Button, Card, CardActions, CardContent, Typography, CardHeader } from "@mui/material"
import { Product } from "../../app/models/product";
import { Link } from "react-router-dom";
import { LoadingButton } from "@mui/lab";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { addBasketItemAsync } from "../Basket/basketSlice";
interface Props {
    product: Product;
 
}
export default function ProductCard({product} : Props){
  const {status} = useAppSelector(state=>state.basket);  
  //const [loading, setLoading] = useState(false);
    const dispatch = useAppDispatch();

    // async function handleAddItem(productId: number, quantity=1) {
    //   try {
    //     setLoading(true);
    //     const response = await axios.post(`basket?productId=${productId}&quantity=${quantity}`, {});
    //     dispatch(setBasket(response.data));
    // } catch (error) {
    //     console.error('Error adding item:', error);
    // } finally {
    //     setLoading(false);
    // }
    // }
    return (<>
            <Card >
        <CardHeader
        avatar={
            <Avatar >
              <img src = {product.pictureUrl} alt={product.name} style={{width:'100%', height:'100%'}}/>
                
            </Avatar>}
            title={product.brand + " " + product.name}
            titleTypographyProps={{
                sx: {fontWeight:'bold', color:'primary.main'}
            }}
            />
      <CardMedia
        component="img"
       
        image={product.pictureUrl}
        title={product.name}
      />
      <CardContent>
        <Typography gutterBottom color='primary.secondary' variant="h4" component="div">
          {product.price + " RSD" }
        </Typography>
        <Typography variant="body1" color="primary.secondary">
          {"Brand : " + product.brand}
        </Typography>
        <Typography variant="body1" color="primary.secondary">
          {"Mechanism : " + product.type}
        </Typography>
      </CardContent>
      <CardActions>
        <LoadingButton 
        loading={status.includes('pendingAddItem' + product.name)}
        onClick={() => dispatch(addBasketItemAsync({model: product.name}))} 
        variant = "outlined">Add to cart</LoadingButton>
        <Button variant = "outlined" component={Link} to={`/catalog/${product.name}`}>View</Button>
      </CardActions>
    </Card>
          </>)
}