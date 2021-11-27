import React, { useState, useRef, useEffect } from 'react';
import { ArrayInput, SimpleFormIterator, DateInput, TextInput, Edit, SimpleForm, FormDataConsumer } from 'react-admin';
import RichTextInput from 'ra-input-rich-text';


import Editor from './tinyeditor'
const RaSections = (props: any) => {

    return(
        <div>
            {console.log(props)}
        
        <ArrayInput source="sections" > 
            
            <SimpleFormIterator>
                
                <TextInput source="title" label="Title" />
                {/* <TextInput source="body" label="Body" /> */}
                <RichTextInput source="summary" />
                    <FormDataConsumer>
                        {({ getSource, scopedFormData }) => {
                            return (
                                <Editor
                                    source={getSource('body')}
                                    record={scopedFormData}
                                />
                            );
                        }}
                    </FormDataConsumer>
            </SimpleFormIterator>
        </ArrayInput>
            
        </div>
    )
}

export default RaSections;