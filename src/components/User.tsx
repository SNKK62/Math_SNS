import styled from 'styled-components'
import axios from './axios'
import React, { useReducer, useEffect } from 'react'
import Loading from './Loading'
import dataFetch from './DataFetch'
import { url } from './url';
import Wrapper from './Wrapper';
import Divider from '@mui/material/Divider';
import Avatar from '@mui/material/Avatar';
// import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';

// const Userlist = styled.div`
//     height: 70px;
//     width: 100%;
//     display: flex;
//     justify-content: center;
//     align-items: center;
//     padding: 10px 0 10px 0;
//     cursor: pointer;
// `



const Loading2 = styled(Loading)`
    width: 100%;
    height: 100%;
    z-index: 3;
`



const initialState = {
    isLoading: true,
    isError: '',
    post: {}
};



const User: React.FC = () => {
    const user_url = url + '/users';
    const [dataState, dispatch] = useReducer(dataFetch, initialState)
    // const [buttonstyle, setButtonstyle] = useState('')
    
    useEffect(() => {
        axios.get(user_url)
            .then(res => {
                dispatch({ type: 'success', payload: res.data.users })
                console.log(res.data)
            }).catch(err => {
                dispatch({ type: 'error', payload: err })
            })
    }, [])
        
    return (
        <>
            {dataState.isLoading ?
                <Wrapper>
                    <Loading2 />
                </Wrapper> :
                <Wrapper >
                    <List sx={{paddingTop: '0'}}>
                    <Divider />
                        {dataState.post.map((val: any) => {
                            return(<>
                            <ListItemButton key={val.id} sx={{padding: '0'}} >
                                <ListItem sx={{height: '78px', padding: '0'}}>
                                    <Avatar alt="R" src="" sx={{height: '40px',width: '40px',marginLeft: '10px'}}/>
                                    <List　 sx={{width: '80%', paddingLeft: '10px', padding: '0 0 0 5px'}}>
                                            <ListItemText  primary={val.name} primaryTypographyProps={{ fontSize: '23px', paddingLeft: '10px', textAlign: 'center' }}/>
                                        <Divider />
                                            <ListItemText  primary={val.follower_count + 'フォロワー' + val.following_count + 'フォロー'} primaryTypographyProps={{fontSize: '14px',paddingLeft: '5px'}}/>
                                    </List>
                                </ListItem>
                            </ListItemButton>
                            <Divider/>
                            </>
                            )   
                        })}
                    </List>
                </Wrapper>
            }
        </>
    )
}


export default User
