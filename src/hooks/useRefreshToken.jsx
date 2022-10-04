// import axios from '../api/axios';
// import useAuth from './useAuth';
//l53SnAEbqCihUJ0fK8CPbwUTC09NhoLTpA2kcYPupDfI6uFFcaWYoRBPG4UXRXG0
// const useRefreshToken = () => {
//     const { setAuth } = useAuth();

//     const refresh = async () => {
//         const response = await axios.get('/refresh', {
//             withCredentials: true
//         });
//         setAuth(prev => {
//             console.log(JSON.stringify(prev));
//             console.log(response.data.accessToken);
//             return { ...prev, accessToken: response.data.accessToken,roles:response.data.roles }
//         });
//         return response.data.accessToken;
//     }
//     return refresh;
// };

// export default useRefreshToken;