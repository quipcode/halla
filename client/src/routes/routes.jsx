import Home from '../containers/home'
import Login from '../containers/login'
import Register from '../containers/register'
import Tadabor from '../containers/tadabor'
import MyContentTable from '../containers/myContentTable'
import ArticleNew from '../containers/articleNew'
import ArticleEdit from '../containers/articleEdit'
import FeedBack from '../components/feedback'
import Profile from '../components/profile';
import ArticleView  from '../containers/articleView'
const routes = {
    home:   {
                path: '/',
                component: Home,
                privateRoute: false,
                title: "Home",
                exact: true
            },
    login:
            {
                path: '/login',
                component: Login,
                privateRoute: false,
                title: "Login",
                exact: true
            },
    register:
            {
                path: '/register',
                component: Register,
                privateRoute: false,
                title: "Register",
                exact: true
            },
    tadabor:
            {
                path: '/tadabor',
                component: Tadabor,
                privateRoute: false,
                title: "Tadabor",
                exact: true
            },
    mycontenttable:
            {
                path: '/mycontenttable',
                component: MyContentTable,
                privateRoute: false,
                title: "My Content Table",
                exact:true
            },
    articleNew:
            {
                path: '/article/new',
                component: ArticleNew,
                privateRoute: false,
                title: "New Article",
                exact:true
            },
    articleEdit:
    {
        path: '/article/edit/:uuid',
        component: ArticleEdit,
        privateRoute: false,
        title: "Edit Article",
        exact:false,
    },
    articleView:
    {
        path: '/article/:uuid',
        component: ArticleView,
        privateRoute: false,
        title: "Read Article",
        exact: false
    },
    feedback: 
            {
                path: '/feedback',
                component: FeedBack,
                privateRoute: false,
                title: "Feedback",
                exact:true
            },
    profile:
            {
                path: '/profile',
                component: Profile,
                privateRoute: false,
                title: "Profile",
                exact:true
            }
}

export default routes;