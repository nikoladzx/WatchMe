import { useEffect, useState } from 'react';
import './styles.css';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import Header from './Header';
import Container from '@mui/material/Container';
import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import agent from '../API/agent';
import LoadingComponent from './LoadingComponent';
import { useAppDispatch } from '../store/configureStore';
import { setBasket } from '../../features/Basket/basketSlice';
import { fetchCurrentUser } from '../../features/login/loginSlice';


function App() {
  //const { setBasket} = useStoreContext();
  const dispatch = useAppDispatch();
  //const {basket} = useAppSelector(state => state.basket);

  const [loading, setLoading] = useState(false);
  
  useEffect(()=> {
    console.log("user je oov" + localStorage.getItem('user'));
    dispatch(fetchCurrentUser());
    
      console.log("fdsafgdsagsad");
      setLoading(true);
      agent.Basket.get()
      .then((basket)=> dispatch(setBasket(basket)))
      .catch(error => console.log(error))
      .finally(()=>setLoading(false));
    
  },[dispatch])
  const [darkMode, setDarkMode] = useState(false);
  const paletteType = darkMode ? 'dark' : 'light';
 

  function handleChange() {
    //setChecked(event.target.checked);
    setDarkMode(!darkMode);
  };
  const theme = createTheme({
    palette: {
      mode: paletteType,
      background: {
        default: paletteType ==='light' ? '#eeeeee' : '#121212'
      }
    }
  })

 if (loading) return <LoadingComponent message={'dsfds'}></LoadingComponent>
  return (
    <>
      <ThemeProvider theme={theme}>
      <ToastContainer position = "bottom-right" hideProgressBar theme="colored"/>
      <CssBaseline/>
      
      <Header darkMode={darkMode} handleChange={handleChange}/>

      <Container>
      <Outlet />
      </Container>

      </ThemeProvider>
    </>
  );
}

export default App;
