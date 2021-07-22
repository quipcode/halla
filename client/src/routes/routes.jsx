import Home from '../containers/home'
import Login from '../containers/login'
import Register from '../containers/register'
import Tadabor from '../containers/tadabor'

const routes = [
    {
        path: '/',
        component: Home,
        privateRoute: false
    },
    {
        path: '/login',
        component: Login,
        privateRoute: false
    },
    {
        path: '/register',
        component: Register,
        privateRoute: false
    },
    {
        path: '/tadabor',
        component: Tadabor,
        privateRoute: false
    }
]

export default routes;