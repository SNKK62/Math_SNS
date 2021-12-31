
import styled from 'styled-components';
import dataFetch from './DataFetch';
import { useReducer,useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from './axios';
import { url } from './url';
import Loading from './Loading';
import Loadingwrapper from './Loadingwrapper';
import Wrapper from './Wrapper';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import Button from '@mui/material/Button';
import 'katex/dist/katex.min.css';
import Latex from 'react-latex-next';
import Modal from './Modal';



const Userwrapper = styled.div`
    display: grid;
    grid-template-columns: 80px 1fr;
    width: 90%;
    height: 80px;
    margin: 0 5% 0 5%;
`
const Image = styled.img`
    width: 60px;
    height: 60px;
    object-fill: cover;
    border-radius: 50%;
    cursor: pointer;
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
    
    font-size: 22px;
`
const Imagewrapper = styled.div`
grid-column-start: 1;
grid-column-end: 2;
grid-row-start: 1;
grid-row-end: 2;
display: flex;
// justify-content: center;
align-items: center;
margin: auto;
`


// const Problemimage = styled.div`
//     margin: auto;
//     width: 80%;
//     text-align: center;
//     display: flex;
//     justify-content: center;
//     height: 200px;
// `

const Description = styled.div`
    white-space: pre-wrap;
    word-wrap: break-word;
    width: 80%;
    margin: auto;
    text-align: left;
    font-size: 18px;
    margin-bottom: 40px;
    padding: 15px 10px 0 35px;
`
const Buttonwrapper = styled.div`
    width: 30%;
`
const Towrapper = styled.div`
    width: 30%;
`
const Bigwrapper = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
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

function Comment(props: Props) {
    const { id } = useParams()
    const comment_url = url + '/comments/' + id 
    const [dataState, dispatch] = useReducer(dataFetch, initialState);
    const navigate = useNavigate()
    const [modal , setModal] = useState(false)
    useEffect(() => {
        axios.get(comment_url).then(resp => {
            dispatch({ type: 'success', payload: resp.data })
        }).catch(e => {
            console.log(e);
        })
    }, [id])
    const toproblem = () => {
        dispatch({ type: 'init', payload: '' })
        if (dataState.post.comment.problem_id) {
            navigate('/problems/'+dataState.post.comment.problem_id)
        } else {
            navigate('/solutions/'+dataState.post.comment.solution_id)
        }
    }
    const toedit = () => {
        navigate('/comments/'+id+'/edit')
    }
    const handledelete = () => {
        axios.delete(url + '/comments/' + id).then(() => {
            setModal(false)
            navigate('/users/' + props.logged_in.id, { replace: true })
        }).catch(e => {
            console.log(e)
        })
    }
    const modalopen = () => {
        setModal(true)
    }
    const modalclose = () => {
        setModal(false)
    }
    return (<>
            {modal &&
                <Modal delete={handledelete} close={modalclose} />
            }
        {dataState.isLoading ?
            <Loadingwrapper><Loading /></Loadingwrapper> : 
            <Wrapper>
            <Userwrapper>
                <Imagewrapper>
                        <Image src={dataState.post.user_image} onClick={() => {navigate('/users/'+String(dataState.post.comment.user_id))}} />
                </Imagewrapper>
                    <Username>
                        {dataState.post.user_name}</Username>
            </Userwrapper>
                        <Bigwrapper><Towrapper>
                        <Button variant='text' sx={{ width: '100%' }} onClick={toproblem}>{dataState.post.comment.problem_id ? '問題' : '解答'}に戻る</Button>
                    </Towrapper>
                    
                    {props.logged_in.id === dataState.post.comment.user_id && <Buttonwrapper>
                        <IconButton onClick={toedit}>
                            <EditIcon/>
                        </IconButton>
                        <IconButton sx={{color: 'red'}} onClick={modalopen}>
                            <DeleteForeverIcon />
                        </IconButton>
                    </Buttonwrapper>}
                </Bigwrapper>
            <Description><Latex>{dataState.post.comment.text}</Latex></Description>
        </Wrapper>
            }
    </>)
}

export default Comment
