import { fetchUtils } from 'react-admin';
import { stringify } from 'querystring';
import { constants } from './utils/constants'
import { API_ROOT } from './utils/enironmentConstants'


const apiUrl = API_ROOT
const httpClient = fetchUtils.fetchJson;

let authToken = localStorage.getItem("token")
let mineHeaders = new Headers()
mineHeaders.set('Authorization', `Bearer ${authToken}`)
const options = {} as any;
options.headers = mineHeaders
export default {
    getList: (resource:string , params: any) => {
        const { page, perPage } = params.pagination;
        const { field, order } = params.sort;
        
        const query = {
            sort: JSON.stringify([field, order]),
            range: JSON.stringify([(page - 1) * perPage, page * perPage - 1]),
            filter: JSON.stringify(params.filter),
        };
        const url = `${apiUrl}/${resource}/`;
   
   
        return httpClient(url, options).then(({ headers, json }) => (
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

    getOne: (resource:string, params: any) =>{
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

    getMany: (resource:string, params:any) => {
        const query = {
            filter: JSON.stringify({ ids: params.ids }),
        };
        const url = `${apiUrl}/${resource}?${stringify(query)}`;
        return httpClient(url).then(({ json }) => ({ data: json }));
    },

    getManyReference: (resource:string, params:any) => {
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

    update: (resource: string, params: any) =>{
        options.headers.set('Content-Type', 'application/json' )
        options.method = 'PUT'
        options.body = JSON.stringify({ article: params.data})

        return httpClient(`${apiUrl}/${resource}/${params.id}`,options )
        .then(({ json }) => (
            { data: json.article })
            
        )
    }
    ,

    updateMany: (resource: string, params: any) => {
        const query = {
            filter: JSON.stringify({ id: params.ids }),
        };
        return httpClient(`${apiUrl}/${resource}?${stringify(query)}`, {
            method: 'PUT',
            body: JSON.stringify(params.data),
        }).then(({ json }) => ({ data: json }));
    },

    create: (resource: string, params: any) =>{
        options.headers.set('Content-Type', 'application/json')
        options.method = 'POST'
        options.body = JSON.stringify({ article: params.data })


        return httpClient(`${apiUrl}/${resource}`, options
        ).then(({ json }) => ({
            data: { ...params.data, id: json.id },
        }))

        // httpClient(`${apiUrl}/${resource}`, {
        //     method: 'POST',
        //     body: JSON.stringify(params.data),
        // }).then(({ json }) => ({
        //     data: { ...params.data, id: json.id },
        // }))
    },

    delete: (resource: string, params: any) =>
        httpClient(`${apiUrl}/${resource}/${params.id}`, {
            method: 'DELETE',
        }).then(({ json }) => ({ data: json })),

    deleteMany: (resource: string, params: any) => {
        const query = {
            filter: JSON.stringify({ id: params.ids }),
        };
        return httpClient(`${apiUrl}/${resource}?${stringify(query)}`, {
            method: 'DELETE',
            body: JSON.stringify(params.data),
        }).then(({ json }) => ({ data: json }));
    },
};
