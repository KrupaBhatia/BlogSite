
import React, { useState , useContext} from "react"
import { Box, Button, TextField, Typography, styled } from '@mui/material';
import { API } from "../../Service/api";
import { DataContext } from "../../Context/DataProvider";

import { useNavigate } from "react-router-dom";

const Component = styled(Box)`
        width:400px;
        margin:auto;
        box-shadow:5px 2px 5px 2px gray
   
     `

const Image = styled("img")({
    width: 100,
    padding: '50px 0 0',
    margin: 'auto',
    display: "flex"
})


const Wrapper = styled(Box)`
    padding: 25px 35px;
    display: flex;
    flex: 1;
    overflow: auto;
    flex-direction: column;
    & > div, & > button , & > Typography {
        margin-top: 20px;
    }
`;

const Error = styled(Typography)`
    font-size : 10px;
    color : #ff6161;
    line-height:0;
    margin-top: 10px;
    font-weight: 600;
    `

const LoginButton = styled(Button)`
      text-transform : none ; 
      background : #FB461B ; 
      color : #fff ;
     height : 48px ; 
     border-radius : 2px; 
     `

const SignButton = styled(Button)`
     text-transform : none ; 
     background : #fff; 
     color : #2870f4;
    height : 48px ; 
    border-radius : 2px;
    `

    const loginInitial = {
        email : "",
        password : ""
    }


    const initial = {
        name : " ",
        userName: " ", 
        email : " ",
        password : " "  
      }


function Login({ isUserAuthenticated }) {

    const [account, toggleAccount] = useState('login')
    const [signup , setSignup] = useState(initial)
    const [login , setLogin] = useState(loginInitial)
    const [error , setError] = useState('')

    const {setAccount} = useContext(DataContext)

    const navigate = useNavigate();

    function toggleSignup () {
        account === "login" ? toggleAccount('signup') : toggleAccount('login') 
    }

    function onInputChange(e) {
        setSignup({...signup , [e.target.name] : e.target.value}) 
    }

    function onValueChange(e){
        setLogin({...login , [e.target.name] : e.target.value})
    }

    const signupUser = async () => {
        let response = await API.userSignup(signup);  
        if(response.isSuccess){
            setError('');
            setSignup(initial);
            toggleAccount('login')
        }else{
            setError("Something went wrong")
        }
    }

    const loginUser = async () => {
        let response = await API.userLogin(login);

        console.log(response.data);
        if(response.isSuccess){
            
            setError('');
            sessionStorage.setItem('accessToken' , `Bearer ${response.data.accessToken}`)
            sessionStorage.setItem('refreshToken' , `Bearer ${response.data.refreshToken}`)
           
            setAccount({email : response.data.email , userName: response.data.userName });
            
            isUserAuthenticated(true)

            navigate("/");
        }else{
            setError("Something went wrong")
        }
    }
    const imageURL = 'https://www.sesta.it/wp-content/uploads/2021/03/logo-blog-sesta-trasparente.png';
    return (
        <Component>
            <Box>
                <Image src={imageURL} alt="login" />
                {
                    account === 'login' ?
                        <Wrapper>
                            <TextField variant="standard" value={login.email} onChange={(e) => onValueChange(e)} name = "email" label="Enter email" />
                            <TextField variant="standard" value={login.password} onChange={(e) => onValueChange(e)} name = "password" label="Password" />
                            
                            {error && <Error>{error}</Error>}
                            <LoginButton variant="contained" onDoubleClick={() => loginUser()}>Login</LoginButton>
                            <Typography style={{ textAlign: "center" }}> OR</Typography>
                            <SignButton onClick={() => toggleSignup()}>Create an Account</SignButton>
                        </Wrapper>
                        :
                        <Wrapper>
                            <TextField variant="standard" onChange={(e) => onInputChange(e)}  name = "name" label="Enter Name" />
                            <TextField variant="standard"  onChange={(e) => onInputChange(e)}  name = "userName" label="Enter userName" />
                            <TextField variant="standard"  onChange={(e) => onInputChange(e)}  name = "email" label=" Enter email" />
                            <TextField variant="standard"  onChange={(e) => onInputChange(e)}  name = "password" label="Enter Password" />
                            
                            {error && <Error>{error}</Error>}
                            <SignButton onClick={() => signupUser()}>Sign Up</SignButton>
                            <Typography style={{ textAlign: "center" }}> OR</Typography>
                            <LoginButton variant="contained"  onClick={() => toggleSignup()}>Already have an Account</LoginButton>
                        </Wrapper>
                }



            </Box>
        </Component>
    )
}
export default Login 