import { createHashHistory } from 'history';
const history = createHashHistory(
    {
        basename: '/admin'
    }
);
export default history