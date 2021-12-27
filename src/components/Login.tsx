import {TextField} from '@material-ui/core'
import styled from 'styled-components'
import axios from './axios';
import { LoadingButton } from '@mui/lab';
import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { url } from './url';
import Wrapper from './Wrapper';

const Text = styled(TextField)`
    width: 100%;
`;
const Textwrapper = styled.div`
    width: 80%;
    margin: 40px auto 40px auto;
`
const Button = styled(LoadingButton)`
    width: 150px;
    text-align: center;
`

const Message = styled.div`
    font-size: 30px;
    margin: 30px auto;
`
interface Props {
    logged_in: {
        bool: boolean
        id: number
        image: string
        name: string
    };
    setLogged_in: React.Dispatch<React.SetStateAction<{
        bool: boolean;
        id: number;
        image: string;
        name: string;
    }>>
}

function Login(props: Props) {

    const [load, setLoad] = useState(false);
    const Nameref = useRef(null);
    const Passref = useRef(null);
    const login_url = url + '/login'
    const navigate = useNavigate()

    const handle = () => {
        setLoad(true);
        const name: any = Nameref.current;
        const pass: any = Passref.current;
        const data = new FormData()
        data.append('session[name]', name.childNodes[1].childNodes[0].value);
        data.append('session[password]', pass.childNodes[1].childNodes[0].value);
        axios.post(login_url, data).then((resp) => {
            setLoad(false);
            const id = resp.data.id;
            axios.get(url + '/logged_in').then(resp => {
                props.setLogged_in(resp.data)
                navigate('/users/'+ id);
            })
        }).catch((e) => {
            console.log(e);
            setLoad(false);
        })
    };


    return (
        <Wrapper>
            <Message>ログイン画面</Message>
            <Textwrapper>
                <Text id="outlined-basic" ref={Nameref} error={false} label="Name" variant="outlined" />
            </Textwrapper>
            <Textwrapper>
                <Text id="outlined-basic" ref={Passref} error={false} label="Password" type='password' variant="outlined" />
            </Textwrapper>
            <Button loading={load} onClick={handle} variant="outlined" >
                Submit
            </Button>
        </Wrapper>
        
    )
}

export default Login
