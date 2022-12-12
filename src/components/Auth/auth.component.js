import React, { useState } from "react";
import {
  Avatar,
  Button,
  Paper,
  Grid,
  Typography,
  Container,
} from "@material-ui/core";
import useStyles from "./styles";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import Input from "./input";
import { login, register } from "../../actions/auth";

const initialState = {
  firstName: "",
  lastName: "",
  userName: "",
  email: "",
  password: "",
  confirmPassword: "",
}

function Auth() {
  const classes = useStyles();
  const [isSignup, setIsSignup] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState(initialState);
  const [errorLogin, setErrorLogin] = useState("")
  const [errorRegister, setErrorRegister] = useState({
    email: "",
    username:"",
    password:""
  })
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSignup){
      let data = await dispatch(register(formData, navigate));
      setErrorRegister({...errorRegister, email: data.email, password:data.password, username:data.username})
    } else {
      let data = await dispatch(login(formData, navigate));
      setErrorLogin(data)
    }
  }
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }
  const handleShowPassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  }
  const switchMode = () => {
    setIsSignup((prevShowPassword) => !prevShowPassword);
    setShowPassword(false);
  }

  return (
    <Container component="main" maxWidth="xs">
      <Paper className={classes.paper} elevation={3}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          {isSignup
            ? "Sign up"
            : "Sign in"
          }
        </Typography>
        
        <form className={classes.form} onSubmit={handleSubmit}>
          <h4 style={{color:"#f54e42"}}>
            {errorLogin}
          </h4>
          <Grid container spacing={2}>
            {isSignup && (
              <>
                <Input
                  name="firstName"
                  label="First Name"
                  handleChange={handleChange}
                  autoFocus
                  half
                />
                <Input 
                  name="lastName"
                  label="Last Name"
                  handleChange={handleChange}
                  half
                />
                <h4 style={{color:"#f54e42"}}>
                  {errorRegister.email}
                </h4>
                <Input 
                  name="email"
                  label="Email address"
                  handleChange={handleChange}
                  type="email"
                />
              </>
            )}
            <h4 style={{color:"#f54e42"}}>
              {errorRegister.username}
            </h4>
            <Input 
              name="userName"
              label="Username"
              handleChange={handleChange}
            />
            <h4 style={{color:"#f54e42"}}>
              {errorRegister.password}
            </h4>
            <Input 
              name="password"
              label="Password"
              handleChange={handleChange}
              type={showPassword ? "text" : "password"}
              handleShowPassword={handleShowPassword}
            />
            {isSignup && (
              <Input 
                name="confirmPassword"
                label="Repeat password"
                handleChange={handleChange}
                type="password"
              />
            )}
          </Grid>
          <Button 
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            {isSignup 
              ? "Sign up"
              : "Sign in"
            }
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Button onClick={switchMode}>
                {isSignup
                  ? "Already have and account? Sign in"
                  : "Don't have an account? Sign up"
                }
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  )
}

export default Auth