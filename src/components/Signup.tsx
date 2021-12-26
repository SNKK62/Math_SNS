import styled from 'styled-components'
import axios from './axios'
import React, { useState, useRef} from 'react'
import {url} from './url'
import { TextField } from '@material-ui/core'
import { LoadingButton } from '@mui/lab';
import { useNavigate } from 'react-router-dom';
import newuserimage from '../newuserimage.png';
import Wrapper from './Wrapper';

const Input = styled(TextField)`
    width: 100%;
`
const Fileinput = styled.input`
    display: none;
    width:100%;
    height: 100%;
`
const Filewrapper = styled.label`
    width: 70px;
    height: 70px;
    border-radius: 50%;
`
const Filewrapper2 = styled.div`
    width: 100px;
    display: flex;
    justify-content: center;
    margin: auto;
`
const Preview = styled.img`
    width: 70px;
    height: 70px;
    border-radius: 50%;
    margin : 5px auto 15px auto;
`
const Inputwrapper = styled.div`
    width: 80%;
    margin: 40px auto 40px auto;
`
const Message = styled.div`
    font-size: 30px;
    width: 100%;
    text-align: center;
    margin: 30px auto;
`
const Button = styled(LoadingButton)`
    width: 150px;
    text-align: center;
    margin: 30px auto;
`
const Defaultdiv = styled.div`
    width: 250px;
    margin: 30px auto 20px auto;;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid black;
    border-radius: 10px;
    padding: 5px 0 5px 0;
`




const Signup: React.VFC = () => {
    const Nameref = useRef(null);
    const Passref = useRef(null);
    const Passconfref = useRef(null);
    const Imageref = useRef(null);
    const navigate = useNavigate();
    
    const create_url: string = url + '/users';
    const [imgurl, setImgurl] = useState(newuserimage);
    const [load, setLoad] = useState(false);
    const [ifdefault, setIfdefault] = useState('default');
    const handle = () => {
        setLoad(true);
        const name: any = Nameref.current;
        const pass: any = Passref.current;
        const passconf: any = Passconfref.current;
        const image: any = Imageref.current;
        const data = new FormData()
        data.append('user[name]', name.childNodes[1].childNodes[0].value)
        data.append('user[password]', pass.childNodes[1].childNodes[0].value)
        data.append('user[password_confirmation]', passconf.childNodes[1].childNodes[0].value)
        if (!image.files[0] || ifdefault=='default') {
            data.append('user[image]', '')
        } else {
            data.append('user[image]', image.files[0])
        }
        console.log(image.files[0])
        console.log(data)
        axios.post(create_url, data).then(resp => {
            setLoad(false)
            const id = resp.data.user.id
            navigate('/users/' + id);
        }).catch(e => {
            
            console.log(e.response.data.error);
            setLoad(false);
        })
    };
    const imghandle = (e: any) => {
        if (e.target.files[0]) {
            setIfdefault('nondefault')
            setImgurl(URL.createObjectURL(e.target.files[0]));
        }
    };
    const defaulthandle = () => {
        setIfdefault('default');
        setImgurl(newuserimage);
    }
   
    return (
        <Wrapper>
            <Message>Sign Up</Message>
            <Filewrapper2>
                <Filewrapper htmlFor='fileinput'>
                    <Preview src={imgurl}  />
                </Filewrapper>
                <Fileinput  id='fileinput' ref={Imageref} type='file' accept="image/*" onChange={(e)=>{imghandle(e)}}/>
            </Filewrapper2>
            <Defaultdiv onClick={defaulthandle} >デフォルトの画像を使用する</Defaultdiv>
            <Inputwrapper><Input ref={Nameref} error={false} label="Name" variant="outlined" /></Inputwrapper>
            <Inputwrapper><Input  ref={Passref} error={false} label="Password" variant="outlined" type='password'/></Inputwrapper>
            <Inputwrapper><Input ref={Passconfref} error={false} label="Password Confirmation" variant="outlined" type='password' /></Inputwrapper>
            
            
            <Button loading={load} onClick={handle} variant="outlined" >
                Create
            </Button>
        </Wrapper>
    )
}

export default Signup
