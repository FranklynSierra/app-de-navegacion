import axios from '../api/axios';
import useAuth from './useAuth';
//l53SnAEbqCihUJ0fK8CPbwUTC09NhoLTpA2kcYPupDfI6uFFcaWYoRBPG4UXRXG0
const useRefreshToken = () => {
    const { setAuth } = useAuth();

    const refresh = async () => {
        const response = await axios.get('/api/refresh', {
            withCredentials: true
        });
        setAuth(prev => {
            console.log(JSON.stringify(prev));
            console.log(response.data.access_Token);
            return { ...prev, access_token: response.data.access_token,roles:response.data.roles }
        });
        return response.data.access_token;
    }
    return refresh;
};

export default useRefreshToken;