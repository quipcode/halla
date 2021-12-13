import { fetchUtils } from 'react-admin';
import { stringify } from 'querystring';
import { constants } from './utils/constants'
import { API_ROOT } from './utils/enironmentConstants'


const apiUrl = API_ROOT
// const httpClient = fetchUtils.fetchJson;
const httpClient = (url: string, options: any) => {
    if (!options.headers) {
        options.headers = new Headers({ Accept: 'application/json' });
        // options.headers = new Headers({ 'Access-Control-Allow-Origin': "*"});
    }
    // add your own headers here
    options.headers.set("Access-Control-Expose-Headers", "Content-Range")
    options.headers.set("Access-Control-Expose-Headers", "X-Total-Count")
    // Access-Control-Expose-Headers: X-Total-Count
    // Access-Control-Expose-Headers: Content-Range
    options.headers.set('Access-Control-Allow-Origin', "*");
    return fetchUtils.fetchJson(url, options);
}
// mineHeaders.append('Access-Control-Allow-Origin', 'http://localhost:3001');
const defineOptions = () => {
    let authToken = localStorage.getItem("token")
    let mineHeaders = new Headers()
    mineHeaders.set('Authorization', `Bearer ${authToken}`)
    let options = {} as any;
    options.headers = mineHeaders
    return options;
}


export default {
    getList: (resource: string, params: any) => {
        let options = defineOptions()
        console.log("in get list", resource, params)
        const { page, perPage } = params.pagination;
        const { field, order } = params.sort;

        const query = {
            sort: JSON.stringify([field, order]),
            range: JSON.stringify([(page - 1) * perPage, page * perPage - 1]),
            filter: JSON.stringify(params.filter),
        };
        const url = `${apiUrl}/${resource}/`;




        // httpClient(url, options).then(({ headers, json }) => (
        //    {
        //         data:json,
        //         total:10
        //     }
        // )).then((json) => console.log(json))
        return httpClient(url, options).then(({ headers, json }) => (
            {
                data: json,
                total: 10
            }
        ))

        // return httpClient(url, options).then(({ headers, json }) => ({
        //     data: json,
        //     total: parseInt(headers.get('content-range').split('/').pop(), 10),
        // }));
    },

    getOne: (resource: string, params: any) => {
        const url = `${apiUrl}/${resource}/${params.id}`
        let options = defineOptions()
        console.log("in get one")

        return httpClient(url, options).then(({ json }) => ({
            data: json,
        }))
    },
    // httpClient(`${apiUrl}/${resource}/${params.id}`).then(({ json }) => ({
    //     data: json,
    // })),

    getMany: (resource: string, params: any) => {
        let options = defineOptions()
        console.log("in get many", resource, params, options)
        // const { page, perPage } = params.pagination;
        // const { field, order } = params.sort;
        // options.headers.set('Content-Type', 'application/json')
        // options.headers.set("Access-Control-Allow-Origin", "*")

        // options.headers.set("Access-Control-Allow-Origin", "http://localhost:5000")
        const url = `${apiUrl}/${resource}/`;
        return httpClient(url, options).then(({ json }) => (
            {
                data: json,
                total: 10
            }
        ))
        // const query = {
        //     filter: JSON.stringify({ ids: params.ids }),
        // };
        // const url = `${apiUrl}/${resource}?${stringify(query)}`;
        // return httpClient(url).then(({ json }) => ({ data: json }));
    },

    getManyReference: (resource: string, params: any) => {
        let options = defineOptions()
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
        const queryJustFilter = {
            filter: JSON.stringify({
                ...params.filter,
                [params.target]: params.id,
            }),
        };
        // const url = `${apiUrl}/${resource}?${stringify(query)}`;
        const url = `${apiUrl}/${resource}/?${stringify(queryJustFilter)}`;
        console.log("in getmanyreference")

        httpClient(url, options).then(({ headers, json }) => (
            {
                data: json,
                total: 10
            }
        )).then((json) => console.log(json))

        return httpClient(url, options).then(({ headers, json }) => ({
            data: json,
            total: 10
            //  parseInt(headers.get('content-range').split('/').pop(), 10),
        }));
    },

    update: (resource: string, params: any) => {
        let options = defineOptions()
        options.headers.set('Content-Type', 'application/json')
        options.headers.set("Access-Control-Allow-Origin", "*")
        // Access-Control-Allow-Origin: *
        options.method = 'PUT'
        options.body = JSON.stringify({ article: params.data })
        console.log("in update", resource, params)
        return httpClient(`${apiUrl}/${resource}/${params.id}`, options)
            .then(({ json }) => (
                { data: json.article })

            )
    }
    ,

    updateMany: (resource: string, params: any) => {
        let options = defineOptions()
        const query = {
            filter: JSON.stringify({ id: params.ids }),
        };
        console.log("in updatemany")
        return httpClient(`${apiUrl}/${resource}?${stringify(query)}`, {
            method: 'PUT',
            body: JSON.stringify(params.data),
        }).then(({ json }) => ({ data: json }));
    },

    create: (resource: string, params: any) => {
        let options = defineOptions()
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
