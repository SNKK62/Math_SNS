import '../css/App.css';
import React from 'react';
import {Routes, Route } from 'react-router-dom';
import Login from './Login';
import User from './User';
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


const App : React.VFC = () => {
  return (
    <>
      <Appbar/>
      <Routes >
        <Route path="/" element={<Login />}/>
        <Route path="/login" element={<Login />} />
        <Route path='/signup' element={<Signup/>} />
        <Route path="/users" element={<User/>}/>
        <Route path="/users/:id" element={<Userprofile />} />
        <Route path="/users/:id/edit" element={<Edituser />} />
        <Route path="/problems/new" element={<Makeproblem />} />
        <Route path="/problems/:id/solutions/new" element={<Makesolution />} />
        <Route path="/problems/:id" element={<Problem ifproblem={ true}/>}/>
        <Route path="/solutions/:id" element={<Problem ifproblem={ false}/>}/>
        <Route path="/problems/:id/edit" element={<Editproblem type='問題' ifproblem={true}/>}/>
        <Route path="/solutions/:id/edit" element={<Editproblem type='解答' ifproblem={false}/>}/>
        <Route path="/problems/:id/comments/new" element={<Makecomment/>}/>
        <Route path="/solutions/:id/comments/new" element={<Makecomment/>}/>
        <Route path="/comments/:id" element={<Comment/>}/>
        <Route path="/comments/:id/edit" element={<Editcomment/>}/>
      </Routes>
    </>
  );
}

export default App;
