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
    DateField
} from 'react-admin';
import { Field } from 'react-final-form';
import RichTextInput from 'ra-input-rich-text';

import Article from "./components/article";
import Editor from './components/tinyeditor'

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
            <FormTab label="Meta">
                <TextInput disabled label="Id" source="id" />
                <TextInput source="title" validate={required()} />
                <TextInput multiline source="metaTitle" validate={required()} />
                <TextInput source="slug" />
            </FormTab>
            <FormTab label="summary">

                <RichTextInput source="summary" validate={required()} addLabel={false} />

            </FormTab>
            <FormTab label="latlongs">
                <Edit {...props}>
                    <SimpleForm >
                    <span>
                        <Field name="lat" component="input" type="number" placeholder="latitude"  />
                        &nbsp;
                        <Field name="lng" component="input" type="number" placeholder="longitude" />
                    </span>
                    </SimpleForm>
                </Edit>
            </FormTab>
            <FormTab label="sections">
              
                <SimpleForm fullWidth>
                    <Article/>
                    </SimpleForm>
             
            </FormTab>
            {/* <FormTab label="Miscellaneous">
                <TextInput label="Password (if protected post)" source="password" type="password" />
                <DateInput label="Publication date" source="published_at" />
                <NumberInput source="average_note" validate={[number(), minValue(0)]} />
                <BooleanInput label="Allow comments?" source="commentable" defaultValue />
                <TextInput disabled label="Nb views" source="views" />
            </FormTab> */}
            {/* <FormTab label="comments">
                <ReferenceManyField reference="comments" target="post_id" addLabel={false}>
                    <Datagrid>
                        <TextField source="body" />
                        <DateField source="created_at" />
                        <EditButton />
                    </Datagrid>
                </ReferenceManyField>
            </FormTab> */}
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
                    expand={<TabbedArticle />}
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
    


export const ArticleEdit = (props: any) => (
    <Edit title={<ArticleTitle />} {...props}>
        <SimpleForm>
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