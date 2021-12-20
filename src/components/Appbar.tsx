import styled from 'styled-components';
import React,{useState} from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
// import Menu from '@mui/material/Menu';
import MenuIcon from '@material-ui/icons/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
// import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
// import MenuItem from '@mui/material/MenuItem';
import Sidebar from './Sidebar';
import SearchIcon from '@material-ui/icons/Search';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import InputBase from '@mui/material/InputBase';
import Searchuser from './Searchuser';

const Searchwrapper = styled.div`
    width: 100vw;
    position: fixed;
    z-index: 5;
    background: white;
    height: 100vh;
    
`
const SearchInput = styled(InputBase)`
    width: 100%;
    padding: 0;
    border-radius: 15px;
    border: 1px rgb(155,155,155,70) solid;
    background: rgb(250,250,250);
    padding-left: 15px;
    &:hover {
        background: rgb(240,240,240,70);
    };
    display: flex;
    align-items: center;
`


function Appbar() {
    const [state, setState] = useState(false);
    const [search, setSearch] = useState(false);
    const [searchkeyword, setSearchkeyword] = useState('');
    const toggleDrawer = (open: boolean) =>
    (event: React.KeyboardEvent | React.MouseEvent) =>{
        if (
            event &&
            event.type === 'keydown' &&
            ((event as React.KeyboardEvent).key === 'Tab' ||
              (event as React.KeyboardEvent).key === 'Shift')
          ) {
            return;
          }
            setState( open );
        };
    const handlesearch = (b: boolean) => {
        setSearch(b);
    };
    const handlechangekeyword = (e: any) => {
        setSearchkeyword(e.target.value);
    };

    return (<>
        <AppBar position="static" color="transparent" sx={{zIndex: '10'}}>
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    {search ?
                        <>
                            <IconButton
                                    size="large"
                                    aria-label="account of current user"
                                    aria-controls="menu-appbar"
                                    aria-haspopup="true"
                                    color="inherit"
                                    onClick={() => {handlesearch(false)}}
                                >
                                <ArrowBackIcon  />
                            </IconButton>
                            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                                <SearchInput onChange={(e) => {handlechangekeyword(e)}} placeholder="検索キーワード..." />
                            </Box>
                        </> : <>
                        <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}  >
                            <Tooltip title="サイドバーを開く">
                                <IconButton
                                    size="large"
                                    aria-label="account of current user"
                                    aria-controls="menu-appbar"
                                    aria-haspopup="true"
                                    color="inherit"
                                    onClick={(e: any) => { toggleDrawer(true)(e) }}
                                >
                                    <MenuIcon  />
                                </IconButton>
                            </Tooltip>
                        </Box >

                        <Box sx={{ position: 'absolute', left: '26vw', width: '40vw', textAlign: 'center' }}>
                            <Typography>
                                Math-Sns
                            </Typography>
                        </Box>
                    

                        <Box sx={{ flexGrow: 0, position: { xs: 'static', md: 'absolute' }, right: '20px' }}>
                            <IconButton sx={{ p: 0, marginRight: '5px' }} onClick={() => { handlesearch(true) }}>
                                <SearchIcon />
                            </IconButton>
                            <IconButton sx={{ p: 0 }}>
                                <Avatar alt="Remy Sharp" src="" />
                            </IconButton>
                        </Box>
                    </>}
                </Toolbar>
            </Container>
            <Sidebar state={state} setState={setState} toggleDrawer={toggleDrawer} />
            </AppBar>
            {search && <>
            <Searchwrapper />
            <Searchuser keyword={searchkeyword}/>
    </>}
    </>
    );
    };



export default Appbar
