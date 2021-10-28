import * as React from 'react';
import { AppBar, UserMenu, MenuItemLink, Layout } from 'react-admin';
import SettingsIcon from '@material-ui/icons/Settings';

// const ConfigurationMenu = React.forwardRef(({ onClick }, ref) => (
//     <MenuItemLink
//         ref={ref}
//         to="/configuration"
//         primaryText="Configuration"
//         leftIcon={<SettingsIcon />}
//         onClick={onClick} // close the menu on click
//     />
// ));

const MyUserMenu = props => (
    <UserMenu {...props}>
        {/* <ConfigurationMenu /> */}
    </UserMenu>
);

const MyAppBar = props => <AppBar {...props} userMenu={<MyUserMenu />} />;

const MyLayout = props => <Layout {...props} appBar={MyAppBar} />;

export default MyLayout;