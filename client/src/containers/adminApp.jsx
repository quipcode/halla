import React from 'react';
import { withRouter } from 'react-router-dom'
import UserIcon from '@material-ui/icons/Group';
import { Admin, Resource } from 'react-admin';
import { PostList, PostCreate, PostEdit } from '../components/ra/posts'
import { UserList } from '../components/ra/users';
import authProvider from '../store/provider/authProvider.js';
import dataProvider from '../store/provider/dataProvider';
import history from '../utils/history'
import customRoutes from '../routes/customRoutes'

const AdminApp = (props) => {
    return (

        <Admin
            authProvider={authProvider}
            dataProvider={dataProvider}
            history={history}
            title="My Admin"
            customRoutes={customRoutes}
        // layout={MyLayout}
        >
            <Resource name="posts" list={PostList} create={PostCreate} edit={PostEdit} />
            <Resource name="users" list={UserList} icon={UserIcon} />
        </Admin>
    )
}
export default withRouter((AdminApp))