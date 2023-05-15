
import React, { useState } from "react"
import { Box, Button, TextField, Typography, styled } from '@mui/material';
import { API } from "../../Service/api";
console.log(API);
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


    const initial = {
        name : " ",
        userName: " ", 
        email : " ",
        password : " "  
      }


function Login() {

    const [account, setAccount] = useState('login')
    const [signup , setSignup] = useState(initial)

    function toggleSignup () {
        account === "login" ? setAccount('signup') : setAccount('login') 
    }

    function onInputChange(e) {
        setSignup({...signup , [e.target.name] : e.target.value}) 
    }

    const signupUser = async () => {
        let response = await API.userSignup(signup)  
    }
    const imageURL = 'https://www.sesta.it/wp-content/uploads/2021/03/logo-blog-sesta-trasparente.png';
    return (
        <Component>
            <Box>
                <Image src={imageURL} alt="login" />
                {
                    account === 'login' ?
                        <Wrapper>
                            <TextField variant="standard" onChange={(e) => onInputChange(e)} name = "name" label="Enter Name" />
                            <TextField variant="standard" onChange={(e) => onInputChange(e)} name = "password" label="Password" />
                            <LoginButton variant="contained">Login</LoginButton>
                            <Typography style={{ textAlign: "center" }}> OR</Typography>
                            <SignButton onClick={() => toggleSignup()}>Create an Account</SignButton>
                        </Wrapper>
                        :
                        <Wrapper>
                            <TextField variant="standard" onChange={(e) => onInputChange(e)}  name = "name" label="Enter Name" />
                            <TextField variant="standard"  onChange={(e) => onInputChange(e)}  name = "username" label=" Enter userName" />
                            <TextField variant="standard"  onChange={(e) => onInputChange(e)}  name = "email" label=" Enter email" />
                            <TextField variant="standard"  onChange={(e) => onInputChange(e)}  name = "password" label="Enter Password" />
                            <SignButton onClick={() => signupUser()}>Sign Up</SignButton>
                            <Typography style={{ textAlign: "center" }}> OR</Typography>
                            <LoginButton variant="contained "  onClick={() => toggleSignup()}>Already have an Account</LoginButton>
                        </Wrapper>
                }



            </Box>
        </Component>
    )
}
export default Login 