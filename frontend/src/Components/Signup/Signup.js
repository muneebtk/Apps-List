import React, { useContext, useState, useEffect } from "react";
import axios from '../../Utils/axios'
import {
  Grid,
  Paper,
  Avatar,
  Typography,
  TextField,
  Button,
  Alert,
  Box,
} from "@mui/material";
// import "./signup.css";
import './signup.css'
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { blue,green } from "@mui/material/colors";
import { Link } from "react-router-dom";
import AppContext from "../../Context/AppContext";

function Signup() {
  let {SignupUser} = useContext(AppContext);

  let [firstName,setFirstName] = useState('')
  let [lastName,setLastName] = useState('')
  let [email,setEmail] = useState('')
  let [password,setPassword] = useState('')
  let [confirmPassword,setConfirmPassword] = useState('')
  let [fieldError,setFieldError] = useState()

  let SignupValidation = (e)=>{
    e.preventDefault()
    const nameRe =  /^[\w'\-,.][^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{2,}$/i
    if (firstName==='' || !nameRe.test(firstName)){
        setFieldError('Please enter a valid first name')
        return false
    }
    const emailRe = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
    if (email==='' ||!emailRe.test(email)){
      setFieldError('Ivalid Username or field is empty')
      return false
    }
    if (password!==confirmPassword || password==='' || confirmPassword ===''){
      setFieldError('Enter correct password ')
      return false
    }else{
    SignupUser(firstName,lastName,email,password,confirmPassword)
    }
  }
 
  let handleFirstName = (e)=>{
    setFirstName(e.target.value)
  }
  let handleLastName = (e)=>{
    setLastName(e.target.value)
  }
  let handleEmail = (e)=>{
    setEmail(e.target.value)
  }
  let handlePassword = (e)=>{
    setPassword(e.target.value)
  }
  let handleConfirmPassword = (e)=>{
    setConfirmPassword(e.target.value)
  }
  return (
    <div>
      <Grid>
        <Paper className="paper_signup" elevation={0} variant="outlined" >
          <Grid align="center">
            <Avatar sx={{ bgcolor: green[500] }}>
              <ExitToAppIcon />
            </Avatar>
            <Typography variant="h4" className="typo">
              Signup
            </Typography>
          </Grid>
          <Grid>
            {/* {signupErrorRes ? (
              <Alert severity="error">{signupErrorRes}</Alert>
            ) : null} */}
            {fieldError ? <Alert severity="error">{fieldError}</Alert> : null}
            <form onSubmit={SignupValidation}>
              <div>
                <TextField
                  onChange={handleFirstName}
                  style={{ marginTop: "10px" }}
                  variant="standard"
                  name="first_name"
                  type="text"
                  label="First Name"
                  placeholder="Enter First Name"
                  fullWidth={true}
                ></TextField>
              </div>

              <TextField
                onChange={handleLastName}
                name="last_name"
                style={{ marginTop: "10px" }}
                variant="standard"
                type="text"
                label="Last Name"
                placeholder="Enter Last Name"
                fullWidth
              ></TextField>

              <TextField
                onChange={handleEmail}
                name="email"
                style={{ marginTop: "10px" }}
                variant="standard"
                type="text"
                label="Enter Email"
                placeholder="Email"
                fullWidth={true}
              ></TextField>

              <TextField
                onChange={handlePassword}
                name="password"
                style={{ marginTop: "10px" }}
                variant="standard"
                type="password"
                label="Password"
                placeholder="Enter Password"
                fullWidth
              ></TextField>
              <Typography variant="caption">
                <span style={{ color: "red" }}>*</span> password must contain 5
                characters
              </Typography>

              <TextField
                onChange={handleConfirmPassword}
                name="confirm_password"
                style={{ marginTop: "10px" }}
                variant="standard"
                type="password"
                label="Confirm Password"
                placeholder="Confirm Password"
                fullWidth="true"
              ></TextField>

              <Box align="center">
                <Button
                  style={{ marginTop: "20px", width: "150px" }}
                  variant="outlined"
                  type="submit"
                >
                  signup
                </Button>
                <br />
                <br />
              </Box>
              <Typography variant="body2">
                Already have an account?
                <Link
                  style={{
                    marginTop: "30px",
                    color: "#0033cc",
                    textDecoration: "none",
                  }}
                  to="/admin/login"
                >
                  Login
                </Link>
              </Typography>
            </form>
          </Grid>
        </Paper>
      </Grid>
    </div>
  );
}

export default Signup;
