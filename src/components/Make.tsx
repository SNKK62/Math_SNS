import styled from 'styled-components';
import Wrapper from './Wrapper';
import { useRef, useState, useEffect,  } from 'react';
import axios from './axios';
import { LoadingButton } from '@mui/lab';
import Fab from '@mui/material/Fab';
import CheckIcon from '@material-ui/icons/Check';
import CircularProgress from '@mui/material/CircularProgress';
import {green, blue, red} from '@mui/material/colors';
import { url } from './url';
import { useNavigate, useParams } from 'react-router-dom';
import Button from '@mui/material/Button';


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
const Filediv = styled.div`
    width: 100%;
    text-align: center;
    margin: 10px auto 40px auto;
`
const Filewrapper = styled.label`
    width: 150px;
    height: 40px;
    margin: auto;
    padding-top: 8px;
    cursor: pointer;
`
const File3wrapper = styled.div`
    width: 80%;
    margin: 15px auto 60px auto;
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
const Buttonwrapper = styled.div`
    margin-top: 80px;
    margin-bottom: 30px;
`
function Make(props: Props) {
    const textref = useRef(null);
    const [image1, setImage1] = useState('');
    const [image2, setImage2] = useState('');
    const [image3, setImage3] = useState('');
    const keywordref = useRef(null);
    const [load, setLoad] = useState(false);
    const [circleloading, setCircleloading] = useState([false,false,false]);
    const [success, setSuccess] = useState([false, false, false]);
    const [inputid, setInputid] = useState('1');
    const timer = useRef<number>();
    const navigate = useNavigate();
    const { id } = useParams();
    useEffect(() => {
        if (!props.logged_in.bool) {
            navigate('/login',{replace: true})
            return 
        }
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
        const text: any = textref.current;
        var create_url = '';
        var new_url:string = '';
        if (props.ifproblem) {
            const keyword: any = keywordref.current;
            data.append('problem[description]', text.value);
            data.append('problem[category]', keyword.value);
            data.append('problem[image1]', image1);
            data.append('problem[image2]', image2);
            data.append('problem[image3]', image3);
            create_url = url + '/problems';
            new_url = '/problems/'
        } else {
            data.append('solution[description]', text.value);
            data.append('solution[image1]', image1);
            data.append('solution[image2]', image2);
            data.append('solution[image3]', image3);
            create_url = url + '/problems/'+ id +'/solutions';
            new_url = '/solutions/'
        }
        axios.post(create_url, data).then(resp => {
            const id:string = resp.data.id;
            setLoad(false);
            new_url = new_url + id;
            navigate(new_url);
        }).catch(err => {
            setLoad(false);
            console.log(err.response)
        })
    };
    const handlechange = (e: any) => {
        if (inputid == '1') {
            setImage1(e.target.files[0])
            setInputid('2');
        } else if (inputid == '2') {
            setImage2(e.target.files[0])
            setInputid('3')
        } else if (inputid == '3') {
            setImage3(e.target.files[0])
        }
    }
    const handledelete = (i: number) => {
        if (i == 1 && success[0]) {
            if (success[1]) {
                if (success[2]) {
                    setImage1(image2);
                    setImage2(image3);
                    setImage3('');
                    setSuccess(success.map((_, index) => (index == 2 ? false : true)))
                } else {
                    setImage1(image2);
                    setImage2('');
                    setSuccess(success.map((suc,index) => (index == 1 ? false : suc)))
                    setInputid('2');
                }
            } else {
                setImage1('');
                setInputid('1');
                setSuccess(success.map((suc,index) => (index == 0 ? false : suc)))
            }
        } else if (i == 2 && success[1]) {
            if (success[2]) {
                setImage2(image3);
                setImage3('');
                setSuccess(success.map((suc,index) => (index == 2 ? false : suc)))
            } else {
                setImage2('');
                setSuccess(success.map((suc,index) => (index == 1 ? false : suc)))
                setInputid('2');
            }
        } else if (i == 3 && success[2]) {
            setImage3('');
            setSuccess(success.map((suc,index) => (index == 2 ? false : suc)))
        }
    }
    
    return (
        <>
            <Wrapper>
                <Message>
                    {props.type}の作成
                </Message>
                <Textarea ref={textref} />
                {props.ifproblem && (
                    <Categorywrapper>
                        <Keyword>キーワード:</Keyword>
                        <Categoryinput ref={keywordref} type='text'/>
                    </Categorywrapper>
                )}
                <Filediv>
                    <Button variant='outlined' sx={{  paddingLeft: 0, paddingRight: 0, paddingTop: 0, paddingBottom: 0, width: '150px', height: '40px', }}>
                        <Filewrapper htmlFor={inputid}>
                            画像を追加する
                        </Filewrapper>
                    </Button>
                </Filediv>
                <File3wrapper>
                    {(!circleloading[0] && success[0]) && (
                    
                        <Fab aria-label='save' color='primary' sx={{
                            bgcolor: green[500],
                            position: 'absolute',
                            left: '16%',
                        
                            '&:hover': { bgcolor: red[700] }
                        }} onClick={() => {handledelete(1)}} >
                            <CheckIcon />
                        </Fab>)}
                    {(!circleloading[0] && !success[0]) && (
                        <Fab aria-label='save' color='primary' sx={{
                            bgcolor: blue[500],
                            position: 'absolute',
                            left: '16%',
                            '&:hover': { bgcolor: blue[500] }
                        }}>
                             1
                        </Fab>
                    )}
                        { circleloading[0] && (
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
                        }} onClick={() => {handledelete(2)}} >
                            <CheckIcon /> 
                        </Fab>)}
                    {(!circleloading[1] && !success[1]) && (
                        <Fab aria-label='save' color='primary' sx={{
                            bgcolor: blue[500],
                            position: 'absolute',
                            left: '44%',
                            '&:hover': { bgcolor: blue[500] }
                        }}>
                             2
                        </Fab>
                    )}
                        {circleloading[1] &&  (
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
                        }} onClick={() => {handledelete(3)}} >
                            <CheckIcon /> 
                        </Fab>)}
                    {(!circleloading[2] && !success[2]) && (
                        <Fab aria-label='save' color='primary' sx={{
                            bgcolor: blue[500],
                            position: 'absolute',
                            left: '72%',
                            '&:hover': { bgcolor: blue[500] }
                            
                        }}>
                            3
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

                <Fileinput  type='file' accept='images/*' id='1' onChange={(e) => { handlecircular(0); handlechange(e) }} />
                <Fileinput  type='file' accept='images/*' id='2' onChange={(e) => { handlecircular(1);  handlechange(e)}} />
                <Fileinput  type='file' accept='images/*' id='3' onChange={(e) => { handlecircular(2);  handlechange(e)}} />
                <Buttonwrapper>
                    <Submitbutton loading={load} onClick={handle} variant='contained' >投稿</Submitbutton>
                </Buttonwrapper>
            </Wrapper>
            
        </>
    )
}



export default Make
