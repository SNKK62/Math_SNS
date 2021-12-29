
import styled from 'styled-components';
import dataFetch from './DataFetch';
import { useReducer,useEffect,useState} from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from './axios';
import { url } from './url';
import Loading from './Loading';
import Loadingwrapper from './Loadingwrapper';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import Button from '@mui/material/Button';
import Comments from './Comments'
import 'katex/dist/katex.min.css';
import Latex from 'react-latex-next';
// import { CircularProgress } from '@material-ui/core';

const Userwrapper = styled.div`
    display: grid;
    grid-template-columns: 80px 1fr;
    grid-template-rows: 80px;
    width: 90%;
    height: 100px;
    margin: 0;
`
const Image = styled.img`
    width: 60px;
    height: 60px;
    object-fill: cover;
    border-radius: 50%;
`
const Username = styled.div`
    grid-column-start: 2;
    grid-column-end: 3;
    grid-row-start: 1;
    grid-row-end: 2;
    padding-left: 10px;
    display: flex;
    align-items: center;
    margin: auto;
    white-space: pre-wrap;
    word-wrap: break-word;
    
    font-size: 25px;
`
const Imagewrapper = styled.div`
grid-column-start: 1;
grid-column-end: 2;
grid-row-start: 1;
grid-row-end: 2;
margin: 10px 0 0 10px;
`
const Tagdiv = styled.div`
    width: 100%;
    height: 60px;
    display: flex;
    align-items: center;
`
const Tagwrapper = styled.div`
width: 70%;
color: blue;
text-align: left;
padding-left: 10px;
`

const Problemimage = styled.div`
    margin: auto;
    width: 80%;
    text-align: center;
    display: flex;
    justify-content: center;
    height: 200px;
`
const Images = styled.img`
    margin: auto;
    object-fit: contain;
    height: 200px;
`
const Description = styled.div`
    white-space: pre-wrap;
    word-wrap: break-word;
    width: 80%;
    margin: auto;
    text-align: left;
    font-size: 18px;
    margin-bottom: 20px;
    padding: 15px 10px 0 35px;
`
const Slide = styled(Slider)`
    width: 100%;
    height: 200px;
    margin: auto;
`
const Buttonwrapper = styled.div`
width: 30%;

`
const Slidewrapper = styled.div`
    width: 80%;
    margin: auto;
    .slick-prev:before,
    .slick-next:before {
        color: black;
    }
    border-bottom: 1px solid rgb(200,200,200);
    padding: 30px 20px 30px 20px;
`
const Buttonarea = styled.div`
    width: 100%;
    height: 40px;
    text-align: right;
    margin: auto;
`
const Allwrapper = styled.div`
    position: fixed;
    z-index: 100;
    width: 100vw;
    height: 100vh;
    background-color: rgb(0,0,0,0.5);
`
const Bigimage = styled.img`
    object-fit: contain;
    width: 100%;
    height: 100%;

`
const Wrapper = styled.div`
    width: 100%;
    @media(min-width: 600px){
        width: 60vw;
        box-sizing: border-box;
    }
    @media(min-width: 1025px){
        width: 45vw;
        box-sizing: border-box;
    }
`
const initialState = {
    isLoading: true,
    isError: '',
    post: {}
};
interface Propsstate {
    ifproblem: boolean;
    logged_in: {
        bool: boolean,
        id: number,
        image: string,
        name: string
    }
};

const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    accessibility: true,
}
interface imageprops {
    url: string,
    close: ()=> void
}
function Openimage(props: imageprops) {
    return (
        <Allwrapper onClick={props.close}>
            <Bigimage src={props.url} />
        </Allwrapper>
    )
}

