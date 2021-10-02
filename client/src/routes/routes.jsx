import Home from '../containers/home'
import Login from '../containers/login'
import Register from '../containers/register'
import Tadabor from '../containers/tadabor'
import MyContentTable from '../containers/myContentTable'
import ArticleNew from '../containers/articleNew'
import FeedBack from '../components/feedback'
import Profile from '../components/profile';

const routes = {
    home:   {
                path: '/',
                    component: Home,
                        privateRoute: false
            },
    login:
            {
                path: '/login',
                component: Login,
                privateRoute: false
            },
    register:
            {
                path: '/register',
                component: Register,
                privateRoute: false
            },
    tadabor:
            {
                path: '/tadabor',
                component: Tadabor,
                privateRoute: false
            },
    mycontenttable:
            {
                path: '/mycontenttable',
                component: MyContentTable,
                privateRoute: false
            },
    articleNew:
            {
                path: '/article/new',
                component: ArticleNew,
                privateRoute: false
            },
    feedback: 
            {
                path: '/feedback',
                component: FeedBack,
                privateRoute: false,
            },
    profile:
            {
                path: '/profile',
                component: Profile,
                privateRoute: false
            }
}

export default routes;