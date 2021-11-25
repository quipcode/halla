import React, { useState, useRef, useEffect } from 'react';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormHelperText from '@mui/material/FormHelperText';
import FormGroup from '@mui/material/FormGroup';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import Chip from '@mui/material/Chip';

import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import DoneIcon from '@mui/icons-material/Done';
import CloseIcon from '@mui/icons-material/Close';

import { makeStyles } from '@mui/styles';

// import Container from '@material-ui/core/Container';
// import TextField from '@material-ui/core/TextField';
// import Button from '@material-ui/core/Button';
// import IconButton from '@material-ui/core/IconButton';
// import RemoveIcon from '@material-ui/icons/Remove';
// import AddIcon from '@material-ui/icons/Add';
// import Checkbox from '@material-ui/core/Checkbox';
// import FormControlLabel from '@material-ui/core/FormControlLabel';
// import FormGroup from '@material-ui/core/FormGroup';
// import Chip from '@material-ui/core/Chip';
// import Done from '@material-ui/icons/Done';
// import Close from '@material-ui/icons/Close';


// import { makeStyles } from '@material-ui/core/styles';
// import FormHelperText from '@material-ui/core/FormHelperText';
// import FormControl from '@material-ui/core/FormControl';
// import Select from '@material-ui/core/Select';
// import MenuItem from '@material-ui/core/MenuItem';

import { constants } from '../utils/constants';
import StatusBar from './statusbar';
import TinyEditor from './tinyEditor';

// import constants from '../utils/constants';
// import { createArticle } from '../store/redux/content/actions'
// import { connect } from 'react-redux'
// import StatusBar from './statusbar';
// import TinyEditor from './tinyEditor';


interface MyTheme {
    color: string;
    spacing: any
  }
  
  interface ComponentProps {
    backgroundColor: string;
  }
  
  const useStyles = makeStyles((theme: MyTheme) => ({
    root: (props: ComponentProps) => ({
        backgroundColor: props.backgroundColor,
        color: theme.color,
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
        },
    }),
    button: {
        margin: theme.spacing(1),
    }
  }));
  

