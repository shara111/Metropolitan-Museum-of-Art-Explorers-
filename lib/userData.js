export {getToken} from '../lib/authenticate';
import { getToken } from "../lib/authenticate";
async function handleResponse(response) {
    if (!response.ok) {
      const errorData = await response.json(); // Assuming your server responds with JSON
      throw new Error(errorData.message || "API call failed or returned an error");
    }
    return response.json(); // Assuming your server responds with JSON
  }
    
function getAuthHeaders() {
  const token = getToken(); // getToken should be imported from authenticate.js
  return {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };
}
export async function getFavourites(){
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/favourites`, {
        headers: getAuthHeaders(),
    });
    return handleResponse(response);   
}
export async function addToFavourites(id){
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/favourites/${id}`, {
        method: "PUT",
        headers: getAuthHeaders(),
    });
    return handleResponse(response);
}
export async function removeFromFavourites(id){
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/favourites/${id}`, {
        method: "DELETE",
        
        headers: getAuthHeaders(),
    });
    return handleResponse(response);
}
export async function getHistory(){
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/history`, {
        headers: getAuthHeaders(),
    });
    return handleResponse(response);   
}
export async function addToHistory(id){
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/history/${id}`, {
        method: "PUT",
        headers: getAuthHeaders(),
    });
    return handleResponse(response);
}
export async function removeFromHistory(id){
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/history/${id}`, {
        method: "DELETE",
        headers: getAuthHeaders(),
    });
    return handleResponse(response);
}
