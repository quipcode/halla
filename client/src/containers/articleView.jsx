import { connect } from "react-redux";
import React, { Component, useState, useRef, useEffect } from 'react';
import { getArticle } from '../store/redux/content/actions';
import { makeStyles } from '@mui/styles';

import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Box from '@mui/material/Box';

import ArticleSection from './articleSection'

const useStyles = makeStyles({
    root: {
        display: "block",
        // margin-left: "auto",
        margin: "auto",
        width: '40%'
    }
});

class ArticleView extends Component{
    constructor(props){
        super(props)
        this.state = {
            article: {},
            sections: [],
            json: {},
            bob: 0
        }
    }
    
    componentDidMount() {
        document.title = this.props.title
        this.props.getArticle(this.props.match.params.uuid).then( (res) => {console.log(res)})
        
        // this.setState({
        //     article: this.props.content.article,
        //     sections: this.props.content.sections
        // })
    }

    // componentDidUpdate(){
    //     // console.log(this.props)
    //     // console.log(this.props.content.article)
    //     // console.log(this.props.content.sections)
    //     // this.state.article = this.props.content.article
    //     // this.state.sections = this.props.content.sections
    //     this.state.article = {hi: 15}
    //         this.state.sections = [1,23]
    //     this.state.bob = 5
    // }

    static getDerivedStateFromProps(props, state) {
        // console.log(props, state)
        const { propArticle, propSections } = props.content;
        // console.log(article, sections)
        return {
            article: "propArticle",
            sections : propSections
        }

        // if (currentRelease && currentRelease.start) {
        //     return { start_date: props.currentRelease.start }
        // }

        // return null;
    }

    // componentDidUpdate(nextProps) {
    //     let article = this.props.content.article
    //     let sections = this.props.content.sections
    //     // let article = nextProps.content.article
    //     // let sections = nextProps.content.sections
    //     // this.state.article = this.props.content.article
    //     // this.state.sections = this.props.content.sections
    //     this.setState({
    //         article: "nip"
    //     })
    //     // let con1 = this.props.content
    //     // let con2 = nextProps.content
    //     // console.log(article, sections)
    //     // console.log(this.props)
    //     // console.log(nextProps)
    //     // const { show } = this.props
    //     // if (nextProps.show !== show) {
    //     //     if (show) {
    //     //         getMoreData().then(resp => this.setState({ data: resp.data }))
    //     //     }
    //     // }
    // }
    
    // const articleTop = 
    // <div> 

    // </div>

    render(){
        return(
            <div>
                {/* {console.log(this.state)}
                {console.log(this.props)} */}
                {/* {console.log(this.props)}
                {console.log(this.state)}
                {console.log(this.state.json)} */}
                <h1>{this.props.title}</h1>
                <p>Hello there </p>
                {this.props.content?.isLoading ?  <p>is Loading</p> : <div>
                    {this.props.content?.article?.uuid}
                    {this.props.content?.sections ? <div><ArticleSection sections={this.props.content.sections}/> </div> : <p>There are no sections</p>}   
                    </div>
                }
            </div>
        )
    }
}

const mapStateToProps = state => ({
    content: state.content,
});
export default connect(mapStateToProps, { getArticle })(ArticleView);

// import { connect } from "react-redux";
// import React, { useState, useRef, useEffect } from 'react';
// import { getArticle} from '../store/redux/content/actions';
// import { makeStyles } from '@mui/styles';

// import Accordion from '@mui/material/Accordion';
// import AccordionSummary from '@mui/material/AccordionSummary';
// import AccordionDetails from '@mui/material/AccordionDetails';
// import Typography from '@mui/material/Typography';
// import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
// import Box from '@mui/material/Box';

// const useStyles = makeStyles({
//     root: {
//         display: "block",
//         // margin-left: "auto",
//         margin: "auto",
//         width: '40%'
//     }
// });

// const ArticleView = (props) => {
//     // const [count, setCount] = useState(0);
//     // const [content, setContent] = useState(props.content);
//     const [article, setArticle] = useState(props.content.article)
//     const [sections, setSections] = useState(props.content.sections)
//     // const mounted = useRef(true);
//     // const [toggle, setToggle] = useState(false)
//     // const classes = useStyles();
//     // useEffect(() => {
//     //     props.getArticle(props.match.params.uuid)
//     //     console.log(props)
//     //     console.log(content)
//     // }, [content]);
    
//     // useEffect(() => {
//     //     mounted.current = true;
//     //     if(article && sections){
//     //         return
//     //     }
//     //     getArticle(props.match.params.uuid)
//     //     return () => mounted.current = false;
//     // }, [article, sections])
//     useEffect(() => {
//         const someFunc = () => {
//             console.log("Function being run after/on mount")
//             props.getArticle(props.match.params.uuid)
//             console.log(props)
//         }
//         someFunc()
//         console.log("the ", props)
//         setArticle(props.content.article)
//         setSections(props.content.sections)
//     }, [])

//     // useEffect(() => {
//     //     console.log("article updated")
//     // }, [article])

//     useEffect(() => {
//         console.log("sections updated")
//         console.log(sections)
//         console.log(props)
//     }, [sections])
//     const [btnText, updatebtnText] = useState("")

//     // const loadDataOnlyOnce = () => {
//     //     updatebtnText("Hello kapil")
//     // }

//     // // This function will called only once
//     // useEffect(() => {
//     //     loadDataOnlyOnce();
//     // }, [])

//     return(
        
//         <div style={{ margin: 200 }}>
            
//             <button onClick={() => updatebtnText("Hi")} >
//                 {btnText}
//             </button>
//         </div>
//         // <div>
//         //     <h1> {props.title}</h1>
//         //     {/* {console.log(article, sections, mounted)} */}
//         //     <div> 
//         //         <Box 
//         //         className={classes.root}>
//         //             <Accordion>
//         //                 <AccordionSummary
//         //                     expandIcon={<ExpandMoreIcon />}
//         //                     aria-controls="panel1a-content"
//         //                     id="panel1a-header"
//         //                 >
//         //                     <Typography>Accordion 1</Typography>
//         //                 </AccordionSummary>
//         //                 <AccordionDetails>
//         //                     <Typography>
//         //                         Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
//         //                         malesuada lacus ex, sit amet blandit leo lobortis eget.
//         //                     </Typography>
//         //                 </AccordionDetails>
//         //             </Accordion>
//         //             <Accordion>
//         //                 <AccordionSummary
//         //                     expandIcon={<ExpandMoreIcon />}
//         //                     aria-controls="panel2a-content"
//         //                     id="panel2a-header"
//         //                 >
//         //                     <Typography>Accordion 2</Typography>
//         //                 </AccordionSummary>
//         //                 <AccordionDetails>
//         //                     <Typography>
//         //                         Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
//         //                         malesuada lacus ex, sit amet blandit leo lobortis eget.
//         //                     </Typography>
//         //                 </AccordionDetails>
//         //             </Accordion>
//         //             <Accordion disabled>
//         //                 <AccordionSummary
//         //                     expandIcon={<ExpandMoreIcon />}
//         //                     aria-controls="panel3a-content"
//         //                     id="panel3a-header"
//         //                 >
//         //                     <Typography>Disabled Accordion</Typography>
//         //                 </AccordionSummary>
//         //             </Accordion>
//         //         </Box>
//         //     </div>
//         // </div>
//     )
// }
// const mapStateToProps = state => ({
//     content: state.content,
// });
// export default connect(mapStateToProps, {getArticle})(ArticleView);