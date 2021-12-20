// import styled from 'styled-components';
import React from 'react';
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
  }


function Sidebar(props: Props) {
        
        
          const list = () => (
            <Box
                  sx={{ width: '250px' }}
              role="presentation"
              onClick={props.toggleDrawer(false)}
              onKeyDown={props.toggleDrawer(false)}
              >
                <Avatar src="" sx={{width: '80px', height: '80px', margin: '20px auto 20px auto'}} />
                  <Typography sx={{ textAlign: 'center', fontSize: '25px', marginBottom: '10px' }} >
                      ユーザー名
                  </Typography>
                <Divider/>
                
              <List>
                {['プロフィール', 'ユーザー一覧', '問題投稿'].map((text, _) => (
                  <ListItem button key={text}  >
                    <ListItemText primary={text} sx={{marginLeft: '20px'}} />
                  </ListItem>
                ))}
              </List>
                  <Divider />
              <List sx={{position: 'absolute', bottom: '30px'}}>
                  <ListItem button key={'ログアウト'}>
                          <ListItemText primary='ログアウト' sx={{marginLeft: '20px',color: 'red'}}/>
                  </ListItem>
              </List>
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
