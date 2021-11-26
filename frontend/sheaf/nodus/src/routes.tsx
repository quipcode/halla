import * as React from "react";
import { Route } from 'react-router-dom';

import {ArticleList} from './articles'

export default [
    <Route path="/articles" element={<ArticleList/>} />
]

