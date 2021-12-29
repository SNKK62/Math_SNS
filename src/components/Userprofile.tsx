import styled from 'styled-components';
import { useEffect ,useReducer, useState} from 'react';
import axios from './axios';
import dataFetch from './DataFetch';
import { url } from './url';
import { useParams,useNavigate } from 'react-router-dom';
import Loading from './Loading';
import Loadingwrapper from './Loadingwrapper';
import { LoadingButton } from '@mui/lab';
import Userproblems from './Userproblems'
import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@mui/material/IconButton';


const Userwrapper = styled.div`
    display: grid;
    grid-template-columns: 100px 1fr;
    grid-template-rows: 120pxs 60px;
    width: 90%;
    height: 180px;
    margin: 0;
`
const Image = styled.img`
    width: 60px;
    height: 60px;
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
    margin: auto;
    white-space: pre-wrap;
    word-wrap: break-word;
    
    font-size: 25px;
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
const Countwrapper = styled.div`
    grid-column-start: 1;
    grid-column-end: 2;
    grid-row-start: 2;
    grid-row-end: 3;
    margin-top: 5px;
`
const Count = styled.div`
    font-size: 14px;
    padding-left: 5px;
`
const Followbutton = styled.div`
    column: 2/3;
    row: 2/3;
`
const Allwrapper = styled.div`
width: 100%;
    @media(min-width: 600px){
        width: 60vw;
        box-sizing: border-box;
    }
    @media(min-width: 1025px){
        width: 45vw;
        box-sizing: border-boxl;
    }
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
    const navigate = useNavigate();
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
    const toedit = () => {
        navigate('/users/'+id+'/edit')
    }
    return (
        <>
                {dataState.isLoading ?
                        <Loadingwrapper><Loading/></Loadingwrapper>
                    : <>
            <Allwrapper>
                <Userwrapper>
                        <Imagewrapper>
                            <Image src={dataState.post.user.image_url} />
                        </Imagewrapper>
                    <Username id='username'>
                        {dataState.post.user.name}
                                {dataState.post.user.id == props.logged_in.id && <IconButton onClick={toedit}><EditIcon /></IconButton>}
                    </Username>
                    <Countwrapper>
                        <Count>{dataState.post.followings}フォロー</Count>
                        <Count id='follower'>{dataState.post.followers}フォロワー</Count>
                    </Countwrapper>
                    {(props.logged_in.bool && props.logged_in.id != Number(id)) &&
                        <Followbutton>
                            {follow ? 
                                <LoadingButton loading={load} variant='outlined' onClick={() => {handlefollow(false)}} sx={{fontSize: '16px'}}>フォロー解除</LoadingButton> :
                                <LoadingButton loading={load} variant='contained' onClick={() => {handlefollow(true)}} sx={{fontSize: '16px'}} >フォロー</LoadingButton>    
                        }
                        </Followbutton>
                    }
                    </Userwrapper>
                    <Userproblems/>
                    </Allwrapper></>
                    
                }
        
        </>
    )
}

export default Userprofile
