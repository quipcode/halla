import * as React from 'react';
import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import {
    AppBar,
    Menu,
    Notification,
    Sidebar,
    setSidebarVisibility,
    ComponentPropType,
} from 'react-admin';

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        zIndex: 1,
        minHeight: '100vh',
        backgroundColor: theme.palette.background.default,
        position: 'relative',
    },
    appFrame: {
        display: 'flex',
        flexDirection: 'column',
        overflowX: 'auto',
    },
    contentWithSidebar: {
        display: 'flex',
        flexGrow: 1,
    },
    content: {
        display: 'flex',
        flexDirection: 'column',
        flexGrow: 2,
        padding: theme.spacing(3),
        marginTop: '4em',
        paddingLeft: 5,
    },
}));

const MyLayout = ({
    children,
    dashboard,
    logout,
    title,
}) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const open = useSelector(state => state.admin.ui.sidebarOpen);

    useEffect(() => {
        dispatch(setSidebarVisibility(true));
    }, [setSidebarVisibility]);

    return (
        <div className={classes.root}>
            <div className={classes.appFrame}>
                <AppBar title={title} open={open} logout={logout} />
                <main className={classes.contentWithSidebar}>
                    <Sidebar>
                        <Menu logout={logout} hasDashboard={!!dashboard} />
                    </Sidebar>
                    <div className={classes.content}>
                        {children}
                    </div>
                </main>
                <Notification />
            </div>
        </div>
    );
};

MyLayout.propTypes = {
    children: PropTypes.oneOfType([PropTypes.func, PropTypes.node]),
    dashboard: PropTypes.oneOfType([
        PropTypes.func,
        PropTypes.string,
    ]),
    logout: ComponentPropType,
    title: PropTypes.string.isRequired,
};

export default MyLayout;