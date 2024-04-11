import axios, { AxiosError, AxiosResponse } from "axios";
import { toast } from "react-toastify";
import { router } from "../router/Routes";
import { store } from "../store/configureStore";

const sleep = () => new Promise(resolve => setTimeout(resolve, 350));
axios.defaults.baseURL='http://localhost:7221/';
axios.defaults.withCredentials=true;

const responseBody = (response: AxiosResponse)=> response.data;

axios.interceptors.request.use(config => {
    const token = store.getState().login.user?.token;
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config
})

axios.interceptors.response.use(async response => {
    await sleep();
    return response
}, (error: AxiosError) => {
    const {data, status} = error.response as AxiosResponse;
    switch (status) {
        case 400:
            toast.error(data.title); break;
        case 401:
            toast.error(data.title); break;
        case 404:
            router.navigate('/not-found', {state: {error: data}});  
            //toast.error(data.title); 
            break;
        case 500:
            router.navigate('/server-error', {state: {error: data}});    
        //toast.error(data.title); 
            break;
        default: break;
    }
    return Promise.reject(error.response);
})

const requests = {
    get: (url: string) => axios.get(url).then(responseBody),
    post: (url: string, body : {}) => axios.post(url, body).then(responseBody),
    put: (url: string, body : {}) => axios.put(url, body).then(responseBody),
    delete: (url: string) => axios.delete(url).then(responseBody)
}

const Catalog = {
    list: () => requests.get('Products/Get'),
    add: (values : any) => requests.post('Products', values),
    edit: (name : string, quantityInStock : number, price : number) => requests.put(`Products/edit?name=${name}&quantity=${quantityInStock}&price=${price}`, {}),
    delete: (name : string) => requests.delete(`Products/delete?name=${name}`),
    getTypes: () => requests.get('products/gettypes'),
    filterByPrice: (pricemin : number, pricemax:  number) => requests.get(`products/filterbyprice/${pricemin}/${pricemax}`),
    filterByBrand: (brand : string) => requests.get(`products/filterbybrand/${brand}`),
    filterByType: (type: string) => requests.get(`products/filterbytype/${type}`),
    details: (model: string) => requests.get(`products/get/${model}`)
}

const Basket = {
    get: () => requests.get('basket'),
    addItem: (model: string, quantity=1) => requests.post(`basket/additem?model=${model}&quantity=${quantity}`, {}),
    removeItem: (model: string, quantity=1) => requests.delete(`basket?model=${model}&quantity=${quantity}`),
    deleteAll: () => requests.delete("deleteall")
}

const User = {
    login : (values: any) => requests.post('api/authenticate/login', values),
    register : (values: any) => requests.post('customer', values),
    registerAdmin : (values: any) => requests.post('admin', values),
    getCurrentUser : () => requests.get('api/authenticate/getCurrentUser')
}
const Info = {
    get: () => requests.get('customer'),
    update: (values : any) => requests.put('customer/update', values)
}

const CreditCard = {
    get: () => requests.get('creditcard'),
    update: (values : any) => requests.put('creditcard/update', values)
}

const Order = {
    get: () => requests.get('order'),
    post: () => requests.post('order/addorder',{})
}
const TestErrors = {
    get400Error: () => requests.get('api/Bug/badrequest-error'),
    get401Error: () => requests.get('api/Bug/unathorized-error'),
    get404Error: () => requests.get('api/Bug/validation-error'),
    get500Error: () => requests.get('api/Bug/Server-error'),
}

const agent = {
    Catalog,
    TestErrors,
    Basket,
    User,
    Info,
    CreditCard,
    Order
}

export default agent;