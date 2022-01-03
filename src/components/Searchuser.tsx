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
import { useLocation, useNavigate } from 'react-router-dom';
import Fab from '@mui/material/Fab';
import AddIcon from '@material-ui/icons/Add';
import CircularProgress from '@mui/material/CircularProgress';


const Loading2 = styled(Loading)`
    height: 100%;
    width: 100%;
`
const Loadingwrapper2 = styled(Loadingwrapper)`
    height: calc(100vh - 114px);
`




function Searchuser() {
    const [times, setTimes] = useState(0);
    const search_url = url + '/users/search/';
    const [users,setUsers] = useState<any[]>([])
    const [load, setLoad] = useState(true)
    const [circular, setCircular] = useState(false);
    const [disable, setDisable] = useState(false);
    const navigate = useNavigate();
    
    const query = new URLSearchParams(useLocation().search)
    
    useEffect(() => {
        setTimes(0)
        axios.get(query.get('keyword') ? search_url + '0/' + query.get('keyword') : search_url + '0/' ).then(resp => {
            setUsers([...resp.data.user]);
            setLoad(false)
            if (resp.data.ifend) {
                setDisable(true)
            }
        }).catch(e => {
            console.log(e)
            setTimes(0)
        })
    }, [search_url]);
    
    const toUsers = (id: number) => {
        navigate('/users/'+String(id))
    }
    
    const handlescroll = () => {
        setCircular(true)
        setTimes(times + 1)
        console.log(users)
        axios.get(query.get('keyword') ? search_url + String(times+1) + '/' + query.get('keyword') : search_url + String(times+1) + '/' ).then(resp => {
            setUsers([...users,...resp.data.user]);
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
            <Loadingwrapper2>
                <Loading2 />
            </Loadingwrapper2>
            :
                
                    <List  sx={{ paddingTop: '0' ,marginTop: '0'}} >
                        <Divider key='divider1'/>
                        {users.map((val: any,index) => {
                            return (<div key={index}>
                                <ListItemButton  sx={{ padding: '0' }} onClick={() => {toUsers(val.id)}}>
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
                        <ListItem id='miniload' key='loaditem' sx={{ height: '70px', padding: '0' }}>
                        {!circular ? <>
                        {!disable && <Fab  aria-label="add" sx={{  border: '1px rgb(98,224,224) solid',margin: 'auto', color: 'rgb(98,224,224)', bgcolor: 'rgb(400,400,400)' ,'&:hover': {bgcolor: 'rgb(200,200,200)',color: 'rgb(400,400,400)',border:'none'}, '&:disabled': {opacity: '0.7', border: 'none'}}} onClick={handlescroll} >
                            <AddIcon  />
                            </Fab> }</>: 
                            <CircularProgress sx={{margin: 'auto'}} />
                        }
                        </ListItem>
                        <Divider key='divider3'/>
                    </List>
                }
        </>
    )
}

export default Searchuser
