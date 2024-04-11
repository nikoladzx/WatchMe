import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Switch, List, ListItem, IconButton, Badge } from '@mui/material';
import { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { ShoppingCart } from '@mui/icons-material';
import { useAppDispatch, useAppSelector } from '../store/configureStore';
import SignedInMenu from './SignedInMenu';
import agent from '../API/agent';
import { setBasket } from '../../features/Basket/basketSlice';

const midLinks = [
  {title: 'catalog', path :'/catalog'},
  {title: 'about', path :'/about'},
  {title: 'contact', path :'/contact'},
]

const rightLinks = [
  {title: 'login', path :'/login'},
  {title: 'register', path :'/register'},
]

interface Props {
  handleChange: ()=>void;
  darkMode: boolean;


}

export default function Header({handleChange, darkMode}:Props) {
  const {basket} = useAppSelector(state=>state.basket);
  const {user} = useAppSelector(state=>state.login);
  const dispatch = useAppDispatch();
  const itemCount = basket?.items.reduce((sum, item) => sum + item.quantity, 0);
  const [checked, setChecked] = useState(false);

  function handleTheme(){
    handleChange();
    setChecked(!checked);
  }

  useEffect(()=> {
    //const buyerId = getCookie('buyerId');
      console.log("fdsafgdsagsad");
      if(localStorage.getItem('user') !== null)
      {agent.Basket.get()
      .then((basket)=> dispatch(setBasket(basket)))
      .catch(error => console.log(error))
      }
      if(localStorage.getItem('user') === null)
        
        dispatch(setBasket(null))
        
        
      
      
  },[user, dispatch])


  return (
    <>
      <AppBar position="static" sx={{mb:5}}>
        <Toolbar>
          <Typography variant='h6' component={NavLink}
          to= {'/'} 
          sx={{color:'inherit', textDecoration:"none"}}>
            WatchMe
          </Typography>
          <Switch checked={checked}
          onChange={handleTheme}/>
          <List sx={{display: 'flex'}}>
            {midLinks.map(({title,path})=> (
              <ListItem 
              component = {NavLink}
              to={path}
              key={path}
              sx={{color: 'inherit', typography:'h6', '&:hover': {
                color: 'secondary.main'
              },
              '&.active': {
                color:'text.secondary'
              }}}>
              {title.toUpperCase()}
            </ListItem>
            ))}
          </List>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            
          </Typography>
          <IconButton component={Link} to='basket' size='large' edge='start' color='inherit' sx={{mr:2}}>
              <Badge badgeContent={itemCount} color="secondary">
                <ShoppingCart/>
              </Badge>
          </IconButton>
         
            {user ? <SignedInMenu/> :
          <List sx={{display: 'flex'}}>
            {rightLinks.map(({title,path})=> (
              <ListItem
                component = {NavLink}
                to={path}
                key={path}
                sx={{color: 'inherit', typography:'h6', '&:hover': {
                  color: 'secondary.main'
                },
                '&.active': {
                  color:'text.secondary'
                }}}>
                {title.toUpperCase()}
              </ListItem>
            ))}
          </List>}
        </Toolbar>
      </AppBar>

      </>
  );
}

function dispatch(arg0: any) {
  throw new Error('Function not implemented.');
}
