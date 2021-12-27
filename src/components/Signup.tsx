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
    cursor: pointer;
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
    margin: 40px auto 0 auto;
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
const Errortext = styled.div`
    width: 80%;
    margin: 0 auto 40px 0 auto;
    color: red;
`


interface Props {
    logged_in: {
        bool: boolean
        id: number
        image: string
        name: string
    };
    setLogged_in:React.Dispatch<React.SetStateAction<{
        bool: boolean;
        id: number;
        image: string;
        name: string;
    }>>
}

const Signup: React.FC<Props> = (props) => {
    const Nameref = useRef(null);
    const Passref = useRef(null);
    const Passconfref = useRef(null);
    const Imageref = useRef(null);
    const navigate = useNavigate();
    const [nameerror, setNameerror] = useState(false);
    const [passerror, setPasserror] = useState(false);
    const [passconferror, setPassconferror] = useState(false);
    
    const create_url: string = url + '/users';
    const [imgurl, setImgurl] = useState(newuserimage);
    const [load, setLoad] = useState(false);
    const [ifdefault, setIfdefault] = useState('default');
    const handle = () => {
        setLoad(true);
        var error1 = false;
        var error2 = false;
        var error3 = false;
        setNameerror(false);
        setPasserror(false);
        setPassconferror(false);
        const name: any = Nameref.current;
        const pass: any = Passref.current;
        const passconf: any = Passconfref.current;
        const image: any = Imageref.current;
        if (!name || !name.childNodes[1].childNodes[0].value) {
            error1 = true;
            setNameerror(true)
        }
        if (!pass || pass.childNodes[1].childNodes[0].value.length<6) {
            error2 = true;
            setPasserror(true)
        }
        if (!passconf || pass.childNodes[1].childNodes[0].value != passconf.childNodes[1].childNodes[0].value) {
            error3 = true;
            setPassconferror(true)
        }
        if (error1 || error2 || error3) {
            setLoad(false)
            return 
        }
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
            axios.get(url + '/logged_in').then(resp => {
                props.setLogged_in(resp.data)
                navigate('/users/' + id);
            }).catch(e => {
                console.log(e)
            })
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
            <Inputwrapper><Input ref={Nameref} error={nameerror} label="Name" variant="outlined" /></Inputwrapper>
            {nameerror && <Errortext>その名前は使用されています</Errortext>}
            <Inputwrapper><Input  ref={Passref} error={passerror} label="Password" variant="outlined" type='password'/></Inputwrapper>
            {passerror && <Errortext>パスワードは６文字以上です</Errortext>}
            <Inputwrapper><Input ref={Passconfref} error={passconferror} label="Password Confirmation" variant="outlined" type='password' /></Inputwrapper>
            {passconferror && <Errortext>パスワード一致していません</Errortext>}
            
            
            <Button loading={load} onClick={handle} variant="outlined" >
                Create
            </Button>
        </Wrapper>
    )
}

export default Signup
