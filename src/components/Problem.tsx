
import styled from 'styled-components';
import dataFetch from './DataFetch';
import { useReducer,useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from './axios';
import { url } from './url';
import Loading from './Loading';
import Loadingwrapper from './Loadingwrapper';
import Wrapper from './Wrapper';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';

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
const Towrapper = styled.div`
grid-column-start: 1;
grid-column-end: 2;
grid-row-start: 2;
grid-row-end: 3;
display: flex;
justify-content: center;
align-items: center;
color: blue;
text-decoration: underline;
cursor: pointer;
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
    margin-bottom: 40px;
    padding: 15px 10px 0 35px;
`
const Slide = styled(Slider)`
    width: 100%;
    height: 200px;
    margin: auto;
`
const Slidewrapper = styled.div`
    width: 80%;
    margin: auto;
    .slick-prev:before,
    .slick-next:before {
        color: black;
    }
    border-bottom: 1px solid black;
    padding: 50px 20px 50px 20px;
`
const initialState = {
    isLoading: true,
    isError: '',
    post: {}
};
interface Propsstate {
    ifproblem: boolean;
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
    return (<>
        {dataState.isLoading ?
           <Loadingwrapper><Loading /></Loadingwrapper> : 
            <Wrapper>
            <Userwrapper>
                <Imagewrapper>
                        <Image src={dataState.post.user_image}/>
                </Imagewrapper>
                    <Username>{dataState.post.user_name}</Username>
                        {props.ifproblem ? <Tagwrapper>#{dataState.post.problem.category}</Tagwrapper> : <Towrapper onClick={toproblem}>問題を見る</Towrapper>}
            </Userwrapper>
            <Description>{dataState.post.problem.description}</Description>
            <Slidewrapper>
                        {props.ifproblem ?
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
                            </Slide>}
            </Slidewrapper>
            </Wrapper>
            }
    </>)
}

export default Problem
