import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';

// set token in local storage 
function setToken(token) {
    localStorage.setItem('access_token', token);
  }

//Similar to setToken, this function is designed explicitly to retrieve the token from local storage
export function getToken() {
    try {
      return localStorage.getItem('access_token');
    } catch (err) {
      return null;
    }
  }

  //Works with the local storage and it simply removes the token from localstorage using removeItem();
  export function removeToken() {
    localStorage.removeItem('access_token');
  }

  //This function is to obtain the payload from the JWT, which is accomplished by first retrieving the token from localStorage
  export function readToken() {
    try {
      const token = getToken();
      return token ? jwtDecode(token) : null;
    } catch (err) {
      return null;
    }
  }

  //Function: is Authenticated servers to determine whether or not the current user is authenticated.
  export function isAuthenticated() {
    const token = readToken();
    return token ? true : false;
  }

  //AuthenticateUser
  export async function authenticateUser(user, password) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/login`, {
      method: 'POST',
      body: JSON.stringify({ userName: user, password: password }),
      headers: {
        'content-type': 'application/json',
      },
    });
  
    const data = await res.json();
  
    if (res.status === 200) {
      setToken(data.token);
      return true;
    } else {
      throw new Error(data.message);
    }
  }

  //Register the user
  export async function registerUser(user, password, password2) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/register`, {
      method: 'POST',
      body: JSON.stringify({ userName: user, password: password, password2: password2 }),
      headers: {
        'content-type': 'application/json',
      },
    });
  
    const data = await res.json();
  
    if (res.status === 200) {
      return true;
    } else {
      throw new Error(data.message);
    }
  }