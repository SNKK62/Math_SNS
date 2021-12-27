import styled from 'styled-components';
import Wrapper from './Wrapper';
import { useRef, useState, useEffect, useReducer } from 'react';
import axios from './axios';
import { LoadingButton } from '@mui/lab';
import { url } from './url';
import { useNavigate, useParams } from 'react-router-dom';
import Loading from './Loading';
import Loadingwrapper from './Loadingwrapper';
import dataFetch from './DataFetch';



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

function Editcomment(props: Props) {
    const { id } = useParams()
    const get_url = url + '/comments/' + id;
    const [dataState, dispatch] = useReducer(dataFetch, initialState);
    
    const [textarea, setTextarea] = useState('');
    const [load, setLoad] = useState(false);
    
    const timer = useRef<number>();
    const navigate = useNavigate();
    useEffect(() => {
        axios.get(get_url).then(resp => {
            if (props.logged_in.id != resp.data.comment.user_id) {
                navigate('/comments/'+id, {replace: true})
            }
            setTextarea(resp.data.comment.text);
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
    
    const handle = () => {
        setLoad(true);
        const data = new FormData()
        var edit_url = '';
        var new_url:string = '';
        data.append('comment[text]', textarea);
        edit_url = url + '/comments/' + id;
        new_url = '/comments/' + id;
    
        axios.patch(edit_url, data).then(() => {
            setLoad(false);
            navigate(new_url);
        }).catch(err => {
            setLoad(false);
            console.log(err.response)
        })
    };
    
    const handlechangetext = (e: any) => {
        setTextarea(e.target.value);
    }
    
    
    
    return (
        <>
        {
            dataState.isLoading ? <Loadingwrapper><Loading/></Loadingwrapper> : 
                    <Wrapper>
                        <Message>
                            コメントの編集
                        </Message>
                        <Textarea id='textarea' onChange={e => { handlechangetext(e) }} defaultValue={dataState.post.comment.text} />
                        

                        <Submitbutton loading={load} onClick={handle} variant='contained' sx={{ marginTop: '50px' }} >変更</Submitbutton>
                    </Wrapper>
                    }
            
                </>
    )
}



export default Editcomment
