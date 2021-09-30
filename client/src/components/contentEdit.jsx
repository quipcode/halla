import React, { useState, useRef, useEffect } from 'react';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import RemoveIcon from '@material-ui/icons/Remove';
import AddIcon from '@material-ui/icons/Add';
import Icon from '@material-ui/core/Icon';
import StatusBar from './statusbar';
import TinyEditor from './tinyEditor';
import SummaryEditor from './summaryEditor';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';

import { makeStyles } from '@material-ui/core/styles';
import constants from '../utils/constants';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { saveContentToServer } from '../store/redux/content/actions'
import { connect } from 'react-redux'

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

const ContentEdit = (props) => {
  const classes = useStyles()
  const sampleContentSections = { idx: 0, isSummarySelected: false, summary: null, title: "", isTitleSelected: true, content: null, sectionType: '', sectionTypes: [ {id: 1, name: "Hidden"}, {id: 2, name: "Visible"}] }
  const options = sampleContentSections.sectionTypes.map((d, i) => 
    <MenuItem value={d.id} key={i}>{d.name}</MenuItem>
  );

  const [contentSections, setcontentSections] = useState([
    sampleContentSections
  ])
  const [content, setcontent] = useState(
    { contentSections },
  );

  const [displayIsSaving, setDisplayIsSaving] = useState(false);

  const [checkedState, setChecked] = useState(true);
  const handleCheckChange = (event) => {
    setChecked(event.target.checked);
  };

  // <FormControlLabel
  //   control={<Checkbox checked={checkedState} onChange={handleCheckChange} />}
  //   label="Check me"
  // />
  
  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   console.log("content", content);
  //   console.log("contentSections", contentSections);
  // };

  const handlePublish = (event) => {
    setDisplayIsSaving(true)
    // throttledSaveToServer();
    console.log("publish was pressed: ", content, contentSections)
    event.preventDefault();
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    // console.log("content", content);
    // console.log("contentSections", contentSections);
    props.saveContentToServer(content)
    setDisplayIsSaving(true)
    // console.log("save was pressed: ", contentEditor, contentTitle, localStorage.getItem("hallaAuthUser"), localStorage.getItem("hallaAuthToken"))
    // props.saveContentToServer(contentTitle, contentEditor)
    // throttledSaveToServer();
  }

  const handleCancel = (event) => {
    event.preventDefault();
  }



  const handleChangeInput = (id, event) => {
    const newcontent = content.map(i => {
      // console.log(id, event, i)
      if (id === i.id) {
        i[event.target.name] = event.target.value
      }
      return i;
    })

    setcontent(newcontent);
  }

  const handleCheckboxSelection = (idx, event) => {
    const newcontentSections = contentSections.map(i => {

      if (idx === i.idx) {
        i[event.target.name] = event.target.checked
      }
      return i;
    })
    setcontentSections(newcontentSections);
  }

  const handleSectionChangeInput = (idx, event) => {
    const newcontentSections = contentSections.map(i => {
      if (idx === i.idx) {
        i[event.target.name] = event.target.value
      }
      return i;
    })
    setcontentSections(newcontentSections);
  }

    const handleContentInput = (idx, event) => {
    const newcontentSections = contentSections.map(i => {
      if (idx === i.idx) {
        i['content'] = event
      }
      return i;
    })

    setcontent(newcontentSections);
  }

  const handleSummaryInput = (idx, event) => {
    const newcontentSections = contentSections.map(i => {
      if (idx === i.idx) {
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
    // console.log(props)
    setcontentSections([...contentSections, { idx: contentSections.length, isSummarySelected: false, summary: null, title: "", isTitleSelected: false, content: null, content: null, sectionType: '', sectionTypes: [{ id: 1, name: "hidden" }, { id: 2, name: "visible" }] }]  )
  }
  const handleRemoveFields = idx => {
    const values = [...contentSections];
    values.splice(values.findIndex(value => 
      value.idx === idx
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
                    onChange={event =>
                      handleCheckboxSelection(sectionField.idx, event)
                    }
                    name="isTitleSelected"
                    color="primary"
                  />
                }
                label={constants.INCLUDE_TITLE}
              />        
              <FormControl className={classes.formControl}>
                <Select
                  value={sectionField.sectionType}
                  onChange={(e) =>
                    handleSectionChangeInput(sectionField.idx, e)
                  }
                  name="sectionType"
                >
                  {options}
                </Select>

                <FormHelperText>Section Type</FormHelperText>
              </FormControl>
            </FormGroup>
            {sectionField.isTitleSelected ? <TextField
              fullWidth
              fullWidth
              name="title"
              label="Title"
              value={sectionField.title}
              onChange={event => {
                handleSectionChangeInput(sectionField.idx, event)
              }}
            /> : null }

            {/* {console.log(sectionField )} */}
            {sectionField.isSummarySelected ? <SummaryEditor
              name="summary"
              label="Summary"
              value={sectionField.summary}
              onChange={e =>
                handleSummaryInput(sectionField.idx, e)
              }
            /> : null }


            <TinyEditor
              name="content"
              label="Content"
              value={sectionField.content}
              onChange={e =>
                handleContentInput(sectionField.idx, e)
              }
            />
            
            <IconButton disabled={contentSections.length === 1} onClick={() => handleRemoveFields(sectionField.idx)}>
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
        <Button color="secondary" variant="contained" type="submit"  onClick={(e) => { handlePublish(e) }}>
          Publish
        </Button>
        <Button color="primary" variant="contained" type="submit" onClick={(e) => { handleSubmit(e) }} >
          Save
        </Button>
        <Button color="default" variant="contained" type="reset" onClick={(e) => { handleCancel(e) }}>
          Cancel
        </Button>
      </form>
    </Container>

  );
}

const mapStateToProps = state => ({
  content: state.content,
  auth: state.auth
});
export default connect(mapStateToProps, { saveContentToServer })(ContentEdit);