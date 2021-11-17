import { createBrowserHistory } from 'history';

const adminHistory = createBrowserHistory(
    {
        basename: '/admin'
    }
)

export default adminHistory