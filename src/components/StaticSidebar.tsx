import styled from 'styled-components';
import {useNavigate} from 'react-router-dom'
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import MediaQuery from 'react-responsive';

const Sidewrapper = styled.div`
height: calc(100vh-64px);
border-right: 1px solid rgb(200,200,200);
overflow: auto;
margin-right: 1vw;
overflow-scroll: touch;
position: fixed;
@media(min-width: 600px) {
    width: 39vw;
    margin-left: 0;
    box-sizing: border-box;
}
@media(min-width: 1025px) {
    width: 19vw;
    margin-left: 0;
    box-sizing: border-box;
}
`

interface Props {
    logged_in: {
      bool: boolean
      id: number
      image: string,
      name: string
    }
    handledelete: () => void
  }
function StaticSidebar(props: Props) {
    const navigate = useNavigate();
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
    return (
        <Sidewrapper>
            <MediaQuery query='(min-width: 600px) and (max-width: 1024px)'>
            <Box
          sx={{ width: '39vw' ,height: '100vh'}}
      role="presentation"
    >{props.logged_in.bool && <>
      <Avatar src={props.logged_in.image} onChange={() => {toPage('プロフィール')}} sx={{ width: '80px', height: '80px', margin: '20px auto 20px auto' }} />
      <Typography id='name' sx={{ textAlign: 'center', fontSize: '22px', marginBottom: '10px' }} >
        {props.logged_in.name}
      </Typography>
      <Divider /></>}
      {props.logged_in.bool ? <>
        <List>
          {['プロフィール', 'ユーザー一覧', '問題一覧', '問題投稿'].map((text, _) => (
            <ListItem button key={text} onClick={() => { toPage(text) }}  >
              <ListItemText primary={text} sx={{ marginLeft: '20px' }} />
            </ListItem>
          ))}
        </List>
        <List sx={{ position: 'absolute',width: '39vw', bottom: '80px', borderTop: '1px solid rgb(200,200,200)' }}>
          <ListItem button key={'ログアウト'} onClick={props.handledelete}>
            <ListItemText primary='ログアウト' sx={{ marginLeft: '20px', color: 'red' }} />
          </ListItem>
        </List></> :
        <List>
          {['ログイン', 'サインアップ'].map((text, _) => (<>
            <ListItem button key={text} onClick={() => { toPage(text) }}  >
              <ListItemText primary={text} sx={{ marginLeft: '20px' }} />
            </ListItem>
            <Divider/></>
          ))}
        </List>}
        
                </Box>
            </MediaQuery>
        <MediaQuery query='(min-width: 1025px)'>
        <Box
          sx={{ width: '19vw',height: '100vh' }}
      role="presentation"
    >{props.logged_in.bool && <>
      <Avatar src={props.logged_in.image} onChange={() => {toPage('プロフィール')}} sx={{ width: '80px', height: '80px', margin: '20px auto 20px auto' }} />
      <Typography id='name' sx={{ textAlign: 'center', fontSize: '22px', marginBottom: '10px' }} >
        {props.logged_in.name}
      </Typography>
      <Divider /></>}
      {props.logged_in.bool ? <>
        <List>
          {['プロフィール', 'ユーザー一覧', '問題一覧', '問題投稿'].map((text, _) => (
            <ListItem button key={text} onClick={() => { toPage(text) }}  >
              <ListItemText primary={text} sx={{ marginLeft: '20px' }} />
            </ListItem>
          ))}
        </List>
        <List sx={{ position: 'absolute',width: '19vw', bottom: '80px', borderTop: '1px solid rgb(200,200,200)' }}>
          <ListItem button key={'ログアウト'} onClick={props.handledelete}>
            <ListItemText primary='ログアウト' sx={{ marginLeft: '20px', color: 'red' }} />
          </ListItem>
        </List></> :
        <List>
          {['ログイン', 'サインアップ'].map((text, _) => (<>
            <ListItem button key={text} onClick={() => { toPage(text) }}  >
              <ListItemText primary={text} sx={{ marginLeft: '20px' }} />
            </ListItem>
            <Divider/></>
          ))}
        </List>}
        
                </Box>
        </MediaQuery>
        </Sidewrapper>
    )
}

export default StaticSidebar
