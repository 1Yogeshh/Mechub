import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import PrivateRoute from './components/PrivateRoute';
import UpdateProfile from './components/Updateprofile';
import Profile from './components/Profile';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Start from './components/Start';
import Otheruser from './components/Otheruser';
import SinglePost from './components/Singlepost';
import CreatePost from './components/CreatePost';
import FollowersList from './components/FollowersList';
import FollowingList from './components/FollowingList';
import MyFollowersList from './components/Myfollowers';
import MyFollowingList from './components/Myfollowing';
import SearchUsers from './components/Search';
import "./App.css"

function App() {
  return (
    <>
    <Router>
      <div className="App">
        <Routes>
        <Route path="/" element={<Start/>} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
          <Route path="/profile" element={<PrivateRoute><Profile/></PrivateRoute>} />
          <Route path="/search" element={<PrivateRoute><SearchUsers/></PrivateRoute>}/>
          <Route path="/update" element={<PrivateRoute><UpdateProfile/></PrivateRoute>} />
          <Route path="/user/:username" element={<PrivateRoute><Otheruser/></PrivateRoute>} />
          <Route path="/create" element={<PrivateRoute><CreatePost/></PrivateRoute>} />
          <Route path="/post/:id" element={<SinglePost/>} />
          <Route path="/followers" element={<PrivateRoute><MyFollowersList/></PrivateRoute>} />
          <Route path="/following" element={<PrivateRoute><MyFollowingList/></PrivateRoute>} />
          <Route path="/user/:id/following/:username" element={<PrivateRoute><FollowersList/></PrivateRoute>} />
          <Route path="/user/:id/followers/:username" element={<PrivateRoute><FollowersList/></PrivateRoute>} />
        </Routes>
      </div>
    </Router>
    <ToastContainer />
    </>
  );
}

export default App;