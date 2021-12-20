import axios from './axios';
import { url } from './url';
import styled from 'styled-components';
import Wrapper from './Wrapper';
import { useRef, useEffect, useState } from 'react';
import { useNavigate, useParams, useMatch } from 'react-router-dom';
import { LoadingButton } from '@mui/lab';
import CircularProgress from '@mui/material/CircularProgress';
import { green, blue, red } from '@mui/material/colors';
import Fab from '@mui/material/Fab';
import CheckIcon from '@material-ui/icons/Check';


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
const Submitbutton = styled(LoadingButton)`
    width: 100px;
    margin: 60px auto 0 auto;
`
const File1wrapper = styled.div`
    margin: 20px 0 20px 0;
    width: 100%;

`

function Makecomment() {
    const textref = useRef(null);
    const [load, setLoad] = useState(false);
    const [image, setImage] = useState('')
    const [circleloading, setCircleloading] = useState(false);
    const [success, setSuccess] = useState(false);
    const timer = useRef<number>();
    const navigate = useNavigate();
    const { id} = useParams();
    const match = useMatch('/problems/:id/comments/new');
    var create_url = ''
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
        const data = new FormData();
        const text: any = textref.current;
        if (text) {
            const textarea = text.value;
            data.append('comment[text]]', textarea);
        } else {
            const textarea = '';
            data.append('comment[text]]', textarea);
        }
        
        data.append('comment[image]', image);
       
        match ? create_url = url + '/problems/'+id+'/comments/' : create_url = url+'/solutions/'+id+'/comments'
        
        axios.post(create_url, data).then(resp => {
            setLoad(false);
            const new_url = '/comments/' + resp.data.id;
            navigate(new_url);
        }).catch(err => {
            setLoad(false);
            console.log(err.response)
        })
    };
    const handlechange = (e: any) => {
        setImage(e.target.files[0]);
    }
    const handledelete = () => {
        if (success) {
            setImage('');
            setSuccess(false);
        }
        
    }


    return (
        <Wrapper>
            <Message>コメントの作成</Message>
            <Textarea ref={textref} />
            <File1wrapper>
            {(!circleloading && success) && (
                        <Fab aria-label='save' color='primary' sx={{
                        bgcolor: green[500],
                            margin: 'auto',
                            '&:hover': { bgcolor: red[700] }
                        }} onClick={handledelete} >
                            <CheckIcon /> 
                        </Fab>)}
                    {(!circleloading && !success) && (
                        <Fab aria-label='save' color='primary' sx={{
                            bgcolor: blue[500],
                            margin: 'auto',
                            '&:hover': { bgcolor: blue[500] }
                            
                }}>
                        <Filewrapper htmlFor='image' >
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
                </File1wrapper>
            <Fileinput type='file' accept='image/*' id='image' onChange={e => { handlecircular(); handlechange(e)}} />
            <Submitbutton sx={{ marginTop: '50px' }} loading={load} onClick={handle} >投稿</Submitbutton>
        </Wrapper>
    )
}

export default Makecomment
