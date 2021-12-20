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


interface Props  {
    type: string;
    onClickfunction?: void;
    ifproblem: boolean;
}
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
const Categoryinput = styled.input`
    width: 100px;
    margin: 15px 0 15px 150px;
`
const Categorywrapper = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
`
const Keyword = styled.div`
    position: absolute;
    left: 50px;
`
const initialState = {
    isLoading: true,
    isError: '',
    post: {}
};

function Editproblem(props: Props) {
    const { id } = useParams()
    const get_url = props.ifproblem ? url + '/problems/' + id : url + '/solutions/' + id; 
    const [dataState, dispatch] = useReducer(dataFetch, initialState);
    
    const [textarea, setTextarea] = useState('');
    const [keyword, setKeyword] = useState('');
    const [image1, setImage1] = useState('');
    const [image2, setImage2] = useState('');
    const [image3, setImage3] = useState('');
    const [load, setLoad] = useState(false);
    const [circleloading, setCircleloading] = useState([false,false,false]);
    const [success, setSuccess] = useState([false, false, false]);
    const timer = useRef<number>();
    const navigate = useNavigate();
    useEffect(() => {
        axios.get(get_url).then(resp => {
            if (resp.data.problem.image1_url || resp.data.problem.image1s_url) {
                setImage1('1')
                if (resp.data.problem.image2_url || resp.data.problem.image2s_url) {
                    setImage2('2')
                    if (resp.data.problem.image3_url || resp.data.problem.image3s_url) {
                        setImage3('3')
                        setSuccess([true,true,true])
                    } else {
                        setSuccess([true,true,false])
                    }
                } else {
                    if (resp.data.problem.image3_url || resp.data.problem.image3s_url) {
                        setImage3('3')
                        setSuccess([true,false,true])
                    } else {
                        setSuccess([true,false,false])
                    }
                }
            } else {
                if (resp.data.problem.image2_url || resp.data.problem.image2s_url) {
                    setImage2('2')
                    if (resp.data.problem.image3_url || resp.data.problem.image3s_url) {
                        setImage3('3')
                        setSuccess([false,true,true])
                    } else {
                        setSuccess([false,true,false])
                    }
                } else {
                    if (resp.data.problem.image3_url || resp.data.problem.image3s_url) {
                        setImage3('3')
                        setSuccess([false,false,true])
                    } else {
                        setSuccess([false,false,false])
                    }
                }
            }
                    
               
            setTextarea(resp.data.problem.description);
            setKeyword(resp.data.problem.category);
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
    const handlecircular = (i: number) => {
        if (!circleloading[i]) {
            setSuccess(success.map((suc, index) => (index == i ? false : suc)));
            setCircleloading(circleloading.map((circle, index) => (index == i ? true : circle)));
            timer.current = window.setTimeout(() => {
                setSuccess(success.map((suc,index) => (index == i ? true: suc)));
                setCircleloading(circleloading.map((circle, index) => (index == i ? false : circle)));
            }, 2000);
        }
    };
    const handle = () => {
        setLoad(true);
        const data = new FormData()
        var edit_url = '';
        var new_url:string = '';
        if (props.ifproblem) {
            data.append('problem[description]', textarea);
            data.append('problem[category]', keyword);
            data.append('problem[image1]', image1);
            data.append('problem[image2]', image2);
            data.append('problem[image3]', image3);
            edit_url = url + '/problems/' + id;
            new_url = '/problems/' + id;
        } else {
            data.append('solution[description]', textarea);
            data.append('solution[image1]', image1);
            data.append('solution[image2]', image2);
            data.append('solution[image3]', image3);
            edit_url = url + '/solutions/' + id;
            new_url = '/solutions/' + id;
        }
        axios.patch(edit_url, data).then(() => {
            setLoad(false);
            navigate(new_url);
        }).catch(err => {
            setLoad(false);
            console.log(err.response)
        })
    };
    const handlechange = (e: any, i: number) => {
        if (i == 1) {
            setImage1(e.target.files[0])
        }
        else if (i == 2) {
            setImage2(e.target.files[0])
        }
        else if (i == 3) {
            setImage2(e.target.files[0])
        }
    }
    const handlechangetext = (e: any) => {
        setTextarea(e.target.value);
    }
    const handlechangekeyword = (e: any) => {
        setKeyword(e.target.value);
    }
    const handledelete = (i: number) => {
        if (i == 1 && success[0]) {
            if (success[1]) {
                setImage1('');
                setSuccess(success.map((suc,index) => (index == 0 ? false : suc)))
            }
        } else if (i == 2 && success[1]) {
                setImage2('');
                setSuccess(success.map((suc,index) => (index == 1 ? false : suc)))
        } else if (i == 3 && success[2]) {
            setImage3('');
            setSuccess(success.map((suc,index) => (index == 2 ? false : suc)))
        }
    }
    
    return (
        <>
        <Wrapper>
        {
            dataState.isLoading ? <Loading /> : <>
                        <Message>
                            {props.type}の編集
                        </Message>
                        <Textarea id='textarea' onChange={e => { handlechangetext(e) }} defaultValue={dataState.post.problem.description} />
                        {props.ifproblem && (
                            <Categorywrapper>
                                <Keyword>キーワード:</Keyword>
                                <Categoryinput id='keyword' onChange={e => {handlechangekeyword(e)}} type='text' defaultValue={dataState.post.problem.category} />
                            </Categorywrapper>
                        )}
                        
                        <File3wrapper>
                            {(!circleloading[0] && success[0]) && (
                    
                                <Fab aria-label='save' color='primary' sx={{
                                    bgcolor: green[500],
                                    position: 'absolute',
                                    left: '16%',
                        
                                    '&:hover': { bgcolor: red[700] }
                                }} onClick={() => { handledelete(1) }} >
                                    <CheckIcon />
                                </Fab>)}
                            {(!circleloading[0] && !success[0]) && (
                                <Fab aria-label='save' color='primary' sx={{
                                    bgcolor: blue[500],
                                    position: 'absolute',
                                    left: '16%',
                                    margin: '0',
                                    padding: '0',
                                    '&:hover': { bgcolor: blue[700] }
                                }}>
                                    <Filewrapper htmlFor='1'>
                                        1
                                    </Filewrapper>
                                </Fab>
                            )}
                            {circleloading[0] && (
                                <CircularProgress
                                    size={68}
                                    sx={{
                                        color: green[500],
                                        position: 'absolute',
                                        left: '15%',
                                    }}
                                />
                            )}
                            {(!circleloading[1] && success[1]) && (
                                <Fab aria-label='save' color='primary' sx={{
                                    bgcolor: green[500],
                                    position: 'absolute',
                                    left: '44%',
                                    '&:hover': { bgcolor: red[700] }
                                }} onClick={() => { handledelete(2) }} >
                                    <CheckIcon />
                                </Fab>)}
                            {(!circleloading[1] && !success[1]) && (
                                <Fab aria-label='save' color='primary' sx={{
                                    bgcolor: blue[500],
                                    position: 'absolute',
                                    margin: '0',
                                    padding: '0',
                                    left: '44%',
                                    '&:hover': { bgcolor: blue[700] }
                                }}>
                                    <Filewrapper htmlFor='2'>
                                        2
                                    </Filewrapper>
                                </Fab>
                            )}
                            {circleloading[1] && (
                                <CircularProgress
                                    size={68}
                                    sx={{
                                        color: green[500],
                                        position: 'absolute',
                                        left: '43%',
                                    }}
                                />
                            )}
                            {(!circleloading[2] && success[2]) && (
                                <Fab aria-label='save' color='primary' sx={{
                                    bgcolor: green[500],
                                    position: 'absolute',
                                    left: '72%',
                                    '&:hover': { bgcolor: red[700] }
                                }} onClick={() => { handledelete(3) }} >
                                    <CheckIcon />
                                </Fab>)}
                            {(!circleloading[2] && !success[2]) && (
                                <Fab aria-label='save' color='primary' sx={{
                                    bgcolor: blue[500],
                                    position: 'absolute',
                                    margin: '0',
                                    padding: '0',
                                    left: '72%',
                                    '&:hover': { bgcolor: blue[700] }
                            
                                }}>
                                    <Filewrapper htmlFor='3'>
                                        3
                                    </Filewrapper>
                                </Fab>
                            )}
                            {circleloading[2] && (
                                <CircularProgress
                                    size={68}
                                    sx={{
                                        color: green[500],
                                        position: 'absolute',
                                        left: '71%',
                                    }}
                                />
                            )}
                        </File3wrapper>

                        <Fileinput type='file' accept='images/*' id='1' onChange={(e) => { handlecircular(0); handlechange(e,1) }} />
                        <Fileinput type='file' accept='images/*' id='2' onChange={(e) => { handlecircular(1); handlechange(e,2) }} />
                        <Fileinput type='file' accept='images/*' id='3' onChange={(e) => { handlecircular(2); handlechange(e,3) }} />
                        <Submitbutton loading={load} onClick={handle} variant='contained' sx={{ marginTop: '100px' }} >変更</Submitbutton>
                    </>}
                    </Wrapper>
            
                </>
    )
}



export default Editproblem
