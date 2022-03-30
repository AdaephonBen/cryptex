import { Button, Link, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect } from "react";
import logo from '../assets/logo.png'
import { useAuth0 } from "@auth0/auth0-react";
import { Link as RouterLink } from "react-router-dom";

export default function Landing() {
    const {loginWithRedirect, isAuthenticated, logout} = useAuth0();
    useEffect(()=>{
        console.log(isAuthenticated)
    })
    return (
        <Box
        display='flex'
        flex='1'
        justifyContent='center'
        alignItems='center'
        height='100vh'
        >
            <Box
            border= '2px solid white'
            padding='30px 50px'
            display = 'flex'
            flexDirection='column'
            justifyContent='center'
            alignItems='center'
            >
                <img src={logo} height = '250px' alt='Cryptex logo'/>
                <Typography color='white' variant="h3">Welcome to CRYPTEX 2022</Typography>
                {!isAuthenticated && (
                <Link as={RouterLink} to="/users" _hover="none" style={{ textDecoration: 'none' }}>
                <Button
                onClick={(e) => {
                    e.preventDefault();
                    loginWithRedirect();
                }}
                >Login to Admin portal</Button>
                </Link>
                )}
                
                {isAuthenticated && (<Button
                    onClick={(e) => {
                        e.preventDefault();
                        logout();
                    }}
                    >
                        Logout
                        </Button>)}
            </Box>
        </Box>
    );
}