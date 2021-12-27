
import styled from 'styled-components';
import dataFetch from './DataFetch';
import { useReducer,useEffect} from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from './axios';
import { url } from './url';
import Loading from './Loading';
import Loadingwrapper from './Loadingwrapper';
import Wrapper from './Wrapper';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import Button from '@mui/material/Button';
import Comments from './Comments'
// import { CircularProgress } from '@material-ui/core';

const Userwrapper = styled.div`
display: grid;
grid-template-columns: 120px, 1fr;
grid-template-rows: 120px, 60px;
width: 90%;
height: 180px;
margin: 0 5% 0 5%;
border-bottom: 1px solid rgb(200,200,200);
`
const Imagewrapper = styled.div`
grid-column-start: 1;
grid-column-end: 2;
grid-row-start: 1;
grid-row-end: 2;
display: flex;
// justify-content: center;
align-items: center;
margin: auto;
`
const Image = styled.img`
width: 100px;
height: 100px;
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
font-size: 35px;
`
const Tagwrapper = styled.div`
grid-column-start: 1;
grid-column-end: 2;
grid-row-start: 2;
grid-row-end: 3;
display: flex;
justify-content: center;
align-items: center;
color: blue;
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
    font-size: 20px;
    margin-bottom: 20px;
    padding: 15px 10px 0 35px;
`
const Slide = styled(Slider)`
    width: 100%;
    height: 200px;
    margin: auto;
`
const Buttonwrapper = styled.div`
    column: 2/3;
    row: 2/3;
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
    width: 80%;
    height: 40px;
    text-align: right;
    margin: auto;
    padding: 0 20px 0 20px;
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


function Problem(props: Propsstate) {
    const { id } = useParams()
    const problem_url = props.ifproblem ? url + '/problems/' + id : url + '/solutions/' + id
    const [dataState, dispatch] = useReducer(dataFetch, initialState);
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
    return (<>
        {dataState.isLoading ?
           <Loadingwrapper><Loading /></Loadingwrapper> : 
            <Wrapper>
            <Userwrapper>
                <Imagewrapper>
                        <Image src={dataState.post.user_image}/>
                </Imagewrapper>
                    <Username>{dataState.post.user_name}</Username>
                        {props.ifproblem ? <Tagwrapper>#{dataState.post.problem.category}</Tagwrapper> : <Button sx={{width: '30%',margin: 'auto'}} variant='text' onClick={toproblem}>問題を見る</Button>}
                {dataState.post.problem.user_id == props.logged_in.id && <Buttonwrapper>
                    <IconButton onClick={toedit}>
                        <EditIcon/>        
                    </IconButton>
                    <IconButton onClick={handledelete} sx={{color: 'red'}}>
                        <DeleteForeverIcon/>
                    </IconButton>    
                </Buttonwrapper>}
            </Userwrapper>
            <Description>{dataState.post.problem.description}</Description>
                <Slidewrapper>
                    {!(!dataState.post.problem.image1_url && !dataState.post.problem.image2_url && !dataState.post.problem.image3_url && !dataState.post.problem.image1s_url && !dataState.post.problem.image2s_url && !dataState.post.problem.image3s_url) &&
                        <>{
                            props.ifproblem ?
                                <Slide {...settings}>
                                {dataState.post.problem.image1_url &&
                                        <Problemimage >
                                            <Images src={dataState.post.problem.image1_url} />
                                        </Problemimage>}
                                    
                                    {dataState.post.problem.image2_url &&
                                        <Problemimage>
                                            <Images src={dataState.post.problem.image2_url} />
                                        </Problemimage>}
                                    {dataState.post.problem.image3_url &&
                                        <Problemimage>
                                            <Images src={dataState.post.problem.image3_url} />
                                        </Problemimage>}
                                </Slide> :
                                <Slide {...settings}>
                                    {dataState.post.problem.image1s_url &&
                                        <Problemimage >
                                            <Images src={dataState.post.problem.image1s_url} />
                                        </Problemimage>}
                                    {dataState.post.problem.image2s_url &&
                                        <Problemimage>
                                            <Images src={dataState.post.problem.image2s_url} />
                                        </Problemimage>}
                                    {dataState.post.problem.image3s_url &&
                                        <Problemimage>
                                            <Images src={dataState.post.problem.image3s_url} />
                                        </Problemimage>}
                                </Slide>}</>
                    }
                </Slidewrapper>
                <Buttonarea>
                    {props.ifproblem &&
                        <Button variant='text' onClick={() => { navigate('/problems/' + id + '/solutions/new') }}>解答する</Button>
                    }
                    <Button variant='text' onClick={() => {props.ifproblem ? navigate('/problems/'+id+'/comments/new') : navigate('/solutions/'+id+'/comments/new')}}>コメントする</Button>
                </Buttonarea>
                <Comments ifproblem={props.ifproblem}/>
            </Wrapper>
            }
    </>)
}

export default Problem
