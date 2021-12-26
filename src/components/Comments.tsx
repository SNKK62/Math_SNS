import { useState, useEffect } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import AddIcon from '@material-ui/icons/Add';
import CircularProgress from '@mui/material/CircularProgress';
import Fab from '@mui/material/Fab';
import axios from './axios';
import { url } from './url';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar'
import ListItemButton from '@mui/material/ListItemButton';
import styled from 'styled-components';
import Loading from './Loading';
import Loadingwrapper from './Loadingwrapper';
import {useParams} from 'react-router-dom'

const Loading2 = styled(Loading)`
    height: 100%;
    width: 100%;
`


interface Props {
    ifproblem: boolean
}

function Comments(props: Props) {
    const {id} = useParams()
    const [times, setTimes] = useState(0);
    const search_url = props.ifproblem ? url + '/problems/' + String(id) + '/comments/' : url + '/solutions/' + String(id) + '/comments';
    const [comments,setComments] = useState<any[]>([])
    const [load, setLoad] = useState(true)
    const [circular, setCircular] = useState(false);
    const [disable, setDisable] = useState(false);
    var real_url = ''

    useEffect(() => {
        setTimes(0)
        real_url = search_url + 0 + '/' ;
        axios.get(real_url).then(resp => {
            setComments([...resp.data.comment]);
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
        real_url = search_url + String(times + 1) + '/';
        setTimes(times + 1)
        axios.get(real_url).then(resp => {
            setComments([...comments,...resp.data.comment]);
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
                <Loading2 />
            </Loadingwrapper>
            :
            <List  sx={{ paddingTop: '0' ,marginTop: '0'}} >
                        <Divider key='divider1'/>
                        {comments.map((val: any) => {
                            return (<>
                                <ListItemButton key={val.id.to_String} sx={{ padding: '0' }} >
                                    <ListItem  key={val.id.to_String+'item'} sx={{ height: '90px', padding: '0' }}>
                                        <Avatar key={val.id.to_String+'avatar'} alt={val.user_name} src={val.user_image} sx={{ height: '40px', width: '40px', marginLeft: '10px' }} />
                                        <List key={val.id.to_String+'list'} sx={{ width: '80%', paddingLeft: '10px', padding: '0 0 0 5px' }}>
                                            <ListItemText  key={val.id.to_String+'item1'} primary={val.user_name} primaryTypographyProps={{ fontSize: '18px', paddingLeft: '25px',paddingTop: '5px' }} />
                                            <Divider key={val.id.to_String + 'divider1'} />
                                        <ListItemText  key={val.id.to_String+'item3'} primary={val.text} primaryTypographyProps={{ fontSize: '15px', paddingLeft: '10px', paddingTop: '5px' ,color: 'rgb(100,100,100)',width: '100%',whiteSpace: 'pre-wrap',}} />
                                            
                                        </List>
                                    </ListItem>
                                    <Divider />
                                    
                                    
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

export default Comments
