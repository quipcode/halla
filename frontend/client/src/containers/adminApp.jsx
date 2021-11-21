import React from 'react';
import { withRouter } from 'react-router-dom'
import UserIcon from '@material-ui/icons/Group';
import { Admin, Resource } from 'react-admin';
import { PostList, PostCreate, PostEdit } from '../components/ra/posts'
import { UserList } from '../components/ra/users';
import authProvider from '../store/provider/authProvider.js';
import dataProvider from '../store/provider/dataProvider';
import adminHistory from '../utils/adminHistory';
import customRoutes from '../routes/customRoutes'
import { ArticleList, ArticleEdit} from '../components/ra/articles'
import ArticleIcon from '@mui/icons-material/Article';


const AdminApp = (props) => {
    return (

        <Admin
            authProvider={authProvider}
            dataProvider={dataProvider}
            history={adminHistory}
            title="My Admin"
            customRoutes={customRoutes}
        // layout={MyLayout}
        >
            <Resource name="posts" list={PostList} create={PostCreate} edit={PostEdit} />
            <Resource name="users" list={UserList} icon={UserIcon} />
            <Resource name="articles" list={ArticleList} icon={ArticleIcon} edit={ArticleEdit}/>
            <Resource name="content" list={ArticleList} icon={ArticleIcon} />
        </Admin>
    )
}
export default withRouter((AdminApp))