function Problem(props: Propsstate) {
    const { id } = useParams()
    const problem_url = props.ifproblem ? url + '/problems/' + id : url + '/solutions/' + id
    const [dataState, dispatch] = useReducer(dataFetch, initialState);
    const [open, setOpen] = useState(false);
    const [imageurl, setImageurl] = useState('');
    const navigate = useNavigate()
    

    useEffect(() => {
        if (!dataState.ifLoading) {
            dispatch({type: 'init', payload: ''})
        }
        axios.get(problem_url).then(resp => {
            dispatch({ type: 'success', payload: resp.data })
            console.log(dataState.post)
        }).catch(e => {
            console.log(e);
        })
    }, [props.ifproblem])
    const toproblem = () => {
        dispatch({type: 'init', payload: ''})
        navigate('/problems/'+dataState.post.problem.problem_id)
    }
    const toedit = () => {
        navigate('/problems/'+id+'/edit')
    }
    const handledelete = () => {
        dispatch({type: 'init', payload: ''})
        axios.delete(url + '/problems/' + id).then(() => {
            navigate('/users/'+props.logged_in.id,{replace: true})
        }).catch (e => {
            console.log(e)
        })
    }
    const handleopen = (propurl: string) => {
        setImageurl(propurl)
        setOpen(true)
    }
    const handleclose = () => {
        setOpen(false)
        setImageurl('')
    }
    return (<>
        {open && Openimage({ url: imageurl, close: handleclose })}
        {dataState.isLoading ?
           <Loadingwrapper><Loading /></Loadingwrapper> : <>
            <Wrapper>
            <Userwrapper>
                <Imagewrapper>
                        <Image src={dataState.post.user_image}/>
                </Imagewrapper>
                    <Username>{dataState.post.user_name}</Username>
            </Userwrapper>
            <Tagdiv>
                        {props.ifproblem ? <Tagwrapper id='tag'>#{dataState.post.problem.category}</Tagwrapper> : <Button sx={{width: '30%',margin: 'auto'}} variant='text' onClick={toproblem}>問題を見る</Button>}
                {dataState.post.problem.user_id == props.logged_in.id && <Buttonwrapper>
                    <IconButton onClick={toedit}>
                        <EditIcon/>        
                    </IconButton>
                    <IconButton onClick={handledelete} sx={{color: 'red'}}>
                        <DeleteForeverIcon/>
                    </IconButton>    
                </Buttonwrapper>}
            </Tagdiv>        
            <Description id='tex'><Latex >{dataState.post.problem.description}</Latex></Description>
                <Slidewrapper>
                    {!(!dataState.post.problem.image1_url && !dataState.post.problem.image2_url && !dataState.post.problem.image3_url && !dataState.post.problem.image1s_url && !dataState.post.problem.image2s_url && !dataState.post.problem.image3s_url) &&
                        <>{
                            props.ifproblem ?
                                <Slide {...settings}>
                                {dataState.post.problem.image1_url &&
                                        <Problemimage onClick={() => {handleopen(dataState.post.problem.image1_url)}} >
                                            <Images src={dataState.post.problem.image1_url} />
                                        </Problemimage>}
                                    
                                    {dataState.post.problem.image2_url &&
                                        <Problemimage onClick={() => {handleopen(dataState.post.problem.image2_url)}}>
                                            <Images src={dataState.post.problem.image2_url} />
                                        </Problemimage>}
                                    {dataState.post.problem.image3_url &&
                                        <Problemimage onClick={() => {handleopen(dataState.post.problem.image3_url)}}>
                                            <Images src={dataState.post.problem.image3_url} />
                                        </Problemimage>}
                                </Slide> :
                                <Slide {...settings}>
                                    {dataState.post.problem.image1s_url &&
                                        <Problemimage onClick={() => {handleopen(dataState.post.problem.image1s_url)}}>
                                            <Images src={dataState.post.problem.image1s_url} />
                                        </Problemimage>}
                                    {dataState.post.problem.image2s_url &&
                                        <Problemimage onClick={() => {handleopen(dataState.post.problem.image2s_url)}}>
                                            <Images src={dataState.post.problem.image2s_url} />
                                        </Problemimage>}
                                    {dataState.post.problem.image3s_url &&
                                        <Problemimage onClick={() => {handleopen(dataState.post.problem.image3s_url)}}>
                                            <Images src={dataState.post.problem.image3s_url} />
                                        </Problemimage>}
                                </Slide>}</>
                    }
                </Slidewrapper>
                <Buttonarea>
                    {props.ifproblem &&<>
                        <Button variant='text' onClick={() => { navigate('/problems/' + id + '/solutions') }} sx={{color: 'red'}}>解答を見る</Button>
                        <Button variant='text' onClick={() => { navigate('/problems/' + id + '/solutions/new') }}>解答する</Button>
                    </>}
                    <Button variant='text' onClick={() => {props.ifproblem ? navigate('/problems/'+id+'/comments/new') : navigate('/solutions/'+id+'/comments/new')}}>コメントする</Button>
                </Buttonarea>
                <Comments ifproblem={props.ifproblem}/>
            </Wrapper></>
            }
    </>)
}

export default Problem
