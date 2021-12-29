import axios from './axios';
import { url } from './url';
import styled from 'styled-components';
import Wrapper from './Wrapper';
import { useRef,  useState, useEffect } from 'react';
import { useNavigate, useParams, useMatch } from 'react-router-dom';
import { LoadingButton } from '@mui/lab';
import TextareaAutosize from '@mui/material/TextareaAutosize';

const Textareawrapper = styled.div`
    margin: 20px auto 30px auto;
    width: 80%;
`

const Message = styled.div`
    width: 100%;
    font-size: 25px;
    margin: 30px auto;
`
const Warn = styled.p`
    font-size: 13px;
`
const Submitbutton = styled(LoadingButton)`
    width: 100px;
    margin: 40px auto 0 auto;
`
interface Props {
    logged_in: {
        bool: boolean,
        id: number,
        image: string,
        name: string
    }
}

function Makecomment(props: Props) {
    const textref = useRef(null);
    const [load, setLoad] = useState(false);
    const navigate = useNavigate();
    const { id} = useParams();
    const match = useMatch('/problems/:id/comments/new');
    var create_url = ''
    
    useEffect(() => {
        if (!props.logged_in.bool) {
            navigate('/login',{replace: true})
        }
    },[])
    
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
    
    return (
        <Wrapper>
            <Message>コメントの作成<br/><Warn>texのテキストは$(半角)で囲んでください</Warn></Message>
            <Textareawrapper>
            <TextareaAutosize
                aria-label="minimum height"
                minRows={5}
                style={{ width: '80%' }}
                ref={textref}
                />
            </Textareawrapper>
            <Submitbutton sx={{ marginTop: '50px' }} loading={load} onClick={handle} variant='outlined'>投稿</Submitbutton>
        </Wrapper>
    )
}

export default Makecomment
