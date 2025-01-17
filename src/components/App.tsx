import '../css/App.css';
import React, { useState ,useEffect} from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import MediaQuery from 'react-responsive';
import styled from 'styled-components';
import {url} from './url'
import axios from './axios';
import Login from './Login';
import Users from './Users';
import Signup from './Signup'
import Userprofile from './Userprofile'
import Edituser from './Edituser'
// import Loading from './Loading';
import Makeproblem from './Makeproblem';
import Makesolution from './Makesolution';
import Problem from './Problem';
import Editproblem from './Editproblem';
import Makecomment from './Makecomment';
import Comment from './Comment';
import Editcomment from './Editcomment';
import Appbar from './Appbar';
import SearchTab from './SearchTab';
import Searchprocess from './Searchprocess';
import Problems from './Problems'
import Comments from './Comments';
import SearchTabtest from './SearchTabtest';
import Solutions from './Solutions';
import StaticSidebar from './StaticSidebar';
import Loadingwrapper from './Loadingwrapper';
import Loading from './Loading';
import Follow from './Follow';
import Likeproblem from './Likeproblem';
import Likesolution from './Likesolution';
import Default from './Default';
import Logo from './Logo';

const Appwrapper = styled.div`
  width: 100vw;
  height: 100%;
  display: flex;
  box-sizing: border-box;
  margin: 0;
  overflow-x: hidden;
`
const Whitespace = styled.div`
  @media(min-width: 600px){
    width: 40vw;
    box-sizing: border-box;
  }
  @media(min-width: 1025px){
    width: 20vw;
    box-sizing: border-box;
  }
`
const Border = styled.div`
  @media(max-width: 1024px){
    display: none;
  }
  @media(min-width: 1025px){
    width: 45vw;
    height: calc(100vw - 67px);
    position: fixed;
    border-right: 1px solid rgb(200,200,200);
    left: calc(20vw - 1px);
    top: 67px;
    z-index: 1;
  }
`
const Loadingwrapper2 = styled(Loadingwrapper)`
  left: 0px;
  position: fixed;
  background: white;
  top: 66px;
  z-index: 500;
  @media(min-width: 600px){
    left: calc(40vw - 1px);
  }
  @media(min-width: 1025px){
    left: calc(20vw - 1px);
  }
`

const App: React.VFC = () => {
  const [value, setValue] = useState(0);
  const [logged_in, setLogged_in] = useState({bool: false,id: -1,image: '',name: ''});
  const [load, setLoad] = useState(true)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate();
  useEffect(() => {
    axios.get(url + '/logged_in').then(resp => {
      setLogged_in({ bool: resp.data.bool, id: resp.data.id ,image: resp.data.image, name: resp.data.name});
      window.setTimeout(() => { setLoad(false); },1000)
    }).catch(e => {
      console.log(e)
    })
  }, [])
  
  const handledelete = () => {
    setLoading(true)
    axios.delete(url + '/logout').then((resp) => {
      console.log(resp)
      setLogged_in({ bool: false, id: -1, image: '', name: '' })
      setLoading(false)
      navigate('/')
    }).catch(e => {
      console.log(e);
    })
  }
  
  return (
    <>
      {load ? <Logo/> : <>
        <Appbar logged_in={logged_in} handledelete={handledelete} />
        <Appwrapper>
        <Border/>
        <MediaQuery query="(min-width: 600px)">
          <Whitespace/>    
          <StaticSidebar logged_in={logged_in} handledelete={handledelete} />
        </MediaQuery>
          {loading && <Loadingwrapper2>
            <Loading />
          </Loadingwrapper2> }
            <Routes >
              <Route path="/" element={ <Default logged_in={logged_in} />} />
              <Route path="/login" element={<Login logged_in={logged_in} setLogged_in={setLogged_in} />} />
              <Route path='/signup' element={<Signup logged_in={logged_in} setLogged_in={setLogged_in} />} />
              <Route path="/users" element={<Users />} />
              <Route path="/problems" element={<Problems />} />
              <Route path="/users/:id" element={<Userprofile logged_in={logged_in} />} />
              <Route path="/users/:id/followers" element={<Follow iffollower={true}/>}/>
              <Route path="/users/:id/followings" element={<Follow iffollower={false}/>}/>
              <Route path="/users/:id/edit" element={<Edituser logged_in={logged_in} setLogged_in={setLogged_in}/>} />
              <Route path="/users/like_problems" element={<Likeproblem logged_in={ logged_in}/> }/>
              <Route path="/users/like_solutions" element={<Likesolution logged_in={logged_in}/>}/>
              <Route path="/problems/new" element={<Makeproblem logged_in={logged_in} />} />
              <Route path="/problems/:id/solutions/new" element={<Makesolution logged_in={logged_in} />} />
              <Route path="/problems/:id/solutions/" element={<Solutions />} />
              <Route path="/problems/:id" element={<Problem ifproblem={true} logged_in={logged_in} />} />
              <Route path="/solutions/:id" element={<Problem ifproblem={false} logged_in={logged_in} />} />
              <Route path="/problems/:id/edit" element={<Editproblem type='問題' ifproblem={true} logged_in={logged_in} />} />
              <Route path="/solutions/:id/edit" element={<Editproblem type='解答' ifproblem={false} logged_in={logged_in} />} />
              <Route path="/problems/:id/comments/new" element={<Makecomment logged_in={logged_in} />} />
              <Route path="/solutions/:id/comments/new" element={<Makecomment logged_in={logged_in} />} />
              <Route path="/comments/:id" element={<Comment logged_in={logged_in} />} />
              <Route path="/comments/:id/edit" element={<Editcomment logged_in={logged_in} />} />
              <Route path="/problems/:id/comments" element={<Comments ifproblem={true} />} />
              <Route path="/solutions/:id/comments" element={<Comments ifproblem={false} />} />
              <Route path="/search" element={<SearchTab value={value} setValue={setValue}/>} />
              <Route path="/searchprocess" element={<Searchprocess />} />
            </Routes>
        <MediaQuery query='(min-width:1025px)'>
          <SearchTabtest/>
          </MediaQuery>
          </Appwrapper>
      </>}
    </>
  );
}

export default App;
