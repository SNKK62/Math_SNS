import styled from 'styled-components';
import { useEffect ,useReducer, useState} from 'react';
import axios from './axios';
import dataFetch from './DataFetch';
import { url } from './url';
import { useParams } from 'react-router-dom';
import Loading from './Loading';
import Loadingwrapper from './Loadingwrapper';
import Wrapper from './Wrapper';
import { LoadingButton } from '@mui/lab';



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
    grid-column-start: 1;
    grid-column-end: 2;
    grid-row-start: 2;
    grid-row-end: 3;
`
const Count = styled.div`
    margin: center
`
const Followbutton = styled.div`
    column: 2/3;
    row: 2/3;
`


const initialState = {
    isLoading: true,
    isError: '',
    post: {}
};

interface Props {
    logged_in: {
        bool: boolean,
        id: number,
        image: string,
        name: string
    }
}

function Userprofile(props: Props) {
    const { id } = useParams()
    const [load, setLoad] = useState(false)
    const user_url = url + '/users/' + id
    const [follow, setFollow] = useState(false)
    const [dataState, dispatch] = useReducer(dataFetch, initialState);
    useEffect(() => {
        axios.get(user_url).then(resp => {
            dispatch({ type: 'success', payload: resp.data })
        }).catch(e => {
            console.log(e);
        })
        if (props.logged_in.bool && props.logged_in.id != Number(id)) {
            axios.get(url + '/users/iffollow/' + id).then(resp => {
                setFollow(resp.data.follow)
            }).catch(e => {
                console.log(e)
            })
        }
    }, [])
    const handlefollow = (bool: boolean) => {
        setLoad(true)
        if (bool) {
            axios.post(url + '/users/follow/' + id).then(() => {
                setFollow(true)
                setLoad(false)
                const element: any = document.getElementById('follower')
                if (element) {
                    element.textContent = String(Number(element.textContent[0])+1)+'フォロワー'
                }
            }).catch(e => {
                console.log(e)
            })
        } else {
            axios.delete(url + '/users/unfollow/' + id).then(() => {
                setFollow(false)
                setLoad(false)
                const element: any = document.getElementById('follower')
                if (element) {
                    element.textContent = String(Number(element.textContent[0])-1)+'フォロワー'
                }
            }).catch(e => {
                console.log(e)
            })
        }
    }
    
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
                        <Count id='follower'>{dataState.post.followers}フォロワー</Count>
                    </Countwrapper>
                    {(props.logged_in.bool && props.logged_in.id != Number(id)) &&
                        <Followbutton>
                            {follow ? 
                                <LoadingButton loading={load} variant='outlined' onClick={() => {handlefollow(false)}}>フォロー解除</LoadingButton> :
                                <LoadingButton loading={load} variant='contained' onClick={() => {handlefollow(true)}} >フォロー</LoadingButton>    
                        }
                        </Followbutton>
                    }
                    </Userwrapper>
                    </Wrapper>
                    
                }
        
        </>
    )
}

export default Userprofile
