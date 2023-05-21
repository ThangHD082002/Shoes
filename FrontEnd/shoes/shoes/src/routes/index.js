import Home from '~/pages/Home'
import Login from '~/pages/Login'
import Register from '~/pages/Register';
import Cart from '~/pages/Cart';
import { DefaultLayout } from '~/components/Layout';
import HeaderLayout from '~/components/Layout/HeaderLayout';
import DetailProduct from '~/pages/DetailProduct';
import ListProductForBrand from '~/pages/ListProductForBrand';


const publicRoutes = [
    {
        path: '/',
        component: Home,
        layout: DefaultLayout
    },
    {
        path: '/login',
        component: Login,
        layout: null 
    },
    {
        path: '/register',   
        component: Register,
        layout: null
    },
    {
        path: '/detail-product/:pid',   
        component: DetailProduct,
        layout: HeaderLayout
    },
    {
        path: '/cart?',   
        component: Cart,
        layout: HeaderLayout
    },
    {
        path: '/list-product-for-brand?',   
        component: ListProductForBrand,
        layout: DefaultLayout
    },
    
]

export {publicRoutes};