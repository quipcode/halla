import * as React from 'react'
import { MuiThemeProvider, withStyles, createStyles } from '@material-ui/core/styles'
// import appTheme from '../config/Theme'
// import AppBar from './AppBar'
// import Navbar from './Navbar'
import {
    AppBar,
    Menu,
    Notification,
    Sidebar,
    setSidebarVisibility,
    ComponentPropType,
    Resource
} from 'react-admin';
import { createTheme } from '@material-ui/core/styles';
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from '@material-ui/styles';
import routes from '../routes/routes'
import { ConnectedRouter } from 'connected-react-router';
import { Switch, Route } from 'react-router-dom';
import history from '../utils/history'
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import PostIcon from '@material-ui/icons/Book';
import { PostList, PostEdit, PostCreate } from './posts';

// const styles = (theme) => createStyles({
//     appFrame: {
//         display: 'flex',
//         flexDirection: 'column',
//         overflowX: 'auto',
//     },
//     content: {
//         display: 'flex',
//         flexDirection: 'column',
//         flexGrow: 2,
//         marginTop: '4em',
//         padding: theme.spacing * 3,
//         paddingLeft: 5,
//     },
//     contentNoSidebar: {
//         display: 'flex',
//         flexGrow: 1,
//     },
//     root: {
//         // backgroundColor: theme.palette.background.default,
//         display: 'flex',
//         flexDirection: 'column',
//         minHeight: '10vh',
//         position: 'relative',
//         zIndex: 1,
//     },
// })

const theme = createTheme();
// const theme = createMuiTheme();
let routeComponents =
    Object.values(routes).map(({
        title,
        component: Component,
        path,
        exact,
        hasCreate, 
        hasShow,
        hasEdit,
        resource
    }, idx) => {
        return (
            <Route
                key={idx}
                path={path}
                exact={exact}
                render={(props) => 
                <Component 
                {...props} 
                    hasCreate={hasCreate} 
                    hasShow={hasShow} 
                    hasEdit={hasEdit} 
                    title={title} 
                    basePath={props.match.url}
                    resource={resource}
                />}
            />
        )
    })


class CustomLayout extends React.Component{
    
    render() {
        const {
            children,
            classes,
            logout,
            open,
            dashboard,
            title,
        } = this.props
        return (
            
            <ThemeProvider theme={theme}>
                {console.log(this, title, logout)}
                {/* {console.log("in the bi")}
                {console.log(children, classes, logout, open, title, this)} */}
                
                {/* <div className={classes.root}>
                    <div className={classes.appFrame}> */}
                <AppBar title={title} open={open} logout={logout}>
                        <Toolbar>
                                    <Typography variant="h6" color="inherit">
                                        My admin
                                    </Typography>
                                </Toolbar>
                    
                        </AppBar>
                        {/* <Sidebar> */}
                            {/* <Menu logout={logout} hasDashboard={!!dashboard} /> */}
                            {/* <p>what up</p> */}
                        {/* </Sidebar> */}
                        {/* <main className={classes.contentNoSidebar}>
                            <div className={classes.content}>
                                {children}
                            </div>
                        </main> */}
                    {/* </div>
                </div> */}
                <Sidebar > 
                    <Resource name="posts" list={PostList} edit={PostEdit} create={PostCreate} icon={PostIcon} />
                </Sidebar>
                <Notification />
                <ConnectedRouter history={history}>
                    <Switch>
                        {routeComponents}
                    </Switch>
                </ConnectedRouter>
            </ThemeProvider>
            // <MuiThemeProvider theme={theme}>

            // </MuiThemeProvider>
        )
    }
}
// export default withStyles(styles)(CustomLayout)
export default CustomLayout