import React, { useState, useRef, useEffect } from 'react';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import RemoveIcon from '@material-ui/icons/Remove';
import AddIcon from '@material-ui/icons/Add';
import Icon from '@material-ui/core/Icon';
import { v4 as uuidv4 } from 'uuid';
import StatusBar from './statusbar';
import TinyEditor from './tinyEditorCopy';
import SummaryEditor from './summaryEditor';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';

import { withStyles } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';


import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import Favorite from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';


import { makeStyles } from '@material-ui/core/styles';
import constants from '../utils/constants';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
    },
  },
  button: {
    margin: theme.spacing(1),
  }
}))



const GreenCheckbox = withStyles({
  root: {
    color: green[400],
    '&$checked': {
      color: green[600],
    },
  },
  checked: {},
})((props) => <Checkbox color="default" {...props} />);

const ContentEdit = () => {
  const classes = useStyles()
  const sampleContentSections = { id: uuidv4(), isSummarySelected: false, summary: null, title: null, isTitleSelected: false, content: null, summaryType: [1, 2, 3] }
  

  const [contentSections, setcontentSections] = useState([
    sampleContentSections
  ])
  const [content, setcontent] = useState(
    { id: uuidv4(), contentSections },
  );

  const [displayIsSaving, setDisplayIsSaving] = useState(false);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("content", content);
    console.log("contentSections", contentSections);
  };

  const handleChangeInput = (id, event) => {
    const newcontent = content.map(i => {
      console.log(id, event, i)
      if (id === i.id) {
        i[event.target.name] = event.target.value
      }
      return i;
    })

    setcontent(newcontent);
  }

  const handleSectionChangeInput = (id, event) => {
    const newcontentSections = contentSections.map(i => {
      console.log(id, event, i)
      if (id === i.id) {
        i[event.target.name] = event.target.value
      }
      return i;
    })
    setcontentSections(newcontentSections);
  }

    const handleContentInput = (id, event) => {
    const newcontentSections = contentSections.map(i => {
      if (id === i.id) {
        i['content'] = event
      }
      return i;
    })

    setcontent(newcontentSections);
  }

  const handleSummaryInput = (id, event) => {
    const newcontentSections = contentSections.map(i => {
      if (id === i.id) {
        i['summary'] = event
      }
      return i;
    })

    setcontent(newcontentSections);
  }
  useEffect(() => {
    setcontent({ ...content, contentSections })
  }, [contentSections])
  const handleAddFields = () => {
    setcontentSections([...contentSections, { id: uuidv4(), isSummarySelected: false, summary: null, title: null, isTitleSelected: false, content: null, summaryType: [1, 2, 3] }]  )    
  }
  const handleRemoveFields = id => {
    const values = [...contentSections];
    values.splice(values.findIndex(value => 
      value.id === id
      )
      , 1);
    setcontentSections(values);
  }

  return (

    <Container>
      <h1>Add New Member</h1>
      <form className={classes.root} onSubmit={handleSubmit}>
        <StatusBar
          displayIsSaving={displayIsSaving}
        />

     
        {contentSections.map(sectionField => (
          <div key={sectionField.id}>
            <FormGroup row>
              {/* <FormControlLabel
                control={<Checkbox checked={state.checkedA} onChange={handleChange} name="checkedA" />}
                label="Secondary"
              /> */}
              <FormControlLabel
                control={
                  <Checkbox
                    value={sectionField.isSummarySelected}
                    onChange={event => 
                      handleSectionChangeInput(sectionField.id, event)
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
                    value={sectionField.isTitleSelected}
                    onChange={event =>
                      handleSectionChangeInput(sectionField.id, event)
                    }
                    name=""
                    color="primary"
                  />
                }
                label={constants.INCLUDE_TITLE}
              />
            </FormGroup>
 
            <TextField
              fullWidth
              fullWidth
              name="title"
              label="Title"
              value={sectionField.title}
              onChange={event => {
                handleSectionChangeInput(sectionField.id, event)
              }}
            />
{/* 
            <SummaryEditor
              name="summary"
              label="Summary"
              value={sectionField.summary}
              onChange={e =>
                handleSummaryInput(sectionField.id, e)
              }
            />
            <TinyEditor
              name="content"
              label="Content"
              value={sectionField.content}
              onChange={e =>
                handleContentInput(sectionField.id, e)
              }
            /> */}
            
            <IconButton disabled={contentSections.length === 1} onClick={() => handleRemoveFields(sectionField.id)}>
              <RemoveIcon />
            </IconButton>
            <IconButton
              onClick={handleAddFields}
            >
              <AddIcon />
            </IconButton>
          </div>
        ))}
       
        <Button
          className={classes.button}
          variant="contained"
          color="primary"
          type="submit"
          endIcon={<Icon>send</Icon>}
          onClick={handleSubmit}
        >Send</Button>
      </form>
    </Container>

  );
}

export default ContentEdit;