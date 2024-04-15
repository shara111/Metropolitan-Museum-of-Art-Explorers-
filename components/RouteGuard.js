import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useAtom } from 'jotai';
import { isAuthenticated } from '../lib/authenticate'; // adjust the path as needed
import { getFavourites, getHistory } from '../lib/userData'; // adjust the path as needed
import { favouritesAtom, searchHistoryAtom } from '../store'; // adjust the path as needed


const PUBLIC_PATHS = ['/', '/login', '/register'];

const RouteGuard = ({ children }) => {
    const router = useRouter();
    const [, setFavourites] = useAtom(favouritesAtom);
    const [, setSearchHistory] = useAtom(searchHistoryAtom);

    useEffect(() => {
        const checkAuth = async () => {
            if(!PUBLIC_PATHS.includes(router.pathname) && !isAuthenticated()){
                router.push('/login');
            } else{
                setFavourites(await getFavourites());
                setSearchHistory(await getHistory());
            }
        };
        checkAuth();
    }, [router, setFavourites, setSearchHistory]);
    return children;
};
export default RouteGuard;