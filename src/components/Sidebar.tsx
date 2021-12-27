// import styled from 'styled-components';
import React from 'react';
import {useNavigate} from 'react-router-dom'
import Box from '@mui/material/Box';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
// import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
// import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
// import InboxIcon from '@material-ui/icons/MoveToInbox';
// import MailIcon from '@material-ui/icons/Mail';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';



interface Props {
    state: boolean,
    setState: React.Dispatch<React.SetStateAction<boolean>>,
    toggleDrawer: any
    logged_in: {
      bool: boolean
      id: number
      image: string,
      name: string
    }
    handledelete: () => void
  }


function Sidebar(props: Props) {
  const navigate = useNavigate()
  const toPage = (s: string) => {
    if (s === 'プロフィール') {
      navigate('/')
    } else if (s === 'ユーザー一覧') {
      navigate('/users')
    } else if (s === '問題一覧') {
      navigate('/problems')
    } else if (s === '問題投稿') {
      navigate('/problems/new')
    } else if (s === 'サインアップ') {
      navigate('/signup')
    } else if (s === 'ログイン') {
      navigate('/login')
    }
  }
        
  const list = () => (
    <Box
          sx={{ width: '250px' }}
      role="presentation"
      onClick={props.toggleDrawer(false)}
      onKeyDown={props.toggleDrawer(false)}
      >
        <Avatar src={props.logged_in.image} sx={{width: '80px', height: '80px', margin: '20px auto 20px auto'}} />
          <Typography sx={{ textAlign: 'center', fontSize: '25px', marginBottom: '10px' }} >
              {props.logged_in.name}
          </Typography>
        <Divider/>
      {props.logged_in.bool ? <>
        <List>
          {['プロフィール', 'ユーザー一覧', '問題一覧', '問題投稿'].map((text, _) => (
            <ListItem button key={text} onClick={() => { toPage(text) }}  >
              <ListItemText primary={text} sx={{ marginLeft: '20px' }} />
            </ListItem>
          ))}
        </List>
        <Divider />
        <List sx={{ position: 'absolute',width: '100%', bottom: '30px', borderTop: '1px solid rgb(200,200,200)' }}>
          <ListItem button key={'ログアウト'} onClick={props.handledelete}>
            <ListItemText primary='ログアウト' sx={{ marginLeft: '20px', color: 'red' }} />
          </ListItem>
        </List></> :
        <List>
          {['ログイン', 'サインアップ'].map((text, _) => (
            <ListItem button key={text} onClick={() => { toPage(text) }}  >
              <ListItemText primary={text} sx={{ marginLeft: '20px' }} />
            </ListItem>
          ))}
        </List>}
        
    </Box>
  );

  return (
    <div>
        <React.Fragment key={'left'}>
          <SwipeableDrawer
            anchor={'left'}
            open={props.state}
            onClose={props.toggleDrawer(false)}
            onOpen={props.toggleDrawer(true)}      
          >
            {list()}
          </SwipeableDrawer>
        </React.Fragment>
    </div>
  );
}

export default Sidebar
