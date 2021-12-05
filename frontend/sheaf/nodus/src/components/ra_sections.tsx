import React, { useState, useRef, useEffect } from 'react';
import { ArrayInput, SimpleFormIterator, ReferenceInput, ReferenceField, AutocompleteInput, SelectInput,  DateInput, TextInput, Edit, SimpleForm, FormDataConsumer, TextField } from 'react-admin';
import RichTextInput from 'ra-input-rich-text';
import { useGetManyReference } from 'react-admin';
import Article from './article';

const RaSections = () => {
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