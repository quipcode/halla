import React, { useState, useRef, useEffect } from 'react';
import Container from '@mui/material/Container';
// import TextField from '@mui/material/TextField';
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

import {TextField} from 'react-admin'

import RichTextInput from 'ra-input-rich-text';

import { constants } from '../utils/constants';
import StatusBar from './statusbar';
import TinyEditor from './tinyEditor';


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
            // margin: theme.spacing(1),
        },
    }),
    button: {
        // margin: theme.spacing(1),
    }
}));

const Sections = (props: any) => {

    const sampleSections = { idx: 0, isSummarySelected: false, summary: {}, title: "", body: "", isTitleSelected: true, sectionTypeId: 1, sectionTypes: [{ id: 1, name: "Visible" }, { id: 2, name: "Hidden" }] }

    const [sections, setSections] = useState([
        sampleSections
    ])

    const handleCheckboxSelection = (idx: number, event: React.FormEvent<HTMLInputElement>) => {
        const newSectionsArray = sections.map((i: any) => {
            if (idx === i.idx) {
                i[event.currentTarget.name] = event.currentTarget.checked     
            }
            return i;
        })
        setSections(newSectionsArray);
        // article.sections = newSectionsArray

    }

    const handleSectionInput = (idx: number, event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const newSectionsArray = sections.map((i: any) => {
            if (idx === i.idx) {
                i[event.currentTarget.name] = event.currentTarget.value
            }
            return i;
        })
        setSections(newSectionsArray);
        // content.sections = newSectionsArray
    }

    return (
        <Container>
            <StatusBar />

            {sections.map(sectionField => (
                <div key={sectionField.idx}>
                    <FormGroup row>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={sectionField.isSummarySelected}
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
                        {/* <FormControl>
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
                </FormControl> */}
                    </FormGroup>
                    <FormGroup>
                        {sectionField.isTitleSelected ? <TextField
                            fullWidth
                            source="article.section.title"
                            label="Title"
                            
                            // value={sectionField.title}
                            onChange={(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
                                handleSectionInput(sectionField.idx, event)
                            }}
                        /> : null}

                        {sectionField.isSummarySelected ?
                            <RichTextInput
                                source="summary"
                                label="Summary"
                                
                                onChange={(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
                                    handleSectionInput(sectionField.idx, event)
                                }}
                            // height={300}
                            // value={sectionField.summary}
                            />

                            // <TinyEditor
                            //     name="summary"
                            //     label="Summary"
                            //     height={300}
                            //     value={sectionField.summary}
                            // onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
                            //     handleEditorInput(sectionField.idx, e, "summary")
                            // }
                            // /> 
                            : null}

                    </FormGroup>
                    {/* <TinyEditor
                            name="body"
                            label="Body"
                            value={sectionField.body}
                            height={600}
                        // onChange={(e: React.SyntheticEvent<any, Event>) =>
                        //     handleEditorInput(sectionField.idx, e, "body")
                        // }
                        /> */}

                    <IconButton disabled={sections.length === 1}
                    //  onClick={() => handleRemoveFields(sectionField.idx)}
                    >
                        <RemoveIcon />
                    </IconButton>
                    <IconButton
                    // onClick={handleAddFields}
                    >
                        <AddIcon />
                    </IconButton>
                </div>
            ))}
        </Container>
    )
}

export default Sections;