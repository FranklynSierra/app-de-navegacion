import { createContext, useState } from "react";
// import { refreshToken } from '../utils/refreshToken';
import { refreshToken } from "../utils/refreshToken";

const API_URL = '';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [ user, setUser ] = useState(JSON.parse(localStorage.getItem('persist')) || false);
    const [ auth, setAuth ] = useState({});
    const [ persist, setPersist ] = useState(JSON.parse(localStorage.getItem('persist')) || false);

    let backupUser;

    const loginUser = async ({Name, password}) => {
        try {
            const responseUser = await fetch(`${API_URL}/login`, {
                method: 'POST',
                // Se debe desplegar primero la aplicacion para poder dar credentials                
                credentials: 'include',
                // withCredentials: true,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ Name, password }),
            });

            if(responseUser.status != 401){
                backupUser = { Name, password };
                const userLoged = await responseUser.json();
             
                setUser(userLoged)
                localStorage.setItem('persist', JSON.stringify(userLoged))
                return userLoged
            } else {
                return responseUser.status;
            }            
        } catch (error) {
            alert(error)
        }
    };

    const logoutUser = async () => {
        try {
            const response = await fetch(`${API_URL}/logout`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if(response.status === 200){
                const res = await response.json();
                return res;
            } else {
               
                localStorage.removeItem('persist');
                setUser(false)
                return response.statusText
            }
        } catch (error) {
           alert(error)
        }
    }

    const fetchRefreshToken = async (user) => {
        const responseUser = refreshToken(user);
        if(responseUser.status != 401){
          const userLoged = await responseUser.json();
          setUser(userLoged);
          localStorage.setItem('persist', JSON.stringify(userLoged))
          return userLoged.accesToken;
      } else {
          return responseUser.status;
      }  
    }
    return (
        <AuthContext.Provider value={{ auth, setAuth,persist,setPersist, loginUser, user, logoutUser, backupUser, fetchRefreshToken }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;