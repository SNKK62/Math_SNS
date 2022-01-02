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
import { useParams,useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Avatar from '@mui/material/Avatar';
import Wrapper from './Wrapper'

const Loadingwrapper = styled.div`
    padding-top: 15px;
    margin: auto;
    width: 100%;
    text-align: center;
    @media(min-width: 600px){
        width: 60vw;
    }
    @media(min-width: 1025px){
        width: 45vw
    }
`
const Count = styled.div`
    width: 95%;
    text-align: right;
    font-size: 12px;
    padding-right: 15px;
    height: 20px;
    margin-right: 5%;
`





function Solutions() {
    const { id } = useParams();
    const [times, setTimes] = useState(0);
    const [problems,setProblems] = useState<any[]>([])
    const [load, setLoad] = useState(true)
    const [circular, setCircular] = useState(false);
    const [disable, setDisable] = useState(false);
    var real_url = ''
    const navigate = useNavigate()
    
    useEffect(() => {
        setTimes(0)
        axios.get(url+'/problems/'+id+'/solutions/0').then(resp => {
            setProblems([...resp.data.solution]);
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
        real_url = url+'/problems/'+id+'/solutions/'+String(times + 1);
        setTimes(times + 1)
        axios.get(real_url).then(resp => {
            setProblems([...problems,...resp.data.solution]);
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
                <Wrapper>
                    <List  sx={{ padding: '0' ,marginTop: '0'}} >
                        <Divider key='divider1'/>
                        {problems.map((val: any,index) => {
                            return (<div key={index}>
                                <ListItemButton  sx={{ padding: '0',height: '70px' }} onClick={() => {navigate('/solutions/'+String(val.id))}} >
                                    <List sx={{width: '100%'}}>
                                    <ListItem  key={val.id.to_String+'item'} sx={{ height: '50px', padding: '0',width: '100%' }}>
                                    <Avatar key={val.id.to_String+'avatar'} alt={val.name} src={val.user_image} sx={{ height: '40px', width: '40px', marginLeft: '10px' }} />
                                        <ListItemText key={val.id.to_String+'item2'} primary={val.user_name } primaryTypographyProps={{ fontSize: '17px', paddingLeft: '30px',width: '100%', color: 'rgb(100,100,100)' }} />
                                    </ListItem>
                                    <Count>{ val.slike_count}いいね</Count>
                                    </List>
                                </ListItemButton>
                                <Divider key={val.id.to_String+'divider2'}/>
                            </div>
                            )
                        })}
                        <ListItem id='miniload' key='loaditem' sx={{ height: '70px', padding: '15px 0 15px 0' }}>
                        {!circular ? <>
                        { !disable && <Fab aria-label="add" sx={{  border: '1px rgb(98,224,224) solid',margin: 'auto', color: 'rgb(98,224,224)', bgcolor: 'rgb(400,400,400)' ,'&:hover': {bgcolor: 'rgb(200,200,200)',color: 'rgb(400,400,400)',border:'none'}, '&:disabled': {opacity: '0.7', border: 'none'}}} onClick={handlescroll} >
                            <AddIcon  />
                            </Fab>}</> : 
                            <CircularProgress sx={{margin: 'auto'}} />
                        }
                        </ListItem>
                        <Divider key='divider3'/>
                    </List></Wrapper>
                }
        </>
    )
}

export default Solutions
