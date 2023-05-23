
import './App.css';
import {BrowserRouter , Outlet, Route , Routes ,Navigate } from 'react-router-dom' ;
import { useState } from 'react';
import Login from './Components/account/Login';
import Home from './Components/home/Home';
import Header from './Components/header/Header'
import DataProvider from './Context/DataProvider';



const PrivateRoute = ({isAuthenticated , ...props}) => {

  return isAuthenticated ?
   <>
    <Header />
    <Outlet />
  </>
  : <Navigate replace to =  '/login'/>
}

function App() {

  const [isAuthenticated , isUserAuthenticated ] = useState(false)
  return (
    <DataProvider>
    <BrowserRouter> 
   
     <div style={{marginTop : "64px"}} >
     <Routes>
     <Route path='/login' element = {<Login isUserAuthenticated={isUserAuthenticated} /> }/>

     <Route path='/' element = {<PrivateRoute isAuthenticated = {isAuthenticated} />} >
     <Route path='/' element = {<Home />} />
     </Route >
     </Routes>
     </div>
     </BrowserRouter>
     </DataProvider>
  );
}

export default App;
