import jwtDecode from 'jwt-decode';

const BASE_URL = "http://localhost:1337";
const getToken = ()=> {
    // return authorization header with jwt token
    let token = window.localStorage.getItem('jwtoken');

    return `Bearer ${token}`;
}

const setAuthToken = token=>{
    window.localStorage.setItem('jwtoken', token);
}

const removeAuthToken = ()=>{
    window.localStorage.removeItem('jwtoken');
}

const isAuthenticated = ()=> {

    const currentTime = Date.now() / 1000;
    try{
        const token = window.localStorage.jwtoken;
        const decoded = token && jwtDecode(token);

        if (token && decoded.exp > currentTime) {
            return { user: decoded };
        }

        return false;
    }catch(error){
        return false;
    }
}

export {
    getToken,
    isAuthenticated,
    removeAuthToken,
    setAuthToken,
    BASE_URL
}