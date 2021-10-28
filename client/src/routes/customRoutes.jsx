import * as React from "react";
import { Route } from 'react-router-dom';

import { PostList, PostCreate, PostEdit, PostShow } from '../components/ra/posts';

import { UserList} from '../components/ra/users';

export default [
    <Route exact path="/admin/posts" hasCreate render={(routeProps) => <PostList resource="posts" {...routeProps} />} />,
    <Route exact path="/admin/posts/create" render={(routeProps) => <PostCreate resource="posts" {...routeProps} />} />,
    <Route exact path="/admin/posts/:id" hasShow hasDelete render={(routeProps) => <PostEdit resource="posts" {...routeProps} />} />,
    <Route exact path="/admin/posts/:id/show" hasEdit render={(routeProps) => <PostShow resource="posts" {...routeProps} />} />,
    <Route exact path="/admin/posts/:id/delete" render={(routeProps) => <Delete resource="posts" {...routeProps} />} />,
    <Route exact path="/admin/users" hasCreate render={(routeProps) => <UserList resource="users" {...routeProps} />} />,
    // <Route exact path="/users/create" render={(routeProps) => <UsersCreate resource="users" {...routeProps} />} />,
    // <Route exact path="/users/:id" hasDelete render={(routeProps) => <UsersEdit resource="users" {...routeProps} />} />,
    // <Route exact path="/users/:id/delete" render={(routeProps) => <Delete resource="users" {...routeProps} />} />,
];

