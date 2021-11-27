import React, { useState, useRef, useEffect } from 'react';
import { ArrayInput, SimpleFormIterator, DateInput, TextInput, Edit, SimpleForm, FormDataConsumer } from 'react-admin';
import RichTextInput from 'ra-input-rich-text';
import { useGetManyReference } from 'react-admin';

// const PostComments = ({ post_id }) => {
//     const { data, ids, loading, error } = useGetManyReference(
//         'comments',
//         'post_id',
//         post_id,
//         { page: 1, perPage: 10 },
//         { field: 'published_at', order: 'DESC' },
//         {},
//         'posts',
//     );
//     if (loading) { return <Loading />; }
//     if (error) { return <p>ERROR</p>; }
//     return (
//         <ul>
//             {ids.map(id =>
//                 <li key={id}>{data[id].body}</li>
//             )}
//         </ul>
//     );
// };

const ArticleSections = ({ article_id }) => {
    const { data, ids, loading, error } = useGetManyReference(
        'sections',
        'id',
        article_id,
        { page: 1, perPage: 10 },
        { field: 'idx', order: 'DESC' },
        {},
        'articles',
    );
    if (loading) { return < p>Loading </p>; }
    if (error) { return <p>ERROR</p>; }
    return (
        <ul>
            
            {ids.map(id =>
                
                <li key={id}> {console.log(data[id])} {data[id].body}</li>
            )}
        </ul>
    );
};

import Editor from './tinyeditor'
const MyTextInput = props => (
    <div className="special-input">
        <TextInput {...props} />
    </div>
)
const MyTinyMceEditorInput = props => (
    <div className="special-input">
        <Editor {...props}/>
    </div>
)
const RaSections = (props: any) => {

    return(
        <div >
            
        
        <ArrayInput source="sections"  > 
            
                <SimpleFormIterator >
                    {console.log(props)}
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
                    <TextInput source="title" />
                    {/* <ArticleSections/> */}
{/*                 
                <TextInput source="title" />
                <TextInput source="body"  />
                <RichTextInput source="summary" />
                <MyTextInput source="title" />
                    <MyTinyMceEditorInput source="body" {...props}/> */}
                    {/* <FormDataConsumer>
                        {({ getSource, scopedFormData }) => {
                            return (
                                <Editor
                                    source={getSource('body')}
                                    record={scopedFormData}
                                />
                            );
                        }}
                    </FormDataConsumer> */}
            </SimpleFormIterator>
        </ArrayInput>
            
        </div>
    )
}

export default RaSections;