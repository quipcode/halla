// import React from   'react'
import { connect } from "react-redux";
import React, { useState, useRef, useEffect } from 'react';
import { getArticle} from '../store/redux/content/actions';
// import Accordion from "@material-ui/core/Accordion";
// import AccordionSummary from "@material-ui/core/AccordionSummary";
// import AccordionDetails from "@material-ui/core/AccordionDetails";
// import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
// import {Typography} from '@material-ui/core/Typography';

// import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { makeStyles } from '@mui/styles';

import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Box from '@mui/material/Box';
// @material-ui/core

const useStyles = makeStyles({
    root: {
        display: "block",
        // margin-left: "auto",
        margin: "auto",
        width: '40%'
    }
});

const ArticleView = (props) => {
    const [count, setCount] = useState(0);
    const [content, setContent] = useState(props.content);
    const [toggle, setToggle] = useState(false)
    const classes = useStyles();
    useEffect(() => {
        props.getArticle(props.match.params.uuid)
        console.log(props)
    }, [content]);
    
    return(
        <div>
            {/* <p> on the article view page</p> */}
            <h1> {props.title}</h1>
       
 
            <div> 
                <Box 
                className={classes.root}>
                    <Accordion>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                        >
                            <Typography>Accordion 1</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                                malesuada lacus ex, sit amet blandit leo lobortis eget.
                            </Typography>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel2a-content"
                            id="panel2a-header"
                        >
                            <Typography>Accordion 2</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                                malesuada lacus ex, sit amet blandit leo lobortis eget.
                            </Typography>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion disabled>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel3a-content"
                            id="panel3a-header"
                        >
                            <Typography>Disabled Accordion</Typography>
                        </AccordionSummary>
                    </Accordion>
                </Box>
            </div>
        </div>
    )
}
const mapStateToProps = state => ({
    content: state.content,
});
export default connect(mapStateToProps, {getArticle})(ArticleView);