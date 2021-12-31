import Loadingwrapper from './Loadingwrapper';
import Loading from './Loading';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Searchprocess() {
    const navigate = useNavigate();
    useEffect(() => {
        if (window.innerWidth >= 1025) {
            navigate('/users',{replace: true})
        }
    })
    return (
        <Loadingwrapper>
            
            <Loading/>
        </Loadingwrapper>
    )
}

export default Searchprocess
