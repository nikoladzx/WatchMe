import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Fade from '@mui/material/Fade';
import { useAppDispatch, useAppSelector } from '../store/configureStore';
import { loggedOut } from '../../features/login/loginSlice';
import { Link } from 'react-router-dom';

export default function LoggedInMenu() {
    const dispatch= useAppDispatch()
    const {user} = useAppSelector(state => state.login);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    console.log(user?.email);
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  

  return (
    <div>
      <Button
        sx={{color: 'inherit', typography:'h6', '&:hover': {
            color: 'secondary.main'
          }}}
        id="fade-button"
        aria-controls={open ? 'fade-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        {user?.email}
      </Button>
      <Menu
        id="fade-menu"
        MenuListProps={{
          'aria-labelledby': 'fade-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        TransitionComponent={Fade}
      >
        <MenuItem component={Link} to='profile' onClick={handleClose}>Profile</MenuItem>
        {user?.role=="Admin" ? <MenuItem component={Link} to='inventory' onClick={handleClose}>Inventory</MenuItem> : <MenuItem component={Link} to='order' onClick={handleClose}>My orders</MenuItem>}
        <MenuItem onClick={()=>dispatch(loggedOut())}>Logout</MenuItem>
      </Menu>
    </div>
  );
}