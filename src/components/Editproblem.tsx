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
import Loadingwrapper from './Loadingwrapper';
import dataFetch from './DataFetch';
import InputBase from '@mui/material/InputBase';
import TextareaAutosize from '@mui/material/TextareaAutosize';

const Textareawrapper = styled.div`
    margin: 20px auto 30px auto;
    width: 80%;
`


interface Props  {
    type: string;
    onClickfunction?: void;
    ifproblem: boolean;
    logged_in: {
        bool: boolean,
        id: number,
        image: string,
        name: string
    }
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
    display: flex;
    justify-content: space-around;
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
const Categoryinput = styled(InputBase)`
    width: 200px;
    margin: 0px 5px 0px 30px;
    border: 1px solid rgb(100,100,100);
    border-radius: 5px;
    padding-left: 10px;
    ${({ error }) => error && `
        border-color: red;
    `}
`
const Categorywrapper = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
`
const Keyword = styled.div`
    margin-left: 30px;
`
const Errortext = styled.div`
    text-align: left;
    color: red;
    margin-left: 110px;
    font-size: 14px;

`
const Fab1 = styled.div`
    width: 12%;
`
const Warn = styled.p`
    font-size: 13px;
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
    const [error, setError] = useState('');
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
            if (resp.data.problem.user_id !== props.logged_in.id) {
                navigate('/problems/' + id, { replace: true })
                return 
            }
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
    }, [props.logged_in.id, navigate, id, get_url])
    useEffect(() => {
        return() => {
            clearTimeout(timer.current);
        };
    }, []);
    const handlecircular = (i: number) => {
        if (!circleloading[i]) {
            setSuccess(success.map((suc, index) => (index === i ? false : suc)));
            setCircleloading(circleloading.map((circle, index) => (index === i ? true : circle)));
            timer.current = window.setTimeout(() => {
                setSuccess(success.map((suc,index) => (index === i ? true: suc)));
                setCircleloading(circleloading.map((circle, index) => (index === i ? false : circle)));
            }, 2000);
        }
    };
    const handle = () => {
        setLoad(true);
        if (props.ifproblem) {
            if (!keyword) {
                setError('empty')
                setLoad(false);
                return 
            } else if (keyword.length > 12) {
                setError('long')
                setLoad(false)
                return
            }
        }
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
        if (i === 1) {
            setImage1(e.target.files[0])
        }
        else if (i === 2) {
            setImage2(e.target.files[0])
        }
        else if (i === 3) {
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
        if (i === 1 && success[0]) {
            if (success[1]) {
                setImage1('');
                setSuccess(success.map((suc,index) => (index === 0 ? false : suc)))
            }
        } else if (i === 2 && success[1]) {
                setImage2('');
                setSuccess(success.map((suc,index) => (index === 1 ? false : suc)))
        } else if (i === 3 && success[2]) {
            setImage3('');
            setSuccess(success.map((suc,index) => (index === 2 ? false : suc)))
        }
    }
    
    return (
        <>
        {
            dataState.isLoading ? <Loadingwrapper><Loading /></Loadingwrapper> : 
                <Wrapper>
                        <Message>
                            {props.type}の編集<br/><Warn>texのテキストは$(半角)で囲んでください</Warn>
                        </Message>
                    <Textareawrapper>
                        <TextareaAutosize
                            aria-label="minimum height"
                            minRows={5}
                            style={{ width: '80%' }}
                            id='textarea'
                            onChange={e => { handlechangetext(e) }}
                            defaultValue={dataState.post.problem.description}
                            />
                    </Textareawrapper>
                        {props.ifproblem && (<>
                    <Categorywrapper>
                        <Keyword>キーワード:</Keyword>
                        <Categoryinput onChange={e => {handlechangekeyword(e)}} error={error ? true: false} type='text' placeholder='12文字以下' defaultValue={dataState.post.problem.category} />
                    </Categorywrapper>
                    {error && <Errortext>{error==='empty' ? 'キーワードを入力してください' : 'キーワードは12文字以下です'}</Errortext>}</>
                )}
                        
                        <File3wrapper><Fab1>
                            {(!circleloading[0] && success[0]) && (
                    
                                <Fab aria-label='save' color='primary' sx={{
                                    bgcolor: green[500],
                                    
                        
                                    '&:hover': { bgcolor: red[700] }
                                }} onClick={() => { handledelete(1) }} >
                                    <CheckIcon />
                                </Fab>)}
                            {(!circleloading[0] && !success[0]) && (
                                <Fab aria-label='save' color='primary' sx={{
                                    bgcolor: blue[500],
                                  
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
                                        
                                    }}
                                />
                            )}</Fab1>
                            <Fab1>
                            {(!circleloading[1] && success[1]) && (
                                <Fab aria-label='save' color='primary' sx={{
                                    bgcolor: green[500],
                                   
                                    '&:hover': { bgcolor: red[700] }
                                }} onClick={() => { handledelete(2) }} >
                                    <CheckIcon />
                                </Fab>)}
                            {(!circleloading[1] && !success[1]) && (
                                <Fab aria-label='save' color='primary' sx={{
                                    bgcolor: blue[500],
                                    
                                    margin: '0',
                                    padding: '0',
                                    
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
                                        
                                    }}
                                />
                                )}</Fab1>
                            <Fab1>
                            {(!circleloading[2] && success[2]) && (
                                <Fab aria-label='save' color='primary' sx={{
                                    bgcolor: green[500],
                                   
                                    '&:hover': { bgcolor: red[700] }
                                }} onClick={() => { handledelete(3) }} >
                                    <CheckIcon />
                                </Fab>)}
                            {(!circleloading[2] && !success[2]) && (
                                <Fab aria-label='save' color='primary' sx={{
                                    bgcolor: blue[500],
                                    
                                    margin: '0',
                                    padding: '0',
                                   
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
                                       
                                    }}
                                />
                            )}</Fab1>
                        </File3wrapper>

                        <Fileinput type='file' accept='images/*' id='1' onChange={(e) => { handlecircular(0); handlechange(e,1) }} />
                        <Fileinput type='file' accept='images/*' id='2' onChange={(e) => { handlecircular(1); handlechange(e,2) }} />
                        <Fileinput type='file' accept='images/*' id='3' onChange={(e) => { handlecircular(2); handlechange(e,3) }} />
                        <Submitbutton loading={load} onClick={handle} variant='contained' sx={{ marginTop: '100px' }} >変更</Submitbutton>
                    </Wrapper>
                    }
            
                </>
    )
}



export default Editproblem
