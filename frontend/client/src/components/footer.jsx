import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import Card from 'react-bootstrap/Card'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import routes from '../routes/routes'
import logo from '../assets/logo.svg'

const Footer = (props) => {
    const userFeedbackOrAnonymous = (auth) => {
        return auth.isAuthenticated ?             
            <Navbar expand="lg" bg="dark" variant="dark">
                <Container>
                    <Nav className="me-auto">
                        <Nav.Link href={routes.tadabor.path}>
                            <i className="far fa-comment-dots"></i>
                        </Nav.Link>
                    </Nav>
                    <Nav>
                        <Nav.Link href={routes.articleNew.path}>
                            <i className="fas fa-question-circle"></i>
                        </Nav.Link>
                    </Nav>
                </Container>
            </Navbar>
        :
        <Navbar  expand="lg" bg="dark" variant="dark">
            <Container>
                <Nav className="me-auto">
                    <Nav.Link href={routes.tadabor.path}>
                        <i className="far fa-comment-dots"></i>
                    </Nav.Link>
                </Nav>
                <Nav>
                    <Nav.Link href={routes.articleNew.path}>
                        <i className="fas fa-question-circle"></i>
                    </Nav.Link>
                </Nav>
            </Container>
        </Navbar>
    }

    return userFeedbackOrAnonymous(props.auth)
}
const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps, {})(Footer);