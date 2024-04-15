import '@/styles/bootstrap.min.css'; 
import Layout from "../components/Layout";

import RouteGuard from '../components/RouteGuard'; 
import { SWRConfig } from "swr";
import MainNav  from '../components/MainNav';


const fetcher = async (url) =>{
  const res = await fetch(url);
  // If the status code is not in the range 200-299,
 // we still try to parse and throw it.
  if(!res.ok) {
    const error = new Error('An error occurred while fetching the data.');
     // Attach extra info to the error object.
    error.info = await res.json();
    error.status = res.status;
    throw error;
  }
  return res.json();
};

function MyApp({ Component, pageProps }) {
  return (
    <RouteGuard>
      <MainNav />
      <Component {...pageProps} />
    </RouteGuard>
  );
}

export default MyApp;