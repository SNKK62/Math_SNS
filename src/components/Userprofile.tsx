import styled from 'styled-components';
import { useEffect ,useReducer} from 'react';
import axios from './axios';
import dataFetch from './DataFetch';
import { url } from './url';
import { useParams } from 'react-router-dom';
import Loading from './Loading';
import Loadingwrapper from './Loadingwrapper';
import Wrapper from './Wrapper';


const Userwrapper = styled.div`
    display: grid;
    grid-template-columns: 120px, 1fr;
    grid-template-rows: 120px, 60px;
    width: 90%;
    height: 180px;
    margin: 0 5% 0 5%;
    border-bottom: 1px solid rgb(200,200,200);
`
const Imagewrapper = styled.div`
    grid-column-start: 1;
    grid-column-end: 2;
    grid-row-start: 1;
    grid-row-end: 2;
    display: flex;
    justify-content: center;
    align-items: center;
`
const Image = styled.img`
    width: 70px;
    height: 70px;
    object-fill: cover;
    border-radius: 50%;
`
const Username = styled.div`
    grid-column-start: 2;
    grid-column-end: 3;
    grid-row-start: 1;
    grid-row-end: 2;
    padding-left: 10px;
    display: flex;
    align-items: center;
    font-size: 35px;
`
const Countwrapper = styled.div`
    grid-column-start: 2;
    grid-column-end: 3;
    grid-row-start: 2;
    grid-row-end: 3;
    display: flex;
    justify-content: center;
`
const Count = styled.span`

`


const initialState = {
    isLoading: true,
    isError: '',
    post: {}
};


function Userprofile() {
    const { id } = useParams()
    const user_url = url + '/users/' + id
    const [dataState, dispatch] = useReducer(dataFetch, initialState);
    useEffect(() => {
        axios.get(user_url).then(resp => {
            dispatch({ type: 'success', payload: resp.data })
        }).catch(e => {
            console.log(e);
        })
    }, [])
    
    return (
        <>
                {dataState.isLoading ?
                        <Loadingwrapper><Loading/></Loadingwrapper>
                    : 
            <Wrapper>
                <Userwrapper>
                        <Imagewrapper>
                            <Image src={dataState.post.user.image_url} />
                        </Imagewrapper>
                    <Username>
                        {dataState.post.user.name}
                    </Username>
                    <Countwrapper>
                        <Count>{dataState.post.followings}フォロー</Count>
                        <Count>{dataState.post.followers}フォロワー</Count>
                    </Countwrapper>
                    </Userwrapper>
                    </Wrapper>
                    
                }
        
        </>
    )
}

export default Userprofile
