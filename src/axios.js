import axios from 'axios';
import history from './history';
import store from './store';
import { userLogoutAttempt } from './redux/Auth/auth.action';
import process from "process";




if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
    axios.defaults.baseURL = 'http://localhost:4000';
} else {
    axios.defaults.baseURL = 'http://f07f4cb.online-server.cloud';
}
/**
 * Injecting token to axios instance
 */
axios.interceptors.request.use(config => {
    let token = null;

    const jwtToken = window.localStorage.getItem('jwtToken');

    if (jwtToken) {
        token = jwtToken;
        config.headers.Authorization = `Bearer ${token}`;
    } else {
        config.headers.Authorization = null;
        //history.push("/signup");
    }

    return config;
});

axios.interceptors.response.use(function (response) {
    return response;
}, function (error) {
    let status = null;

    if (error.response) {
        if (error.response.status) {
            status = error.response.status;
        }
    }

    if (401 === status) {
        window.localStorage.removeItem('jwtToken');
        window.localStorage.removeItem('user');
        store.dispatch(userLogoutAttempt());
    } else {
        return Promise.reject(error);
    }
});
export default axios;