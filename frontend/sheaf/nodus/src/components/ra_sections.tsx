import React, { useState, useRef, useEffect } from 'react';
import { ArrayInput, SimpleFormIterator, ReferenceInput, ReferenceField, Datagrid, ReferenceManyField, ArrayField, AutocompleteInput, SelectInput, DateInput, TextInput, Edit, SimpleForm, FormDataConsumer, TextField, RichTextField  } from 'react-admin';
import RichTextInput from 'ra-input-rich-text';
import { useGetManyReference } from 'react-admin';
import Article from './article';

const RaSections = (props: any) => {
    return(
        <div>
            <ReferenceField
                label="Article"
                source="id"
                reference="articles"
            >
                <TextField source="id"/>
            </ReferenceField>
            <p>hi</p>
            
                <ReferenceManyField
                    label="Sections"
                    source="id"
                    reference="articlesections"
                    target="article_id"
                >
                <Datagrid>
                    <TextField source="id" />
                    <TextField source="title" />
                    <TextField source="summary" />
                    <RichTextField  source="body" />

                </Datagrid>
                    {/* <ArrayField source="articlesections">
                        <TextField source="title" />

                    </ArrayField> */}

                </ReferenceManyField>

            <TextInput disabled label="Id" source="id" />
            <ArrayInput source="sections">
                <SimpleFormIterator >
                    <TextInput source="title" />
                    <TextInput source="summary" multiline />
                    <RichTextInput source="body" />
                    <FormDataConsumer>
                        {({ getSource, scopedFormData }) => {
                            return (
                                <TextField
                                    source={getSource('id')}
                                    record={scopedFormData}
                                />
                            );
                        }}
                    </FormDataConsumer>
                </SimpleFormIterator>
            </ArrayInput>


            {/* <ArrayInput source="articlesections" >
                
                <SimpleFormIterator getItemLabel={(index) => `${index + 1}. link`}>
                    <FormDataConsumer>
                        {({ getSource, scopedFormData }) => {
                            return (
                                <ReferenceField
                                    label="Article Section"
                                    source="id"
                                    reference="articlesections"
                                >
                                    <TextInput source="id" />
                                </ReferenceField>
                            );
                        }}
                    </FormDataConsumer>

                    <TextInput source="title"/>
                    <TextInput source="summary" multiline/>
                    <RichTextInput source="body"/>
                </SimpleFormIterator>
            </ArrayInput> */}

            
        </div>

    )
}

export default RaSections;