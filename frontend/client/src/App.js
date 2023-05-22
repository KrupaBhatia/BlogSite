
import './App.css';
import {BrowserRouter , Route , Routes } from 'react-router-dom' ;
import Login from './Components/account/Login';
import Home from './Components/home/Home';
import Header from './Components/header/Header'
import DataProvider from './Context/DataProvider';

function App() {
  return (
   
    <DataProvider>
    <BrowserRouter> 
    <Header />
     <div style={{marginTop : "64px"}} >
     <Routes>
     <Route path='/login' element = {<Login />} />
     <Route path='/' element = {<Home />} />
     </Routes>
     </div>
     </BrowserRouter>
     </DataProvider>
  );
}

export default App;
