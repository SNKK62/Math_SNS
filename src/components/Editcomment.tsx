import styled from 'styled-components';
import Wrapper from './Wrapper';
import { useRef, useState, useEffect, useReducer } from 'react';
import axios from './axios';
import { LoadingButton } from '@mui/lab';
import Fab from '@mui/material/Fab';
import CheckIcon from '@material-ui/icons/Check';
import CircularProgress from '@mui/material/CircularProgress';
import {green, blue, red} from '@mui/material/colors';
import { url } from './url';
import { useNavigate, useParams } from 'react-router-dom';
import Loading from './Loading';
import dataFetch from './DataFetch';


const Fileinput = styled.input`
    display: none;
`
const Filewrapper = styled.label`
    width: 100%;
    height: 100%;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
`
const File3wrapper = styled.div`
    width: 80%;
    margin: 30px auto 50px auto;
`
const Textarea = styled.textarea`
    display: flex;
    justify-content: center;
    border-radius: 10px;
    width: 80%;
    height: 150px;
    left: 10%;
    font-size: 20px;
    margin: 40px auto 20px auto;
`
const Message = styled.div`
    width: 100%;
    font-size: 25px;
    margin: 30px auto;
`
const Submitbutton = styled(LoadingButton)`
    width: 100px;
    margin: 60px auto 0 auto;
`
const initialState = {
    isLoading: true,
    isError: '',
    post: {}
};

function Editcomment() {
    const { id } = useParams()
    const get_url = url + '/comments/' + id;
    const [dataState, dispatch] = useReducer(dataFetch, initialState);
    
    const [textarea, setTextarea] = useState('');
    const [image, setImage] = useState('');
    const [load, setLoad] = useState(false);
    const [circleloading, setCircleloading] = useState(false);
    const [success, setSuccess] = useState(false);
    const timer = useRef<number>();
    const navigate = useNavigate();
    useEffect(() => {
        axios.get(get_url).then(resp => {
            if (resp.data.comment.image_comment_url) {
                setImage('keep')
                setSuccess(true)
            }
            setTextarea(resp.data.comment.text);
            dispatch({ type: 'success', payload: resp.data })
        }).catch(e => {
            console.log(e);
        })
    }, [])
    useEffect(() => {
        return() => {
            clearTimeout(timer.current);
        };
    }, []);
    const handlecircular = () => {
        if (!circleloading) {
            setSuccess(false);
            setCircleloading(true);
            timer.current = window.setTimeout(() => {
                setSuccess(true);
                setCircleloading(false);
            }, 2000);
        }
    };
    const handle = () => {
        setLoad(true);
        const data = new FormData()
        var edit_url = '';
        var new_url:string = '';
        data.append('comment[text]', textarea);
        data.append('comment[image]', image);
        edit_url = url + '/comments/' + id;
        new_url = '/comments/' + id;
    
        axios.patch(edit_url, data).then(() => {
            setLoad(false);
            navigate(new_url);
        }).catch(err => {
            setLoad(false);
            console.log(err.response)
        })
    };
    const handlechange = (e:any) => {
        setImage(e.target.files[0])
        
    }
    const handlechangetext = (e: any) => {
        setTextarea(e.target.value);
    }
    
    const handledelete = () => {
            if (success) {
                setImage('');
                setSuccess(false)
            }
    }
    
    return (
        <>
        <Wrapper>
        {
            dataState.isLoading ? <Loading /> : <>
                        <Message>
                            コメントの編集
                        </Message>
                        <Textarea id='textarea' onChange={e => { handlechangetext(e) }} defaultValue={dataState.post.comment.text} />
                        
                        <File3wrapper>
                            {(!circleloading && success) && (
                    
                                <Fab aria-label='save' color='primary' sx={{
                                    bgcolor: green[500],
                                    margin: 'auto',
                                    '&:hover': { bgcolor: red[700] }
                                }} onClick={() => { handledelete() }} >
                                    <CheckIcon />
                                </Fab>)}
                            {(!circleloading && !success) && (
                                <Fab aria-label='save' color='primary' sx={{
                                    bgcolor: blue[500],
                                    margin: '0 auto 0 auto',
                                    padding: '0',
                                    '&:hover': { bgcolor: blue[700] }
                                }}>
                                    <Filewrapper htmlFor='1'>
                                        +
                                    </Filewrapper>
                                </Fab>
                            )}
                            {circleloading && (
                                <CircularProgress
                                    size={68}
                                    sx={{
                                        color: green[500],
                                        margin: 'auto',
                                    }}
                                />
                            )}
                            
                        </File3wrapper>

                        <Fileinput type='file' accept='images/*' id='1' onChange={(e) => { handlecircular(); handlechange(e) }} />
                        <Submitbutton loading={load} onClick={handle} variant='contained' sx={{ marginTop: '50px' }} >変更</Submitbutton>
                    </>}
                    </Wrapper>
            
                </>
    )
}



export default Editcomment
