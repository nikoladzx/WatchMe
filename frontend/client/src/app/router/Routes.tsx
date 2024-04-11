import { Navigate, createBrowserRouter } from "react-router-dom";
import App from "../layout/App";
import Catalog from "../../features/catalog/Catalog";
import ProductDetails from "../../features/catalog/ProductDetails";
import AboutPage from "../../features/about/AboutPage";
import ContactPage from "../../features/contact/ContactPage";
import ServerError from "../errors/ServerError";
import NotFound from "../errors/NotFound";
import BasketPage from "../../features/Basket/BasketPage";
import CheckoutPage from "../../features/checkout/CheckoutPage";
import LoginPage from "../../features/login/LoginPage";
import RegisterPage from "../../features/register/RegisterPage";
import ProfilePage from "../../features/profile/ProfilePage";
import OrderPage from "../layout/OrderPage";
import InventoryPage from "../layout/InventoryPage";

export const router=createBrowserRouter([
    {
        path: '/',
        element: <App/>,
        children: [
            {path:'', element: <Catalog/>},
            {path:'catalog', element: <Catalog/>},
            {path:'catalog/:id', element: <ProductDetails/>},
            {path:'about', element: <AboutPage/>},
            {path:'contact', element: <ContactPage/>},
            {path:'inventory', element: <InventoryPage/>},
            {path:'server-error', element: <ServerError/>},
            {path:'not-found', element: <NotFound/>},
            {path:'basket', element: <BasketPage/>},
            {path:'checkout', element: <CheckoutPage/>},
            {path:'login', element: <LoginPage/>},
            {path:'register', element: <RegisterPage/>},
            {path:'profile', element: <ProfilePage/>},
            {path:'order', element: <OrderPage/>},
            {path: '*', element: <Navigate replace to = '/not-found'/>}
           //{path: '*', element: <NotFound/>}
        ]
    }
])