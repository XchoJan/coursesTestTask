import axios from 'axios';

export const API_URL = 'https://logiclike.com/docs/';


export const api = axios.create({
    baseURL: API_URL,
});

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
    failedQueue.forEach(prom => {
        if (error) {
            prom.reject(error);
        } else {
            prom.resolve(token);
        }
    });
    failedQueue = [];
};

api.interceptors.request.use(
    async params => {
        if (params._retry) {
            // console.log('SECOND REQUEST', params.headers.Authorization);
            return params;
        }

        params.headers['device-id'] = 'appConfig.deviceId';
        params.headers['device-name'] = 'DeviceName';
        console.log(params.method.toUpperCase(), params.url);

        return params;
    },
    error => Promise.reject(error),
);

api.interceptors.response.use(
    res => res,
    async error => {
        const originalRequest = error.config;

        if (error.response.status === 401 && !originalRequest._retry) {
            if (isRefreshing) {
                return new Promise((resolve, reject) => {
                    failedQueue.push({resolve, reject});
                })
                    .then(token => {
                        originalRequest.headers.Authorization = 'Bearer ' + token;
                        return axios(originalRequest);
                    })
                    .catch(err => {
                        return Promise.reject(err);
                    });
            }

            originalRequest._retry = true;
            isRefreshing = true;

            // const oldRefreshToken = await AsyncStorageServices.getRefreshToken();
            return new Promise(async (resolve, reject) => {
                try {
                    const {data} = await axios.post(API_URL + 'auth/refresh');
                    const {accessToken} = data;

                    // TokensRepository.setAccessToken(accessToken);

                    api.defaults.headers.common.Authorization = 'Bearer ' + accessToken;
                    originalRequest.headers.Authorization = 'Bearer ' + accessToken;
                    processQueue(null, accessToken);
                    resolve(api(originalRequest));
                } catch (e) {
                    processQueue(e, null);
                    reject(e);
                } finally {
                    isRefreshing = false;
                }
            });
        }

        return Promise.reject(error);
    },
);
