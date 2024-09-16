import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import Dashboard from './components/Home/Dashboard';
import PrivateRoute from './components/PrivateRoutes/PrivateRoute';
import UpdateProfile from './components/ProfilePage/Updateprofile';
import Profile from './components/ProfilePage/Profile';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Start from './components/Start/Start';
import Otheruser from './components/OtherProfile/Otheruser';
import SinglePost from './components/Posts/Singlepost';
import CreatePost from './components/Posts/CreatePost';
import FollowersList from './components/Followinglist/FollowersList';
import FollowingList from './components/Followinglist/FollowingList';
import MyFollowersList from './components/Followinglist/Myfollowers';
import MyFollowingList from './components/Followinglist/Myfollowing';
import SearchUsers from './components/Search/Search';
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
          <Route path="/user/:id/following/:username" element={<PrivateRoute><FollowingList/></PrivateRoute>} />
          <Route path="/user/:id/followers/:username" element={<PrivateRoute><FollowersList/></PrivateRoute>} />
        </Routes>
      </div>
    </Router>
    <ToastContainer />
    </>
  );
}

export default App;