const Article = (props: any) => {
  const classes = useStyles(props)
  // const sampleArticle = { uuid, authorId, metaTitle, slug, published}
  const sampleArticle = { metaTitle : "", slug : "", published : false }
  const sampleSections = { idx: 0, isSummarySelected: false, summary: {}, title: "", isTitleSelected: true, sectionTypeId: 1, sectionTypes: [ {id: 1, name: "Visible"}, {id: 2, name: "Hidden"}] }
  const options = sampleSections.sectionTypes.map((d, i) => 
    <MenuItem value={d.id} key={i}>{d.name}</MenuItem>
  );

  const [sections, setSections] = useState([
    sampleSections
  ])
  const [article, setArticle] = useState(props.content.article ? props.content.article : sampleArticle)
  const [content, setContent] = useState(
    {
      article: props.content.article ? props.content.article : sampleArticle,
      sections: props.content.sections ? props.content.sections : sampleSections
    } 
  )

  const [displayIsSaving, setDisplayIsSaving] = useState(false);

  const handlePublish = (event: Event) => {
    setDisplayIsSaving(true)
    // throttledSaveToServer();
    console.log("publish was pressed: ", content, sections)
    event.preventDefault();
  }

  const handleSubmit = (event: Event) => {
    setDisplayIsSaving(true)
    event.preventDefault()
    props.createArticle(content)    
    setDisplayIsSaving(false)
  }

  const handleCancel = (event: Event) => {
    event.preventDefault();
  }


  const handleCheckboxSelection = (idx : number, event: Event) => {
    const newSectionsArray = sections.map(i => {
      if (idx === i.idx) {
          console.log(event)
        i[event.currentTarget.name] = event.target.checked
      }
      return i;
    })
    setSections(newSectionsArray);
    content.sections = newSectionsArray
    
  }

  const handleSectionInput = (idx, event) => {
    const newSectionsArray = sections.map(i => {
      if (idx === i.idx) {
        i[event.target.name] = event.target.value
      }
      return i;
    })
    setSections(newSectionsArray);
    content.sections = newSectionsArray
  }
  const handleEditorInput = (idx, event, name) => {
    const newSectionsArray = sections.map(i => {
      if (idx === i.idx) {
        i[name] = event
      }
      return i;
    })
    setSections(newSectionsArray);
    content.sections = newSectionsArray
  }

  const handleAddFields = () => {
    setSections([...sections, { idx: sections.length, isSummarySelected: false, summary: null, title: "", isTitleSelected: false, content: null, content: null, sectionTypeId: 1, sectionTypes: [{ id: 1, name: "visible" }, { id: 2, name: "hidden" }] }]  )
  }
  const handleRemoveFields = idx => {
    const values = [...sections];
    values.splice(values.findIndex(value => 
      value.idx === idx
      )
      , 1);
    setSections(values);
  }

  const handleArticleInput = (event) => {
    let name = event.target.name;
    let value = event.target.value
    let newArticle = { ...article}
    newArticle[name] = value;
    setArticle(newArticle)
    content.article = newArticle
  }
  return (
    
    <Container>
      <form className={classes.root} onSubmit={handleSubmit}>
        <StatusBar
          displayIsSaving={displayIsSaving}
        />
        {article.published ?          
        <Chip
          label="Published"
          color="primary"
          icon={<DoneIcon/>}
        />
          : <Chip
            label="UnPublished"
            color="secondary"
            icon={<CloseIcon />}
          /> }

        
        <TextField
          fullWidth
          name="metaTitle"
          label="Meta-Title"
          value={article.metaTitle}
          onChange={event => {
            handleArticleInput(event)
          }}
        />

        <TextField
          fullWidth
          name="slug"
          label="Slug"
          value={article.slug}
          onChange={event => {
            handleArticleInput(event)
          }}
        />
     
        {sections.map(sectionField => (
          <div key={sectionField.idx}>
            <FormGroup row>
              <FormControlLabel
                control={
                  <Checkbox
                    value={sectionField.isSummarySelected}
                    onChange={event => 
                      handleCheckboxSelection(sectionField.idx, event)
                    }
                    name="isSummarySelected"
                    color="primary"
                  />
                }
                label={constants.INCLUDE_SUMMARY}
              />
              <FormControlLabel
                control={
                  <Checkbox                    
                    checked={sectionField.isTitleSelected}
                    value={sectionField.isTitleSelected}
                    onChange={event =>
                      handleCheckboxSelection(sectionField.idx, event)
                    }
                    name="isTitleSelected"
                    color="primary"
                  />
                }
                label={constants.INCLUDE_TITLE}
              />        
              <FormControl className={classes.f.formControl}>
                <Select
                  value={sectionField.sectionTypeId}
                  onChange={(e) =>
                    handleSectionInput(sectionField.idx, e)
                  }
                  name="sectionTypeId"
                >
                  {options}
                </Select>

                <FormHelperText>Section Type</FormHelperText>
              </FormControl>
            </FormGroup>
            {sectionField.isTitleSelected ? <TextField
              fullWidth
              name="title"
              label="Title"
              value={sectionField.title}
              onChange={event => {
                handleSectionInput(sectionField.idx, event)
              }}
            /> : null }

            {sectionField.isSummarySelected ? <TinyEditor
              name="summary"
              label="Summary"
              height={300}
              value={sectionField.summary}
              onChange={e =>
                handleEditorInput(sectionField.idx, e, "summary")
              }
            /> : null }


            <TinyEditor
              name="content"
              label="Content"
              value={sectionField.content}
              height={600}
              onChange={e =>
                handleEditorInput(sectionField.idx, e, "content")
              }
            />
            
            <IconButton disabled={sections.length === 1} onClick={() => handleRemoveFields(sectionField.idx)}>
              <RemoveIcon />
            </IconButton>
            <IconButton
              onClick={handleAddFields}
            >
              <AddIcon />
            </IconButton>
          </div>
        ))}
       
        {/* <Button
          className={classes.button}
          variant="contained"
          color="primary"
          type="submit"
          endIcon={<Icon>send</Icon>}
          onClick={handleSubmit}
        >Send</Button> */}
        {content.article.uuid ? 
        <Button color="secondary" variant="contained" type="submit" onClick={(e) => { handlePublish(e) }} > Publish </Button > 
        : <Button color="secondary" variant="contained" type="submit" disabled onClick={(e) => { handlePublish(e) }} >  Publish </Button >}
        
        
        <Button color="primary" variant="contained" type="submit" onClick={(e) => { handleSubmit(e) }} >
          Save
        </Button>
        <Button color="error" variant="contained" type="reset" onClick={(e) => { handleCancel(e) }}>
          Cancel
        </Button>
      </form>
    </Container>

  );
}

export default Article;

// const mapStateToProps = state => ({
//   content: state.content,
//   auth: state.auth
// });
// export default connect(mapStateToProps, { createArticle })(Article);