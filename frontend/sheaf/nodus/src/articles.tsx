import * as React from "react";
// import { useMediaQuery } from '@material-ui/core';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import {
    List,
    Datagrid,
    TextField,
    ReferenceField,
    EditButton,
    Edit,
    Create,
    SimpleForm,
    ReferenceInput,
    SelectInput,
    TextInput,
    SimpleList,
    BooleanInput,
    BooleanField,
    Show,
    SimpleShowLayout,
    RichTextField,
    TabbedForm,
    FormTab,
    required,
    DateInput,
    NumberInput,
    number,
    minValue,
    ReferenceManyField,
    DateField,
    ArrayInput,
    SimpleFormIterator,
    Toolbar,
    SaveButton,
    DeleteButton,
    Layout,
    Button
} from 'react-admin';
import { Field } from 'react-final-form';
import RichTextInput from 'ra-input-rich-text';

// import {
//     TextField,
    
// } from "@material-ui/core";

import {TextField as MuiTextField} from '@mui/material';

import Article from "./components/article";
import Editor from './components/tinyeditor'
import Sections from './components/sections'
import RaSections from "./components/ra_sections";

import { useField } from 'react-final-form';

const BoundedTextField = ({ name, label }) => {
    const {
        input: { onChange },
        meta: { touched, error }
    } = useField(name);
    return (
        <MuiTextField
            name={name}
            label={label}
            onChange={onChange}
            error={!!(touched && error)}
            helperText={touched && error}
        />
    );
};
const LatLngInput = () => (
    <span>
        <BoundedTextField name="lat" label="latitude" />
        &nbsp;
        <BoundedTextField name="lng" label="longitude" />
    </span>
);

// const BoundedEditor =({name, label}) =>{
//     const {
//         input: { onChange },
//         meta: { touched, error }
//     } = useField(name);
//     return (
//         <Editor
//             name={name}
//             label={label}
//             onChange={onChange}
//         />
//     )
// }

// const EditorInput = () => (
//     <span>
//         <BoundedEditor name="obama" label="Obama"/>
//     </span>
// )

const BoundedSections = ({ name, label }) => {
    const {
        input: { onChange },
        meta: { touched, error }
    } = useField(name);
    return (
        <Sections
            name={name}
            label={label}
            onChange={onChange}
        />
    )
}

const SectionInput = () => (
    <span>
        <BoundedSections name="obama" label="Obama" />
    </span>
)

// const ArticlePanel = ({ id, record, resource }) => (
//     <div dangerouslySetInnerHTML={{ __html: record.summary }} />
// );

const ArticleShow = (props: any) => (
    <Show
        {...props}
        /* disable the app title change when shown */
        title=" "
    >
        <SimpleShowLayout>
            <RichTextField source="summary" />
        </SimpleShowLayout>
    </Show>
);

const ArticleEdi = (props: any) => (
    <Edit
        {...props}
        /* disable the app title change when shown */
        title=" "
    >
        <SimpleForm>
            <TextInput source="title" />
            <TextInput source="metaTitle" />
            <TextInput source="slug" />
            <RichTextInput source="summary" />
        </SimpleForm>
    </Edit>
);

const TabbedArticle = (props: any) => (
    
    <Edit
        
        {...props}
        title={`: ${props.record.title}`}
    // title="hi"
    //     title={props.record.title}
    >
        
        <TabbedForm syncWithLocation={false}>
            <FormTab label="rasections">
                <RaSections {...props} />
            </FormTab>
            <FormTab label="Meta">
                <TextInput disabled label="Id" source="id" />
                <TextInput source="title" validate={required()} />
                <TextInput multiline source="metaTitle" validate={required()} />
                <TextInput source="slug" />
                <RichTextInput source="summary" validate={required()} addLabel={false} />
            </FormTab>
        </TabbedForm>
    </Edit>
)



export const ArticleList = (props: any) => {
    const theme = useTheme();
    const isNotSmall = useMediaQuery(theme.breakpoints.up('sm'));
    
    return (
        <List {...props}>
            
            {isNotSmall ? (
                
                <Datagrid
                    expand={<TabbedArticle {...props} />}
                // isRowExpandable={row => row.has_detail}

                >
                    <TextField source="id" />
                    <ReferenceField label="User" source="userId" reference="users">
                        <TextField source="name" />
                    </ReferenceField>
                    <TextField source="title" />
                    <TextField source="metaTitle" />
                    <TextField source="slug" />
                    {/* <TextField source="summary" /> */}
                    <BooleanField source="published" />
                    {/* <BooleanInput label="Commentable" source="published" /> */}
                    {/* <BooleanInput source="published"/> */}
                    <EditButton />
                </Datagrid>

            ) : (
                <SimpleList
                    primaryText={record => record.title}
                    secondaryText={record => `${record.views} views`}
                    tertiaryText={record => new Date(record.published_at).toLocaleDateString()}
                />
            )
            } 
        </List>
    );
}

// const ArticleTitle = ({ record }) => {
//     return <span>Article {record ? `"${record.title}"` : ''}</span>;
// };

const ArticleTitle =  (record: any) => (
    <span>Article {record ? `"${record.title}"` : ''}</span>
)

const deactivateButtonText = <p> b         Click Me</p>

const DeactivateButton = (props: any) => {

    return (
    // <Box sx={{ flexGrow: 1 }} />
    <Button children={deactivateButtonText} />
    )
}

const ArticleEditToolbar = (props: any) => (
    <Toolbar {...props} >
        <SaveButton />
        <DeactivateButton/>
    </Toolbar>
);

    


export const ArticleEdit = (props: any) => (
    <Edit title={<ArticleTitle />} {...props}>
        <SimpleForm toolbar={<ArticleEditToolbar />}>
            <TextInput disabled source="id" />
            {/* <ReferenceInput source="userId" reference="users">
                <SelectInput optionText="name" />
            </ReferenceInput> */}
            <TextInput source="title" />
            <RichTextInput options={{
                modules: {
                    history: { // History module
                        delay: 2000,
                        maxStack: 500,
                        userOnly: true
                    }
                },
                theme: "snow"
            }} source="summary" />
            <BooleanInput label="Publish" source="published" />
            <RaSections {...props}/>
        </SimpleForm>
    </Edit>
);

export const ArticleCreate = (props: any) => (
    <Create {...props} >
        <SimpleForm>
            {/* <ReferenceInput source="userId" reference="users" >
                <SelectInput optionText="name" />
            </ReferenceInput > */}
            <TextInput source="title" />
            <TextInput source="metaTitle" />
            <TextInput multiline source="slug" />
            <RichTextInput options={{
                modules: {
                    history: { // History module
                        delay: 2000,
                        maxStack: 500,
                        userOnly: true
                    }
                },
                theme: "snow"
            }} source="summary" />
            {/* <TextInput multiline source="body" /> */}
        </SimpleForm >
    </Create >
);