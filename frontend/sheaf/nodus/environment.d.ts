declare global {
    namespace NodeJS {
        interface ProcessEnv {
            GITHUB_AUTH_TOKEN: string;
            NODE_ENV: 'development' | 'production';
            PORT?: string;
            PWD: string;
            API_BASE_URL: string;
        }
    }
}
export {}
// process.env.REACT_APP_API_BASE_URL + '/auth/login',