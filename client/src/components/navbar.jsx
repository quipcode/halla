import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import Navbar from 'react-bootstrap/Navbar';
import  Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import  NavDropdown from 'react-bootstrap/NavDropdown';
import NavbarBrand from 'react-bootstrap/NavbarBrand'
import { logoutUser } from '../store/redux/auth/actions';

import logo from '../assets/logo.svg'

import routes from '../routes/routes'

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
}));

const logout = (e, props) => {
    console.log(" clicked on logout")
    console.log(e)
    console.log(props)
    // logoutUser()
    props.props.logoutUser()

    
}

let NavBar = (props) => {
    // const classes = useStyles();

    const authWallOrProfile = (auth) => {
        
        return auth.isAuthenticated ? 

        <Navbar collapseOnSelect className="float-xs-right"  expand="lg" bg="dark" variant="dark">
            <Navbar.Brand href={routes.home.path}>
                {<img
                    alt=""
                    src={logo}
                    width="30"
                    height="30"
                    className="d-inline-block align-top"
                />}
                Halla
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="me-auto">
                    <Nav.Link href={routes.tadabor.path}>
                        <i className="fas fa-star-and-crescent"/>
                        <span> Tadabor</span>
                    </Nav.Link>
                    <Nav.Link href={routes.articleNew.path}>
                        <i className="fas fa-pen" />
                        <span> Content</span>
                    </Nav.Link>
                </Nav>
                <Nav className="ml-auto" navbar>
                    <Nav.Link href="#deets">
                        <i className="fas fa-user-circle"/>
                        <span> Profile</span>
                    
                    </Nav.Link> 
                        <Nav.Link eventKey={2} onClick={ e => logout(e, props)} href="/">
                        <i className="fas fa-sign-out-alt"/>
                        <span> Logout</span>
                </Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
         
 :

        <Navbar collapseOnSelect className="float-xs-right"  expand="lg" bg="dark" variant="dark">
            <Navbar.Brand href={routes.home.path}>
                {<img
                    alt=""
                    src={logo}
                    width="30"
                    height="30"
                    className="d-inline-block align-top"
                />}
                Halla
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="me-auto">
                    <Nav.Link href={routes.tadabor.path}>     
                        <i className="fas fa-star-and-crescent"/>
                        <span> Tadabor</span>
                    </Nav.Link>
                    <Nav.Link href={routes.articleNew.path}> 
                        <i className="fas fa-pen" />
                        <span> Content</span>
                    </Nav.Link>
                </Nav>
                <Nav className="ml-auto" navbar>
                    <Nav.Link eventKey={2} href={routes.login.path}>
                        <i className="fas fa-sign-in-alt"/>
                        <span> Login</span>
                </Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>

  
       
    }

    return authWallOrProfile(props.auth)
}

// NavBar.propTypes = {
//     logoutUser: PropTypes.func.isRequired,
//     auth: PropTypes.object.isRequired
// };

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps, {})(NavBar);