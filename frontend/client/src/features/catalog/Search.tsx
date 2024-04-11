import {  Grid, TextField, MenuItem, IconButton, List } from "@mui/material";
import { Product } from "../../app/models/product";
import { useState, useEffect } from "react";
import LoadingComponent from "../../app/layout/LoadingComponent";
import { LoadingButton } from "@mui/lab";
import axios from "axios";
import { Delete } from "@mui/icons-material";

interface Props {
    products: Product[];
    setProducts: (newProducts: Product[]) => void;
    altproducts: Product[];
 
}

export default function Search({products, setProducts, altproducts}: Props){

    const [pricemin, setPricemin] = useState<number | undefined>(undefined);
    const [pricemax, setPricemax] = useState<number | undefined>(undefined);
    const [brand, setBrand] = useState<string>("");
    const [type, setType] = useState<string>("");
    const [order, setOrder] = useState<string>("Alphabetical");
    const [name, setName] = useState<string>("");
    const [prevname, setPrevName] = useState<string>(name);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState(true);
 
    useEffect(() => {
        async function handleFilter() {
            try {
                if (prevname === name) setLoading(true); 
                //setLoading(true);
                const response = await axios.get(`http://localhost:7221/Products/Get?${pricemin === undefined ? "" : `pricemin=${pricemin}&`}${pricemax === undefined ? "" : `pricemax=${pricemax}&`}${type === "" ? "" : `type=${type}&`}${brand === "" ? "" : `brand=${brand}&`}${name === "" ? "" : `name=${name}&`}${`orderBy=${order}`}`, {});
                setProducts(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
                setPrevName(name);
            }
        }
    
        handleFilter();
    }, [filter, order, name, brand, type]);
    const tipovi = altproducts.map((product)=> product.type === null ? "" : product.type).filter(x=> x!=="");
    const tipoviSet = new Set(tipovi);
    const brands = altproducts.map((product)=> product.brand === null ? "" : product.brand).filter(x=> x!== "");
    const brandsSet = new Set(brands);
    const orderArray: string[] = ["Alphabetical", "Price Low-To-High", "Price High-To-Low"];

    function handleNameChange(event: any) {
        
        setName(event.target.value);
        
    }
        function handleInputChange(event: any) {
            //setLoading(true);
            setType(event.target.value);
        }
        function handleBrandChange(event: any) {
            //setLoading(true);
            setBrand(event.target.value);
        }
        function handleOrderChange(event: any) {
            //setLoading(true);
            setOrder(event.target.value);
        }
        function handlePriceMaxChange(event: any) {
            if (event.target.value === "") {setPricemax(undefined);}
            
            if (event.target.value !== "") setPricemax(parseInt(event.target.value));
        }
        function handlePriceMinChange(event: any) {
            if (event.target.value === "") {setPricemin(undefined);}
            
            if (event.target.value !== "") setPricemin(parseInt(event.target.value));
        }
        function handleGet() {
            //setLoading(true);
            setFilter(!filter);
        }
        function handleDelete() {
            setPricemax(undefined);
            setPricemin(undefined);
            setBrand("");
            setType("");
            setName("");
            setFilter(!filter);
            setOrder("Alphabetical");
        }

    if (loading) return <LoadingComponent/>
    
    return (<>    
    <Grid container spacing = {3} >
                <Grid item xs={1.5}>
                    <TextField
                    select
                    value={order}
                    label="Order By"
                    fullWidth
                    onChange = {handleOrderChange}
                    >
                    {orderArray.map((option) => (
                <MenuItem value={option} key={option}>
                    {option}
                </MenuItem>
          ))}

                    </TextField>
                    </Grid>
                <Grid item xs={1.5}>
                    <TextField
                        type="text"
                        value={name}
                        label="Search"
                        placeholder="Search"
                        onChange = {handleNameChange}  
                    >
                    </TextField>
                </Grid>
                <Grid item xs={1.5}>
                    <TextField
                    type="number"
                    value={pricemin}
                    label="Minimum Price"
                    placeholder="Min"
                    onChange = {handlePriceMinChange}
                   
                    >
                    </TextField>
                </Grid>
                    <Grid item xs={1.5}>
                        <TextField
                    type="number"
                    label="Maximum Price"
                    placeholder="Max"
                    value={pricemax} 
                    onChange = {handlePriceMaxChange}
                    >
                    </TextField>
                    </Grid>
                    <Grid item xs={1.5}>
                    <TextField
                    select
                    value={brand}
                    label="Brands"
                    fullWidth
                    onChange = {handleBrandChange}
                    >
                        {Array.from(brandsSet).map((option) => (
            <MenuItem value={option} key={option}>
              {option}
            </MenuItem>
          ))}

                    </TextField>
                    </Grid>
                    <Grid item xs={1.5}>
                    <TextField
                    select
                    value={type}
                    fullWidth
                    label="Mechanism"
                    placeholder="Mechanism"
                    onChange = {handleInputChange}
                    >
                        {Array.from(tipoviSet).map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}

                    </TextField>
                    </Grid>
                <Grid item xs={1.5} style={{ padding: "24px 20px" }}>
                    <LoadingButton   style ={{padding : "15px 33px"}}
                    loading={loading}
                    fullWidth
                    onClick ={()=> handleGet()}
                    variant="outlined"
                    >Search</LoadingButton>
                    </Grid>
                    <IconButton  onClick={()=> handleDelete()} color='error' style ={{padding : "15px 13px"}} >
                        <Delete/>
                    </IconButton>
                    </Grid>
                    

      </>)
}