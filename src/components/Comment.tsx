
import styled from 'styled-components';
import dataFetch from './DataFetch';
import { useReducer,useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from './axios';
import { url } from './url';
import Loading from './Loading';
import Loadingwrapper from './Loadingwrapper';
import Wrapper from './Wrapper';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@material-ui/icons/Edit';


const Userwrapper = styled.div`
display: grid;
grid-template-columns: 120px, 1fr;
grid-template-rows: 120px, 60px;
width: 90%;
height: 180px;
border-bottom: 1px solid rgb(200,200,200);
margin: 0 5% 0 5%;
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
const Towrapper = styled.div`
grid-column-start: 1;
grid-column-end: 2;
grid-row-start: 2;
grid-row-end: 3;
display: flex;
justify-content: center;
align-items: center;
color: blue;
text-decoration: underline;
cursor: pointer;
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
    font-size: 20px;
    margin-bottom: 40px;
    padding: 15px 10px 0 35px;
`
const Buttonwrapper = styled.div`
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

function Comment(props: Props) {
    const { id } = useParams()
    const comment_url = url + '/comments/' + id 
    const [dataState, dispatch] = useReducer(dataFetch, initialState);
    const navigate = useNavigate()
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
        dispatch({ type: 'init', payload: '' })
        axios.delete(url + '/comments/' + id).then(() => {
            navigate('/users/' + props.logged_in.id, { replace: true })
        }).catch(e => {
            console.log(e)
        })
    }
    return (<>
        {dataState.isLoading ?
            <Loadingwrapper><Loading /></Loadingwrapper> : 
            <Wrapper>
            <Userwrapper>
                <Imagewrapper>
                        <Image src={dataState.post.user_image}/>
                </Imagewrapper>
                    <Username>{dataState.post.user_name}</Username>
                        {dataState.post.comment.problem_id ? 
                       <Towrapper onClick={toproblem}>問題に戻る</Towrapper>:
                       <Towrapper onClick={toproblem}>解答に戻る</Towrapper>
                    }
                    {props.logged_in.id != dataState.post.comment.user_id && <Buttonwrapper>
                        <IconButton onClick={toedit}>
                            <EditIcon/>
                        </IconButton>
                        <IconButton sx={{color: 'red'}} onClick={handledelete}>
                            <DeleteForeverIcon />
                        </IconButton>
                    </Buttonwrapper>}
            </Userwrapper>
            <Description>{dataState.post.comment.text}</Description>
        </Wrapper>
            }
    </>)
}

export default Comment
