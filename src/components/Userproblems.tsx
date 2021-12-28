import  { useState, useEffect} from 'react';
import axios from './axios';
import { url } from './url';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
import Fab from '@mui/material/Fab';
import AddIcon from '@material-ui/icons/Add';
import CircularProgress from '@mui/material/CircularProgress';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

const Loadingwrapper = styled.div`
    padding-top: 15px;
    margin: auto;
    width: 100%;
    text-align: center;
`






function Userproblems() {
    const { id } = useParams();
    const [times, setTimes] = useState(0);
    const [problems,setProblems] = useState<any[]>([])
    const [load, setLoad] = useState(true)
    const [circular, setCircular] = useState(false);
    const [disable, setDisable] = useState(false);
    var real_url = ''
    
    useEffect(() => {
        setTimes(0)
        real_url = url+'/users/'+id+'/problems/' + '0';
        axios.get(real_url).then(resp => {
            setProblems([...resp.data.problem]);
            setLoad(false)
            if (resp.data.ifend) {
                setDisable(true)
            }
        }).catch(e => {
            console.log(e)
            setTimes(0)
        })
    }, []);
    
    
    
    const handlescroll = () => {
        setCircular(true)
        real_url = url+'/users/'+id+'/problems/'+String(times + 1);
        setTimes(times + 1)
        axios.get(real_url).then(resp => {
            setProblems([...problems,...resp.data.problem]);
            setCircular(false)
            if (resp.data.ifend) {
                setDisable(true)
            }
            }).catch(e => {
                console.log(e)
            })
    }
    

    return (
        <>
        
            {load ? 
                <Loadingwrapper>
                    <CircularProgress/>
                </Loadingwrapper>
            :
                
                    <List  sx={{ paddingTop: '0' ,marginTop: '0'}} >
                        <Divider key='divider1'/>
                        {problems.map((val: any) => {
                            return (<>
                                <ListItemButton key={val.id.to_String} sx={{ padding: '0' }} >
                                    <ListItem  key={val.id.to_String+'item'} sx={{ height: '50px', padding: '0' }}>
                                        <ListItemText key={val.id.to_String+'item2'} primary={'#'+val.category } primaryTypographyProps={{ fontSize: '14px', paddingLeft: '30px', color: 'blue' }} />
                                    </ListItem>
                                </ListItemButton>
                                <Divider key={val.id.to_String+'divider2'}/>
                            </>
                            )
                        })}
                        <ListItem id='miniload' key='loaditem' sx={{ height: '70px', padding: '0' }}>
                        {!circular ? 
                        <Fab disabled={disable} aria-label="add" sx={{  border: '1px rgb(98,224,224) solid',margin: 'auto', color: 'rgb(98,224,224)', bgcolor: 'rgb(400,400,400)' ,'&:hover': {bgcolor: 'rgb(200,200,200)',color: 'rgb(400,400,400)',border:'none'}, '&:disabled': {opacity: '0.7', border: 'none'}}} onClick={handlescroll} >
                            <AddIcon  />
                            </Fab> : 
                            <CircularProgress sx={{margin: 'auto'}} />
                        }
                        </ListItem>
                        <Divider key='divider3'/>
                    </List>
                }
        </>
    )
}

export default Userproblems
