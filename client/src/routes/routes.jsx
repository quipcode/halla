import Home from '../containers/home'
import Login from '../containers/login'
import Register from '../containers/register'
import Tadabor from '../containers/tadabor'
import MyContentTable from '../containers/myContentTable'
import MyContentEdit from '../containers/myContentEdit'

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
    },
    {
        path: '/mycontenttable',
        component: MyContentTable,
        privateRoute: false
    },
    {
        path: '/mycontentedit',
        component: MyContentEdit,
        privateRoute: false
    }

]

export default routes;