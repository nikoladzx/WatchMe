import { ChangeEvent, useEffect, useState } from "react";
import agent from "../API/agent";
import { Grid, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from "@mui/material";
import { Add, Delete, Update } from "@mui/icons-material";

import { Product } from "../models/product";


export default function InventoryPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [altproduct, setAltProduct] = useState<Product | null>(null);
  const [quantities, setQuantities] = useState<number [] | null>(null);
  const [prices, setPrices] = useState<number [] | null>(products.map(q => q.price));
  const [image, setImage] = useState("");
  //const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
      agent.Catalog.list().then(products=> setProducts(products))
      .catch(error => console.log(error))
      .finally(()=> {
        setLoading(false);
        setQuantities(products.map(q => q.quantityInStock!));
        setPrices(products.map(q => q.price!));
    });
    }, [loading])
    console.log(quantities);

    if (!products) return <Typography variant='h3'>You don't have any products</Typography>
    
    function handleAddQuantity(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void {
      const updatedProduct = {...altproduct!, quantityInStock : parseInt(event.target.value)};
          
      setAltProduct(updatedProduct);
    }

    function handleAddBrand(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void {
      const updatedProduct = {...altproduct!, brand : event.target.value};
          
      setAltProduct(updatedProduct);
    }

    function handleAddModel(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void {
      const updatedProduct = {...altproduct!, name : event.target.value};
          
      setAltProduct(updatedProduct);
    }

    function handleAddType(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void {
      const updatedProduct = {...altproduct!, type : event.target.value};
          
      setAltProduct(updatedProduct);
    }

    function handleAddPrice(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void {
      const updatedProduct = {...altproduct!, price : parseInt(event.target.value)};
          
      setAltProduct(updatedProduct);
    }
  function handleAdd(): void {
    const existingproduct=[...products];
    //existingproduct.push(altproduct!);
    console.log(altproduct);
    console.log(existingproduct);
    agent.Catalog.add(altproduct).then(() => {
      existingproduct.push(altproduct!);
      setProducts(existingproduct)})
    
    .catch(error => console.log(error))

    console.log(altproduct);
    console.log(products);
  }

  function handleAddDescription(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void {
    const updatedProduct = {...altproduct!, description : event.target.value};
          
      setAltProduct(updatedProduct);
  }

  function handleDelete(name: string): void {
    agent.Catalog.delete(name).then()
    .catch(error => console.log(error))
    .finally(()=> setLoading(true));
  }

  function handleUpdate(name: string, quantityInStock: number | undefined, price: number): void {
  
    agent.Catalog.edit(name, quantityInStock!, price).then()
    .catch(error => console.log(error))
    .finally(()=> setLoading(true));
    console.log(quantityInStock);
  }

  function handleQuantityChange(event: any, index : number) {

   const quants = {...quantities!};
   quants[index] = event.target.value;
   setQuantities(quants);
  }

  function handlePriceChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, index: number): void {
    console.log(event);
    console.log(event.target)
    const money = {...prices!};
    money[index] = parseInt(event.target.value);
    setPrices(money);
  }

  function changeImage(event: any): void {

    setImage(event.target.value);
    const cleanedString = event.target.value.replace(/^C:\\fakepath\\/i, "/Images/");
    const updatedProduct = {...altproduct!, pictureUrl : cleanedString};
          
      setAltProduct(updatedProduct);
  }

    return (<>
        <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="left">INVENTORY</TableCell>
              <TableCell align="right">Brand</TableCell>
            <TableCell align="right">Model</TableCell>           
              <TableCell align="right">Mehanizam</TableCell>
              <TableCell align="right">Description</TableCell>
              <TableCell align="right">Price</TableCell>
              <TableCell align="right">Quantity</TableCell>

            </TableRow>
            <TableRow>
            <TableCell component="th" scope="row">
            <Grid>

        <TableCell align = "left" style={{width:'20%'
                }}>
  
      <TextField type="file" 
      style={{width:'100%'
    }}
    value={image}
    onChange={changeImage}/>

        </TableCell>
    </Grid>
                </TableCell>
                <TableCell align="right" ><TextField
                
                id="outlined-error"
                label="Brand"
                value = {altproduct?.brand}
                onChange={handleAddBrand}
              /></TableCell>
                <TableCell align="left"><TextField
          
          id="outlined-error"
          label="Model"
          value = {altproduct?.name}
          onChange={handleAddModel}
        /></TableCell>
                
                <TableCell align="left"><TextField
          
          id="outlined-error"
          label="Type"
          value = {altproduct?.type}
          onChange={handleAddType}
        /></TableCell>
        <TableCell align="left"><TextField
          
          id="outlined-error"
          label="description"
          value = {altproduct?.description}
          onChange={handleAddDescription}
        /></TableCell>
                <TableCell align="right" ><TextField
          
          id="outlined-error"
          label="Price"
          type="number"
          value = {altproduct?.price}
          onChange={handleAddPrice}
        /> </TableCell>
                
                

                <TableCell align="right" >
                  <TextField
                    id="outlined-error"
                    label="Quantity in stock"
                    value = {altproduct?.quantityInStock}
                    onChange={handleAddQuantity}
        />
                  {/* <IconButton style ={{color: 'green'}} >
                    <Add />
                  </IconButton> */}
                  </TableCell>
                
                <TableCell align = "right" >
                    <IconButton style ={{color: 'green'}} onClick={()=> handleAdd()}>
                        <Add/>
                    </IconButton>
                </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((item, index) => (
              <TableRow
              key={item.pictureUrl}
              //sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                <img src = {item.pictureUrl === null ? "nista" : item.pictureUrl} alt={item.name} style={{width:'55%'}}/>
                </TableCell>
                <TableCell align="right">{item.brand}</TableCell>
                <TableCell align="left">{item.name}</TableCell>
                
                <TableCell align="left">{item.type}</TableCell>
                <TableCell align="left">{item.description}</TableCell>
                <TableCell align="right" >
                <TextField
                id={`price-${item.name}`}
                
                label="Price"
                defaultValue={item.price}
                onChange={(event) => handlePriceChange(event, index)}
              />
                </TableCell>
                
                

                <TableCell align="right" >
                  <TextField
                id={`quantityInStock-${item.name}`}
                
                label="Quantity in stock"
                defaultValue={item.quantityInStock}
                onChange={(event) => handleQuantityChange(event, index)}
              />
                  </TableCell>
               
                <TableCell align = "right" >
                  <IconButton style ={{color: 'blue'}} onClick={() => handleUpdate(item.name, quantities![index], prices![index])}>
                    <Update />
                  </IconButton>
                    <IconButton color='error' onClick={()=>handleDelete(item.name)}>
                        <Delete/>
                    </IconButton>
                </TableCell>
              </TableRow>
            
            ))}
            
          </TableBody>
        </Table>
      </TableContainer>
      <Grid container>
        <Grid item xs={6} />
        
        
        </Grid>  
      </>
    )
}