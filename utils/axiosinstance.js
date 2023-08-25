import axios from 'axios';
import { BASE_URL } from '../App';
import RNSecureStorage from 'rn-secure-storage';

const axiosInstance = axios.create({
    baseURL: BASE_URL,
});

const getAccessToken = async () => {
    const jsonAuthState = await RNSecureStorage.get('authState');
    const authState = JSON.parse(jsonAuthState);
    return authState.accessToken;
};


axiosInstance.interceptors.request.use(
    async (config) => {
        const accessToken = await getAccessToken();

        if (accessToken) {
            if (config.headers) {
                config.headers['Authorization'] = accessToken;
            }
        }
        return config;
    },
    (error) => {
        console.log(error);
        return Promise.reject(error);
    }
);

export default axiosInstance;
