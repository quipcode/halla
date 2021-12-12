import { API_ROOT} from './utils/enironmentConstants'

export const authProvider = {
    // authentication
    login: (user: { username: string , password : string }) => {
        let url = API_ROOT
        console.log( url)
        url += '/auth/login'
        let mineHeaders = new Headers()
        mineHeaders.set('Content-Type', 'application/json')
        // mineHeaders.set('Access-Control-Allow-Origin', '*');
        mineHeaders.append("Access-Control-Allow-Origin", "http://localhost:5000")
        // Access-Control-Allow-Origin : *
        console.log("in login")
        
        mineHeaders.forEach((v,k) => console.log(v, k))
        // console.log(mineHeaders.)
        const request = new Request(
            url,
            {
                method: 'POST',
                body: JSON.stringify({ username: user.username, password: user.password }),
                // headers: new Headers({ 'Content-Type': 'application/json' }),
                headers: mineHeaders
            }
        );
        return fetch(request)
            .then((response) => {
                if (response.status < 200 || response.status >= 300) {
                    throw new Error(response.statusText);
                }
                return response.json();
            })
            .then((auth) => {
                localStorage.setItem(
                    'auth',
                    JSON.stringify({ ...auth})
                );
                localStorage.setItem('token', auth.token)
            })
            .catch(() => {
                throw new Error('Network error');
            });
    },
    checkError: (error: {status: number} ) => {
        const status = error.status;
        if (status === 401 || status === 403) {
            // localStorage.removeItem('auth');
            return Promise.reject();
        }
        // other error code (404, 500, etc): no need to log out
        return Promise.resolve();
    },
    checkAuth: () =>
        localStorage.getItem('token')
            ? Promise.resolve()
            : Promise.reject({ message: 'login required' }),
    logout: () => {
        localStorage.removeItem('token');
        return Promise.resolve();
    },
    getIdentity: () => {
        try {
            const { id, fullName, avatar } = JSON.parse(localStorage.getItem('auth'));
            return Promise.resolve({ id, fullName, avatar });
        } catch (error) {
            return Promise.reject(error);
        }
    },
    getPermissions: (params : any) => Promise.resolve(),
};