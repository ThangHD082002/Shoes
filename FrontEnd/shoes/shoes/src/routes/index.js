import Home from '~/pages/Home'
import Login from '~/pages/Login'
import Register from '~/pages/Register';
import Cart from '~/pages/Cart';
import { DefaultLayout } from '~/components/Layout';
import HeaderLayout from '~/components/Layout/HeaderLayout';
import DetailProduct from '~/pages/DetailProduct';
import ListProductForBrand from '~/pages/ListProductForBrand';
import Checkout from '~/pages/Checkout';
import FooterLayout from '~/components/Layout/FooterLayout';
import AdminLayout from '~/components/Layout/component/AdminLayout';
import ManagerAdmin from '~/pages/ManagerAdmin';
import CustomerAdmin from '~/pages/CustomerAdmin';
import EmployeeAdmin from '~/pages/EmployeeAdmin';
import OrderDetailAdmin from '~/pages/OrderDetailAdmin';
import OrdersAdmin from '~/pages/OrdersAdmin';
import ProductAdmin from '~/pages/ProductAdmin';
import ProductsDetailAdmin from '~/pages/ProductsDetailAdmin';
import RoleAdmin from '~/pages/RoleAdmin';
import Chart from '~/pages/Chart';
import Order from '~/pages/Order';
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
        layout: FooterLayout
    },
    {
        path: '/cart',   
        component: Cart,
        layout: FooterLayout
    },
    {
        path: '/list-product-for-brand?',   
        component: ListProductForBrand,
        layout: DefaultLayout
    },
    {
        path: '/checkout',   
        component: Checkout,
        layout: FooterLayout
    },
    {
        path: '/admin',   
        component: ManagerAdmin,
        layout: AdminLayout
    }, 
    {
        path: '/admin/customer',   
        component: CustomerAdmin,
        layout: AdminLayout
    },
    {
        path: '/admin/employee',   
        component: EmployeeAdmin,
        layout: AdminLayout
    },
    {
        path: '/admin/order-details',   
        component: OrderDetailAdmin,
        layout: AdminLayout
    },
    {
        path: '/admin/orders',   
        component: OrdersAdmin,
        layout: AdminLayout
    },
    {
        path: '/admin/products',   
        component: ProductAdmin,
        layout: AdminLayout
    },
    {
        path: '/admin/product-details',   
        component: ProductsDetailAdmin,
        layout: AdminLayout
    },
    {
        path: '/admin/error-role',   
        component: RoleAdmin,
        layout: null
    },
    {
        path: '/admin/chart',   
        component: Chart,
        layout: AdminLayout
    },
    {
        path: '/my-order',   
        component: Order,
        layout: DefaultLayout
    },
    
    
]

export {publicRoutes};