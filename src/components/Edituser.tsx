import axios from './axios';
import styled from 'styled-components';
import { TextField } from '@material-ui/core';
import { LoadingButton } from '@mui/lab';
import { useState, useEffect, useReducer, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { url } from './url';
import Loading from './Loading';
import Loadingwrapper from './Loadingwrapper';
import dataFetch from './DataFetch';
import newuserimage from '../newuserimage.png';
import Wrapper from './Wrapper';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import 'katex/dist/katex.min.css';
import Latex from 'react-latex-next';


const Textareawrapper = styled.div`
    margin: 20px auto 30px auto;
    width: 80%;
`

const Message = styled.div`
    font-size: 30px;
    margin-top: 30px;
    white-space: pre-wrap;
`
const Textinput = styled(TextField)`
    width: 100%;
`
const Textwrapper = styled.div`
    width: 80%;
    margin: 40px auto 0 auto;
`

const Button = styled(LoadingButton)`
    width: 50;
`
const Buttonwrapper = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 30px auto;
`
const Image = styled.img`
    width: 70px;
    height: 70px;
    border-radius: 50%;
    object-fit: cover;
    margin: 15px 0 15px 0;
`
const Fileinput = styled.input`
    display: none;
`
const Filebutton = styled.label`
    width: 70px;
    height: 70px;
    border-radius: 50%;
    cursor: pointer;
`
const Filewrapper = styled.div`
    width: 100%;
    height: 90px;
    display: flex;
    justify-content: center;
    align-items: center;
`
const Defaultdiv = styled.div`
    height: 20px;
    width: 250px;
    margin: 30px auto 20px auto;
    border-radius: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px black solid;
    padding: 5px 0 5px 0;
    cursor: pointer;
`
const Errortext = styled.div`
    width: 80%;
    margin: 0 auto 40px auto;
    text-align: left;
    color: red;
    padding-left: 10px;
    font-size: 13px;
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
function Edituser(props: Props) {
    const [loading, setLoading] = useState(false);
    const [ifdefault, setIfdefault] = useState('nondefault');
    const { id } = useParams();
    const user_url = url + '/users/' +  id ;
    const [dataState, dispatch] = useReducer(dataFetch, initialState);
    const [name, setName] = useState('');
    const Imageref = useRef(null);
    const [imgurl, setImgurl] = useState('');
    const [error, setError] = useState('')
    const [text, setText] = useState('')
    const navigate = useNavigate();
    
    useEffect(() => {
        if (!props.logged_in.bool || props.logged_in.id !== Number(id)) {
            navigate('/users/' + props.logged_in.id + '/edit',{replace: true})
            return
        }
        axios.get(user_url).then(resp => {
            setImgurl(resp.data.user.image_url);
            setName(resp.data.user.name)
            setText(resp.data.user.description)
            dispatch({ type: 'success', payload: resp.data });
        }).catch(e => {
            console.log(e);
        })
    }, [id])
    const imghandle = (e:any) => {
        if (e.target.files[0]) {
            setIfdefault('nondefault');
            setImgurl(URL.createObjectURL(e.target.files[0]));
        }
    };
    const defaulthandle = () => {
        setIfdefault('default');
        setImgurl(newuserimage);
    }
    const handle = () => {
        setLoading(true);
        if (!name) {
            setError('empty')
            setLoading(false)
            return
        } else if (name.length > 11) {
            setError('long')
        }
        const image: any = Imageref.current;
        const data = new FormData();
        data.append('user[name]', name)
        if (ifdefault === 'default') {
            data.append('user[image]', 'default');  
        } else if (!image.files[0]) {
            data.append('user[image]', 'nondefault');
        } else {
            data.append('user[image]', image.files[0]);
        }
        if (text) {
            data.append('user[description]', text)
        }
        axios.patch(user_url, data).then(resp => {
            setLoading(false);
            const new_id = resp.data.user.id;
            navigate('/users/'+new_id)
        }).catch(e => {
            setError('exist')
            console.log(e.response.data.error);
            setLoading(false);
        })
    }

    const handlename = (e: any) => {
        setName(e.target.value) 
    }
    const changetext = (e: any) => {
        setText(e.target.value)
    }
    
    return (
        <>
            {dataState.isLoading ? 
                <Loadingwrapper>
                    <Loading></Loading> 
                </Loadingwrapper> :
            <Wrapper>
                    <Message>
                        <Latex>
                            $Edit$  $profile$
                        </Latex>
                    </Message>
                    <Filewrapper>
                        <Filebutton htmlFor='file-input'>
                            <Image src={imgurl} />
                        </Filebutton>
                        <Fileinput id='file-input' ref={Imageref} type='file' accept='image/*' onChange={e => imghandle(e)} />
                    </Filewrapper>
                    <Defaultdiv onClick={defaulthandle} >デフォルトの画像を使用する</Defaultdiv>
                    <Textwrapper>
                        <Textinput id='name' error={error ? true : false} label="ユーザー名" variant="standard" onChange={e => { handlename(e) }} defaultValue={dataState.post.user.name} placeholder='11文字以下'/>
                    </Textwrapper>
                    <Textareawrapper>
                        <TextareaAutosize
                            aria-label="minimum height"
                            minRows={3}
                            style={{ width: '100%' }}
                            placeholder='紹介文を書いてください'
                            onChange = {e => {changetext(e)}}
                            defaultValue={dataState.post.user.description}
                            />
                        </Textareawrapper>
                    {error && 
                        <Errortext>
                            {error === 'empty' && 'ユーザー名を入力してください'}
                            {error === 'exist' && 'そのユーザー名はすでに使用されています'}
                            {error === 'long' && 'ユーザー名は11文字以下です'}
                        </Errortext>
                    }
                       
                    <Buttonwrapper>
                        <Button loading={loading} onClick={handle} variant="outlined" >変更</Button>
                    </Buttonwrapper>
                </Wrapper>
            }
                
                
                </>
                )
}

export default Edituser