import { Divider, Grid } from "@mui/material";
import { Product } from "../../app/models/product";
import ProductList from "./ProductList";
import { useState, useEffect } from "react";
import agent from "../../app/API/agent";
import LoadingComponent from "../../app/layout/LoadingComponent";
import Search from "./Search";


export default function Catalog(){
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [altproducts, setAltproducts] = useState<Product[]>([]);
    useEffect(() => {
      agent.Catalog.list().then(products=> setAltproducts(products))
      .catch(error => console.log(error))
      .finally(()=> setLoading(false));
    }, [])
    
    if (loading) return <LoadingComponent/>
    
    return (<>  
    <Grid container spacing ={1}>
      <Grid item xs={12}>
      <Search products={products} setProducts={setProducts} altproducts={altproducts}/>
      </Grid>
      <Divider/>
      <Grid item xs={12}>
      <ProductList products={products}/>
      </Grid>
    </Grid>
      </>)
}