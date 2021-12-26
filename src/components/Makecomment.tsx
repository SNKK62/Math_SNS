import axios from './axios';
import { url } from './url';
import styled from 'styled-components';
import Wrapper from './Wrapper';
import { useRef,  useState } from 'react';
import { useNavigate, useParams, useMatch } from 'react-router-dom';
import { LoadingButton } from '@mui/lab';


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


function Makecomment() {
    const textref = useRef(null);
    const [load, setLoad] = useState(false);
    const navigate = useNavigate();
    const { id} = useParams();
    const match = useMatch('/problems/:id/comments/new');
    var create_url = ''
    
    
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
            <Message>コメントの作成</Message>
            <Textarea ref={textref} />
            <Submitbutton sx={{ marginTop: '50px' }} loading={load} onClick={handle} >投稿</Submitbutton>
        </Wrapper>
    )
}

export default Makecomment
