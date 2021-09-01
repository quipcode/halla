import React, { useState, useRef } from 'react';
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

  

  const [sectionFields, setSectionFields] = useState([
    { id: uuidv4(), isSummaryChecked: false, summary: null, content: null, summaryType: [1, 2, 3] }
  ])
  const [inputFields, setInputFields] = useState([
    { id: uuidv4(), contentTitle: null, ...sectionFields },
  ]);

  const [displayIsSaving, setDisplayIsSaving] = useState(false);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("InputFields", inputFields);
  };

  const handleChangeInput = (id, event) => {
    const newInputFields = inputFields.map(i => {
      if (id === i.id) {
        i[event.target.name] = event.target.value
      }
      return i;
    })

    setInputFields(newInputFields);
  }

    const handleContentInput = (id, event) => {
    const newSectionFields = sectionFields.map(i => {
      if (id === i.id) {
        i['content'] = event
      }
      return i;
    })

    setInputFields(newSectionFields);
  }


  const handleAddFields = () => {
    setSectionFields([...sectionFields, { id: uuidv4(), isSummaryChecked: false, summary: null, content: null, summaryType: [1, 2, 3] } ])
  }
  const handleRemoveFields = id => {
    const values = [...inputFields];
    values.splice(values.findIndex(value => value.id === id), 1);
    setInputFields(values);
  }

  return (

    <Container>
      <h1>Add New Member</h1>
      <form className={classes.root} onSubmit={handleSubmit}>
        <StatusBar
          displayIsSaving={displayIsSaving}
        />

        <TextField
          fullWidth
          fullWidth
          id={inputFields.id}
          name="contentTitle"
          label="Content Title"
          value={inputFields.contentTitle}
          onChange={event => {
            handleChangeInput(inputFields[0].id, event)
          }}
        />
        {sectionFields.map(sectionField => (
          <div key={sectionField.id}>
            <TextField
              name="firstName"
              label="First Name"
              variant="filled"
              value={sectionField.firstName}
              onChange={event => handleChangeInput(sectionField.id, event)}
            />
            <TextField
              name="lastName"
              label="Last Name"
              variant="filled"
              value={sectionField.lastName}
              onChange={event => handleChangeInput(sectionField.id, event)}
            />
            <TinyEditor
              name="content"
              label="Content"
              value={sectionField.content}
              onChange={e =>
                handleContentInput(sectionField.id, e)
              }
            />
            {/* <TinyEditor /> */}
            <IconButton disabled={inputFields.length === 1} onClick={() => handleRemoveFields(sectionField.id)}>
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