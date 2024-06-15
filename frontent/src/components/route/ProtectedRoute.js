
import { useSelector } from 'react-redux';
import {Navigate} from 'react-router-dom';
import Loader from '../layouts/Loader';

export default function ProtectedRoute ({children}) {
    const { isAuthenticated, loading, user } = useSelector(state => state.authState)

    if(!isAuthenticated && !loading) {
        return <Navigate to="/login" />
    }

    if(isAuthenticated) {
        if(user.role !== 'admin') {
            return <Navigate to="/" />
        }
        return children;
    }

    if(loading) {
        return <Loader/>
    }

   
}