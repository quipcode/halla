import { fetchUtils } from 'react-admin';
import { stringify } from 'query-string';
import { constants } from './utils/constants'

// const apiUrl = constants.API_BASE_URL
const apiUrl = "http://localhost:5000/api"
// const apiUrl = 'https://my.api.com/';
const httpClient = fetchUtils.fetchJson;

import axios from "axios";
import IAllArticlesData from './types/article.types';



export default {
    getList: (resource, params) => {
        const { page, perPage } = params.pagination;
        const { field, order } = params.sort;
        const query = {
            sort: JSON.stringify([field, order]),
            range: JSON.stringify([(page - 1) * perPage, page * perPage - 1]),
            filter: JSON.stringify(params.filter),
        };
        const url = `${apiUrl}/${resource}/`;
        let authToken = localStorage.getItem("token")
        let mineHeaders = new Headers()
        mineHeaders.set('Authorization', `Bearer ${authToken}`)
        const options = {} as any;
        options.headers = mineHeaders
        // console.log(options.headers.get("Authorization"))
        // let options = new RequestOptions({ headers: headers });
        // const options = {} as Options
        // const auth = {} as Headers
        // auth.Authorization = `Bearer ${authToken}`
        // options.Headers = auth;
        
        
        // console.log(options)
        // return axios.create({
        //     baseURL: apiUrl,
        //     headers: {
        //         "Content-type": "application/json",
        //         "Authorization": `Bearer ${authToken}`,
        //         "Access-Control-Allow-Origin": "*"
        //     }
        // }).get("/articles").then((response: any) => {
        //     // this.setState({
        //     //     tutorials: response.data
        //     // });
        //     console.log(response.data);
        // })
        //     .catch((e: Error) => {
        //         console.log(e);
        //     });
        // ;
        return httpClient(url, options).then(({ headers, json }) => (
            // console.log(headers.entries().next())
            // console.log(headers.has('content-range'))
            {
                data:json,
                total:10
            }
     
        ))
        // return httpClient(url, options).then(({ headers, json }) => ({
        //     data: json,
        //     total: parseInt(headers.get('content-range').split('/').pop(), 10),
        // }));
    },

    getOne: (resource, params) =>{
        const url = `${apiUrl}/${resource}/${params.id}`
        const options = {} as any;
        let authToken = localStorage.getItem("token")
        let mineHeaders = new Headers()
        mineHeaders.set('Authorization', `Bearer ${authToken}`)
        options.headers = mineHeaders
    
    
        return httpClient(url, options).then(({ json }) => ({
            data: json,
        }))},
        // httpClient(`${apiUrl}/${resource}/${params.id}`).then(({ json }) => ({
        //     data: json,
        // })),

    getMany: (resource, params) => {
        const query = {
            filter: JSON.stringify({ ids: params.ids }),
        };
        const url = `${apiUrl}/${resource}?${stringify(query)}`;
        return httpClient(url).then(({ json }) => ({ data: json }));
    },

    getManyReference: (resource, params) => {
        const { page, perPage } = params.pagination;
        const { field, order } = params.sort;
        const query = {
            sort: JSON.stringify([field, order]),
            range: JSON.stringify([(page - 1) * perPage, page * perPage - 1]),
            filter: JSON.stringify({
                ...params.filter,
                [params.target]: params.id,
            }),
        };
        const url = `${apiUrl}/${resource}?${stringify(query)}`;

        return httpClient(url).then(({ headers, json }) => ({
            data: json,
            total: parseInt(headers.get('content-range').split('/').pop(), 10),
        }));
    },

    update: (resource, params) =>
        httpClient(`${apiUrl}/${resource}/${params.id}`, {
            method: 'PUT',
            body: JSON.stringify(params.data),
        }).then(({ json }) => ({ data: json })),

    updateMany: (resource, params) => {
        const query = {
            filter: JSON.stringify({ id: params.ids }),
        };
        return httpClient(`${apiUrl}/${resource}?${stringify(query)}`, {
            method: 'PUT',
            body: JSON.stringify(params.data),
        }).then(({ json }) => ({ data: json }));
    },

    create: (resource, params) =>
        httpClient(`${apiUrl}/${resource}`, {
            method: 'POST',
            body: JSON.stringify(params.data),
        }).then(({ json }) => ({
            data: { ...params.data, id: json.id },
        })),

    delete: (resource, params) =>
        httpClient(`${apiUrl}/${resource}/${params.id}`, {
            method: 'DELETE',
        }).then(({ json }) => ({ data: json })),

    deleteMany: (resource, params) => {
        const query = {
            filter: JSON.stringify({ id: params.ids }),
        };
        return httpClient(`${apiUrl}/${resource}?${stringify(query)}`, {
            method: 'DELETE',
            body: JSON.stringify(params.data),
        }).then(({ json }) => ({ data: json }));
    },
};
