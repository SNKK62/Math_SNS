// import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import TabList from '@mui/lab/TabList';
import Box from '@mui/material/Box';
import styled from 'styled-components';
import TabPanel from '@mui/lab/TabPanel';
import Searchusersub from './Searchusersub';
import TabContext from '@mui/lab/TabContext';       
import Searchproblemsub from './Searchproblemsub';
import { useState, useRef } from 'react';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import IconButton from '@mui/material/IconButton';


const Box1 = styled(Box)`
  position: relative;
  z-index: 7;
`


const SearchInput = styled(InputBase)`
    width: 90%;
    padding: 0;
    border-radius: 15px;
    border: 1px rgb(155,155,155,70) solid;
    background: rgb(250,250,250);
    padding-left: 15px;
    margin: 15px 5px 0  10px;
    &:hover {
        background: rgb(240,240,240,70);
    };
    display: flex;
    align-items: center;
`
const Searchwrapper = styled.div`
    width: 35vw;
    background: white;
    z-index: 20;
    height: 50px;
    position: fixed;
    top: 64px;
    left: 35vw;
    box-shadow: 0px 2px 1px 0 rgb(100,100,100,0.2) inset;
    border-left: 1px solid rgb(200,200,200);

`
const Wrapper2 = styled.div`
    width: 100%;
    text-align: center;
    height: calc(100vh-64px);
   
    height: calc(100vh-114px);
    margin-top: 50px;
`
const Allwrapper = styled.div`
    height: calc(100vh-64px);
    width: 35vw;
`


function SearchTabtest() {
  const [value, setValue] = useState('1')
  const search = useRef(null)
  const [keyword, setKeyword] = useState('')
    const handleChange = (e?: React.SyntheticEvent, newValue?: string) => {
        if (e && newValue) {
            setValue(newValue);
        };
    };
  const handlesubmit = () => {
    if (search) {
      const searchkey: any = search.current;
      setKeyword(searchkey.childNodes[0].value)
    } else {
      setKeyword('')
    }
  }
  const handlekeypress = (e: any) => {
    if (e.key === 'Enter') {
      handlesubmit()
    }
  }
   

    return (<Allwrapper>
        <Searchwrapper>
        <SearchInput ref={search} placeholder="検索キーワード..." onKeyPress={e => { handlekeypress(e)}}/>
        <IconButton sx={{ p: 0,  position: 'absolute', top: '20px', right: '1%'}} onClick={handlesubmit}>
                <SearchIcon />
            </IconButton>
        </Searchwrapper>
      <Wrapper2 id='wrapper'>
        <Box1 key='box1' sx={{ width: '100%' }}>
            <TabContext value={value}>
            <Box1 key='box2' sx={{ borderBottom: 1, borderColor: 'divider',width:'100%' }}>
            <TabList
                onChange={handleChange}
                indicatorColor="primary"
                textColor="primary"
                variant="fullWidth"
                aria-label="full width tabs example"
                >
                    <Tab key='one'  label="ユーザー" value='1' sx={{width: '50%'}}  />
                    <Tab key='two'  label="問題" value='2' sx={{width: '50%'}} />
            </TabList>
            </Box1>
            <TabPanel key='one-user-sub' value={'1'}  >
                <Searchusersub keyword={keyword} />
            </TabPanel>
            <TabPanel key='two-user-sub' value={'2'}  >
                <Searchproblemsub keyword={keyword} />
              </TabPanel>
          </TabContext>
        </Box1>
        </Wrapper2>
    </Allwrapper>)
}

export default SearchTabtest
