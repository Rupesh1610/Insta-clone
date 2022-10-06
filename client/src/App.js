import React, { useReducer, createContext, useEffect, useContext } from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import '../node_modules/bootstrap/dist/js/bootstrap.bundle'
import Navbar from './components/navbar/Navbar';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom'
import Home from './components/screens/Home';
import SignIn from './components/screens/SignIn';
import SignUp from './components/screens/SignUp';
import Profile from './components/screens/Profile';
import CreatePost from './components/screens/CreatePost';
import UserProfile from './components/screens/UserProfile';
import { initialState, reducer } from './reducer/userReducer';

export const UserContext = createContext();

const Routing = () => {
  const Navigate = useNavigate();
  const { dispatch } = useContext(UserContext);
  const user = JSON.parse(localStorage.getItem('user'))
  useEffect(() => {
    if (user) {
      dispatch({ type: 'USER', payload: user })
    } else {
      Navigate('/signin')
    }
  }, [])
  return (

    <Routes>
      <Route path='/' element={<Navbar />}>
        <Route index element={<Home />} />
        <Route path='signin' element={<SignIn />} />
        <Route path='signup' element={<SignUp />} />
        <Route path='profile' element={<Profile />} />
        <Route path='createpost' element={<CreatePost />} />
        <Route path='profile/:id' element={<UserProfile />} />
      </Route>
    </Routes>
  )
}

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <UserContext.Provider value={{ state, dispatch }}>
      <BrowserRouter>
        <Routing />
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
