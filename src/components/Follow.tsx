import styled from 'styled-components';

// import Typography from '@mui/material/Typography';
import  { useState, useEffect} from 'react';
import axios from './axios';
import { url } from './url';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
import Avatar from '@mui/material/Avatar';
import Loading from './Loading';
import Loadingwrapper from './Loadingwrapper';
import Wrapper from './Wrapper'
import { useNavigate,useParams } from 'react-router-dom';


const Loading2 = styled(Loading)`
    height: 100%;
    width: 100%;
`
const Intro = styled.div`
    width: 100%;
    height: 80px;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    font-size: 13px;
    @media(min-width: 600px){
        font-size: 15px;
    }
    @media(min-width: 1025px){
        font-size: 19px;
    }
`

interface Props {
    iffollower: boolean
}

function Follow(props: Props) {
    const {id} = useParams()
    const search_url = url + '/users/'+id;
    const [users,setUsers] = useState<any[]>([])
    const [load, setLoad] = useState(true)
    const [username, setUsername] = useState('')
    const navigate = useNavigate()
    
    
    useEffect(() => {
        if (!load) {
            setLoad(true)
        }
        axios.get(props.iffollower ? search_url+'/followers' : search_url+'/followings').then(resp => {
            setUsers([...resp.data.user]);
            setUsername(resp.data.user_name)
            setLoad(false)
        }).catch(e => {
            console.log(e)
        })
    }, [id]);
    
    const toUsers = (id: number) => {
        navigate('/users/' + String(id))
        if(username){}
    }
    
    

    return (
        <>
        
            {load ? 
            <Loadingwrapper>
                <Loading2 />
            </Loadingwrapper>
            :<Wrapper>
                <Intro>
                    {props.iffollower ? username+'のフォロワー' : username+'がフォローしているユーザー'}
                </Intro>
                    <List  sx={{ paddingTop: '0' ,marginTop: '0'}} >
                        <Divider key='divider1'/>
                        {users.map((val: any,index) => {
                            return (<div key={index}>
                                <ListItemButton sx={{ padding: '0' }} onClick={() => {toUsers(val.id)}} >
                                    <ListItem  key={val.id.to_String+'item'} sx={{ height: '90px', padding: '0' }}>
                                        <Avatar key={val.id.to_String+'avatar'} alt={val.name} src={val.image_url} sx={{ height: '40px', width: '40px', marginLeft: '10px' }} />
                                        <List key={val.id.to_String+'list'} sx={{ width: '80%', paddingLeft: '10px', padding: '0 0 0 5px' }}>
                                            <ListItemText  key={val.id.to_String+'item1'} primary={val.name} primaryTypographyProps={{ fontSize: '23px', paddingLeft: '10px', textAlign: 'center',paddingTop: '5px' }} />
                                            <Divider key={val.id.to_String+'divider1'} />
                                            <ListItemText key={val.id.to_String+'item2'} primary={val.problem_count + '投稿 ' + val.solution_count + '解答'} primaryTypographyProps={{ fontSize: '14px', paddingLeft: '5px' }} />
                                            <ListItemText key={val.id.to_String+'item3'} primary={val.follower_count + 'フォロワー ' + val.following_count + 'フォロー'} primaryTypographyProps={{ fontSize: '14px', paddingLeft: '5px' }} />
                                        </List>
                                    </ListItem>
                                </ListItemButton>
                                <Divider key={val.id.to_String+'divider2'}/>
                            </div>
                            )
                        })}
                        <Divider key='divider3'/>
                    </List></Wrapper>
                }
        </>
    )
}

export default Follow