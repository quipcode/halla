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
  const sampleSections = { idx: 0, isSummarySelected: false, summary: null, title: "", isTitleSelected: true, content: null, sectionTypeId: 1, sectionTypes: [ {id: 1, name: "Visible"}, {id: 2, name: "Hidden"}] }
  const options = sampleSections.sectionTypes.map((d, i) => 
    <MenuItem value={d.id} key={i}>{d.name}</MenuItem>
  );

  const [sections, setSections] = useState([
    sampleSections
  ])
  const [content, setcontent] = useState(
    { sections },
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
  //   console.log("sections", sections);
  // };

  const handlePublish = (event) => {
    setDisplayIsSaving(true)
    // throttledSaveToServer();
    console.log("publish was pressed: ", content, sections)
    event.preventDefault();
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    // console.log("content", content);
    // console.log("sections", sections);
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
    const newsections = sections.map(i => {

      if (idx === i.idx) {
        i[event.target.name] = event.target.checked
      }
      return i;
    })
    setSections(newsections);
  }

  const handleSectionChangeInput = (idx, event) => {
    const newsections = sections.map(i => {
      if (idx === i.idx) {
        i[event.target.name] = event.target.value
      }
      return i;
    })
    setSections(newsections);
  }

    const handleContentInput = (idx, event) => {
    const newsections = sections.map(i => {
      if (idx === i.idx) {
        i['content'] = event
      }
      return i;
    })

    setcontent(newsections);
  }

  const handleSummaryInput = (idx, event) => {
    const newsections = sections.map(i => {
      if (idx === i.idx) {
        i['summary'] = event
      }
      return i;
    })

    setcontent(newsections);
  }
  
  useEffect(() => {
    setcontent({ ...content, sections })
  }, [sections])

  const handleAddFields = () => {
    // console.log(props)
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

  return (
    
    <Container>
      
      <form className={classes.root} onSubmit={handleSubmit}>
        <StatusBar
          displayIsSaving={displayIsSaving}
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
                  value={sectionField.sectionTypeId}
                  onChange={(e) =>
                    handleSectionChangeInput(sectionField.idx, e)
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