import  { useState, useEffect} from 'react';
import axios from './axios';
import { url } from './url';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
// import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
import Fab from '@mui/material/Fab';
import AddIcon from '@material-ui/icons/Add';
import CircularProgress from '@mui/material/CircularProgress';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Loadingwrapper = styled.div`
    padding-top: 15px 0 15px 0;
    margin: auto;
    width: 100%;
    text-align: center;
`
const Count = styled.div`
    width: 100%;
    text-align: right;
    font-size: 12px;
    padding-right: 10px;
    height: 12px;
`
const Tag = styled.div`
    width: 100%;
    font-size: 14px;
    padding-left: 20px;
    color: blue;
`
const Listwrapper = styled.div`
    width: 95%;
`




function Userproblems() {
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
    
    const toProblem = (id: number) => {
        navigate('/problems/'+String(id))
    }
    
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
                        {problems.map((val: any,index) => {
                            return (<div key={index}>
                                <ListItemButton sx={{ padding: '0', height: '60px' }} onClick={() => { toProblem(val.id) }} >
                                    <Listwrapper>
                                    <Tag>#{ val.category}</Tag>
                                    <Count>{ val.plike_count}いいね</Count>
                                    </Listwrapper>
                                </ListItemButton>
                                <Divider key={val.id.to_String+'divider2'}/>
                            </div>
                            )
                        })}
                        <ListItem id='miniload' key='loaditem' sx={{ height: '70px', padding: '15px 0 15px 0' }}>
                        {!circular ? <>
                        { !disable && <Fab aria-label="add" sx={{  border: '1px rgb(98,224,224) solid',margin: 'auto', color: 'rgb(98,224,224)', bgcolor: 'rgb(400,400,400)' ,'&:hover': {bgcolor: 'rgb(200,200,200)',color: 'rgb(400,400,400)',border:'none'}, '&:disabled': {opacity: '0.7', border: 'none'}}} onClick={handlescroll} >
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

export default Userproblems
