import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import styled from 'styled-components';
// import TabPanel from '@mui/lab/TabPanel';
import Searchuser from './Searchuser';
import Wrapper from './Wrapper';
// import TabContext from '@mui/lab/TabContext';       
import Searchproblem from './Searchproblem';
import SwipeableViews from 'react-swipeable-views';
import { useTheme } from '@mui/material/styles';
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';


const Box1 = styled(Box)`
  position: relative;
  z-index: 7;
`

interface Props{
    // index: number
    // setIndex: React.Dispatch<React.SetStateAction<number>>
    value: number
  setValue: React.Dispatch<React.SetStateAction<number>>
}


interface TabPanelProps {
    children?: React.ReactNode;
    dir?: string;
    index: number;
    value: number;
  }
  
  function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`full-width-tabpanel-${index}`}
        aria-labelledby={`full-width-tab-${index}`}
        {...other}
      >
        {value === index && (
                <>
                    {children}
                </>
        )}
      </div>
    );
  }

  function a11yProps(index: number) {
      return {
        id: `full-width-tab-${index}`,
        'aria-controls': `full-width-tabpanel-${index}`,
      };
    }

function SearchTab(props: Props) {
    const navigate = useNavigate();
    const theme = useTheme();
    const handleChange = (e: React.SyntheticEvent, newValue: number) => {
      if(e){}
      props.setValue(newValue);
    };
    const handleChangeIndex = (index: number) => {
        props.setValue(index);
    };
  useEffect(() => {
    if (window.innerWidth >= 600) {
       navigate('/users',{replace: true})
     }
   })

    return (<>
        <Wrapper id='wrapper'>
            
        <Box1 key='box1' sx={{ width: '100%' }}>
            <Box1 key='box2' sx={{ borderBottom: 1, borderColor: 'divider',width:'100%' }}>
            <Tabs
                value={props.value}
                onChange={handleChange}
                indicatorColor="primary"
                textColor="primary"
                variant="fullWidth"
                aria-label="full width tabs example"
                >
                    <Tab key='one'  label="ユーザー" {...a11yProps(0)} sx={{width: '50%'}}  />
                    <Tab key='two'  label="問題" {...a11yProps(1)} sx={{width: '50%'}} />
            </Tabs>
            </Box1>
            <SwipeableViews
                axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                index={props.value}
                onChangeIndex={handleChangeIndex}
            >   
            <TabPanel key='one-user' value={props.value} index={0}  dir={theme.direction} >
                <Searchuser />
            </TabPanel>
            <TabPanel key='two-user' value={props.value} index={1} dir={theme.direction} >
                <Searchproblem/>
            </TabPanel>
                    </SwipeableViews>
        </Box1>
        </Wrapper>
    </>)
}

export default SearchTab
